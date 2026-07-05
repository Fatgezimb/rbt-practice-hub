import { competencyTasks, sectionOrder } from "../data/competencyTasks";
import { flashcards } from "../data/flashcards";
import { practiceQuestions } from "../data/practiceQuestions";
import { studyGuideSections } from "../data/studyGuideSections";
import type {
  CompetencySection,
  CompetencyTask,
  FlashcardAttemptHistory,
  FlashcardStatus,
  GuideActivity,
  LearnerProgress,
  ProgressByTask,
  QuestionAttemptHistory,
  QuestionStatus,
  TaskStatus,
} from "../types";

export interface ProgressSummary {
  total: number;
  ready: number;
  notReady: number;
  needsReview: number;
  notStarted: number;
  percentReady: number;
  flashcardsKnown: number;
  flashcardsNeedsReview: number;
  flashcardKnownAttempts: number;
  flashcardNeedsReviewAttempts: number;
  questionsCorrect: number;
  questionsIncorrect: number;
  questionsNeedsReview: number;
  questionCorrectAttempts: number;
  questionIncorrectAttempts: number;
  guideOpens: number;
  guideReviews: number;
  bySection: Record<CompetencySection, { ready: number; total: number }>;
}

export interface ClientDemonstrationProgress {
  required: number;
  totalEligible: number;
  demonstrated: number;
  remaining: number;
  percentComplete: number;
  complete: boolean;
  eligibleTaskNumbers: number[];
  demonstratedTaskNumbers: number[];
}

const taskStatuses: TaskStatus[] = ["ready", "not-ready", "needs-review", "not-started"];
const flashcardStatuses: FlashcardStatus[] = ["known", "needs-review", "not-started"];
const questionStatuses: QuestionStatus[] = ["correct", "incorrect", "not-started"];
const guideActivityIds = ["full-guide", ...studyGuideSections.map((section) => section.id)];

function currentTimestamp() {
  return new Date().toISOString();
}

function createFlashcardAttemptHistory(): FlashcardAttemptHistory {
  return {
    knownCount: 0,
    needsReviewCount: 0,
    attempts: [],
  };
}

function createQuestionAttemptHistory(): QuestionAttemptHistory {
  return {
    correctCount: 0,
    incorrectCount: 0,
    attempts: [],
  };
}

function createGuideActivity(): GuideActivity {
  return {
    openedCount: 0,
    reviewedCount: 0,
    openedAt: [],
    reviewedAt: [],
    reviewed: false,
  };
}

function normalizeFlashcardAttemptHistory(value: unknown): FlashcardAttemptHistory {
  if (!value || typeof value !== "object") {
    return createFlashcardAttemptHistory();
  }

  const history = value as Partial<FlashcardAttemptHistory>;
  const attempts = Array.isArray(history.attempts)
    ? history.attempts.filter(
        (attempt) =>
          attempt &&
          typeof attempt === "object" &&
          ((attempt as { result?: unknown }).result === "known" ||
            (attempt as { result?: unknown }).result === "needs-review") &&
          typeof (attempt as { at?: unknown }).at === "string",
      )
    : [];

  return {
    knownCount:
      typeof history.knownCount === "number"
        ? history.knownCount
        : attempts.filter((attempt) => attempt.result === "known").length,
    needsReviewCount:
      typeof history.needsReviewCount === "number"
        ? history.needsReviewCount
        : attempts.filter((attempt) => attempt.result === "needs-review").length,
    attempts,
  };
}

function normalizeQuestionAttemptHistory(value: unknown): QuestionAttemptHistory {
  if (!value || typeof value !== "object") {
    return createQuestionAttemptHistory();
  }

  const history = value as Partial<QuestionAttemptHistory>;
  const attempts = Array.isArray(history.attempts)
    ? history.attempts.filter(
        (attempt) =>
          attempt &&
          typeof attempt === "object" &&
          ((attempt as { result?: unknown }).result === "correct" ||
            (attempt as { result?: unknown }).result === "incorrect") &&
          typeof (attempt as { at?: unknown }).at === "string",
      )
    : [];

  return {
    correctCount:
      typeof history.correctCount === "number"
        ? history.correctCount
        : attempts.filter((attempt) => attempt.result === "correct").length,
    incorrectCount:
      typeof history.incorrectCount === "number"
        ? history.incorrectCount
        : attempts.filter((attempt) => attempt.result === "incorrect").length,
    attempts,
  };
}

function normalizeGuideActivity(value: unknown): GuideActivity {
  if (!value || typeof value !== "object") {
    return createGuideActivity();
  }

  const activity = value as Partial<GuideActivity>;
  const openedAt = Array.isArray(activity.openedAt)
    ? activity.openedAt.filter((timestamp) => typeof timestamp === "string")
    : [];
  const reviewedAt = Array.isArray(activity.reviewedAt)
    ? activity.reviewedAt.filter((timestamp) => typeof timestamp === "string")
    : [];

  return {
    openedCount: typeof activity.openedCount === "number" ? activity.openedCount : openedAt.length,
    reviewedCount: typeof activity.reviewedCount === "number" ? activity.reviewedCount : reviewedAt.length,
    openedAt,
    reviewedAt,
    reviewed: typeof activity.reviewed === "boolean" ? activity.reviewed : reviewedAt.length > 0,
  };
}

export function createInitialProgress(): LearnerProgress {
  return {
    version: 1,
    tasks: Object.fromEntries(competencyTasks.map((task) => [task.taskNumber, "not-started"])) as ProgressByTask,
    flashcards: Object.fromEntries(flashcards.map((card) => [card.id, "not-started"])),
    flashcardAttempts: Object.fromEntries(flashcards.map((card) => [card.id, createFlashcardAttemptHistory()])),
    questions: Object.fromEntries(practiceQuestions.map((question) => [question.id, "not-started"])),
    questionAttempts: Object.fromEntries(practiceQuestions.map((question) => [question.id, createQuestionAttemptHistory()])),
    questionReviews: Object.fromEntries(practiceQuestions.map((question) => [question.id, false])),
    guideActivity: Object.fromEntries(guideActivityIds.map((id) => [id, createGuideActivity()])),
    clientDemonstrations: Object.fromEntries(
      competencyTasks.filter((task) => task.requiresClientTracking).map((task) => [task.taskNumber, false]),
    ),
  };
}

export function normalizeProgress(raw: unknown): LearnerProgress {
  const initial = createInitialProgress();

  if (!raw || typeof raw !== "object") {
    return initial;
  }

  const value = raw as Partial<LearnerProgress> & Partial<Record<string, TaskStatus>>;

  if (value.version !== 1) {
    competencyTasks.forEach((task) => {
      const legacyStatus = value[String(task.taskNumber)];
      if (taskStatuses.includes(legacyStatus as TaskStatus)) {
        initial.tasks[task.taskNumber] = legacyStatus as TaskStatus;
      }
    });
    return initial;
  }

  competencyTasks.forEach((task) => {
    const savedStatus = value.tasks?.[task.taskNumber];
    if (taskStatuses.includes(savedStatus as TaskStatus)) {
      initial.tasks[task.taskNumber] = savedStatus as TaskStatus;
    }

    const demonstrated = value.clientDemonstrations?.[task.taskNumber];
    if (typeof demonstrated === "boolean" && task.requiresClientTracking) {
      initial.clientDemonstrations[task.taskNumber] = demonstrated;
    }
  });

  flashcards.forEach((card) => {
    const savedStatus = value.flashcards?.[card.id];
    if (flashcardStatuses.includes(savedStatus as FlashcardStatus)) {
      initial.flashcards[card.id] = savedStatus as FlashcardStatus;
    }

    initial.flashcardAttempts[card.id] = normalizeFlashcardAttemptHistory(value.flashcardAttempts?.[card.id]);
  });

  practiceQuestions.forEach((question) => {
    const savedStatus = value.questions?.[question.id] as QuestionStatus | "needs-review" | undefined;
    if (questionStatuses.includes(savedStatus as QuestionStatus)) {
      initial.questions[question.id] = savedStatus as QuestionStatus;
    }

    initial.questionAttempts[question.id] = normalizeQuestionAttemptHistory(value.questionAttempts?.[question.id]);

    if (savedStatus === "needs-review") {
      initial.questionReviews[question.id] = true;
    }

    const savedReview = value.questionReviews?.[question.id];
    if (typeof savedReview === "boolean") {
      initial.questionReviews[question.id] = savedReview;
    }
  });

  guideActivityIds.forEach((id) => {
    initial.guideActivity[id] = normalizeGuideActivity(value.guideActivity?.[id]);
  });

  return initial;
}

export function calculateProgress(progress: LearnerProgress, tasks: CompetencyTask[] = competencyTasks): ProgressSummary {
  const total = tasks.length;
  const ready = tasks.filter((task) => progress.tasks[task.taskNumber] === "ready").length;
  const notReady = tasks.filter((task) => progress.tasks[task.taskNumber] === "not-ready").length;
  const needsReview = tasks.filter((task) => progress.tasks[task.taskNumber] === "needs-review").length;
  const notStarted = total - ready - notReady - needsReview;

  const bySection = Object.fromEntries(
    sectionOrder.map((section) => {
      const sectionTasks = tasks.filter((task) => task.section === section);
      return [
        section,
        {
          ready: sectionTasks.filter((task) => progress.tasks[task.taskNumber] === "ready").length,
          total: sectionTasks.length,
        },
      ];
    }),
  ) as ProgressSummary["bySection"];

  return {
    total,
    ready,
    notReady,
    needsReview,
    notStarted,
    percentReady: total > 0 ? Math.round((ready / total) * 100) : 0,
    flashcardsKnown: Object.values(progress.flashcards).filter((status) => status === "known").length,
    flashcardsNeedsReview: Object.values(progress.flashcards).filter((status) => status === "needs-review").length,
    flashcardKnownAttempts: Object.values(progress.flashcardAttempts).reduce((total, history) => total + history.knownCount, 0),
    flashcardNeedsReviewAttempts: Object.values(progress.flashcardAttempts).reduce(
      (total, history) => total + history.needsReviewCount,
      0,
    ),
    questionsCorrect: Object.values(progress.questions).filter((status) => status === "correct").length,
    questionsIncorrect: Object.values(progress.questions).filter((status) => status === "incorrect").length,
    questionsNeedsReview: Object.values(progress.questionReviews).filter(Boolean).length,
    questionCorrectAttempts: Object.values(progress.questionAttempts).reduce((total, history) => total + history.correctCount, 0),
    questionIncorrectAttempts: Object.values(progress.questionAttempts).reduce((total, history) => total + history.incorrectCount, 0),
    guideOpens: Object.values(progress.guideActivity).reduce((total, activity) => total + activity.openedCount, 0),
    guideReviews: Object.values(progress.guideActivity).reduce((total, activity) => total + activity.reviewedCount, 0),
    bySection,
  };
}

export function calculateClientDemonstrationProgress(
  progress: LearnerProgress,
  tasks: CompetencyTask[] = competencyTasks,
): ClientDemonstrationProgress {
  const eligibleTaskNumbers = tasks
    .filter((task) => task.requiresClientTracking)
    .map((task) => task.taskNumber)
    .sort((a, b) => a - b);
  const demonstratedTaskNumbers = eligibleTaskNumbers.filter((taskNumber) => progress.clientDemonstrations[taskNumber]);
  const required = 3;
  const demonstrated = demonstratedTaskNumbers.length;

  return {
    required,
    totalEligible: eligibleTaskNumbers.length,
    demonstrated,
    remaining: Math.max(required - demonstrated, 0),
    percentComplete: Math.min(Math.round((demonstrated / required) * 100), 100),
    complete: demonstrated >= required,
    eligibleTaskNumbers,
    demonstratedTaskNumbers,
  };
}

export function markQuestionCorrect(progress: LearnerProgress, questionId: string): LearnerProgress {
  const history = progress.questionAttempts[questionId] ?? createQuestionAttemptHistory();

  return {
    ...progress,
    questions: {
      ...progress.questions,
      [questionId]: "correct",
    },
    questionAttempts: {
      ...progress.questionAttempts,
      [questionId]: {
        ...history,
        correctCount: history.correctCount + 1,
        attempts: [...history.attempts, { result: "correct", at: currentTimestamp() }],
      },
    },
  };
}

export function markQuestionIncorrect(progress: LearnerProgress, questionId: string): LearnerProgress {
  const history = progress.questionAttempts[questionId] ?? createQuestionAttemptHistory();

  return {
    ...progress,
    questions: {
      ...progress.questions,
      [questionId]: "incorrect",
    },
    questionAttempts: {
      ...progress.questionAttempts,
      [questionId]: {
        ...history,
        incorrectCount: history.incorrectCount + 1,
        attempts: [...history.attempts, { result: "incorrect", at: currentTimestamp() }],
      },
    },
  };
}

export function markQuestionNeedsReview(progress: LearnerProgress, questionId: string): LearnerProgress {
  return {
    ...progress,
    questionReviews: {
      ...progress.questionReviews,
      [questionId]: true,
    },
  };
}

export function markFlashcardKnown(progress: LearnerProgress, flashcardId: string): LearnerProgress {
  const history = progress.flashcardAttempts[flashcardId] ?? createFlashcardAttemptHistory();

  return {
    ...progress,
    flashcards: {
      ...progress.flashcards,
      [flashcardId]: "known",
    },
    flashcardAttempts: {
      ...progress.flashcardAttempts,
      [flashcardId]: {
        ...history,
        knownCount: history.knownCount + 1,
        attempts: [...history.attempts, { result: "known", at: currentTimestamp() }],
      },
    },
  };
}

export function markFlashcardNeedsReview(progress: LearnerProgress, flashcardId: string): LearnerProgress {
  const history = progress.flashcardAttempts[flashcardId] ?? createFlashcardAttemptHistory();

  return {
    ...progress,
    flashcards: {
      ...progress.flashcards,
      [flashcardId]: "needs-review",
    },
    flashcardAttempts: {
      ...progress.flashcardAttempts,
      [flashcardId]: {
        ...history,
        needsReviewCount: history.needsReviewCount + 1,
        attempts: [...history.attempts, { result: "needs-review", at: currentTimestamp() }],
      },
    },
  };
}

export function markGuideOpened(progress: LearnerProgress, guideId: string): LearnerProgress {
  const activity = progress.guideActivity[guideId] ?? createGuideActivity();

  return {
    ...progress,
    guideActivity: {
      ...progress.guideActivity,
      [guideId]: {
        ...activity,
        openedCount: activity.openedCount + 1,
        openedAt: [...activity.openedAt, currentTimestamp()],
      },
    },
  };
}

export function markGuideReviewed(progress: LearnerProgress, guideId: string): LearnerProgress {
  const activity = progress.guideActivity[guideId] ?? createGuideActivity();

  return {
    ...progress,
    guideActivity: {
      ...progress.guideActivity,
      [guideId]: {
        ...activity,
        reviewed: true,
        reviewedCount: activity.reviewedCount + 1,
        reviewedAt: [...activity.reviewedAt, currentTimestamp()],
      },
    },
  };
}

export function setTaskProgressStatus(progress: LearnerProgress, taskNumber: number, status: TaskStatus): LearnerProgress {
  return {
    ...progress,
    tasks: {
      ...progress.tasks,
      [taskNumber]: status,
    },
  };
}

export function setClientDemonstrationStatus(
  progress: LearnerProgress,
  taskNumber: number,
  demonstrated: boolean,
): LearnerProgress {
  return {
    ...progress,
    clientDemonstrations: {
      ...progress.clientDemonstrations,
      [taskNumber]: demonstrated,
    },
  };
}

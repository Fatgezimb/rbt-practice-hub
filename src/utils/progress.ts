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

export interface TaskPracticeSummary {
  taskNumber: number;
  totalQuestions: number;
  correctQuestions: number;
  incorrectQuestions: number;
  reviewQuestions: number;
  notAttemptedQuestions: number;
  questionCorrectAttempts: number;
  questionIncorrectAttempts: number;
  questionPasses: number;
  totalFlashcards: number;
  knownFlashcards: number;
  needsReviewFlashcards: number;
  notStartedFlashcards: number;
  flashcardKnownAttempts: number;
  flashcardNeedsReviewAttempts: number;
  flashcardPasses: number;
  practiceDays: number;
  guideId: string;
  guideTitle: string;
  guideOpenedCount: number;
  guideReviewedCount: number;
  guideDone: boolean;
  allQuestionsCorrect: boolean;
  allFlashcardsKnown: boolean;
  autoReady: boolean;
  idealReady: boolean;
}

const taskStatuses: TaskStatus[] = ["ready", "not-ready", "needs-review", "not-started"];
const flashcardStatuses: FlashcardStatus[] = ["known", "needs-review", "not-started"];
const questionStatuses: QuestionStatus[] = ["correct", "incorrect", "not-started"];
const guideActivityIds = ["full-guide", ...studyGuideSections.map((section) => section.id)];
const idealPassTarget = 3;
const idealDayTarget = 5;

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

function dateKey(timestamp: string) {
  return timestamp.slice(0, 10);
}

function compactAttemptDates(timestamps: string[]) {
  return new Set(timestamps.map(dateKey).filter(Boolean)).size;
}

export function getGuideSectionForTask(taskNumber: number) {
  return studyGuideSections.find((section) => section.taskNumbers.includes(taskNumber)) ?? studyGuideSections[0];
}

function getMinimumPositiveAttemptCount(counts: number[]) {
  if (counts.length === 0 || counts.some((count) => count === 0)) {
    return 0;
  }

  return Math.min(...counts);
}

export function calculateTaskPracticeSummary(progress: LearnerProgress, taskNumber: number): TaskPracticeSummary {
  const taskQuestions = practiceQuestions.filter((question) => question.taskNumber === taskNumber);
  const taskFlashcards = flashcards.filter((card) => card.taskNumber === taskNumber);
  const guide = getGuideSectionForTask(taskNumber);
  const guideActivity = progress.guideActivity[guide.id] ?? createGuideActivity();

  const correctQuestions = taskQuestions.filter((question) => progress.questions[question.id] === "correct").length;
  const incorrectQuestions = taskQuestions.filter((question) => progress.questions[question.id] === "incorrect").length;
  const reviewQuestions = taskQuestions.filter((question) => progress.questionReviews[question.id]).length;
  const notAttemptedQuestions = taskQuestions.length - correctQuestions - incorrectQuestions;
  const questionHistories = taskQuestions.map((question) => progress.questionAttempts[question.id] ?? createQuestionAttemptHistory());
  const questionCorrectAttempts = questionHistories.reduce((total, history) => total + history.correctCount, 0);
  const questionIncorrectAttempts = questionHistories.reduce((total, history) => total + history.incorrectCount, 0);
  const questionPasses = getMinimumPositiveAttemptCount(questionHistories.map((history) => history.correctCount));

  const knownFlashcards = taskFlashcards.filter((card) => progress.flashcards[card.id] === "known").length;
  const needsReviewFlashcards = taskFlashcards.filter((card) => progress.flashcards[card.id] === "needs-review").length;
  const notStartedFlashcards = taskFlashcards.length - knownFlashcards - needsReviewFlashcards;
  const flashcardHistories = taskFlashcards.map((card) => progress.flashcardAttempts[card.id] ?? createFlashcardAttemptHistory());
  const flashcardKnownAttempts = flashcardHistories.reduce((total, history) => total + history.knownCount, 0);
  const flashcardNeedsReviewAttempts = flashcardHistories.reduce((total, history) => total + history.needsReviewCount, 0);
  const flashcardPasses = getMinimumPositiveAttemptCount(flashcardHistories.map((history) => history.knownCount));

  const practiceDays = compactAttemptDates([
    ...questionHistories.flatMap((history) => history.attempts.map((attempt) => attempt.at)),
    ...flashcardHistories.flatMap((history) => history.attempts.map((attempt) => attempt.at)),
    ...guideActivity.openedAt,
    ...guideActivity.reviewedAt,
  ]);
  const allQuestionsCorrect = taskQuestions.length > 0 && correctQuestions === taskQuestions.length && reviewQuestions === 0;
  const allFlashcardsKnown = taskFlashcards.length > 0 && knownFlashcards === taskFlashcards.length;
  const autoReady = allQuestionsCorrect && allFlashcardsKnown;
  const guideDone = guideActivity.openedCount >= idealPassTarget;

  return {
    taskNumber,
    totalQuestions: taskQuestions.length,
    correctQuestions,
    incorrectQuestions,
    reviewQuestions,
    notAttemptedQuestions,
    questionCorrectAttempts,
    questionIncorrectAttempts,
    questionPasses,
    totalFlashcards: taskFlashcards.length,
    knownFlashcards,
    needsReviewFlashcards,
    notStartedFlashcards,
    flashcardKnownAttempts,
    flashcardNeedsReviewAttempts,
    flashcardPasses,
    practiceDays,
    guideId: guide.id,
    guideTitle: guide.title,
    guideOpenedCount: guideActivity.openedCount,
    guideReviewedCount: guideActivity.reviewedCount,
    guideDone,
    allQuestionsCorrect,
    allFlashcardsKnown,
    autoReady,
    idealReady:
      autoReady &&
      questionPasses >= idealPassTarget &&
      flashcardPasses >= idealPassTarget &&
      practiceDays >= idealDayTarget &&
      guideDone,
  };
}

export function calculateTaskPracticeSummaries(progress: LearnerProgress) {
  return Object.fromEntries(
    competencyTasks.map((task) => [task.taskNumber, calculateTaskPracticeSummary(progress, task.taskNumber)]),
  ) as Record<number, TaskPracticeSummary>;
}

function getAutomaticTaskStatus(progress: LearnerProgress, taskNumber: number): TaskStatus {
  const summary = calculateTaskPracticeSummary(progress, taskNumber);

  if (summary.autoReady) {
    return "ready";
  }

  if (
    summary.incorrectQuestions > 0 ||
    summary.reviewQuestions > 0 ||
    summary.needsReviewFlashcards > 0 ||
    summary.questionIncorrectAttempts > 0 ||
    summary.flashcardNeedsReviewAttempts > 0
  ) {
    return "needs-review";
  }

  if (
    summary.correctQuestions > 0 ||
    summary.knownFlashcards > 0 ||
    summary.questionCorrectAttempts > 0 ||
    summary.flashcardKnownAttempts > 0 ||
    summary.guideOpenedCount > 0
  ) {
    return "not-ready";
  }

  return "not-started";
}

export function applyAutomaticTaskReadiness(progress: LearnerProgress): LearnerProgress {
  const tasks = Object.fromEntries(
    competencyTasks.map((task) => [task.taskNumber, getAutomaticTaskStatus(progress, task.taskNumber)]),
  ) as ProgressByTask;

  return {
    ...progress,
    tasks,
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
    return applyAutomaticTaskReadiness(initial);
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

  return applyAutomaticTaskReadiness(initial);
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

  return applyAutomaticTaskReadiness({
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
  });
}

export function markQuestionIncorrect(progress: LearnerProgress, questionId: string): LearnerProgress {
  const history = progress.questionAttempts[questionId] ?? createQuestionAttemptHistory();

  return applyAutomaticTaskReadiness({
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
  });
}

export function markQuestionNeedsReview(progress: LearnerProgress, questionId: string): LearnerProgress {
  return applyAutomaticTaskReadiness({
    ...progress,
    questionReviews: {
      ...progress.questionReviews,
      [questionId]: true,
    },
  });
}

export function setQuestionReviewStatus(progress: LearnerProgress, questionId: string, needsReview: boolean): LearnerProgress {
  return applyAutomaticTaskReadiness({
    ...progress,
    questionReviews: {
      ...progress.questionReviews,
      [questionId]: needsReview,
    },
  });
}

export function markFlashcardKnown(progress: LearnerProgress, flashcardId: string): LearnerProgress {
  const history = progress.flashcardAttempts[flashcardId] ?? createFlashcardAttemptHistory();

  return applyAutomaticTaskReadiness({
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
  });
}

export function markFlashcardNeedsReview(progress: LearnerProgress, flashcardId: string): LearnerProgress {
  const history = progress.flashcardAttempts[flashcardId] ?? createFlashcardAttemptHistory();

  return applyAutomaticTaskReadiness({
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
  });
}

export function clearFlashcardStatus(progress: LearnerProgress, flashcardId: string): LearnerProgress {
  return applyAutomaticTaskReadiness({
    ...progress,
    flashcards: {
      ...progress.flashcards,
      [flashcardId]: "not-started",
    },
  });
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

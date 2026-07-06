import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { ClientDemonstrationProgress, ProgressSummary } from "../utils/progress";
import {
  calculateClientDemonstrationProgress,
  calculateProgress,
  clearFlashcardStatus as clearFlashcardStatusInProgress,
  createInitialProgress,
  markFlashcardKnown as markFlashcardKnownInProgress,
  markFlashcardNeedsReview as markFlashcardNeedsReviewInProgress,
  markGuideOpened as markGuideOpenedInProgress,
  markGuideReviewed as markGuideReviewedInProgress,
  markQuestionCorrect as markQuestionCorrectInProgress,
  markQuestionIncorrect as markQuestionIncorrectInProgress,
  markQuestionNeedsReview as markQuestionNeedsReviewInProgress,
  normalizeProgress,
  setClientDemonstrationStatus,
  setQuestionReviewStatus as setQuestionReviewStatusInProgress,
  setTaskProgressStatus,
} from "../utils/progress";
import type { FlashcardStatus, LearnerProgress, QuestionStatus, TaskStatus } from "../types";

const STORAGE_KEY = "rbt-practice-hub:v2:learner-progress";
const LEGACY_STORAGE_KEY = "rbt-practice-hub:v1:task-progress";

interface ProgressContextValue {
  progress: LearnerProgress;
  setTaskStatus: (taskNumber: number, status: TaskStatus) => void;
  setClientDemonstrated: (taskNumber: number, demonstrated: boolean) => void;
  markQuestionCorrect: (questionId: string) => void;
  markQuestionIncorrect: (questionId: string) => void;
  markQuestionNeedsReview: (questionId: string) => void;
  setQuestionReviewStatus: (questionId: string, needsReview: boolean) => void;
  markFlashcardKnown: (flashcardId: string) => void;
  markFlashcardNeedsReview: (flashcardId: string) => void;
  clearFlashcardStatus: (flashcardId: string) => void;
  markGuideOpened: (guideId: string) => void;
  markGuideReviewed: (guideId: string) => void;
  resetProgress: () => void;
  summary: ProgressSummary;
  clientDemonstrationSummary: ClientDemonstrationProgress;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function parseStoredProgress(value: string | null): LearnerProgress | null {
  if (!value) {
    return null;
  }

  try {
    return normalizeProgress(JSON.parse(value));
  } catch {
    return null;
  }
}

function loadProgress(): LearnerProgress {
  if (typeof window === "undefined") {
    return createInitialProgress();
  }

  const stored = parseStoredProgress(window.localStorage.getItem(STORAGE_KEY));
  if (stored) {
    return stored;
  }

  const legacy = parseStoredProgress(window.localStorage.getItem(LEGACY_STORAGE_KEY));
  if (legacy) {
    saveProgress(legacy);
    return legacy;
  }

  return createInitialProgress();
}

function saveProgress(progress: LearnerProgress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function persist(next: LearnerProgress, setProgress: Dispatch<SetStateAction<LearnerProgress>>) {
  saveProgress(next);
  setProgress(next);
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearnerProgress>(() => loadProgress());

  const value = useMemo<ProgressContextValue>(() => {
    function updateProgress(updater: (current: LearnerProgress) => LearnerProgress) {
      setProgress((current) => {
        const next = normalizeProgress(updater(current));
        saveProgress(next);
        return next;
      });
    }

    function setTaskStatus(taskNumber: number, status: TaskStatus) {
      updateProgress((current) => setTaskProgressStatus(current, taskNumber, status));
    }

    function setClientDemonstrated(taskNumber: number, demonstrated: boolean) {
      updateProgress((current) => setClientDemonstrationStatus(current, taskNumber, demonstrated));
    }

    function markQuestionCorrect(questionId: string) {
      updateProgress((current) => markQuestionCorrectInProgress(current, questionId));
    }

    function markQuestionIncorrect(questionId: string) {
      updateProgress((current) => markQuestionIncorrectInProgress(current, questionId));
    }

    function markQuestionNeedsReview(questionId: string) {
      updateProgress((current) => markQuestionNeedsReviewInProgress(current, questionId));
    }

    function setQuestionReviewStatus(questionId: string, needsReview: boolean) {
      updateProgress((current) => setQuestionReviewStatusInProgress(current, questionId, needsReview));
    }

    function markFlashcardKnown(flashcardId: string) {
      updateProgress((current) => markFlashcardKnownInProgress(current, flashcardId));
    }

    function markFlashcardNeedsReview(flashcardId: string) {
      updateProgress((current) => markFlashcardNeedsReviewInProgress(current, flashcardId));
    }

    function clearFlashcardStatus(flashcardId: string) {
      updateProgress((current) => clearFlashcardStatusInProgress(current, flashcardId));
    }

    function markGuideOpened(guideId: string) {
      updateProgress((current) => markGuideOpenedInProgress(current, guideId));
    }

    function markGuideReviewed(guideId: string) {
      updateProgress((current) => markGuideReviewedInProgress(current, guideId));
    }

    function resetProgress() {
      persist(createInitialProgress(), setProgress);
    }

    return {
      progress,
      setTaskStatus,
      setClientDemonstrated,
      markQuestionCorrect,
      markQuestionIncorrect,
      markQuestionNeedsReview,
      setQuestionReviewStatus,
      markFlashcardKnown,
      markFlashcardNeedsReview,
      clearFlashcardStatus,
      markGuideOpened,
      markGuideReviewed,
      resetProgress,
      summary: calculateProgress(progress),
      clientDemonstrationSummary: calculateClientDemonstrationProgress(progress),
    };
  }, [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return value;
}

export type { FlashcardStatus, QuestionStatus };

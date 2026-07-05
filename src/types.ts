export type CompetencySection =
  | "Measurement"
  | "Assessment"
  | "Skill Acquisition and Behavior Reduction"
  | "Professionalism and Requirements";

export type AssessmentType = "With Client" | "Role-Play" | "Interview";

export type TaskStatus = "ready" | "not-ready" | "needs-review" | "not-started";
export type FlashcardStatus = "known" | "needs-review" | "not-started";
export type QuestionStatus = "correct" | "incorrect" | "not-started";
export type Difficulty = "intro" | "core" | "challenge";
export type CardType =
  | "term"
  | "scenario"
  | "example-nonexample"
  | "memory-aid"
  | "applied-choice"
  | "wrong-answer-boundary"
  | "definition"
  | "procedure"
  | "comparison"
  | "self-check";
export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "scenario-choice"
  | "select-best-measurement"
  | "identify-nonexample"
  | "short-applied"
  | "select-all";

export interface CompetencyTask {
  id: string;
  taskNumber: number;
  title: string;
  officialDescription: string;
  section: CompetencySection;
  assessmentTypes: AssessmentType[];
  requiresClientTracking: boolean;
  tags: string[];
  shortLearnerSummary: string;
  options?: string[];
}

export type ProgressByTask = Record<number, TaskStatus>;

export interface QuestionAttemptRecord {
  result: "correct" | "incorrect";
  at: string;
}

export interface QuestionAttemptHistory {
  correctCount: number;
  incorrectCount: number;
  attempts: QuestionAttemptRecord[];
}

export interface FlashcardAttemptRecord {
  result: "known" | "needs-review";
  at: string;
}

export interface FlashcardAttemptHistory {
  knownCount: number;
  needsReviewCount: number;
  attempts: FlashcardAttemptRecord[];
}

export interface GuideActivity {
  openedCount: number;
  reviewedCount: number;
  openedAt: string[];
  reviewedAt: string[];
  reviewed: boolean;
}

export interface Flashcard {
  id: string;
  taskNumber: number;
  section: CompetencySection;
  front: string;
  back: string;
  cardType: CardType;
  assessmentTypes: AssessmentType[];
  explanation: string;
  memoryAid: string;
  tags: string[];
  difficulty: Difficulty;
}

export interface QuestionChoice {
  id: string;
  text: string;
}

export interface DistractorExplanation {
  whyNotCorrectHere: string;
  whenWouldBeCorrect: string;
}

export type DistractorExplanations = Record<string, DistractorExplanation>;

export interface AnswerExplanation {
  id: string;
  questionId: string;
  correctAnswerExplanation: string;
  distractorExplanations: DistractorExplanations;
  teachingPoint: string;
  relatedTaskNumbers: number[];
}

export interface PracticeQuestion {
  id: string;
  taskNumber: number;
  section: CompetencySection;
  questionType: QuestionType;
  prompt: string;
  choices: QuestionChoice[];
  correctAnswer: string | string[];
  explanation: string;
  distractorExplanations: DistractorExplanations;
  scenario: string;
  assessmentTypes: AssessmentType[];
  difficulty: Difficulty;
  tags: string[];
}

export interface MemoryAid {
  id: string;
  title: string;
  section: CompetencySection;
  taskNumbers: number[];
  cue: string;
  details: string;
  tags: string[];
}

export interface StudyGuideSection {
  id: string;
  title: string;
  section: CompetencySection;
  taskNumbers: number[];
  overview: string;
  studyGoal: string;
  keyConcepts: string[];
  practiceFocus: string[];
  commonMixUps: string[];
  taskGuides: StudyGuideTask[];
  sourceNote: string;
  tags: string[];
}

export interface StudyGuideTask {
  taskNumber: number;
  title: string;
  learnerGoal: string;
  keyIdeas: string[];
  examples: string[];
  nonExamples: string[];
  practicePrompt: string;
  quickCheck: string;
}

export interface LearnerProgress {
  version: 1;
  tasks: ProgressByTask;
  flashcards: Record<string, FlashcardStatus>;
  flashcardAttempts: Record<string, FlashcardAttemptHistory>;
  questions: Record<string, QuestionStatus>;
  questionAttempts: Record<string, QuestionAttemptHistory>;
  questionReviews: Record<string, boolean>;
  guideActivity: Record<string, GuideActivity>;
  clientDemonstrations: Record<number, boolean>;
}

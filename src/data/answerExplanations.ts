import { practiceQuestions } from "./practiceQuestions";
import type { AnswerExplanation } from "../types";

export const answerExplanations: AnswerExplanation[] = practiceQuestions.map((question) => ({
  id: `answer-${question.id}`,
  questionId: question.id,
  correctAnswerExplanation: question.explanation,
  distractorExplanations: question.distractorExplanations,
  teachingPoint: question.explanation,
  relatedTaskNumbers: [question.taskNumber],
}));

export const answerExplanationsByQuestionId = Object.fromEntries(
  answerExplanations.map((answerExplanation) => [answerExplanation.questionId, answerExplanation]),
) as Record<string, AnswerExplanation>;

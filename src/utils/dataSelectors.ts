import { competencyTasks } from "../data/competencyTasks";
import { flashcards } from "../data/flashcards";
import { practiceQuestions } from "../data/practiceQuestions";
import type { CompetencySection, CompetencyTask, Flashcard, PracticeQuestion } from "../types";

export function getTasksBySection(section: CompetencySection, tasks: CompetencyTask[] = competencyTasks) {
  return tasks.filter((task) => task.section === section);
}

export function getFlashcardsByTask(taskNumber: number, cards: Flashcard[] = flashcards) {
  return cards.filter((card) => card.taskNumber === taskNumber);
}

export function getQuestionsByTask(taskNumber: number, questions: PracticeQuestion[] = practiceQuestions) {
  return questions.filter((question) => question.taskNumber === taskNumber);
}

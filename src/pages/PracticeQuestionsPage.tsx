import { ChevronLeft, ChevronRight, ClipboardList, Flag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { sectionOrder } from "../data/competencyTasks";
import { practiceQuestions } from "../data/practiceQuestions";
import { PageHeader } from "../components/ui/PageHeader";
import { useProgress } from "../state/ProgressContext";
import type { CompetencySection, Difficulty, PracticeQuestion, QuestionChoice, QuestionStatus, QuestionType } from "../types";

const questionTypeLabels: Record<QuestionType, string> = {
  "identify-nonexample": "Identify the nonexample",
  "multiple-choice": "Multiple choice",
  "scenario-choice": "Scenario",
  "select-all": "Select all",
  "select-best-measurement": "Select best system",
  "short-applied": "Short applied",
  "true-false": "True / false",
};

const statusLabels: Record<QuestionStatus, string> = {
  correct: "Correct",
  incorrect: "Missed",
  "not-started": "Not started",
};

const difficultyLabels: Record<Difficulty, string> = {
  challenge: "Challenge",
  core: "Core",
  intro: "Intro",
};

const taskNumbers = Array.from(new Set(practiceQuestions.map((question) => question.taskNumber))).sort((a, b) => a - b);
const difficulties = Array.from(new Set(practiceQuestions.map((question) => question.difficulty))).sort();
const sections = sectionOrder.filter((section) => practiceQuestions.some((question) => question.section === section));

const acronymExpansions: Array<[RegExp, string]> = [
  [/\bABA\b/g, "Applied Behavior Analysis (ABA)"],
  [/\bBACB\b/g, "Behavior Analyst Certification Board (BACB)"],
  [/\bRBT\b/g, "Registered Behavior Technician (RBT)"],
  [/\bBCBA\b/g, "Board Certified Behavior Analyst (BCBA)"],
  [/\bBCaBA\b/g, "Board Certified Assistant Behavior Analyst (BCaBA)"],
  [/\bDTT\b/g, "Discrete-Trial Teaching (DTT)"],
  [/\bIRT\b/g, "Interresponse Time (IRT)"],
  [/\bMTS\b/g, "Momentary Time Sampling (MTS)"],
  [/\bMSWO\b/g, "Multiple Stimulus Without Replacement (MSWO)"],
  [/\bMSW\b/g, "Multiple Stimulus With Replacement (MSW)"],
  [/\bNCR\b/g, "Noncontingent Reinforcement (NCR)"],
  [/\bOTR\b/g, "Opportunities to Respond (OTR)"],
  [/\bDRA\b/g, "Differential Reinforcement of Alternative Behavior (DRA)"],
  [/\bDRI\b/g, "Differential Reinforcement of Incompatible Behavior (DRI)"],
  [/\bDRO\b/g, "Differential Reinforcement of Other Behavior (DRO)"],
  [/\bDRH\b/g, "Differential Reinforcement of High Rates (DRH)"],
  [/\bDRL\b/g, "Differential Reinforcement of Low Rates (DRL)"],
  [/\bSD\b/g, "Discriminative Stimulus (SD)"],
];

interface QuestionFilters {
  taskFilter: number | "all";
  sectionFilter: CompetencySection | "all";
  difficultyFilter: Difficulty | "all";
  missedOnly: boolean;
}

interface DisplayChoice {
  choice: QuestionChoice;
  displayId: string;
}

function hashString(value: string) {
  return value.split("").reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0);
}

function displayChoiceLabel(index: number) {
  return String.fromCharCode(97 + index);
}

function expandAcronyms(text: string) {
  return acronymExpansions.reduce((expanded, [pattern, replacement]) => {
    const escapedReplacement = replacement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const alreadyExpanded = new RegExp(escapedReplacement, "i");
    return alreadyExpanded.test(expanded) ? expanded : expanded.replace(pattern, replacement);
  }, text);
}

function getDisplayChoices(question: PracticeQuestion): DisplayChoice[] {
  const choices = question.choices.map((choice) => ({ ...choice }));
  let seed = hashString(question.id);

  for (let index = choices.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapIndex = seed % (index + 1);
    [choices[index], choices[swapIndex]] = [choices[swapIndex], choices[index]];
  }

  return choices.map((choice, index) => ({
    choice,
    displayId: displayChoiceLabel(index),
  }));
}

function answerText(question: PracticeQuestion, displayChoices: DisplayChoice[]) {
  return choiceText(correctAnswerIds(question), displayChoices);
}

function choiceText(choiceIds: string[], displayChoices: DisplayChoice[]) {
  return choiceIds
    .map((answerId) => {
      const displayChoice = displayChoices.find((item) => item.choice.id === answerId);
      return displayChoice ? `${displayChoice.displayId.toUpperCase()}. ${expandAcronyms(displayChoice.choice.text)}` : answerId.toUpperCase();
    })
    .join("; ");
}

function isCorrectChoice(question: PracticeQuestion, choiceId: string) {
  return Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(choiceId) : question.correctAnswer === choiceId;
}

function correctAnswerIds(question: PracticeQuestion) {
  return Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
}

function answersMatch(selectedChoiceIds: string[], correctChoiceIds: string[]) {
  if (selectedChoiceIds.length !== correctChoiceIds.length) {
    return false;
  }

  const selected = [...selectedChoiceIds].sort();
  const correct = [...correctChoiceIds].sort();
  return selected.every((choiceId, index) => choiceId === correct[index]);
}

function matchesQuestion(
  question: PracticeQuestion,
  filters: QuestionFilters,
  questionProgress: Record<string, QuestionStatus>,
) {
  const status = questionProgress[question.id] ?? "not-started";

  return (
    (filters.taskFilter === "all" || question.taskNumber === filters.taskFilter) &&
    (filters.sectionFilter === "all" || question.section === filters.sectionFilter) &&
    (filters.difficultyFilter === "all" || question.difficulty === filters.difficultyFilter) &&
    (!filters.missedOnly || status === "incorrect")
  );
}

function shouldIgnoreQuestionArrowTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"], [role="textbox"], [role="combobox"], [role="listbox"], [role="slider"]'),
  );
}

export function PracticeQuestionsPage() {
  const { markQuestionCorrect, markQuestionIncorrect, markQuestionNeedsReview, progress, summary } = useProgress();
  const location = useLocation();
  const initialSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const questionPanelRef = useRef<HTMLElement | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>(
    () => initialSearchParams.get("question") ?? practiceQuestions[0]?.id,
  );
  const [taskFilter, setTaskFilter] = useState<number | "all">("all");
  const [sectionFilter, setSectionFilter] = useState<CompetencySection | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [missedOnly, setMissedOnly] = useState(() => initialSearchParams.get("review") === "missed");
  const [draftAnswersByQuestion, setDraftAnswersByQuestion] = useState<Record<string, string[]>>({});
  const [checkedAnswersByQuestion, setCheckedAnswersByQuestion] = useState<Record<string, string[]>>({});

  const filters = useMemo<QuestionFilters>(
    () => ({ difficultyFilter, missedOnly, sectionFilter, taskFilter }),
    [difficultyFilter, missedOnly, sectionFilter, taskFilter],
  );

  const filteredQuestions = useMemo(
    () => practiceQuestions.filter((question) => matchesQuestion(question, filters, progress.questions)),
    [filters, progress.questions],
  );

  function scrollToQuestionPanel() {
    window.requestAnimationFrame(() => {
      questionPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function firstQuestionFor(nextFilters: QuestionFilters) {
    return practiceQuestions.find((question) => matchesQuestion(question, nextFilters, progress.questions));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const requestedQuestionId = searchParams.get("question");
    const requestedTask = Number(searchParams.get("task"));

    if (searchParams.get("review") === "missed") {
      setTaskFilter("all");
      setSectionFilter("all");
      setDifficultyFilter("all");
      setMissedOnly(true);
    }

    if (taskNumbers.includes(requestedTask)) {
      setTaskFilter(requestedTask);
      setSelectedQuestionId(firstQuestionFor({ difficultyFilter, missedOnly, sectionFilter: "all", taskFilter: requestedTask })?.id);
      scrollToQuestionPanel();
    }

    if (requestedQuestionId && practiceQuestions.some((question) => question.id === requestedQuestionId)) {
      setSelectedQuestionId(requestedQuestionId);
    }
  }, [location.search]);

  useEffect(() => {
    if (filteredQuestions.length === 0) {
      setSelectedQuestionId(undefined);
      return;
    }

    if (!filteredQuestions.some((question) => question.id === selectedQuestionId)) {
      setSelectedQuestionId(filteredQuestions[0].id);
    }
  }, [filteredQuestions, selectedQuestionId]);

  const selectedQuestion = filteredQuestions.find((question) => question.id === selectedQuestionId) ?? filteredQuestions[0];
  const selectedIndex = selectedQuestion ? filteredQuestions.findIndex((question) => question.id === selectedQuestion.id) : -1;
  const selectedDisplayChoices = useMemo(() => (selectedQuestion ? getDisplayChoices(selectedQuestion) : []), [selectedQuestion]);
  const selectedChoiceIds = selectedQuestion ? draftAnswersByQuestion[selectedQuestion.id] ?? [] : [];
  const checkedChoiceIds = selectedQuestion ? checkedAnswersByQuestion[selectedQuestion.id] : undefined;
  const answerChecked = Boolean(checkedChoiceIds);
  const displayedChoiceIds = checkedChoiceIds ?? selectedChoiceIds;
  const checkedAnswerIsCorrect =
    selectedQuestion && checkedChoiceIds ? answersMatch(checkedChoiceIds, correctAnswerIds(selectedQuestion)) : false;
  const selectedQuestionStatus = selectedQuestion ? progress.questions[selectedQuestion.id] ?? "not-started" : "not-started";
  const selectedQuestionMarkedForReview = selectedQuestion ? progress.questionReviews[selectedQuestion.id] ?? false : false;
  const selectedQuestionNeedsManualCheck = selectedQuestion?.questionType === "select-all";

  function goToQuestion(nextIndex: number) {
    const nextQuestion = filteredQuestions[nextIndex];
    if (!nextQuestion) {
      return;
    }

    setSelectedQuestionId(nextQuestion.id);
  }

  useEffect(() => {
    function handleQuestionArrowNavigation(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        shouldIgnoreQuestionArrowTarget(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && selectedIndex > 0) {
        event.preventDefault();
        goToQuestion(selectedIndex - 1);
      }

      if (event.key === "ArrowRight" && selectedIndex < filteredQuestions.length - 1) {
        event.preventDefault();
        goToQuestion(selectedIndex + 1);
      }
    }

    window.addEventListener("keydown", handleQuestionArrowNavigation);
    return () => window.removeEventListener("keydown", handleQuestionArrowNavigation);
  }, [filteredQuestions, selectedIndex]);

  function updateTaskFilter(nextTaskFilter: number | "all", shouldScroll = true) {
    const nextFilters: QuestionFilters = { ...filters, taskFilter: nextTaskFilter };
    setTaskFilter(nextTaskFilter);
    setSelectedQuestionId(firstQuestionFor(nextFilters)?.id);

    if (nextTaskFilter !== "all" && shouldScroll) {
      scrollToQuestionPanel();
    }
  }

  function clearFilters() {
    setTaskFilter("all");
    setSectionFilter("all");
    setDifficultyFilter("all");
    setMissedOnly(false);
  }

  function selectChoice(question: PracticeQuestion, choiceId: string) {
    if (checkedAnswersByQuestion[question.id]) {
      return;
    }

    if (question.questionType !== "select-all") {
      recordAnswer(question, [choiceId]);
      return;
    }

    setDraftAnswersByQuestion((current) => {
      const currentChoiceIds = current[question.id] ?? [];
      const nextChoiceIds = currentChoiceIds.includes(choiceId)
        ? currentChoiceIds.filter((currentChoiceId) => currentChoiceId !== choiceId)
        : [...currentChoiceIds, choiceId];

      return {
        ...current,
        [question.id]: nextChoiceIds,
      };
    });
  }

  function recordAnswer(question: PracticeQuestion, choiceIds: string[]) {
    const selectedChoiceIdsForCheck = [...choiceIds];
    const isCorrect = answersMatch(selectedChoiceIdsForCheck, correctAnswerIds(question));

    setDraftAnswersByQuestion((current) => ({
      ...current,
      [question.id]: selectedChoiceIdsForCheck,
    }));

    setCheckedAnswersByQuestion((current) => ({
      ...current,
      [question.id]: selectedChoiceIdsForCheck,
    }));

    if (isCorrect) {
      markQuestionCorrect(question.id);
    } else {
      markQuestionIncorrect(question.id);
    }
  }

  function checkSelectedAnswer() {
    if (!selectedQuestion || selectedChoiceIds.length === 0) {
      return;
    }

    recordAnswer(selectedQuestion, selectedChoiceIds);
  }

  function resetSelectedAnswer() {
    if (!selectedQuestion) {
      return;
    }

    setDraftAnswersByQuestion((current) => {
      const next = { ...current };
      delete next[selectedQuestion.id];
      return next;
    });
    setCheckedAnswersByQuestion((current) => {
      const next = { ...current };
      delete next[selectedQuestion.id];
      return next;
    });
  }

  function markSelectedForReview() {
    if (!selectedQuestion) {
      return;
    }

    markQuestionNeedsReview(selectedQuestion.id);
  }

  return (
    <section className="page">
      <PageHeader title="Practice Questions">
        {practiceQuestions.length} original questions are loaded for tasks {taskNumbers[0]}-{taskNumbers[taskNumbers.length - 1]}.
      </PageHeader>

      <div className="practice-status-strip" aria-label="Practice question summary">
        <span>
          <strong>{filteredQuestions.length}</strong> filtered
        </span>
        <span>
          <strong>{selectedIndex + 1 > 0 ? selectedIndex + 1 : 0}</strong> current
        </span>
        <span>
          <strong>{summary.questionsCorrect}</strong> correct
        </span>
        <span>
          <strong>{summary.questionsIncorrect}</strong> missed
        </span>
        <span>
          <strong>{summary.questionsNeedsReview}</strong> review
        </span>
      </div>

      <div className="practice-toolbar simple-practice-toolbar" aria-label="Practice question filters">
        <label>
          <span>Task</span>
          <select
            value={taskFilter}
            onChange={(event) => updateTaskFilter(event.target.value === "all" ? "all" : Number(event.target.value))}
          >
            <option value="all">All tasks</option>
            {taskNumbers.map((taskNumber) => (
              <option value={taskNumber} key={taskNumber}>
                Task {taskNumber}
              </option>
            ))}
          </select>
        </label>
        <label className="question-picker-control">
          <span>Question</span>
          <select
            value={selectedQuestion?.id ?? ""}
            onChange={(event) => {
              setSelectedQuestionId(event.target.value || undefined);
              scrollToQuestionPanel();
            }}
            disabled={filteredQuestions.length === 0}
          >
            {filteredQuestions.map((question, index) => (
              <option value={question.id} key={question.id}>
                {index + 1}. Task {question.taskNumber} - {questionTypeLabels[question.questionType]}
              </option>
            ))}
          </select>
        </label>
        <label className="missed-toggle">
          <input type="checkbox" checked={missedOnly} onChange={(event) => setMissedOnly(event.target.checked)} />
          <span>Missed questions only</span>
        </label>
        <button className="filter-clear-button" type="button" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <details className="advanced-practice-filters">
        <summary>More filters</summary>
        <div>
          <label>
            <span>Section</span>
            <select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value as CompetencySection | "all")}>
              <option value="all">All sections</option>
              {sections.map((section) => (
                <option value={section} key={section}>
                  {section}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Difficulty</span>
            <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value as Difficulty | "all")}>
              <option value="all">All difficulties</option>
              {difficulties.map((difficulty) => (
                <option value={difficulty} key={difficulty}>
                  {difficultyLabels[difficulty]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </details>

      <div className="practice-session-layout">
        {selectedQuestion ? (
          <section className="question-panel question-panel-wide" aria-label="Selected practice question" ref={questionPanelRef}>
            <div className="question-panel-header">
              <ClipboardList size={24} aria-hidden="true" />
              <span>
                {selectedIndex + 1} / {filteredQuestions.length} filtered · {summary.questionsCorrect} correct ·{" "}
                {summary.questionsIncorrect} missed
              </span>
            </div>
            <div className="question-meta">
              <span>Task {selectedQuestion.taskNumber}</span>
              <span>{selectedQuestion.section}</span>
              <span>{questionTypeLabels[selectedQuestion.questionType]}</span>
              <span>{difficultyLabels[selectedQuestion.difficulty]}</span>
              <span>{statusLabels[selectedQuestionStatus]}</span>
              {selectedQuestionMarkedForReview ? <span>Marked for review</span> : null}
            </div>
            <p className="scenario-text">{expandAcronyms(selectedQuestion.scenario)}</p>
            <h2>{expandAcronyms(selectedQuestion.prompt)}</h2>
            <ol className="choice-list">
              {selectedDisplayChoices.map(({ choice, displayId }) => {
                const choiceSelected = displayedChoiceIds.includes(choice.id);
                const choiceIsCorrect = isCorrectChoice(selectedQuestion, choice.id);
                const choiceClassName = [
                  choiceSelected ? "is-selected-choice" : "",
                  answerChecked && choiceIsCorrect ? "is-correct-choice" : "",
                  answerChecked && choiceSelected && !choiceIsCorrect ? "is-incorrect-choice" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <li className={choiceClassName || undefined} key={choice.id}>
                    <button
                      className="choice-option-button"
                      type="button"
                      onClick={() => selectChoice(selectedQuestion, choice.id)}
                      aria-pressed={choiceSelected}
                      disabled={answerChecked}
                    >
                      <strong>{displayId.toUpperCase()}.</strong>
                      <span>{expandAcronyms(choice.text)}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            {answerChecked && checkedChoiceIds ? (
              <div className="answer-panel" aria-live="polite">
                <p className={checkedAnswerIsCorrect ? "answer-result is-correct" : "answer-result is-incorrect"}>
                  {checkedAnswerIsCorrect ? "Correct" : "Not correct"}
                </p>
                <h3>Your answer</h3>
                <p>{choiceText(checkedChoiceIds, selectedDisplayChoices)}</p>
                <h3>Correct answer</h3>
                <p>{answerText(selectedQuestion, selectedDisplayChoices)}</p>
                <h3>Why it is correct</h3>
                <p>{expandAcronyms(selectedQuestion.explanation)}</p>
                <h4>Why the other answers are not correct here</h4>
                <ul>
                  {selectedDisplayChoices
                    .filter(({ choice }) => selectedQuestion.distractorExplanations[choice.id])
                    .map(({ choice, displayId }) => {
                      const explanation = selectedQuestion.distractorExplanations[choice.id];
                      return (
                        <li key={choice.id}>
                          <strong>{displayId.toUpperCase()}:</strong> {expandAcronyms(explanation.whyNotCorrectHere)}{" "}
                          <em>When it would be correct:</em> {expandAcronyms(explanation.whenWouldBeCorrect)}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : null}
            <div className="card-controls" aria-label="Practice question controls">
              <button type="button" onClick={() => goToQuestion(selectedIndex - 1)} disabled={selectedIndex <= 0}>
                <ChevronLeft size={18} aria-hidden="true" />
                Previous
              </button>
              <button type="button" onClick={() => goToQuestion(selectedIndex + 1)} disabled={selectedIndex >= filteredQuestions.length - 1}>
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={markSelectedForReview}>
                <Flag size={16} aria-hidden="true" />
                {selectedQuestionMarkedForReview ? "Marked for Review" : "Mark for Review"}
              </button>
              {answerChecked ? (
                <button type="button" onClick={resetSelectedAnswer}>
                  Try Again
                </button>
              ) : !selectedQuestionNeedsManualCheck ? (
                <button type="button" disabled>
                  Select an Answer
                </button>
              ) : (
                <button type="button" onClick={checkSelectedAnswer} disabled={selectedChoiceIds.length === 0}>
                  Check Answer
                </button>
              )}
            </div>
          </section>
        ) : (
          <div className="placeholder-panel">
            <ClipboardList size={46} aria-hidden="true" />
            <h2>No questions match the current filters</h2>
            <p>Clear filters or turn off missed-only review to return to the full question bank.</p>
          </div>
        )}
      </div>
    </section>
  );
}

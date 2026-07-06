import { ClipboardList, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { sectionOrder } from "../data/competencyTasks";
import { flashcards } from "../data/flashcards";
import { practiceQuestions } from "../data/practiceQuestions";
import { studyGuideSections } from "../data/studyGuideSections";
import { useProgress } from "../state/ProgressContext";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";

function formatTimestamp(timestamp: string | undefined) {
  if (!timestamp) {
    return "No attempts yet";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function ProgressReviewPage() {
  const { clientDemonstrationSummary, progress, summary, resetProgress } = useProgress();
  const retryQuestions = useMemo(
    () => practiceQuestions.filter((question) => progress.questions[question.id] === "incorrect" || progress.questionReviews[question.id]),
    [progress.questionReviews, progress.questions],
  );
  const recentQuestionAttempt = useMemo(
    () =>
      Object.values(progress.questionAttempts)
        .flatMap((history) => history.attempts)
        .sort((first, second) => second.at.localeCompare(first.at))[0],
    [progress.questionAttempts],
  );
  const recentFlashcardAttempt = useMemo(
    () =>
      Object.values(progress.flashcardAttempts)
        .flatMap((history) => history.attempts)
        .sort((first, second) => second.at.localeCompare(first.at))[0],
    [progress.flashcardAttempts],
  );
  const guideActivityEntries = useMemo(
    () =>
      studyGuideSections.map((section) => ({
        id: section.id,
        title: section.title,
        activity: progress.guideActivity[section.id],
      })),
    [progress.guideActivity],
  );
  const fullGuideActivity = progress.guideActivity["full-guide"];

  function confirmResetProgress() {
    const confirmed = window.confirm(
      "Reset all local practice progress? This clears task statuses, flashcard marks, question history, and client-demonstration tracking in this browser.",
    );

    if (confirmed) {
      resetProgress();
    }
  }

  return (
    <section className="page">
      <PageHeader title="Progress / Review">
        Local practice-readiness progress is stored in this browser. This is not an official competency decision.
      </PageHeader>
      <div className="progress-review-grid">
        <section className="panel">
          <h2>Overall practice readiness</h2>
          <strong className="large-stat">{summary.percentReady}%</strong>
          <ProgressBar value={summary.percentReady} />
          <p>
            {summary.ready} of {summary.total} tasks marked practice ready.
          </p>
        </section>
        <section className="panel">
          <h2>Status counts</h2>
          <dl className="status-counts stacked">
            <div>
              <dt>Practice ready</dt>
              <dd>{summary.ready}</dd>
            </div>
            <div>
              <dt>Not ready</dt>
              <dd>{summary.notReady}</dd>
            </div>
            <div>
              <dt>Needs review</dt>
              <dd>{summary.needsReview}</dd>
            </div>
            <div>
              <dt>Not started</dt>
              <dd>{summary.notStarted}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="panel">
        <h2>Practice readiness by section</h2>
        <div className="section-progress-list">
          {sectionOrder.map((section) => {
            const sectionSummary = summary.bySection[section];
            const percent = Math.round((sectionSummary.ready / sectionSummary.total) * 100);
            return (
              <div className="section-progress-row" key={section}>
                <span>{section}</span>
                <strong>
                  {sectionSummary.ready} / {sectionSummary.total}
                </strong>
                <ProgressBar value={percent} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <h2>Client demonstration tracking</h2>
        <strong className="large-stat">
          {clientDemonstrationSummary.demonstrated} / {clientDemonstrationSummary.required}
        </strong>
        <ProgressBar value={clientDemonstrationSummary.percentComplete} />
        <p>
          Tasks 6-14 eligible for client tracking: {clientDemonstrationSummary.eligibleTaskNumbers.join(", ")}.
        </p>
        <p>Reminder: three of tasks 6-14 must be demonstrated with a client for the official assessment packet.</p>
        <p>
          Demonstrated with client:{" "}
          {clientDemonstrationSummary.demonstratedTaskNumbers.length > 0
            ? clientDemonstrationSummary.demonstratedTaskNumbers.join(", ")
            : "none marked yet"}.
        </p>
      </section>

      <section className="panel">
        <h2>Practice question progress</h2>
        <dl className="status-counts stacked">
          <div>
            <dt>Correct</dt>
            <dd>{summary.questionsCorrect}</dd>
          </div>
          <div>
            <dt>Incorrect</dt>
            <dd>{summary.questionsIncorrect}</dd>
          </div>
          <div>
            <dt>Marked for review</dt>
            <dd>{summary.questionsNeedsReview}</dd>
          </div>
          <div>
            <dt>Total correct attempts</dt>
            <dd>{summary.questionCorrectAttempts}</dd>
          </div>
          <div>
            <dt>Total incorrect attempts</dt>
            <dd>{summary.questionIncorrectAttempts}</dd>
          </div>
          <div>
            <dt>Latest question attempt</dt>
            <dd>{formatTimestamp(recentQuestionAttempt?.at)}</dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <h2>Flashcard review history</h2>
        <dl className="status-counts stacked">
          <div>
            <dt>Known cards</dt>
            <dd>{summary.flashcardsKnown}</dd>
          </div>
          <div>
            <dt>Needs-review cards</dt>
            <dd>{summary.flashcardsNeedsReview}</dd>
          </div>
          <div>
            <dt>Known marks</dt>
            <dd>{summary.flashcardKnownAttempts}</dd>
          </div>
          <div>
            <dt>Needs-review marks</dt>
            <dd>{summary.flashcardNeedsReviewAttempts}</dd>
          </div>
          <div>
            <dt>Latest flashcard mark</dt>
            <dd>{formatTimestamp(recentFlashcardAttempt?.at)}</dd>
          </div>
        </dl>
        <p className="panel-note">{flashcards.length} cards are available in the local deck.</p>
      </section>

      <section className="panel">
        <h2>Study guide activity</h2>
        <dl className="status-counts stacked">
          <div>
            <dt>Total guide opens</dt>
            <dd>{summary.guideOpens}</dd>
          </div>
          <div>
            <dt>Total reviewed marks</dt>
            <dd>{summary.guideReviews}</dd>
          </div>
          <div>
            <dt>Full HTML guide opens</dt>
            <dd>{fullGuideActivity?.openedCount ?? 0}</dd>
          </div>
        </dl>
        <div className="guide-activity-list" aria-label="Study guide section activity">
          {guideActivityEntries.map(({ id, title, activity }) => {
            const latestOpen = activity ? activity.openedAt[activity.openedAt.length - 1] : undefined;

            return (
              <div key={id}>
                <strong>{title}</strong>
                <span>
                  Opened {activity?.openedCount ?? 0} · Reviewed {activity?.reviewedCount ?? 0}
                </span>
                <small>Latest open: {formatTimestamp(latestOpen)}</small>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel missed-review-panel">
        <div className="review-panel-header">
          <div>
            <h2>Question retry</h2>
            <p>
              {retryQuestions.length > 0
                ? `${retryQuestions.length} incorrect or review question${retryQuestions.length === 1 ? "" : "s"} ready to retry.`
                : "No incorrect or review questions are currently marked."}
            </p>
          </div>
          <Link className="retry-link" to="/practice?review=missed">
            <ClipboardList size={18} aria-hidden="true" />
            Retry questions
          </Link>
        </div>
        {retryQuestions.length > 0 ? (
          <div className="missed-review-list">
            {retryQuestions.map((question) => (
              <Link
                className="missed-review-card"
                to={`/practice?review=missed&question=${question.id}`}
                key={question.id}
              >
                <span>
                  Task {question.taskNumber} · {question.difficulty}
                </span>
                <strong>{question.prompt}</strong>
                <small>{question.scenario}</small>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-review-state">
            <ClipboardList size={34} aria-hidden="true" />
            <p>Questions marked incorrect or flagged for review from the practice bank will appear here for focused retry.</p>
          </div>
        )}
      </section>

      <button className="reset-button" type="button" onClick={confirmResetProgress}>
        <RotateCcw size={18} aria-hidden="true" />
        Reset local progress
      </button>
    </section>
  );
}

import { AlertTriangle, BookOpen, Check, Circle, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { clientDemonstrationRule, sectionOrder, sectionRanges } from "../data/competencyTasks";
import { PageHeader } from "../components/ui/PageHeader";
import { useProgress } from "../state/ProgressContext";
import type { TaskStatus } from "../types";
import { getTasksBySection } from "../utils/dataSelectors";
import { calculateTaskPracticeSummaries } from "../utils/progress";
import { taskElementId, taskMapPath, taskPracticePath } from "../utils/taskNavigation";

const statusLabels: Record<TaskStatus, string> = {
  ready: "Practice ready",
  "not-ready": "In progress",
  "needs-review": "Needs review",
  "not-started": "Not attempted",
};

function renderStatusIcon(status: TaskStatus) {
  if (status === "ready") {
    return <Check size={15} aria-hidden="true" />;
  }

  if (status === "needs-review") {
    return <AlertTriangle size={15} aria-hidden="true" />;
  }

  if (status === "not-ready") {
    return <X size={15} aria-hidden="true" />;
  }

  return <Circle size={15} aria-hidden="true" />;
}

export function CompetencyMapPage() {
  const { clientDemonstrationSummary, progress, setClientDemonstrated } = useProgress();
  const location = useLocation();
  const targetTaskParam = new URLSearchParams(location.search).get("task");
  const targetTaskNumber = targetTaskParam ? Number(targetTaskParam) : undefined;
  const taskPracticeSummaries = useMemo(() => calculateTaskPracticeSummaries(progress), [progress]);

  useEffect(() => {
    if (!targetTaskNumber || !Number.isInteger(targetTaskNumber)) {
      return;
    }

    window.requestAnimationFrame(() => {
      const target = document.getElementById(taskElementId(targetTaskNumber));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      target?.focus({ preventScroll: true });
    });
  }, [targetTaskNumber]);

  return (
    <section className="page">
      <PageHeader title="Competency Map">
        Official task map structure with original learner-friendly summaries and status tracking.
      </PageHeader>

      <aside className="notice-panel">
        {clientDemonstrationRule} Current tracker: {clientDemonstrationSummary.demonstrated} of{" "}
        {clientDemonstrationSummary.required} required.
      </aside>

      <nav className="map-task-nav" aria-label="Jump to competency task">
        {sectionOrder.map((section) => (
          <div className="map-task-nav-section" key={section}>
            <span>{section}</span>
            <div>
              {getTasksBySection(section).map((task) => (
                <Link
                  className={targetTaskNumber === task.taskNumber ? "is-active" : undefined}
                  to={taskMapPath(task.taskNumber)}
                  aria-label={`Jump to task ${task.taskNumber}: ${task.title}`}
                  key={task.id}
                >
                  {task.taskNumber}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="task-map">
        {sectionOrder.map((section) => (
          <section className="map-section" key={section}>
            <div className="map-section-header">
              <h2>{section}</h2>
              <span>Tasks {sectionRanges[section]}</span>
            </div>
            <div className="task-table" role="table" aria-label={`${section} tasks`}>
              {getTasksBySection(section)
                .map((task) => {
                  const readinessStatus = progress.tasks[task.taskNumber];
                  const practiceSummary = taskPracticeSummaries[task.taskNumber];

                  return (
                    <article
                      className={targetTaskNumber === task.taskNumber ? "task-row is-targeted" : "task-row"}
                      id={taskElementId(task.taskNumber)}
                      tabIndex={-1}
                      key={task.id}
                    >
                      <Link
                        className="task-row-main task-practice-link"
                        to={taskPracticePath(task.taskNumber)}
                        aria-label={`Practice task ${task.taskNumber}: ${task.title}`}
                      >
                        <span className="task-id">{task.taskNumber}</span>
                        <div>
                          <h3>{task.title}</h3>
                          <p>{task.shortLearnerSummary}</p>
                          <p className="official-description">{task.officialDescription}</p>
                          {task.options ? (
                            <ul className="inline-options">
                              {task.options.map((option) => (
                                <li key={option}>{option}</li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </Link>
                      <div className="assessment-tags" aria-label={`Assessment options for task ${task.taskNumber}`}>
                        {task.assessmentTypes.map((type) => (
                          <span key={type}>{type}</span>
                        ))}
                        {task.requiresClientTracking ? (
                          <label className="client-check">
                            <input
                              type="checkbox"
                              checked={progress.clientDemonstrations[task.taskNumber] ?? false}
                              onChange={(event) => setClientDemonstrated(task.taskNumber, event.target.checked)}
                            />
                            Client tracked
                          </label>
                        ) : null}
                      </div>
                      <div className="task-readiness-panel" aria-label={`Practice-readiness evidence for task ${task.taskNumber}`}>
                        <span className={`task-readiness-status status-${readinessStatus}`}>
                          {renderStatusIcon(readinessStatus)}
                          {statusLabels[readinessStatus]}
                        </span>
                        <div className="task-readiness-metrics">
                          <span>
                            Questions <strong>{practiceSummary.correctQuestions}/{practiceSummary.totalQuestions}</strong>
                          </span>
                          <span>
                            Question passes <strong>{practiceSummary.questionPasses}/3</strong>
                          </span>
                          <span>
                            Flashcards <strong>{practiceSummary.knownFlashcards}/{practiceSummary.totalFlashcards}</strong>
                          </span>
                          <span>
                            Card passes <strong>{practiceSummary.flashcardPasses}/3</strong>
                          </span>
                          <span>
                            Practice days <strong>{practiceSummary.practiceDays}/5</strong>
                          </span>
                          <span>
                            Guide opens <strong>{practiceSummary.guideOpenedCount}/3</strong>
                          </span>
                        </div>
                        <Link className="task-guide-link" to={`/guide?section=${practiceSummary.guideId}`}>
                          <BookOpen size={15} aria-hidden="true" />
                          {practiceSummary.guideDone ? "Guide done" : `Open ${practiceSummary.guideTitle}`}
                        </Link>
                        <small>
                          {practiceSummary.idealReady
                            ? "3-pass and 5-day target complete."
                            : practiceSummary.autoReady
                              ? "Practice ready now; keep repeating toward 3 passes over 5 days."
                              : "Practice ready after all questions are correct and all flashcards are known."}
                        </small>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

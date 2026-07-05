import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { clientDemonstrationRule, sectionOrder, sectionRanges } from "../data/competencyTasks";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusSelect } from "../components/ui/StatusSelect";
import { useProgress } from "../state/ProgressContext";
import { getTasksBySection } from "../utils/dataSelectors";
import { taskElementId, taskMapPath, taskPracticePath } from "../utils/taskNavigation";

export function CompetencyMapPage() {
  const { clientDemonstrationSummary, progress, setClientDemonstrated, setTaskStatus } = useProgress();
  const location = useLocation();
  const targetTaskParam = new URLSearchParams(location.search).get("task");
  const targetTaskNumber = targetTaskParam ? Number(targetTaskParam) : undefined;

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
                .map((task) => (
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
                    <StatusSelect
                      value={progress.tasks[task.taskNumber]}
                      onChange={(status) => setTaskStatus(task.taskNumber, status)}
                      label={`Set practice-readiness status for task ${task.taskNumber}`}
                    />
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

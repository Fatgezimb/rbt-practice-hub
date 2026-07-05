import { AlertTriangle, Check, Circle, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { clientDemonstrationRule, sectionOrder, sectionRanges } from "../../data/competencyTasks";
import { practiceQuestions } from "../../data/practiceQuestions";
import { useProgress } from "../../state/ProgressContext";
import type { TaskStatus } from "../../types";
import { getTasksBySection } from "../../utils/dataSelectors";
import { taskPracticePath } from "../../utils/taskNavigation";

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  ready: <Check size={13} aria-hidden="true" />,
  "not-ready": <X size={13} aria-hidden="true" />,
  "needs-review": <AlertTriangle size={13} aria-hidden="true" />,
  "not-started": <Circle size={13} aria-hidden="true" />,
};

const statusLabels: Record<TaskStatus, string> = {
  ready: "Practice ready",
  "not-ready": "Not ready",
  "needs-review": "Needs review",
  "not-started": "Not started",
};

interface TaskSidebarProps {
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

interface TaskSidebarContentProps {
  onNavigate?: () => void;
  onToggleCollapsed?: () => void;
}

export function TaskSidebar({ collapsed = false, onToggleCollapsed }: TaskSidebarProps) {
  return (
    <aside className={collapsed ? "task-sidebar is-collapsed" : "task-sidebar"} aria-label="Competency task progress">
      {collapsed ? (
        <button
          className="sidebar-rail-button"
          type="button"
          onClick={onToggleCollapsed}
          aria-label="Show competency task sidebar"
          aria-expanded="false"
        >
          <PanelLeftOpen size={22} aria-hidden="true" />
          <span>Tasks</span>
        </button>
      ) : (
        <TaskSidebarContent onToggleCollapsed={onToggleCollapsed} />
      )}
    </aside>
  );
}

export function TaskSidebarContent({ onNavigate, onToggleCollapsed }: TaskSidebarContentProps) {
  const { progress } = useProgress();
  const questionProgressByTask = useMemo(
    () =>
      practiceQuestions.reduce<Record<number, { total: number; correct: number; incorrect: number; needsReview: number }>>((counts, question) => {
        const taskCounts = counts[question.taskNumber] ?? { total: 0, correct: 0, incorrect: 0, needsReview: 0 };
        const status = progress.questions[question.id] ?? "not-started";

        counts[question.taskNumber] = {
          total: taskCounts.total + 1,
          correct: taskCounts.correct + (status === "correct" ? 1 : 0),
          incorrect: taskCounts.incorrect + (status === "incorrect" ? 1 : 0),
          needsReview: taskCounts.needsReview + (progress.questionReviews[question.id] ? 1 : 0),
        };

        return counts;
      }, {}),
    [progress.questionReviews, progress.questions],
  );

  return (
    <div className="task-sidebar-content">
      <div className={onToggleCollapsed ? "sidebar-title-row is-collapsible" : "sidebar-title-row"}>
        <h2>Competency Tasks</h2>
        {onToggleCollapsed ? (
          <button
            className="sidebar-collapse-button"
            type="button"
            onClick={onToggleCollapsed}
            aria-label="Hide competency task sidebar"
            aria-expanded="true"
          >
            <PanelLeftClose size={20} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="status-legend" aria-label="Task status legend">
        {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
          <span className="status-legend-item" key={status}>
            <span className={`status-dot status-${status}`}>{statusIcons[status]}</span>
            {statusLabels[status]}
          </span>
        ))}
      </div>

      <nav className="task-list" aria-label="Tasks 1 through 19">
        {sectionOrder.map((section) => (
          <div className="task-section" key={section}>
            <h3>
              {section} <span>({sectionRanges[section]})</span>
            </h3>
            {getTasksBySection(section)
              .map((task) => {
                const status = progress.tasks[task.taskNumber];
                const questionCounts = questionProgressByTask[task.taskNumber];
                return (
                  <Link className="task-link" to={taskPracticePath(task.taskNumber)} onClick={onNavigate} key={task.id}>
                    <span className={`status-dot status-${status}`}>{statusIcons[status]}</span>
                    <span className="task-number">{task.taskNumber}</span>
                    <span className="task-copy">
                      <span className="task-title">{task.title}</span>
                      {questionCounts ? (
                        <span className="question-sidebar-progress">
                          <span className="question-progress-pill is-correct">
                            <Check size={12} aria-hidden="true" />
                            {questionCounts.correct}
                            <span className="sr-only"> correct</span>
                          </span>
                          <span className="question-progress-pill is-missed">
                            <X size={12} aria-hidden="true" />
                            {questionCounts.incorrect}
                            <span className="sr-only"> missed</span>
                          </span>
                          {questionCounts.needsReview > 0 ? (
                            <span className="question-progress-pill is-review">
                              <AlertTriangle size={12} aria-hidden="true" />
                              {questionCounts.needsReview}
                              <span className="sr-only"> marked for review</span>
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      <div className="client-rule-card">{clientDemonstrationRule}</div>
    </div>
  );
}

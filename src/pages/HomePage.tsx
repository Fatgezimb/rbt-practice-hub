import { ArrowRight, BookOpen, FileText, Layers3, Lightbulb, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { clientDemonstrationRule, sectionOrder, sectionRanges } from "../data/competencyTasks";
import { flashcards } from "../data/flashcards";
import { memoryAids } from "../data/memoryAids";
import { practiceQuestions } from "../data/practiceQuestions";
import { studyAssets } from "../data/studyAssets";
import { useProgress } from "../state/ProgressContext";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";

export function HomePage() {
  const { clientDemonstrationSummary, summary } = useProgress();

  return (
    <section className="page">
      <div className="dashboard-hero">
        <PageHeader title="Practice Readiness Dashboard">
          Use this hub to organize practice across the 19 initial competency assessment tasks.
        </PageHeader>
        <div className="summary-card">
          <strong>
            {summary.ready} of {summary.total} tasks practice ready
          </strong>
          <ProgressBar value={summary.percentReady} />
          <span>{summary.percentReady}% practice readiness</span>
        </div>
      </div>

      <div className="metric-grid">
        <Link className="metric-card" to="/flashcards">
          <Layers3 aria-hidden="true" />
          <strong>{studyAssets.flashcardCount}</strong>
          <span>{flashcards.length} seed cards loaded</span>
        </Link>
        <Link className="metric-card" to="/practice">
          <MessageSquareText aria-hidden="true" />
          <strong>{studyAssets.questionBankLabel}</strong>
          <span>{practiceQuestions.length} seed questions loaded</span>
        </Link>
        <Link className="metric-card" to="/guide">
          <FileText aria-hidden="true" />
          <strong>{studyAssets.studyGuideLabel}</strong>
          <span>section guides and HTML reference</span>
        </Link>
        <Link className="metric-card" to="/guide">
          <Lightbulb aria-hidden="true" />
          <strong>{studyAssets.memoryAidsLabel}</strong>
          <span>{memoryAids.length} visual aids loaded</span>
        </Link>
      </div>

      <div className="panel-grid">
        <section className="panel wide-panel">
          <h2>Task Practice Readiness</h2>
          <div className="readiness-layout">
            <div className="donut-summary">
              <span>{summary.percentReady}%</span>
              <small>practice readiness</small>
            </div>
            <dl className="status-counts">
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
            <div className="section-progress-list">
              {sectionOrder.map((section) => {
                const sectionSummary = summary.bySection[section];
                const percent = Math.round((sectionSummary.ready / sectionSummary.total) * 100);
                return (
                  <div className="section-progress-row" key={section}>
                    <span>
                      {section} ({sectionRanges[section]})
                    </span>
                    <strong>
                      {sectionSummary.ready} / {sectionSummary.total}
                    </strong>
                    <ProgressBar value={percent} label={`${section} practice readiness progress`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="panel action-panel">
          <BookOpen aria-hidden="true" />
          <h2>Start with the map</h2>
          <p>Review each task, assessment type, and practice-readiness status before studying.</p>
          <Link className="button-link" to="/map">
            Open Map <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <aside className="notice-panel">
        {clientDemonstrationRule} Current tracker: {clientDemonstrationSummary.demonstrated} of{" "}
        {clientDemonstrationSummary.required}.
      </aside>
    </section>
  );
}

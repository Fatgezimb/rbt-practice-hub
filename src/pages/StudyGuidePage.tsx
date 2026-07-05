import { BookOpen, Download, ExternalLink, FileText, Lightbulb, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MemoryAidVisual } from "../components/memoryAids/MemoryAidVisual";
import { memoryAids } from "../data/memoryAids";
import {
  getMemoryAidVisualById,
  getMemoryAidVisualsForSection,
  getMemoryAidVisualsForTask,
  memoryAidVisuals,
  type MemoryAidVisualId,
} from "../data/memoryAidVisuals";
import { studyAssets } from "../data/studyAssets";
import { studyGuideSections } from "../data/studyGuideSections";
import { PageHeader } from "../components/ui/PageHeader";
import { useProgress } from "../state/ProgressContext";
import type { StudyGuideSection } from "../types";

export function StudyGuidePage() {
  const { markGuideOpened, markGuideReviewed, progress } = useProgress();
  const [selectedSection, setSelectedSection] = useState<StudyGuideSection | null>(null);
  const [selectedVisualId, setSelectedVisualId] = useState<MemoryAidVisualId | null>(null);
  const selectedVisual = selectedVisualId ? getMemoryAidVisualById(selectedVisualId) : undefined;
  const selectedSectionVisuals = selectedSection ? getMemoryAidVisualsForSection(selectedSection.section) : [];
  const selectedGuideActivity = selectedSection ? progress.guideActivity[selectedSection.id] : undefined;

  function openSectionGuide(section: StudyGuideSection) {
    setSelectedSection(section);
    markGuideOpened(section.id);
  }

  useEffect(() => {
    if (!selectedSection && !selectedVisualId) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (selectedVisualId) {
          setSelectedVisualId(null);
        } else {
          setSelectedSection(null);
        }
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedSection, selectedVisualId]);

  return (
    <section className="page">
      <PageHeader title="Study Guide">
        Open a focused section guide, review task examples, or use the full HTML study guide.
      </PageHeader>
      <div className="resource-grid">
        <a
          className="resource-card"
          href={studyAssets.studyGuideHtml}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => markGuideOpened("full-guide")}
        >
          <FileText aria-hidden="true" />
          <strong>Full HTML study guide</strong>
          <span>Open the colorful, learner-friendly guide page.</span>
        </a>
        <a className="resource-card" href={studyAssets.officialPacketPdf} target="_blank" rel="noopener noreferrer">
          <Download aria-hidden="true" />
          <strong>Official assessment packet</strong>
          <span>Verify current requirements and task wording.</span>
        </a>
        <div className="resource-card muted-resource">
          <Lightbulb aria-hidden="true" />
          <strong>{memoryAidVisuals.length} visual memory aids</strong>
          <span>Original SVG and HTML diagrams for quick review.</span>
        </div>
      </div>

      <section className="panel visual-aid-overview">
        <div className="panel-heading">
          <div>
            <h2>Visual Memory Aids</h2>
            <p>Open a focused diagram when a concept starts to blur together.</p>
          </div>
        </div>
        <div className="visual-aid-button-grid">
          {memoryAidVisuals.map((visual) => (
            <button className="visual-aid-button" type="button" onClick={() => setSelectedVisualId(visual.id)} key={visual.id}>
              <span>Tasks {visual.taskNumbers.join(", ")}</span>
              <strong>{visual.title}</strong>
              <small>{visual.description}</small>
            </button>
          ))}
        </div>
      </section>

      <div className="guide-section-grid">
        {studyGuideSections.map((section) => (
          <article className="guide-section-card" key={section.id}>
            <span className="seed-label">{section.section}</span>
            <button className="guide-title-button" type="button" onClick={() => openSectionGuide(section)}>
              {section.title}
            </button>
            <p>{section.overview}</p>
            <strong className="guide-goal">{section.studyGoal}</strong>
            <p className="guide-activity-note">
              Opened {progress.guideActivity[section.id]?.openedCount ?? 0} time
              {(progress.guideActivity[section.id]?.openedCount ?? 0) === 1 ? "" : "s"} · Reviewed{" "}
              {progress.guideActivity[section.id]?.reviewedCount ?? 0} time
              {(progress.guideActivity[section.id]?.reviewedCount ?? 0) === 1 ? "" : "s"}
            </p>
            <div className="tag-row">
              {section.keyConcepts.slice(0, 5).map((concept) => (
                <span key={concept}>{concept}</span>
              ))}
            </div>
            <div className="visual-chip-row" aria-label={`${section.title} visual memory aids`}>
              {getMemoryAidVisualsForSection(section.section).map((visual) => (
                <button type="button" onClick={() => setSelectedVisualId(visual.id)} key={visual.id}>
                  {visual.title}
                </button>
              ))}
            </div>
            <h3>Practice focus</h3>
            <ul>
              {section.practiceFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="guide-open-button" type="button" onClick={() => openSectionGuide(section)}>
              <BookOpen size={18} aria-hidden="true" />
              Open {section.title} Guide
            </button>
            <small>{section.sourceNote}</small>
          </article>
        ))}
      </div>

      <section className="panel">
        <h2>Memory Aids</h2>
        <div className="memory-aid-list">
          {memoryAids.map((aid) => (
            <article className="memory-aid-item" key={aid.id}>
              <strong>{aid.title}</strong>
              <span>{aid.cue}</span>
              <p>{aid.details}</p>
            </article>
          ))}
        </div>
      </section>

      {selectedSection ? (
        <div className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-modal-title">
          <button className="guide-modal-backdrop" type="button" onClick={() => setSelectedSection(null)}>
            <span className="sr-only">Close study guide modal</span>
          </button>
          <div className="guide-modal-panel">
            <header className="guide-modal-header">
              <div>
                <span className="seed-label">Tasks {selectedSection.taskNumbers.join(", ")}</span>
                <h2 id="guide-modal-title">{selectedSection.title}</h2>
                <p>{selectedSection.overview}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Close study guide modal" onClick={() => setSelectedSection(null)}>
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div className="guide-modal-body">
              <section className="guide-modal-summary">
                <div>
                  <h3>Study Goal</h3>
                  <p>{selectedSection.studyGoal}</p>
                </div>
                <div>
                  <h3>Common Mix-Ups</h3>
                  <ul>
                    {selectedSection.commonMixUps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {selectedSectionVisuals.length > 0 ? (
                <section className="guide-visual-strip" aria-label={`${selectedSection.title} visual memory aids`}>
                  <h3>Visual Memory Aids</h3>
                  <div>
                    {selectedSectionVisuals.map((visual) => (
                      <button className="visual-aid-button" type="button" onClick={() => setSelectedVisualId(visual.id)} key={visual.id}>
                        <span>Tasks {visual.taskNumbers.join(", ")}</span>
                        <strong>{visual.title}</strong>
                        <small>{visual.description}</small>
                      </button>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="guide-task-list" aria-label={`${selectedSection.title} task study guide`}>
                {selectedSection.taskGuides.map((task) => {
                  const taskVisuals = getMemoryAidVisualsForTask(task.taskNumber);

                  return (
                    <article className="guide-task-card" key={task.taskNumber}>
                      <div className="guide-task-heading">
                        <span>Task {task.taskNumber}</span>
                        <h3>{task.title}</h3>
                      </div>
                      <p>{task.learnerGoal}</p>

                      {taskVisuals.length > 0 ? (
                        <div className="lesson-visual-strip" aria-label={`Task ${task.taskNumber} visual memory aids`}>
                          {taskVisuals.map((visual) => (
                            <button type="button" onClick={() => setSelectedVisualId(visual.id)} key={visual.id}>
                              {visual.title}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      <div className="guide-task-columns">
                        <div>
                          <h4>Key Ideas</h4>
                          <ul>
                            {task.keyIdeas.map((idea) => (
                              <li key={idea}>{idea}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4>Examples</h4>
                          <ul>
                            {task.examples.map((example) => (
                              <li key={example}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="guide-note-pair">
                        <div>
                          <h4>Not This</h4>
                          <ul>
                            {task.nonExamples.map((nonExample) => (
                              <li key={nonExample}>{nonExample}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4>Practice</h4>
                          <p>{task.practicePrompt}</p>
                          <strong>{task.quickCheck}</strong>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              <a
                className="guide-html-link"
                href={studyAssets.studyGuideHtml}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => markGuideOpened("full-guide")}
              >
                <ExternalLink size={18} aria-hidden="true" />
                Open full HTML study guide
              </a>
              <button className="guide-html-link" type="button" onClick={() => markGuideReviewed(selectedSection.id)}>
                <BookOpen size={18} aria-hidden="true" />
                {selectedGuideActivity?.reviewed ? "Mark reviewed again" : "Mark this guide reviewed"}
              </button>
              <p className="guide-activity-note">
                Opened {selectedGuideActivity?.openedCount ?? 0} time
                {(selectedGuideActivity?.openedCount ?? 0) === 1 ? "" : "s"} · Reviewed{" "}
                {selectedGuideActivity?.reviewedCount ?? 0} time
                {(selectedGuideActivity?.reviewedCount ?? 0) === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {selectedVisual ? (
        <div className="guide-modal visual-aid-modal" role="dialog" aria-modal="true" aria-labelledby="visual-aid-modal-title">
          <button className="guide-modal-backdrop" type="button" onClick={() => setSelectedVisualId(null)}>
            <span className="sr-only">Close visual memory aid</span>
          </button>
          <div className="guide-modal-panel visual-aid-modal-panel">
            <header className="guide-modal-header">
              <div>
                <span className="seed-label">Tasks {selectedVisual.taskNumbers.join(", ")}</span>
                <h2 id="visual-aid-modal-title">{selectedVisual.title}</h2>
                <p>{selectedVisual.description}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Close visual memory aid" onClick={() => setSelectedVisualId(null)}>
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <div className="guide-modal-body">
              <MemoryAidVisual id={selectedVisual.id} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

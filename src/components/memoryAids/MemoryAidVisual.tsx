import { getMemoryAidVisualById, type MemoryAidVisualId } from "../../data/memoryAidVisuals";
import type { ReactNode } from "react";

interface MemoryAidVisualProps {
  id: MemoryAidVisualId;
  compact?: boolean;
}

function FlowArrow() {
  return (
    <svg className="visual-arrow" viewBox="0 0 44 16" aria-hidden="true" focusable="false">
      <path d="M2 8h35" />
      <path d="m30 2 7 6-7 6" />
    </svg>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <div className="visual-flow">
      {items.map((item, index) => (
        <div className="visual-flow-unit" key={item}>
          <span>{item}</span>
          {index < items.length - 1 ? <FlowArrow /> : null}
        </div>
      ))}
    </div>
  );
}

function AidShell({ children, compact, id }: { children: ReactNode; compact?: boolean; id: MemoryAidVisualId }) {
  const visual = getMemoryAidVisualById(id);

  return (
    <article className={compact ? "memory-visual is-compact" : "memory-visual"}>
      <header className="memory-visual-header">
        <span>Tasks {visual?.taskNumbers.join(", ")}</span>
        <h3>{visual?.title}</h3>
        {compact ? null : <p>{visual?.description}</p>}
      </header>
      {children}
    </article>
  );
}

function MeasurementChooser({ compact }: { compact?: boolean }) {
  const choices = [
    ["Count it?", "Frequency / rate", "Every response has a count."],
    ["Time it?", "Duration / latency / IRT", "Start, end, or time between responses matters."],
    ["Sample it?", "Whole interval / partial interval / MTS", "The plan checks intervals or moments."],
    ["Product left behind?", "Permanent product", "The result can be counted later."],
  ];

  return (
    <AidShell id="measurement-chooser" compact={compact}>
      <div className="chooser-grid">
        {choices.map(([question, answer, note]) => (
          <div className="chooser-card" key={question}>
            <strong>{question}</strong>
            <span>{answer}</span>
            {compact ? null : <p>{note}</p>}
          </div>
        ))}
      </div>
    </AidShell>
  );
}

function AbcChain({ compact }: { compact?: boolean }) {
  return (
    <AidShell id="abc-chain" compact={compact}>
      <Flow items={["Antecedent", "Behavior", "Consequence"]} />
      {compact ? null : (
        <div className="visual-caption-grid">
          <p>What happened right before?</p>
          <p>What did the learner do?</p>
          <p>What happened right after?</p>
        </div>
      )}
    </AidShell>
  );
}

function PreferenceChooser({ compact }: { compact?: boolean }) {
  const formats = [
    ["Indirect", "Ask people who know the learner."],
    ["Free operant", "Watch engagement with available items."],
    ["Single stimulus", "Present one item at a time."],
    ["Paired choice", "Present two and record the pick."],
    ["MSW", "Array stays available after selection."],
    ["MSWO", "Chosen item is removed from the array."],
  ];

  return (
    <AidShell id="preference-chooser" compact={compact}>
      <div className="preference-ladder">
        {formats.map(([label, note]) => (
          <div key={label}>
            <strong>{label}</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </AidShell>
  );
}

function DttLoop({ compact }: { compact?: boolean }) {
  return (
    <AidShell id="dtt-loop" compact={compact}>
      <Flow items={["SD", "Response", "Consequence", "Data", "Next trial"]} />
      {compact ? null : <p className="visual-note">A clean trial has one clear opportunity before the next trial begins.</p>}
    </AidShell>
  );
}

function NaturalisticCard({ compact }: { compact?: boolean }) {
  return (
    <AidShell id="naturalistic-card" compact={compact}>
      <Flow items={["Motivation", "Opportunity", "Response", "Natural reinforcer"]} />
      {compact ? null : <p className="visual-note">The lesson is planned, but the reason to respond comes from the activity.</p>}
    </AidShell>
  );
}

function ChainingMap({ compact }: { compact?: boolean }) {
  const chains = [
    ["Forward", "Teach step 1 first, then add later steps."],
    ["Backward", "Teach the last step first so the learner contacts completion."],
    ["Total task", "Practice the whole chain each time with support as needed."],
  ];

  return (
    <AidShell id="chaining-map" compact={compact}>
      <div className="chain-map">
        {chains.map(([label, note], index) => (
          <div className={`chain-card chain-${index + 1}`} key={label}>
            <strong>{label}</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </AidShell>
  );
}

function PromptHierarchy({ compact }: { compact?: boolean }) {
  const levels = [
    ["Independent", "No prompt"],
    ["Gesture / model / verbal / visual", "Cue, show, say, or highlight"],
    ["Partial physical", "Light physical guidance"],
    ["Full physical", "Complete physical guidance"],
  ];

  return (
    <AidShell id="prompt-hierarchy" compact={compact}>
      <div className="prompt-stack">
        {levels.map(([label, note]) => (
          <div key={label}>
            <strong>{label}</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>
      <p className="visual-note">Prompt intrusiveness varies by learner, skill, and written program.</p>
    </AidShell>
  );
}

function TokenSystem({ compact }: { compact?: boolean }) {
  return (
    <AidShell id="token-system" compact={compact}>
      <div className="token-diagram">
        <div>
          <span className="token-row" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>Earn tokens</strong>
        </div>
        <FlowArrow />
        <div>
          <span className="backup-box" aria-hidden="true" />
          <strong>Exchange for backup reinforcer</strong>
        </div>
      </div>
      {compact ? null : <p className="visual-note">The plan should define what earns tokens, how many are needed, and what exchange is available.</p>}
    </AidShell>
  );
}

function AntecedentToolkit({ compact }: { compact?: boolean }) {
  const tools = ["Priming", "Visual schedule", "Visual timer", "Choices", "Environmental arrangement", "NCR", "High-p sequence", "Opportunities to respond"];

  return (
    <AidShell id="antecedent-toolkit" compact={compact}>
      <div className="toolkit-grid">
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </AidShell>
  );
}

function DifferentialMatrix({ compact }: { compact?: boolean }) {
  const rows = [
    ["DRA", "Alternative behavior"],
    ["DRI", "Incompatible behavior"],
    ["DRO", "No target behavior during interval"],
    ["DRH", "Higher rates"],
    ["DRL", "Lower rates"],
  ];

  return (
    <AidShell id="differential-reinforcement-matrix" compact={compact}>
      <div className="reinforcement-matrix">
        {rows.map(([code, meaning]) => (
          <div key={code}>
            <strong>{code}</strong>
            <span>{meaning}</span>
          </div>
        ))}
      </div>
    </AidShell>
  );
}

function ExtinctionTimeline({ compact }: { compact?: boolean }) {
  const events = ["Extinction begins", "Possible extinction burst", "Variability", "Decrease", "Possible spontaneous recovery"];

  return (
    <AidShell id="extinction-timeline" compact={compact}>
      <div className="timeline-track">
        {events.map((event, index) => (
          <div key={event}>
            <span>{index + 1}</span>
            <strong>{event}</strong>
          </div>
        ))}
      </div>
      {compact ? null : <p className="visual-note">Extinction should follow the plan and safety procedures; effects are possible, not guaranteed.</p>}
    </AidShell>
  );
}

function ProfessionalismTree({ compact }: { compact?: boolean }) {
  const questions = [
    "Is this objective?",
    "Does this protect dignity?",
    "Is this within my role?",
    "Should I ask my supervisor?",
  ];

  return (
    <AidShell id="professionalism-tree" compact={compact}>
      <div className="decision-tree">
        {questions.map((question, index) => (
          <div key={question}>
            <span>{index + 1}</span>
            <strong>{question}</strong>
          </div>
        ))}
      </div>
    </AidShell>
  );
}

export function MemoryAidVisual({ id, compact = false }: MemoryAidVisualProps) {
  switch (id) {
    case "measurement-chooser":
      return <MeasurementChooser compact={compact} />;
    case "abc-chain":
      return <AbcChain compact={compact} />;
    case "preference-chooser":
      return <PreferenceChooser compact={compact} />;
    case "dtt-loop":
      return <DttLoop compact={compact} />;
    case "naturalistic-card":
      return <NaturalisticCard compact={compact} />;
    case "chaining-map":
      return <ChainingMap compact={compact} />;
    case "prompt-hierarchy":
      return <PromptHierarchy compact={compact} />;
    case "token-system":
      return <TokenSystem compact={compact} />;
    case "antecedent-toolkit":
      return <AntecedentToolkit compact={compact} />;
    case "differential-reinforcement-matrix":
      return <DifferentialMatrix compact={compact} />;
    case "extinction-timeline":
      return <ExtinctionTimeline compact={compact} />;
    case "professionalism-tree":
      return <ProfessionalismTree compact={compact} />;
  }
}

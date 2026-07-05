import type { CompetencySection, Flashcard } from "../types";

export type MemoryAidVisualId =
  | "measurement-chooser"
  | "abc-chain"
  | "preference-chooser"
  | "dtt-loop"
  | "naturalistic-card"
  | "chaining-map"
  | "prompt-hierarchy"
  | "token-system"
  | "antecedent-toolkit"
  | "differential-reinforcement-matrix"
  | "extinction-timeline"
  | "professionalism-tree";

export interface MemoryAidVisualDefinition {
  id: MemoryAidVisualId;
  title: string;
  section: CompetencySection;
  taskNumbers: number[];
  description: string;
  tags: string[];
}

export const memoryAidVisuals: MemoryAidVisualDefinition[] = [
  {
    id: "measurement-chooser",
    title: "Measurement Chooser",
    section: "Measurement",
    taskNumbers: [1, 2, 3],
    description: "Choose a data system by asking what kind of evidence the behavior leaves.",
    tags: ["measurement", "frequency", "rate", "duration", "latency", "IRT", "interval", "permanent product"],
  },
  {
    id: "abc-chain",
    title: "ABC Chain",
    section: "Assessment",
    taskNumbers: [5],
    description: "Separate what happened before, the observable behavior, and what followed.",
    tags: ["ABC data", "antecedent", "behavior", "consequence"],
  },
  {
    id: "preference-chooser",
    title: "Preference Assessment Chooser",
    section: "Assessment",
    taskNumbers: [4],
    description: "Match the format to how items are presented and whether choices are replaced.",
    tags: ["preference assessment", "indirect", "free operant", "single stimulus", "paired choice", "MSW", "MSWO"],
  },
  {
    id: "dtt-loop",
    title: "DTT Loop",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [6],
    description: "Keep each structured trial clear: cue, response, consequence, data, next trial.",
    tags: ["DTT", "SD", "response", "consequence", "data"],
  },
  {
    id: "naturalistic-card",
    title: "Naturalistic Teaching Card",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [7],
    description: "Use motivation and a real opportunity, then reinforce with the natural outcome.",
    tags: ["naturalistic teaching", "motivation", "opportunity", "natural reinforcement"],
  },
  {
    id: "chaining-map",
    title: "Chaining Map",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [8],
    description: "Pick the teaching direction that fits the task analysis and learner needs.",
    tags: ["chaining", "forward chaining", "backward chaining", "total task", "task analysis"],
  },
  {
    id: "prompt-hierarchy",
    title: "Prompt Hierarchy",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [11],
    description: "Compare prompt levels while remembering that intrusiveness depends on the learner and program.",
    tags: ["prompting", "prompt fading", "independent", "gesture", "model", "verbal", "visual", "physical"],
  },
  {
    id: "token-system",
    title: "Token System Diagram",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [12],
    description: "Tokens are earned now and exchanged later for backup reinforcers.",
    tags: ["token system", "tokens", "backup reinforcer", "exchange"],
  },
  {
    id: "antecedent-toolkit",
    title: "Antecedent Intervention Toolkit",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    description: "Arrange support before behavior happens to make success more likely.",
    tags: ["antecedent intervention", "priming", "visual schedule", "visual timer", "choices", "NCR", "high-p"],
  },
  {
    id: "differential-reinforcement-matrix",
    title: "Differential Reinforcement Matrix",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    description: "Use the letters to remember which response pattern receives reinforcement.",
    tags: ["differential reinforcement", "DRA", "DRI", "DRO", "DRH", "DRL"],
  },
  {
    id: "extinction-timeline",
    title: "Extinction Effects Timeline",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    description: "Expect possible burst, variability, decrease, and later spontaneous recovery.",
    tags: ["extinction", "extinction burst", "spontaneous recovery", "extinction-induced variability"],
  },
  {
    id: "professionalism-tree",
    title: "Professionalism Decision Tree",
    section: "Professionalism and Requirements",
    taskNumbers: [15, 16, 17, 18, 19],
    description: "Pause on notes, dignity, role limits, and supervisor direction before acting.",
    tags: ["session notes", "dignity", "boundaries", "supervision", "clinical direction", "ethics"],
  },
];

const visualOrder = new Map(memoryAidVisuals.map((visual, index) => [visual.id, index]));

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getMemoryAidVisualById(id: MemoryAidVisualId) {
  return memoryAidVisuals.find((visual) => visual.id === id);
}

export function getMemoryAidVisualsForTask(taskNumber: number) {
  return memoryAidVisuals.filter((visual) => visual.taskNumbers.includes(taskNumber));
}

export function getMemoryAidVisualsForSection(section: CompetencySection) {
  return memoryAidVisuals.filter((visual) => visual.section === section);
}

export function getMemoryAidVisualsForFlashcard(card: Flashcard) {
  const directTags = new Set(card.tags.map((tag) => tag.toLowerCase()));
  const longText = [card.front, card.back, card.explanation, card.memoryAid, card.cardType, ...card.tags].join(" ").toLowerCase();

  return memoryAidVisuals
    .map((visual) => {
      let score = visual.taskNumbers.includes(card.taskNumber) ? 3 : 0;

      visual.tags.forEach((tag) => {
        const normalizedTag = tag.toLowerCase();
        const exactConceptMatch = directTags.has(normalizedTag);
        const phraseMatch =
          normalizedTag.length > 3 && new RegExp(`\\b${escapeRegExp(normalizedTag)}\\b`, "i").test(longText);

        if (exactConceptMatch) {
          score += 2;
        } else if (phraseMatch && visual.taskNumbers.includes(card.taskNumber)) {
          score += 1;
        }
      });

      if (card.cardType === "memory-aid" && score > 0) {
        score += 2;
      }

      return { visual, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || (visualOrder.get(a.visual.id) ?? 0) - (visualOrder.get(b.visual.id) ?? 0))
    .map(({ visual }) => visual);
}

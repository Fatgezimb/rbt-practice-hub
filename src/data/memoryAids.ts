import type { MemoryAid } from "../types";

export const memoryAids: MemoryAid[] = [
  {
    id: "aid-measurement-chooser",
    title: "Measurement chooser",
    section: "Measurement",
    taskNumbers: [1, 2, 3],
    cue: "Count it, time it, sample it, or inspect the product.",
    details:
      "Start by asking what the behavior leaves behind: a count, a time value, a sampled observation, or a permanent result.",
    tags: ["measurement", "frequency", "duration", "latency", "IRT", "permanent product"],
  },
  {
    id: "aid-abc-chain",
    title: "ABC chain",
    section: "Assessment",
    taskNumbers: [5],
    cue: "Before, behavior, after.",
    details:
      "Keep antecedent, behavior, and consequence separate so the note describes a sequence rather than a guess about why it happened.",
    tags: ["ABC data", "antecedent", "behavior", "consequence"],
  },
  {
    id: "aid-preference-chooser",
    title: "Preference assessment chooser",
    section: "Assessment",
    taskNumbers: [4],
    cue: "Ask, observe freely, show one, show two, or show an array.",
    details:
      "The format depends on how items are presented and whether selected items stay available or are removed after selection.",
    tags: ["preference assessment", "indirect", "free operant", "paired choice", "MSW", "MSWO"],
  },
  {
    id: "aid-dtt-loop",
    title: "DTT loop",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [6],
    cue: "SD, response, consequence, data, next trial.",
    details:
      "A discrete trial stays clean when the cue is clear, the response is observed, the planned consequence follows, and data are recorded before moving on.",
    tags: ["DTT", "SD", "response", "consequence", "data"],
  },
  {
    id: "aid-naturalistic-teaching",
    title: "Naturalistic teaching card",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [7],
    cue: "Motivation creates the moment.",
    details:
      "Look for or arrange a meaningful opportunity, prompt or wait according to the plan, and let the natural outcome reinforce the response.",
    tags: ["naturalistic teaching", "motivation", "opportunity", "natural reinforcement"],
  },
  {
    id: "aid-chaining-map",
    title: "Chaining map",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [8],
    cue: "Forward starts first, backward starts last, total task practices all.",
    details:
      "Chaining is about connected task-analysis steps. The teaching direction changes which step receives the main teaching focus.",
    tags: ["chaining", "forward chaining", "backward chaining", "total task"],
  },
  {
    id: "aid-prompt-hierarchy",
    title: "Prompt hierarchy",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [11],
    cue: "Help should fade toward independence.",
    details:
      "Prompt levels can range from independent responding to full physical guidance, but intrusiveness depends on the learner, skill, and program.",
    tags: ["prompting", "prompt fading", "physical prompt", "verbal prompt", "model prompt", "gesture prompt"],
  },
  {
    id: "aid-token-system",
    title: "Token system diagram",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [12],
    cue: "Earn now, exchange later.",
    details:
      "Tokens are delivered according to the plan and later traded for backup reinforcers; the earning and exchange rules should be clear.",
    tags: ["token system", "tokens", "backup reinforcer"],
  },
  {
    id: "aid-antecedent-toolkit",
    title: "Antecedent intervention toolkit",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    cue: "Adjust before behavior happens.",
    details:
      "Priming, schedules, timers, choices, arrangement, NCR, high-p sequences, and opportunities to respond all change the setup before behavior occurs.",
    tags: ["antecedent intervention", "priming", "visual schedule", "visual timer", "choices", "NCR", "high-p"],
  },
  {
    id: "aid-differential-reinforcement",
    title: "Differential reinforcement matrix",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    cue: "Different response pattern, different reinforcement.",
    details:
      "DRA reinforces an alternative, DRI an incompatible behavior, DRO the absence of the target, DRH higher rates, and DRL lower rates.",
    tags: ["differential reinforcement", "DRA", "DRI", "DRO", "DRH", "DRL"],
  },
  {
    id: "aid-extinction-effects",
    title: "Extinction effects timeline",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [14],
    cue: "Burst, vary, decrease, maybe recover.",
    details:
      "When the maintaining reinforcer is withheld, behavior may briefly increase, vary, decrease over time, or reappear after a pause.",
    tags: ["extinction", "extinction burst", "spontaneous recovery", "extinction-induced variability"],
  },
  {
    id: "aid-professionalism-tree",
    title: "Professionalism decision tree",
    section: "Professionalism and Requirements",
    taskNumbers: [15, 16, 17, 18, 19],
    cue: "Objective, dignified, in-role, supervised.",
    details:
      "Before documenting or responding, check whether the action is objective, protects dignity, stays within the RBT role, and needs supervisor direction.",
    tags: ["session notes", "dignity", "boundaries", "supervision", "clinical direction"],
  },
];

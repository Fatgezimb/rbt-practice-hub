import type {
  AssessmentType,
  CompetencySection,
  Difficulty,
  DistractorExplanations,
  PracticeQuestion,
  QuestionChoice,
  QuestionType,
} from "../types";

type TaskBatchNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

interface QuestionSeed {
  id: string;
  taskNumber: TaskBatchNumber;
  questionType: QuestionType;
  prompt: string;
  choices: QuestionChoice[];
  correctAnswer: string | string[];
  explanation: string;
  distractorExplanations: DistractorExplanations;
  scenario: string;
  difficulty: Difficulty;
  tags: string[];
}

const sectionByTask: Record<TaskBatchNumber, CompetencySection> = {
  1: "Measurement",
  2: "Measurement",
  3: "Measurement",
  4: "Assessment",
  5: "Assessment",
  6: "Skill Acquisition and Behavior Reduction",
  7: "Skill Acquisition and Behavior Reduction",
  8: "Skill Acquisition and Behavior Reduction",
  9: "Skill Acquisition and Behavior Reduction",
  10: "Skill Acquisition and Behavior Reduction",
  11: "Skill Acquisition and Behavior Reduction",
  12: "Skill Acquisition and Behavior Reduction",
  13: "Skill Acquisition and Behavior Reduction",
  14: "Skill Acquisition and Behavior Reduction",
  15: "Professionalism and Requirements",
  16: "Professionalism and Requirements",
  17: "Professionalism and Requirements",
  18: "Professionalism and Requirements",
  19: "Professionalism and Requirements",
};

const assessmentTypesByTask: Record<TaskBatchNumber, AssessmentType[]> = {
  1: ["With Client", "Role-Play"],
  2: ["With Client", "Role-Play"],
  3: ["With Client", "Role-Play"],
  4: ["With Client", "Role-Play"],
  5: ["With Client", "Role-Play"],
  6: ["With Client", "Role-Play"],
  7: ["With Client", "Role-Play"],
  8: ["With Client", "Role-Play"],
  9: ["With Client", "Role-Play"],
  10: ["With Client", "Role-Play"],
  11: ["With Client", "Role-Play"],
  12: ["With Client", "Role-Play"],
  13: ["With Client", "Role-Play", "Interview"],
  14: ["With Client", "Role-Play"],
  15: ["With Client", "Role-Play", "Interview"],
  16: ["Interview"],
  17: ["Interview"],
  18: ["Interview"],
  19: ["Interview"],
};

function makeQuestion(seed: QuestionSeed): PracticeQuestion {
  return {
    ...seed,
    section: sectionByTask[seed.taskNumber],
    assessmentTypes: assessmentTypesByTask[seed.taskNumber],
  };
}

export const practiceQuestions: PracticeQuestion[] = [
  makeQuestion({
    id: "q-t1-frequency-clear-events",
    taskNumber: 1,
    questionType: "multiple-choice",
    prompt: "A technician records each time a learner raises a hand during a 20-minute small group. Which measure is being used?",
    choices: [
      { id: "a", text: "Frequency" },
      { id: "b", text: "Duration" },
      { id: "c", text: "Latency" },
      { id: "d", text: "IRT" },
    ],
    correctAnswer: "a",
    explanation:
      "Frequency is correct because the observer is counting each occurrence of a behavior with a clear beginning and end.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Duration is not correct because the question asks how many hand raises occurred, not how long each one lasted.",
        whenWouldBeCorrect: "Duration would fit if the team needed the total time spent out of seat, crying, or engaging with a toy.",
      },
      c: {
        whyNotCorrectHere: "Latency is not correct because there is no instruction-to-response delay being measured.",
        whenWouldBeCorrect: "Latency would fit if the observer timed from 'raise your hand' to the first hand raise.",
      },
      d: {
        whyNotCorrectHere: "IRT is not correct because the observer is not timing the gap between two hand raises.",
        whenWouldBeCorrect: "IRT would fit if the team wanted the time between one hand raise and the next.",
      },
    },
    scenario: "A supervisor watches the trainee collect continuous measurement data during a role-play classroom routine.",
    difficulty: "intro",
    tags: ["task 1", "frequency", "continuous measurement", "count"],
  }),
  makeQuestion({
    id: "q-t1-duration-long-episode",
    taskNumber: 1,
    questionType: "select-best-measurement",
    prompt: "A behavior happens only twice, but each episode can last several minutes. The team cares most about total time in the behavior. Which measure fits best?",
    choices: [
      { id: "a", text: "Duration" },
      { id: "b", text: "Frequency" },
      { id: "c", text: "Rate" },
      { id: "d", text: "Latency" },
    ],
    correctAnswer: "a",
    explanation:
      "Duration is correct because the important dimension is how long the episodes last, not just how often they begin.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Frequency would count two episodes and miss whether the behavior lasted 20 seconds or 20 minutes.",
        whenWouldBeCorrect: "Frequency would fit if each episode was brief and the main concern was how many times it occurred.",
      },
      c: {
        whyNotCorrectHere: "Rate adds a time denominator to a count, but it still does not capture episode length.",
        whenWouldBeCorrect: "Rate would fit if the team compared how many brief responses occurred per minute across sessions.",
      },
      d: {
        whyNotCorrectHere: "Latency measures delay after a cue, not the length of an ongoing episode.",
        whenWouldBeCorrect: "Latency would fit if the concern was how long the learner waited before starting a task after an instruction.",
      },
    },
    scenario: "A trainee is choosing a continuous measurement system for long episodes of refusal during a role-play.",
    difficulty: "core",
    tags: ["task 1", "duration", "frequency", "rate", "select best measurement system"],
  }),
  makeQuestion({
    id: "q-t1-latency-after-instruction",
    taskNumber: 1,
    questionType: "scenario-choice",
    prompt: "The timer starts when the technician says, 'Start your worksheet,' and stops when the learner writes the first answer. What is being measured?",
    choices: [
      { id: "a", text: "Latency" },
      { id: "b", text: "IRT" },
      { id: "c", text: "Duration" },
      { id: "d", text: "Partial interval" },
    ],
    correctAnswer: "a",
    explanation:
      "Latency is correct because the observer times from an instruction or cue to the beginning of the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "IRT is not correct because only one response start is involved; there are not two responses to time between.",
        whenWouldBeCorrect: "IRT would fit if the observer timed from one completed answer to the next completed answer.",
      },
      c: {
        whyNotCorrectHere: "Duration is not correct because the timer stops when work begins, not when the entire work period ends.",
        whenWouldBeCorrect: "Duration would fit if the observer timed how long the learner worked or how long refusal lasted.",
      },
      d: {
        whyNotCorrectHere: "Partial interval is not correct because the observer is using a stopwatch from cue to response, not scoring intervals.",
        whenWouldBeCorrect: "Partial interval would fit if the observer scored whether behavior happened at any time within each interval.",
      },
    },
    scenario: "A supervisor asks the trainee to identify the timing measure shown in a worksheet-start scenario.",
    difficulty: "intro",
    tags: ["task 1", "latency", "continuous measurement", "scenario"],
  }),
  makeQuestion({
    id: "q-t1-irt-between-responses",
    taskNumber: 1,
    questionType: "scenario-choice",
    prompt: "A learner taps the table at 9:01:10 and again at 9:01:38. The observer records 28 seconds. Which measure is this?",
    choices: [
      { id: "a", text: "IRT" },
      { id: "b", text: "Latency" },
      { id: "c", text: "Duration" },
      { id: "d", text: "Whole interval" },
    ],
    correctAnswer: "a",
    explanation:
      "IRT is correct because it measures the time between two occurrences of the same behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Latency is not correct because the scenario does not start with an instruction or cue.",
        whenWouldBeCorrect: "Latency would fit if timing started when staff said 'hands down' and ended when table tapping began.",
      },
      c: {
        whyNotCorrectHere: "Duration is not correct because the observer is not timing how long one tapping episode lasted.",
        whenWouldBeCorrect: "Duration would fit if the team timed how long a continuous tapping episode continued.",
      },
      d: {
        whyNotCorrectHere: "Whole interval is not correct because no interval was scored for continuous occurrence.",
        whenWouldBeCorrect: "Whole interval would fit if the observer scored an interval only when behavior lasted the entire interval.",
      },
    },
    scenario: "A trainee is distinguishing timing measures during a continuous measurement practice check.",
    difficulty: "core",
    tags: ["task 1", "IRT", "latency", "continuous measurement"],
  }),
  makeQuestion({
    id: "q-t1-rate-calculation",
    taskNumber: 1,
    questionType: "short-applied",
    prompt: "A learner makes 24 requests during 12 minutes. Which rate describes the data?",
    choices: [
      { id: "a", text: "2 requests per minute" },
      { id: "b", text: "12 requests per minute" },
      { id: "c", text: "24 requests total, with no time unit" },
      { id: "d", text: "12 minutes per request" },
    ],
    correctAnswer: "a",
    explanation:
      "Two requests per minute is correct because rate is count divided by time: 24 requests divided by 12 minutes.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Twelve requests per minute reverses the calculation and greatly overstates how often requests occurred.",
        whenWouldBeCorrect: "It would be correct if 144 requests occurred during 12 minutes.",
      },
      c: {
        whyNotCorrectHere: "A total count is frequency, not rate, because it leaves out the time unit.",
        whenWouldBeCorrect: "This would be correct if the question asked only for frequency during the session.",
      },
      d: {
        whyNotCorrectHere: "Minutes per request is a time-per-response value, not the usual rate requested here.",
        whenWouldBeCorrect: "A time-per-response value might be useful in a different analysis, but it is not the standard rate label for this prompt.",
      },
    },
    scenario: "A trainee needs to convert a frequency count into a rate before entering data.",
    difficulty: "core",
    tags: ["task 1", "rate", "frequency", "calculation"],
  }),
  makeQuestion({
    id: "q-t1-continuous-true-false",
    taskNumber: 1,
    questionType: "true-false",
    prompt: "True or false: Continuous measurement records every occurrence or a timing dimension of the behavior during the observation.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct because continuous measurement is used when the observer is capturing all instances or timing values, such as frequency, duration, latency, IRT, or rate.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because the statement describes the key distinction between continuous and sampled measurement.",
        whenWouldBeCorrect: "False would fit if the statement said continuous measurement only checks behavior at the end of each interval.",
      },
    },
    scenario: "A trainee is reviewing the difference between continuous and discontinuous measurement before a role-play.",
    difficulty: "intro",
    tags: ["task 1", "continuous measurement", "true false"],
  }),
  makeQuestion({
    id: "q-t1-nonexample-continuous",
    taskNumber: 1,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of continuous measurement?",
    choices: [
      { id: "a", text: "Counting every instance of hand biting" },
      { id: "b", text: "Timing how long a tantrum lasts" },
      { id: "c", text: "Recording whether behavior is happening only when a timer beeps" },
      { id: "d", text: "Timing from instruction to first response" },
    ],
    correctAnswer: "c",
    explanation:
      "Recording only at the timer beep is momentary time sampling, a discontinuous procedure. The other options capture every count or timing value.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Counting every instance is frequency, which is a continuous measure.",
        whenWouldBeCorrect: "This would be a nonexample only if the observer sampled intervals instead of counting every response.",
      },
      b: {
        whyNotCorrectHere: "Timing how long an episode lasts is duration, which is a continuous measure.",
        whenWouldBeCorrect: "This would be a nonexample if the observer only scored whether the episode appeared at interval endpoints.",
      },
      d: {
        whyNotCorrectHere: "Timing from instruction to response is latency, which is a continuous timing measure.",
        whenWouldBeCorrect: "This would be a nonexample if no cue-to-response timing was recorded and only interval samples were scored.",
      },
    },
    scenario: "A supervisor asks the trainee to find the option that does not belong with Task 1.",
    difficulty: "core",
    tags: ["task 1", "continuous measurement", "nonexample", "momentary time sampling"],
  }),
  makeQuestion({
    id: "q-t1-latency-vs-duration",
    taskNumber: 1,
    questionType: "select-best-measurement",
    prompt: "The team wants to know how long it takes a learner to begin cleaning up after the cleanup instruction. Which measure is best?",
    choices: [
      { id: "a", text: "Latency" },
      { id: "b", text: "Duration" },
      { id: "c", text: "Frequency" },
      { id: "d", text: "Rate" },
    ],
    correctAnswer: "a",
    explanation:
      "Latency is best because the measurement starts with the instruction and ends when the learner begins cleaning.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Duration would tell how long cleaning or refusal lasts, not how long it takes to start.",
        whenWouldBeCorrect: "Duration would fit if the team asked how long the learner cleaned independently.",
      },
      c: {
        whyNotCorrectHere: "Frequency would count occurrences, but the question is about delay after a cue.",
        whenWouldBeCorrect: "Frequency would fit if the team counted how many cleanup refusals occurred.",
      },
      d: {
        whyNotCorrectHere: "Rate is frequency per time and does not answer a cue-to-start question.",
        whenWouldBeCorrect: "Rate would fit if the team counted repeated brief responses per minute.",
      },
    },
    scenario: "A trainee is choosing a data sheet field for a cleanup transition program.",
    difficulty: "core",
    tags: ["task 1", "latency", "duration", "select best measurement system"],
  }),
  makeQuestion({
    id: "q-t1-frequency-vs-rate",
    taskNumber: 1,
    questionType: "multiple-choice",
    prompt: "Why is '15 responses in 5 minutes' more informative than '15 responses' when comparing sessions of different lengths?",
    choices: [
      { id: "a", text: "It can be converted to rate, which accounts for time." },
      { id: "b", text: "It changes frequency into duration." },
      { id: "c", text: "It becomes latency because a time value is present." },
      { id: "d", text: "It becomes ABC data because context is included." },
    ],
    correctAnswer: "a",
    explanation:
      "Rate accounts for the observation length, making comparisons fairer when sessions are not the same duration.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Adding the session length does not measure how long each response lasted, so it does not become duration.",
        whenWouldBeCorrect: "Duration would be correct if the data described minutes spent in the behavior.",
      },
      c: {
        whyNotCorrectHere: "A time value alone does not make latency; latency requires a cue followed by a response start.",
        whenWouldBeCorrect: "Latency would be correct if timing started at an SD and ended when the response began.",
      },
      d: {
        whyNotCorrectHere: "The phrase does not describe antecedents or consequences, so it is not ABC data.",
        whenWouldBeCorrect: "ABC data would be correct if the record included what happened before and after the behavior.",
      },
    },
    scenario: "A trainee is deciding whether frequency alone is enough for sessions with different observation lengths.",
    difficulty: "challenge",
    tags: ["task 1", "frequency", "rate", "comparison"],
  }),
  makeQuestion({
    id: "q-t1-short-applied-irt",
    taskNumber: 1,
    questionType: "short-applied",
    prompt: "A data sheet says, 'Start timer after one occurrence; stop when the next occurrence begins.' What should the trainee label this field?",
    choices: [
      { id: "a", text: "IRT" },
      { id: "b", text: "Latency" },
      { id: "c", text: "Duration" },
      { id: "d", text: "Momentary time sampling" },
    ],
    correctAnswer: "a",
    explanation:
      "IRT is correct because the timer captures the gap between two occurrences of the same behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Latency starts after a cue or instruction, not after the previous response.",
        whenWouldBeCorrect: "Latency would fit if the timer started when a teacher gave a direction.",
      },
      c: {
        whyNotCorrectHere: "Duration measures how long one episode continues, not the pause before the next episode.",
        whenWouldBeCorrect: "Duration would fit if timing started at behavior onset and ended when that same episode stopped.",
      },
      d: {
        whyNotCorrectHere: "Momentary time sampling checks behavior at a specific moment instead of timing gaps between responses.",
        whenWouldBeCorrect: "It would fit if the observer checked only when each interval ended.",
      },
    },
    scenario: "A supervisor asks the trainee to label an unlabeled stopwatch field on a data sheet.",
    difficulty: "core",
    tags: ["task 1", "IRT", "latency", "short applied"],
  }),
  makeQuestion({
    id: "q-t2-whole-interval-definition",
    taskNumber: 2,
    questionType: "multiple-choice",
    prompt: "Which rule describes whole-interval recording?",
    choices: [
      { id: "a", text: "Score the interval only if the behavior occurs for the entire interval." },
      { id: "b", text: "Score the interval if the behavior occurs at any time during the interval." },
      { id: "c", text: "Score only whether the behavior is occurring when the interval ends." },
      { id: "d", text: "Count every occurrence during the whole session." },
    ],
    correctAnswer: "a",
    explanation:
      "Whole-interval recording is correct because the behavior must occur throughout the full interval to be scored.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This describes partial-interval recording, which is less strict than whole interval.",
        whenWouldBeCorrect: "It would be correct when any brief occurrence during an interval should score the interval.",
      },
      c: {
        whyNotCorrectHere: "This describes momentary time sampling, which checks only the endpoint.",
        whenWouldBeCorrect: "It would be correct when the data sheet says to look only at the timer signal.",
      },
      d: {
        whyNotCorrectHere: "Counting every occurrence is frequency, a continuous measure, not an interval sample.",
        whenWouldBeCorrect: "It would be correct if every instance of the behavior could be counted reliably.",
      },
    },
    scenario: "A trainee is reviewing interval-recording rules before observing on-task behavior.",
    difficulty: "intro",
    tags: ["task 2", "whole interval", "discontinuous measurement"],
  }),
  makeQuestion({
    id: "q-t2-partial-interval-brief-behavior",
    taskNumber: 2,
    questionType: "scenario-choice",
    prompt: "A learner shouts for 2 seconds during a 30-second interval. The data sheet says any occurrence scores the interval. Which system is this?",
    choices: [
      { id: "a", text: "Partial-interval recording" },
      { id: "b", text: "Whole-interval recording" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "Duration" },
    ],
    correctAnswer: "a",
    explanation:
      "Partial-interval recording is correct because a brief occurrence anywhere in the interval is enough to score it.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Whole interval would require shouting for the entire 30 seconds, which did not happen.",
        whenWouldBeCorrect: "Whole interval would fit if the target behavior had to last the full interval before scoring.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling would check only at the interval endpoint, not any time during it.",
        whenWouldBeCorrect: "It would fit if the data sheet said to record only whether shouting was happening at the beep.",
      },
      d: {
        whyNotCorrectHere: "Duration would time the total length of shouting, not mark an interval as occurred or not occurred.",
        whenWouldBeCorrect: "Duration would fit if the team needed the total seconds of shouting.",
      },
    },
    scenario: "A trainee watches a short behavior occur during an interval and must decide how to score it.",
    difficulty: "intro",
    tags: ["task 2", "partial interval", "brief behavior", "scenario"],
  }),
  makeQuestion({
    id: "q-t2-momentary-endpoint",
    taskNumber: 2,
    questionType: "multiple-choice",
    prompt: "In momentary time sampling, when does the observer check whether the behavior is occurring?",
    choices: [
      { id: "a", text: "At the exact moment the interval ends" },
      { id: "b", text: "Any time during the interval" },
      { id: "c", text: "For the entire interval" },
      { id: "d", text: "Only after the session is over" },
    ],
    correctAnswer: "a",
    explanation:
      "Momentary time sampling is correct because the observer checks behavior at a specific moment, usually the endpoint of the interval.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Any time during the interval describes partial interval, not momentary time sampling.",
        whenWouldBeCorrect: "It would be correct for a procedure that scores the interval if the behavior happened at all.",
      },
      c: {
        whyNotCorrectHere: "For the entire interval describes whole interval, not momentary time sampling.",
        whenWouldBeCorrect: "It would be correct for scoring sustained behavior across the whole interval.",
      },
      d: {
        whyNotCorrectHere: "Checking after session does not tell whether behavior was occurring at interval moments.",
        whenWouldBeCorrect: "After-session review could fit permanent product measurement if the product remains and reflects the behavior.",
      },
    },
    scenario: "A trainee is learning when to look up from a timer during interval data collection.",
    difficulty: "intro",
    tags: ["task 2", "momentary time sampling", "endpoint"],
  }),
  makeQuestion({
    id: "q-t2-partial-interval-true-false",
    taskNumber: 2,
    questionType: "true-false",
    prompt: "True or false: Partial-interval recording captures the exact number of behavior occurrences.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "b",
    explanation:
      "False is correct because partial interval samples whether behavior occurred during intervals; it does not count each response.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "True is not correct because an interval scored once could contain one response or many responses.",
        whenWouldBeCorrect: "True would fit frequency recording, where every occurrence is counted.",
      },
    },
    scenario: "A supervisor checks whether the trainee understands the limits of interval data.",
    difficulty: "core",
    tags: ["task 2", "partial interval", "true false", "frequency"],
  }),
  makeQuestion({
    id: "q-t2-select-system-brief-high-rate",
    taskNumber: 2,
    questionType: "select-best-measurement",
    prompt: "The behavior is brief, frequent, and hard to count live. The supervisor wants an estimate of whether it happens during intervals. Which system best fits?",
    choices: [
      { id: "a", text: "Partial-interval recording" },
      { id: "b", text: "Whole-interval recording" },
      { id: "c", text: "Latency" },
      { id: "d", text: "Paired-choice preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Partial interval fits because the behavior is brief and frequent, and the goal is interval occurrence rather than exact counting.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Whole interval is too strict for brief behavior because it only scores behavior that lasts the entire interval.",
        whenWouldBeCorrect: "Whole interval would fit sustained behaviors such as engagement across a full interval.",
      },
      c: {
        whyNotCorrectHere: "Latency measures time from cue to response, not whether brief behavior occurred during intervals.",
        whenWouldBeCorrect: "Latency would fit if the team wanted delay to start after an instruction.",
      },
      d: {
        whyNotCorrectHere: "Paired choice identifies preferences and does not measure target behavior occurrence.",
        whenWouldBeCorrect: "It would be correct if two items were presented and the learner selected one.",
      },
    },
    scenario: "A trainee is helping pick a discontinuous system for a rapid behavior during center time.",
    difficulty: "core",
    tags: ["task 2", "select best measurement system", "partial interval", "brief behavior"],
  }),
  makeQuestion({
    id: "q-t2-nonexample-discontinuous",
    taskNumber: 2,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of discontinuous measurement?",
    choices: [
      { id: "a", text: "Whole-interval recording" },
      { id: "b", text: "Partial-interval recording" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "Counting every occurrence of aggression" },
    ],
    correctAnswer: "d",
    explanation:
      "Counting every occurrence is frequency, a continuous measure. The other options all sample behavior during intervals or moments.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Whole interval is a discontinuous method because it scores intervals rather than every response.",
        whenWouldBeCorrect: "It would be a nonexample if it counted every occurrence instead of scoring intervals.",
      },
      b: {
        whyNotCorrectHere: "Partial interval is discontinuous because it samples whether behavior occurred during each interval.",
        whenWouldBeCorrect: "It would be a nonexample if the observer counted each response continuously.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling is discontinuous because it checks only at selected moments.",
        whenWouldBeCorrect: "It would be a nonexample if every response was recorded across the session.",
      },
    },
    scenario: "A supervisor asks the trainee to sort procedures into continuous and discontinuous categories.",
    difficulty: "intro",
    tags: ["task 2", "nonexample", "discontinuous measurement", "frequency"],
  }),
  makeQuestion({
    id: "q-t2-whole-vs-partial-engagement",
    taskNumber: 2,
    questionType: "select-best-measurement",
    prompt: "The goal is sustained independent play. The supervisor wants credit only for intervals where play occurs from start to finish. Which procedure fits?",
    choices: [
      { id: "a", text: "Whole-interval recording" },
      { id: "b", text: "Partial-interval recording" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "Rate" },
    ],
    correctAnswer: "a",
    explanation:
      "Whole interval fits because the target is sustained behavior across the full interval.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Partial interval would score even brief play and could make sustained play look stronger than it was.",
        whenWouldBeCorrect: "Partial interval would fit if any occurrence of a brief behavior was enough to score.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling would check only at the endpoint and miss what happened during the rest of the interval.",
        whenWouldBeCorrect: "It would fit if a quick endpoint estimate was the planned procedure.",
      },
      d: {
        whyNotCorrectHere: "Rate counts responses per time, but sustained play is not a repeated countable response in this prompt.",
        whenWouldBeCorrect: "Rate would fit repeated responses such as requests per minute.",
      },
    },
    scenario: "A trainee is deciding how to score sustained engagement during a play routine.",
    difficulty: "core",
    tags: ["task 2", "whole interval", "sustained behavior", "select best measurement system"],
  }),
  makeQuestion({
    id: "q-t2-mts-scenario",
    taskNumber: 2,
    questionType: "scenario-choice",
    prompt: "Every 2 minutes, the timer beeps. The technician looks up and records whether the learner is in seat at that instant. Which system is shown?",
    choices: [
      { id: "a", text: "Momentary time sampling" },
      { id: "b", text: "Partial-interval recording" },
      { id: "c", text: "Whole-interval recording" },
      { id: "d", text: "Duration" },
    ],
    correctAnswer: "a",
    explanation:
      "Momentary time sampling is correct because the observer checks only at the timer signal.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Partial interval would require tracking whether in-seat occurred at any point during the interval.",
        whenWouldBeCorrect: "It would fit if the data sheet scored any occurrence within each 2-minute interval.",
      },
      c: {
        whyNotCorrectHere: "Whole interval would require knowing whether the learner stayed seated the entire 2 minutes.",
        whenWouldBeCorrect: "It would fit if the target was continuous in-seat behavior across the full interval.",
      },
      d: {
        whyNotCorrectHere: "Duration would time how long the learner remained seated, not check at a moment.",
        whenWouldBeCorrect: "It would fit if the data sheet asked for total seated time.",
      },
    },
    scenario: "A trainee practices checking behavior only at each timer beep.",
    difficulty: "intro",
    tags: ["task 2", "momentary time sampling", "scenario"],
  }),
  makeQuestion({
    id: "q-t2-interval-scoring-boundary",
    taskNumber: 2,
    questionType: "short-applied",
    prompt: "During a 30-second interval, behavior happens for the first 5 seconds and is absent when the interval ends. Which score is correct?",
    choices: [
      { id: "a", text: "Partial interval yes; whole interval no; momentary time sampling no" },
      { id: "b", text: "Partial interval no; whole interval yes; momentary time sampling yes" },
      { id: "c", text: "All three systems score yes" },
      { id: "d", text: "All three systems score no" },
    ],
    correctAnswer: "a",
    explanation:
      "Partial interval scores yes because the behavior happened at some point. Whole interval scores no because it did not last the full interval. Momentary time sampling scores no because it was absent at the endpoint.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This reverses the rules for all three systems.",
        whenWouldBeCorrect: "No common interval rule would score this exact pattern that way.",
      },
      c: {
        whyNotCorrectHere: "All three would not score yes because the behavior did not last the whole interval and was absent at the endpoint.",
        whenWouldBeCorrect: "All three could score yes if the behavior occurred for the entire interval and was present at the endpoint.",
      },
      d: {
        whyNotCorrectHere: "All three would not score no because partial interval counts any occurrence.",
        whenWouldBeCorrect: "All three would score no if the behavior never occurred during the interval.",
      },
    },
    scenario: "A supervisor gives the trainee one interval and asks how each discontinuous method would score it.",
    difficulty: "challenge",
    tags: ["task 2", "partial interval", "whole interval", "momentary time sampling", "short applied"],
  }),
  makeQuestion({
    id: "q-t2-sampling-limits",
    taskNumber: 2,
    questionType: "multiple-choice",
    prompt: "Why should a trainee be cautious when interpreting discontinuous measurement data?",
    choices: [
      { id: "a", text: "It samples behavior and may not show the exact count or exact duration." },
      { id: "b", text: "It always records every response more accurately than frequency." },
      { id: "c", text: "It can only be used for preference assessments." },
      { id: "d", text: "It cannot be used during client observation." },
    ],
    correctAnswer: "a",
    explanation:
      "Discontinuous systems are useful, but they sample behavior. The data should be interpreted as estimates based on the scoring rule.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This is wrong because interval scoring can hide how many responses actually occurred.",
        whenWouldBeCorrect: "Frequency would be better when every occurrence can be counted and exact count matters.",
      },
      c: {
        whyNotCorrectHere: "Discontinuous measurement is for behavior data, not only preference assessments.",
        whenWouldBeCorrect: "Preference assessments would be correct when the goal is to identify likely preferred items or activities.",
      },
      d: {
        whyNotCorrectHere: "Discontinuous systems can be used during observation when the plan calls for them.",
        whenWouldBeCorrect: "This would be a concern only if a specific setting or plan prohibited the procedure.",
      },
    },
    scenario: "A trainee is explaining interval data to a supervisor after a role-play observation.",
    difficulty: "challenge",
    tags: ["task 2", "discontinuous measurement", "data interpretation"],
  }),
  makeQuestion({
    id: "q-t3-line-graph-time",
    taskNumber: 3,
    questionType: "multiple-choice",
    prompt: "Which graph is usually best for showing behavior change across sessions?",
    choices: [
      { id: "a", text: "Line graph" },
      { id: "b", text: "Bar graph" },
      { id: "c", text: "Preference array" },
      { id: "d", text: "ABC checklist" },
    ],
    correctAnswer: "a",
    explanation:
      "A line graph is correct because it displays repeated data points across time or sessions, making change easier to see.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A bar graph compares categories well, but it is usually less useful for session-by-session change.",
        whenWouldBeCorrect: "A bar graph would fit comparing total responses across activities, settings, or items.",
      },
      c: {
        whyNotCorrectHere: "A preference array is part of a choice assessment, not a graph for behavior change over time.",
        whenWouldBeCorrect: "It would fit if the learner were selecting among items in a preference assessment.",
      },
      d: {
        whyNotCorrectHere: "An ABC checklist organizes context around behavior but does not graph repeated data.",
        whenWouldBeCorrect: "It would fit if the task were to record antecedent, behavior, and consequence information.",
      },
    },
    scenario: "A trainee is asked to update a display after several sessions of frequency data.",
    difficulty: "intro",
    tags: ["task 3", "line graph", "data and graphs"],
  }),
  makeQuestion({
    id: "q-t3-bar-graph-categories",
    taskNumber: 3,
    questionType: "select-best-measurement",
    prompt: "The supervisor wants to compare total requests during art, snack, and recess. Which graph fits best?",
    choices: [
      { id: "a", text: "Bar graph" },
      { id: "b", text: "Line graph" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "ABC data sheet" },
    ],
    correctAnswer: "a",
    explanation:
      "A bar graph is best because the main comparison is across categories, not across time.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A line graph is better for showing change over sessions, not a simple category comparison.",
        whenWouldBeCorrect: "It would be correct if the team wanted to see requests over several days.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling is a data collection method, not the graph display requested.",
        whenWouldBeCorrect: "It would be correct if the team checked whether behavior occurred at interval endpoints.",
      },
      d: {
        whyNotCorrectHere: "ABC data would show context around behavior, not a category comparison of totals.",
        whenWouldBeCorrect: "It would be correct if the team needed what happened before and after behavior.",
      },
    },
    scenario: "A trainee is choosing a graph type for three activity categories.",
    difficulty: "intro",
    tags: ["task 3", "bar graph", "line graph", "categories"],
  }),
  makeQuestion({
    id: "q-t3-permanent-product",
    taskNumber: 3,
    questionType: "scenario-choice",
    prompt: "After class, the technician counts how many sorting cards were correctly placed in bins. What kind of measurement is this?",
    choices: [
      { id: "a", text: "Permanent product measurement" },
      { id: "b", text: "Latency" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "Indirect preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Permanent product measurement is correct because the result of behavior remains available after the behavior occurs.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Latency would require timing from a cue to response start, which is not happening here.",
        whenWouldBeCorrect: "It would be correct if timing began with 'sort the cards' and ended when the learner started sorting.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling checks behavior at a moment, not products after the session.",
        whenWouldBeCorrect: "It would be correct if the observer checked sorting only when each interval ended.",
      },
      d: {
        whyNotCorrectHere: "Indirect preference assessment gathers reports about preferences and does not measure completed work.",
        whenWouldBeCorrect: "It would be correct if staff interviewed a caregiver about likely preferred activities.",
      },
    },
    scenario: "A trainee reviews completed work after a session instead of watching every sorting response live.",
    difficulty: "intro",
    tags: ["task 3", "permanent product", "data"],
  }),
  makeQuestion({
    id: "q-t3-visual-analysis",
    taskNumber: 3,
    questionType: "multiple-choice",
    prompt: "Which set of features belongs to visual analysis of graphed behavior data?",
    choices: [
      { id: "a", text: "Level, trend, and variability" },
      { id: "b", text: "Antecedent, behavior, and consequence" },
      { id: "c", text: "SD, response, and consequence" },
      { id: "d", text: "Survey, interview, and report" },
    ],
    correctAnswer: "a",
    explanation:
      "Level, trend, and variability are graph features that help teams interpret behavior change.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Antecedent, behavior, and consequence are ABC data parts, not graph-pattern features.",
        whenWouldBeCorrect: "This would be correct if the question asked what to record around a behavior event.",
      },
      c: {
        whyNotCorrectHere: "SD, response, and consequence describe a teaching trial, not visual analysis.",
        whenWouldBeCorrect: "This would be correct for discrete-trial teaching structure.",
      },
      d: {
        whyNotCorrectHere: "Surveys, interviews, and reports are indirect assessment tools, not graph features.",
        whenWouldBeCorrect: "This would be correct for an indirect preference assessment.",
      },
    },
    scenario: "A trainee is asked what to look for after entering data and updating a graph.",
    difficulty: "core",
    tags: ["task 3", "visual analysis", "level", "trend", "variability"],
  }),
  makeQuestion({
    id: "q-t3-data-entry-accuracy",
    taskNumber: 3,
    questionType: "short-applied",
    prompt: "A data sheet shows 8, 10, and 9 responses for three sessions. The graph shows 8, 19, and 9. What should the trainee do first?",
    choices: [
      { id: "a", text: "Check the data entry because one graphed value does not match the source data." },
      { id: "b", text: "Change the data sheet to match the graph without asking." },
      { id: "c", text: "Ignore it because graphing errors do not affect decisions." },
      { id: "d", text: "Convert the data to ABC notes." },
    ],
    correctAnswer: "a",
    explanation:
      "The trainee should check the entry because Task 3 includes entering data and updating graphs accurately. A single wrong point can affect visual interpretation.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Changing source data to match a graph would compound the error and may falsify the record.",
        whenWouldBeCorrect: "Correcting source data would be appropriate only if the source data itself was verified as wrong through the proper process.",
      },
      c: {
        whyNotCorrectHere: "Graphing errors can mislead team decisions, especially when looking at trend or level.",
        whenWouldBeCorrect: "Ignoring a difference is not appropriate when a data mismatch is identified.",
      },
      d: {
        whyNotCorrectHere: "ABC notes do not solve a data-entry mismatch on a graph.",
        whenWouldBeCorrect: "ABC notes would be correct if the task were to record context around a behavior event.",
      },
    },
    scenario: "A trainee compares source data to a graph before a supervisor review.",
    difficulty: "core",
    tags: ["task 3", "data entry", "graphs", "accuracy"],
  }),
  makeQuestion({
    id: "q-t3-graph-true-false",
    taskNumber: 3,
    questionType: "true-false",
    prompt: "True or false: Graphs can help summarize, communicate, and support decisions from behavior data.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct because graphs make patterns easier to review than raw numbers alone.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because the purpose of graphing is to make data easier to analyze and discuss.",
        whenWouldBeCorrect: "False would fit if the statement said graphs replace accurate data collection.",
      },
    },
    scenario: "A trainee is explaining why the team updates graphs after entering session data.",
    difficulty: "intro",
    tags: ["task 3", "graphs", "true false", "decision making"],
  }),
  makeQuestion({
    id: "q-t3-nonexample-permanent-product",
    taskNumber: 3,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of permanent product measurement?",
    choices: [
      { id: "a", text: "Counting completed math problems after work time" },
      { id: "b", text: "Checking whether toys were put in the correct bins after cleanup" },
      { id: "c", text: "Timing from an instruction to the first response" },
      { id: "d", text: "Counting assembled packets after a vocational task" },
    ],
    correctAnswer: "c",
    explanation:
      "Timing from an instruction to first response is latency. It does not measure a product left behind by behavior.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Completed math problems remain after work time, so this is a permanent product example.",
        whenWouldBeCorrect: "It would be a nonexample if the observer had to watch each response live and no result remained.",
      },
      b: {
        whyNotCorrectHere: "Sorted toys can be inspected after cleanup, so this can be permanent product measurement.",
        whenWouldBeCorrect: "It would be a nonexample if the concern was how quickly cleanup started after a cue.",
      },
      d: {
        whyNotCorrectHere: "Assembled packets are a result left after responding, so they can be measured as a product.",
        whenWouldBeCorrect: "It would be a nonexample if the team timed the gap between assembly responses instead.",
      },
    },
    scenario: "A supervisor asks the trainee to identify which option does not involve a lasting product.",
    difficulty: "core",
    tags: ["task 3", "permanent product", "nonexample", "latency"],
  }),
  makeQuestion({
    id: "q-t3-bar-graph-preference-items",
    taskNumber: 3,
    questionType: "select-best-measurement",
    prompt: "A supervisor asks for a quick display comparing how many times five items were selected in a preference assessment. Which display is best?",
    choices: [
      { id: "a", text: "Bar graph" },
      { id: "b", text: "Line graph" },
      { id: "c", text: "Whole-interval recording" },
      { id: "d", text: "Latency record" },
    ],
    correctAnswer: "a",
    explanation:
      "A bar graph is best because the items are categories being compared.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A line graph would imply change over time or repeated sessions, which is not the focus here.",
        whenWouldBeCorrect: "A line graph would fit if selection totals were tracked across days.",
      },
      c: {
        whyNotCorrectHere: "Whole interval is a data collection procedure, not a graph for item comparisons.",
        whenWouldBeCorrect: "It would fit if measuring whether engagement lasted an entire interval.",
      },
      d: {
        whyNotCorrectHere: "Latency is a timing measure and does not compare item selection totals.",
        whenWouldBeCorrect: "It would fit if timing how long it took to choose after an item array was presented.",
      },
    },
    scenario: "A trainee needs to summarize selection counts by item after an assessment.",
    difficulty: "core",
    tags: ["task 3", "bar graph", "preference assessment", "categories"],
  }),
  makeQuestion({
    id: "q-t3-line-graph-trend",
    taskNumber: 3,
    questionType: "scenario-choice",
    prompt: "A graph shows aggression counts decreasing across eight sessions after a plan change. What graph feature is the trainee most directly describing?",
    choices: [
      { id: "a", text: "Trend" },
      { id: "b", text: "Consequence" },
      { id: "c", text: "Preference hierarchy" },
      { id: "d", text: "IRT" },
    ],
    correctAnswer: "a",
    explanation:
      "Trend is correct because the trainee is describing the direction of data across sessions.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Consequence refers to what follows behavior in ABC data, not the direction of graphed data.",
        whenWouldBeCorrect: "It would be correct if the question asked what happened right after aggression.",
      },
      c: {
        whyNotCorrectHere: "A preference hierarchy ranks likely preferred items and is not a graph trend.",
        whenWouldBeCorrect: "It would be correct after a preference assessment ranked selected items.",
      },
      d: {
        whyNotCorrectHere: "IRT is a timing measure between responses, not a graph pattern.",
        whenWouldBeCorrect: "It would be correct if the data were time between aggression episodes.",
      },
    },
    scenario: "A trainee is describing a line graph during a supervisor meeting.",
    difficulty: "core",
    tags: ["task 3", "trend", "visual analysis", "line graph"],
  }),
  makeQuestion({
    id: "q-t3-graph-choice-nonexample",
    taskNumber: 3,
    questionType: "identify-nonexample",
    prompt: "Which action is a nonexample of Task 3 data and graph work?",
    choices: [
      { id: "a", text: "Entering session frequency data into the system" },
      { id: "b", text: "Updating a line graph after data entry" },
      { id: "c", text: "Choosing a bar graph to compare activity categories" },
      { id: "d", text: "Running a paired-choice preference assessment trial" },
    ],
    correctAnswer: "d",
    explanation:
      "Running the paired-choice trial is Task 4 preference-assessment work. Task 3 focuses on data entry and graph updates.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Entering session data is directly part of Task 3.",
        whenWouldBeCorrect: "It would be a nonexample if the trainee were collecting ABC context instead of entering graph data.",
      },
      b: {
        whyNotCorrectHere: "Updating a graph after data entry is directly part of Task 3.",
        whenWouldBeCorrect: "It would be a nonexample if no data display was being updated.",
      },
      c: {
        whyNotCorrectHere: "Choosing an appropriate graph type is part of displaying and communicating data.",
        whenWouldBeCorrect: "It would be a nonexample if the activity involved presenting choices to identify preference.",
      },
    },
    scenario: "A supervisor asks the trainee to separate graphing work from assessment administration.",
    difficulty: "intro",
    tags: ["task 3", "nonexample", "paired choice", "data and graphs"],
  }),
  makeQuestion({
    id: "q-t4-indirect-preference-assessment",
    taskNumber: 4,
    questionType: "multiple-choice",
    prompt: "Which example best fits an indirect preference assessment?",
    choices: [
      { id: "a", text: "Asking a caregiver which activities the learner usually chooses at home" },
      { id: "b", text: "Presenting two items and recording which one the learner selects" },
      { id: "c", text: "Letting the learner move freely among several items while timing engagement" },
      { id: "d", text: "Presenting one item at a time and recording approach" },
    ],
    correctAnswer: "a",
    explanation:
      "Indirect preference assessment is correct because information is gathered through report rather than direct item presentation.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This describes paired-choice assessment, a direct method.",
        whenWouldBeCorrect: "It would be correct when two items are presented and the learner chooses one.",
      },
      c: {
        whyNotCorrectHere: "This describes free operant assessment, a direct method with multiple available options.",
        whenWouldBeCorrect: "It would be correct when the learner has free access to several items and engagement is measured.",
      },
      d: {
        whyNotCorrectHere: "This describes single-stimulus assessment, not an interview or survey.",
        whenWouldBeCorrect: "It would be correct when one item is presented at a time and approach or engagement is recorded.",
      },
    },
    scenario: "A trainee is deciding whether a preference-assessment example is indirect or direct.",
    difficulty: "intro",
    tags: ["task 4", "indirect preference assessment", "assessment"],
  }),
  makeQuestion({
    id: "q-t4-free-operant",
    taskNumber: 4,
    questionType: "scenario-choice",
    prompt: "Several toys are available around the room. The learner moves among them while the technician records engagement time. Which assessment is this?",
    choices: [
      { id: "a", text: "Free operant preference assessment" },
      { id: "b", text: "Single-stimulus preference assessment" },
      { id: "c", text: "Paired-choice preference assessment" },
      { id: "d", text: "ABC data collection" },
    ],
    correctAnswer: "a",
    explanation:
      "Free operant is correct because multiple options are freely available and engagement is observed without forced trials.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Single stimulus presents one item at a time, not several items around the room.",
        whenWouldBeCorrect: "It would be correct if one item were presented alone on each trial.",
      },
      c: {
        whyNotCorrectHere: "Paired choice presents two items at a time and requires a choice between them.",
        whenWouldBeCorrect: "It would be correct if the learner selected one item from each two-item pair.",
      },
      d: {
        whyNotCorrectHere: "ABC data records antecedent, behavior, and consequence, not preference engagement across items.",
        whenWouldBeCorrect: "It would be correct if the technician documented what happened before and after a behavior event.",
      },
    },
    scenario: "A trainee conducts a direct assessment in a play area with multiple available materials.",
    difficulty: "intro",
    tags: ["task 4", "free operant", "preference assessment", "scenario"],
  }),
  makeQuestion({
    id: "q-t4-single-stimulus",
    taskNumber: 4,
    questionType: "multiple-choice",
    prompt: "Which rule best describes a single-stimulus preference assessment?",
    choices: [
      { id: "a", text: "Present one item at a time and record approach or engagement." },
      { id: "b", text: "Present two items and require the learner to choose one." },
      { id: "c", text: "Present an array and remove selected items after each choice." },
      { id: "d", text: "Ask staff what the learner likes without presenting items." },
    ],
    correctAnswer: "a",
    explanation:
      "Single stimulus is correct because each trial presents one item by itself and records the learner's response to that item.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Two items at a time describes paired choice, not single stimulus.",
        whenWouldBeCorrect: "It would be correct when the procedure compares two items on each trial.",
      },
      c: {
        whyNotCorrectHere: "Removing selected items from an array describes MSWO.",
        whenWouldBeCorrect: "It would be correct when multiple items are presented and chosen items are removed until the array is depleted.",
      },
      d: {
        whyNotCorrectHere: "Asking staff is indirect; it does not directly present items to the learner.",
        whenWouldBeCorrect: "It would be correct for an indirect preference assessment.",
      },
    },
    scenario: "A trainee is reviewing direct preference-assessment formats before role-play.",
    difficulty: "intro",
    tags: ["task 4", "single stimulus", "preference assessment"],
  }),
  makeQuestion({
    id: "q-t4-paired-choice",
    taskNumber: 4,
    questionType: "scenario-choice",
    prompt: "The technician presents crackers and a puzzle, records the selected item, then presents a new two-item pair. Which format is shown?",
    choices: [
      { id: "a", text: "Paired-choice preference assessment" },
      { id: "b", text: "MSW preference assessment" },
      { id: "c", text: "Free operant preference assessment" },
      { id: "d", text: "Momentary time sampling" },
    ],
    correctAnswer: "a",
    explanation:
      "Paired choice is correct because two items are presented and the learner selects one from the pair.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "MSW uses an array of three or more items and replaces selected items after choice.",
        whenWouldBeCorrect: "It would be correct if several items were presented together and the chosen item returned to the array.",
      },
      c: {
        whyNotCorrectHere: "Free operant allows access to multiple items without structured two-item choice trials.",
        whenWouldBeCorrect: "It would be correct if the learner freely moved among items while engagement was observed.",
      },
      d: {
        whyNotCorrectHere: "Momentary time sampling is a discontinuous measurement procedure, not a preference assessment format.",
        whenWouldBeCorrect: "It would be correct if behavior was checked only at interval endpoints.",
      },
    },
    scenario: "A trainee practices preference trials using two options at a time.",
    difficulty: "core",
    tags: ["task 4", "paired choice", "forced choice", "scenario"],
  }),
  makeQuestion({
    id: "q-t4-msw-replacement",
    taskNumber: 4,
    questionType: "multiple-choice",
    prompt: "In an MSW assessment, what happens to the selected item after a choice?",
    choices: [
      { id: "a", text: "It is placed back in the array for later choices." },
      { id: "b", text: "It is removed until all items have been selected." },
      { id: "c", text: "It is the only item presented on the next trial." },
      { id: "d", text: "It is recorded as an antecedent in ABC data." },
    ],
    correctAnswer: "a",
    explanation:
      "MSW means multiple stimulus with replacement, so the selected item returns to the array.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Removing selected items describes MSWO, not MSW.",
        whenWouldBeCorrect: "It would be correct for multiple stimulus without replacement.",
      },
      c: {
        whyNotCorrectHere: "Presenting only one item on the next trial would fit single-stimulus procedures more than MSW.",
        whenWouldBeCorrect: "It would be correct if the assessment presented one item at a time.",
      },
      d: {
        whyNotCorrectHere: "ABC data uses antecedents differently and does not describe item replacement in a preference array.",
        whenWouldBeCorrect: "It would be correct if documenting what happened before a behavior event.",
      },
    },
    scenario: "A trainee is setting up a multiple-stimulus preference assessment with replacement.",
    difficulty: "core",
    tags: ["task 4", "MSW", "MSWO", "replacement"],
  }),
  makeQuestion({
    id: "q-t4-mswo-removal",
    taskNumber: 4,
    questionType: "scenario-choice",
    prompt: "Five items are presented. After the learner chooses one, that item is removed from the next trial until every item has been selected. Which format is this?",
    choices: [
      { id: "a", text: "MSWO" },
      { id: "b", text: "MSW" },
      { id: "c", text: "Single stimulus" },
      { id: "d", text: "Indirect assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "MSWO is correct because selected items are removed, making it multiple stimulus without replacement.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "MSW would put the selected item back into the array after each choice.",
        whenWouldBeCorrect: "It would be correct if selected items returned to the next array.",
      },
      c: {
        whyNotCorrectHere: "Single stimulus presents one item at a time, not an array of five.",
        whenWouldBeCorrect: "It would be correct if each trial showed only one option.",
      },
      d: {
        whyNotCorrectHere: "Indirect assessment gathers reports and does not present item arrays directly.",
        whenWouldBeCorrect: "It would be correct if preferences were gathered through interviews or surveys.",
      },
    },
    scenario: "A trainee conducts a multiple-stimulus assessment and removes chosen items from later trials.",
    difficulty: "core",
    tags: ["task 4", "MSWO", "MSW", "preference assessment"],
  }),
  makeQuestion({
    id: "q-t4-preference-not-reinforcer-true-false",
    taskNumber: 4,
    questionType: "true-false",
    prompt: "True or false: A preference assessment proves that an item will function as a reinforcer.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "b",
    explanation:
      "False is correct because preference assessments identify likely preferred items. Reinforcement is shown when access to an item increases future behavior.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "True is not correct because selecting or engaging with an item does not by itself prove it increases behavior.",
        whenWouldBeCorrect: "True would fit only if a separate reinforcer assessment or intervention data showed behavior increased because of that item.",
      },
    },
    scenario: "A trainee is explaining what preference assessment results can and cannot prove.",
    difficulty: "challenge",
    tags: ["task 4", "preference assessment", "reinforcer", "true false"],
  }),
  makeQuestion({
    id: "q-t4-nonexample-preference",
    taskNumber: 4,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of conducting a preference assessment?",
    choices: [
      { id: "a", text: "Presenting two snacks and recording the one selected" },
      { id: "b", text: "Interviewing a caregiver about likely preferred activities" },
      { id: "c", text: "Recording what happened before and after elopement" },
      { id: "d", text: "Presenting several items and tracking engagement" },
    ],
    correctAnswer: "c",
    explanation:
      "Recording what happened before and after elopement is ABC data collection, not preference assessment.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Two snacks and one selection is paired-choice preference assessment.",
        whenWouldBeCorrect: "It would be a nonexample if the record focused on behavior context rather than item selection.",
      },
      b: {
        whyNotCorrectHere: "Caregiver interview is an indirect preference assessment.",
        whenWouldBeCorrect: "It would be a nonexample if the interview were about antecedents and consequences of behavior instead of preferences.",
      },
      d: {
        whyNotCorrectHere: "Several available items with engagement tracking can be a free operant format.",
        whenWouldBeCorrect: "It would be a nonexample if no item preference or engagement information was being gathered.",
      },
    },
    scenario: "A supervisor asks the trainee to separate preference-assessment examples from ABC data examples.",
    difficulty: "intro",
    tags: ["task 4", "nonexample", "ABC data", "preference assessment"],
  }),
  makeQuestion({
    id: "q-t4-select-less-structured",
    taskNumber: 4,
    questionType: "select-best-measurement",
    prompt: "The learner does not tolerate forced choices well. The team wants to see what the learner approaches when several safe options are freely available. Which format fits best?",
    choices: [
      { id: "a", text: "Free operant" },
      { id: "b", text: "Paired choice" },
      { id: "c", text: "MSWO" },
      { id: "d", text: "Latency recording" },
    ],
    correctAnswer: "a",
    explanation:
      "Free operant fits because the learner can move among several options without structured choice demands.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Paired choice repeatedly requires selecting between two items, which may not fit the learner's current tolerance.",
        whenWouldBeCorrect: "It would be correct when two-item comparisons are acceptable and a hierarchy is needed.",
      },
      c: {
        whyNotCorrectHere: "MSWO also uses structured arrays and removes selected items, which may still involve repeated choice demands.",
        whenWouldBeCorrect: "It would be correct when a multiple-item array with removal is appropriate.",
      },
      d: {
        whyNotCorrectHere: "Latency recording measures time to start a response; it does not identify preferences from item engagement.",
        whenWouldBeCorrect: "It would be correct if timing how quickly a learner approached after an item was presented.",
      },
    },
    scenario: "A trainee is choosing a preference-assessment format for a learner who becomes upset during forced choices.",
    difficulty: "challenge",
    tags: ["task 4", "free operant", "select best measurement system", "choice tolerance"],
  }),
  makeQuestion({
    id: "q-t4-paired-vs-msw",
    taskNumber: 4,
    questionType: "multiple-choice",
    prompt: "What is a key difference between paired choice and MSW?",
    choices: [
      { id: "a", text: "Paired choice presents two items; MSW presents an array of several items with replacement." },
      { id: "b", text: "Paired choice is indirect; MSW is an interview." },
      { id: "c", text: "Paired choice records ABC data; MSW records duration only." },
      { id: "d", text: "Paired choice removes all selected items; MSW presents only one item." },
    ],
    correctAnswer: "a",
    explanation:
      "This distinction is correct because paired choice compares two options at a time, while MSW uses a multiple-item array and replaces selected items.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Both paired choice and MSW are direct preference-assessment formats, not interviews.",
        whenWouldBeCorrect: "Indirect would be correct for caregiver surveys or interviews.",
      },
      c: {
        whyNotCorrectHere: "Neither format is ABC data collection; both record selections or engagement with items.",
        whenWouldBeCorrect: "ABC data would be correct when documenting antecedent, behavior, and consequence events.",
      },
      d: {
        whyNotCorrectHere: "This mixes up the formats. Removing selected items is MSWO, and one item at a time is single stimulus.",
        whenWouldBeCorrect: "Removal would be correct for MSWO; one item would be correct for single-stimulus assessment.",
      },
    },
    scenario: "A trainee compares two direct preference-assessment formats before role-play.",
    difficulty: "core",
    tags: ["task 4", "paired choice", "MSW", "comparison"],
  }),
  makeQuestion({
    id: "q-t5-abc-components",
    taskNumber: 5,
    questionType: "multiple-choice",
    prompt: "What does ABC data organize?",
    choices: [
      { id: "a", text: "Antecedent, behavior, and consequence" },
      { id: "b", text: "Ask, behavior, and correction" },
      { id: "c", text: "Array, behavior, and choice" },
      { id: "d", text: "Accuracy, bar graph, and category" },
    ],
    correctAnswer: "a",
    explanation:
      "ABC data separates what happened before the behavior, the observable behavior, and what happened after.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This sounds like a teaching sequence, not ABC data collection.",
        whenWouldBeCorrect: "Ask, behavior, consequence would fit a simplified DTT trial structure, not Task 5 ABC data.",
      },
      c: {
        whyNotCorrectHere: "Array and choice relate more to preference assessment formats.",
        whenWouldBeCorrect: "This would fit a preference assessment where items are presented and choices are recorded.",
      },
      d: {
        whyNotCorrectHere: "Graphing terms do not describe the ABC sequence around a behavior event.",
        whenWouldBeCorrect: "This would fit Task 3 when entering data and updating graphs.",
      },
    },
    scenario: "A trainee is asked to state the basic parts of an ABC data entry.",
    difficulty: "intro",
    tags: ["task 5", "ABC data", "antecedent", "behavior", "consequence"],
  }),
  makeQuestion({
    id: "q-t5-antecedent-before",
    taskNumber: 5,
    questionType: "scenario-choice",
    prompt: "The teacher says, 'Put the tablet away,' and the learner throws the tablet case. In ABC data, what is the antecedent?",
    choices: [
      { id: "a", text: "The teacher saying, 'Put the tablet away'" },
      { id: "b", text: "The learner throwing the tablet case" },
      { id: "c", text: "Staff picking up the tablet case afterward" },
      { id: "d", text: "The total number of throws this week" },
    ],
    correctAnswer: "a",
    explanation:
      "The antecedent is the event that happened before the behavior, which is the teacher's direction.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Throwing the case is the behavior, not the antecedent.",
        whenWouldBeCorrect: "It would be correct if the question asked for the B in ABC.",
      },
      c: {
        whyNotCorrectHere: "Staff picking up the case happened after behavior, so it is a consequence entry.",
        whenWouldBeCorrect: "It would be correct if the question asked what followed the behavior.",
      },
      d: {
        whyNotCorrectHere: "A weekly count is frequency summary data, not the immediate antecedent.",
        whenWouldBeCorrect: "It would be correct if the question asked for a count across a week.",
      },
    },
    scenario: "A trainee sorts one behavior event into A, B, and C fields.",
    difficulty: "intro",
    tags: ["task 5", "antecedent", "ABC data", "scenario"],
  }),
  makeQuestion({
    id: "q-t5-objective-behavior",
    taskNumber: 5,
    questionType: "identify-nonexample",
    prompt: "Which entry is a nonexample of objective behavior language?",
    choices: [
      { id: "a", text: "Said 'no' and pushed the worksheet away" },
      { id: "b", text: "Dropped to the floor for 45 seconds" },
      { id: "c", text: "Was trying to get revenge" },
      { id: "d", text: "Hit the table with an open hand three times" },
    ],
    correctAnswer: "c",
    explanation:
      "The revenge statement guesses intent. ABC behavior entries should describe observable actions.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This is observable because it reports words and movement without guessing motive.",
        whenWouldBeCorrect: "It would be a nonexample if it said only 'was disrespectful.'",
      },
      b: {
        whyNotCorrectHere: "This is observable and includes duration.",
        whenWouldBeCorrect: "It would be a nonexample if it inferred emotion without describing behavior.",
      },
      d: {
        whyNotCorrectHere: "This is observable and countable.",
        whenWouldBeCorrect: "It would be a nonexample if it labeled the learner as aggressive without describing the action.",
      },
    },
    scenario: "A supervisor asks the trainee to choose the behavior entry that should be rewritten.",
    difficulty: "core",
    tags: ["task 5", "objective behavior", "nonexample", "observable language"],
  }),
  makeQuestion({
    id: "q-t5-consequence-after",
    taskNumber: 5,
    questionType: "multiple-choice",
    prompt: "In ABC data, what does consequence mean?",
    choices: [
      { id: "a", text: "What happened immediately after the behavior" },
      { id: "b", text: "Only a punishment delivered by staff" },
      { id: "c", text: "Only a reward delivered by staff" },
      { id: "d", text: "What the learner was probably thinking" },
    ],
    correctAnswer: "a",
    explanation:
      "Consequence means what followed the behavior. It can include staff responses, peer attention, access, escape, or other environmental changes.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Consequence in ABC data is broader than punishment and may not be planned by staff.",
        whenWouldBeCorrect: "Punishment would be relevant only if an approved procedure reduced future behavior and was part of the plan.",
      },
      c: {
        whyNotCorrectHere: "Consequence is broader than reward; it simply means the event after behavior.",
        whenWouldBeCorrect: "A reward would be correct if the after-event was access to a preferred item delivered after behavior.",
      },
      d: {
        whyNotCorrectHere: "ABC data should not guess thoughts; it records observable events.",
        whenWouldBeCorrect: "Internal states may be discussed clinically by qualified professionals, but they are not an ABC consequence entry.",
      },
    },
    scenario: "A trainee is clarifying the C field on an ABC data sheet.",
    difficulty: "intro",
    tags: ["task 5", "consequence", "ABC data"],
  }),
  makeQuestion({
    id: "q-t5-consequence-true-false",
    taskNumber: 5,
    questionType: "true-false",
    prompt: "True or false: In ABC data, a consequence can be peer laughter, escape from a task, or staff attention.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct because a consequence is any relevant event that follows behavior, not only a formal reward or correction.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because peer, task, and staff events after behavior can all matter in ABC data.",
        whenWouldBeCorrect: "False would fit if the statement said consequence means only punishment.",
      },
    },
    scenario: "A trainee checks whether different after-events can be recorded as consequences.",
    difficulty: "core",
    tags: ["task 5", "consequence", "true false", "ABC data"],
  }),
  makeQuestion({
    id: "q-t5-full-abc-scenario",
    taskNumber: 5,
    questionType: "scenario-choice",
    prompt: "A demand is presented, the learner screams, and staff removes the worksheet. Which ABC sequence is correct?",
    choices: [
      { id: "a", text: "Antecedent: demand; Behavior: screaming; Consequence: worksheet removed" },
      { id: "b", text: "Antecedent: screaming; Behavior: demand; Consequence: worksheet removed" },
      { id: "c", text: "Antecedent: worksheet removed; Behavior: screaming; Consequence: demand" },
      { id: "d", text: "Antecedent: frequency; Behavior: duration; Consequence: rate" },
    ],
    correctAnswer: "a",
    explanation:
      "The sequence is correct because it follows the order before-event, observable behavior, and after-event.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This swaps the antecedent and behavior; the demand happened before screaming.",
        whenWouldBeCorrect: "It would be correct only if screaming occurred first and then a demand was delivered.",
      },
      c: {
        whyNotCorrectHere: "This reverses the actual sequence; removal happened after screaming.",
        whenWouldBeCorrect: "It would be correct if the worksheet was removed before the behavior and the demand followed after.",
      },
      d: {
        whyNotCorrectHere: "Frequency, duration, and rate are measurement terms, not ABC event categories.",
        whenWouldBeCorrect: "They would be correct for Task 1 continuous measurement questions.",
      },
    },
    scenario: "A trainee practices writing one complete ABC entry from a short event.",
    difficulty: "core",
    tags: ["task 5", "ABC sequence", "antecedent", "behavior", "consequence"],
  }),
  makeQuestion({
    id: "q-t5-abc-vs-frequency",
    taskNumber: 5,
    questionType: "select-best-measurement",
    prompt: "The supervisor asks, 'What happened right before and right after each elopement?' Which data system best fits?",
    choices: [
      { id: "a", text: "ABC data" },
      { id: "b", text: "Frequency" },
      { id: "c", text: "Rate" },
      { id: "d", text: "Line graph" },
    ],
    correctAnswer: "a",
    explanation:
      "ABC data is best because the question asks for context before and after the behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Frequency would count elopements but would not show the surrounding events.",
        whenWouldBeCorrect: "Frequency would be correct if the question asked how many elopements occurred.",
      },
      c: {
        whyNotCorrectHere: "Rate would count elopements per time but still would not capture antecedents or consequences.",
        whenWouldBeCorrect: "Rate would be correct if comparing elopements per hour across sessions.",
      },
      d: {
        whyNotCorrectHere: "A line graph displays data over time but is not the collection system for event context.",
        whenWouldBeCorrect: "It would be correct after data are entered and the team needs to display change across sessions.",
      },
    },
    scenario: "A trainee chooses between context recording and count-based measurement.",
    difficulty: "core",
    tags: ["task 5", "ABC data", "frequency", "select best measurement system"],
  }),
  makeQuestion({
    id: "q-t5-short-applied-consequence",
    taskNumber: 5,
    questionType: "short-applied",
    prompt: "After the learner hits the table, a peer looks over and laughs. Which ABC field should include the peer laughter?",
    choices: [
      { id: "a", text: "Consequence" },
      { id: "b", text: "Antecedent" },
      { id: "c", text: "Behavior" },
      { id: "d", text: "Latency" },
    ],
    correctAnswer: "a",
    explanation:
      "Peer laughter belongs in the consequence field because it happened after the behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Antecedent would be what happened before table hitting, not peer laughter afterward.",
        whenWouldBeCorrect: "It would be correct if peer laughter happened before the table hit and may have set the occasion.",
      },
      c: {
        whyNotCorrectHere: "The behavior is the learner hitting the table; peer laughter is a separate after-event.",
        whenWouldBeCorrect: "It would be correct if the target behavior were the peer laughing, which is not the case here.",
      },
      d: {
        whyNotCorrectHere: "Latency is a timing measure from cue to response, not an ABC field.",
        whenWouldBeCorrect: "It would be correct if timing the delay from an instruction to table hitting.",
      },
    },
    scenario: "A trainee is filling out the consequence column after a behavior event.",
    difficulty: "intro",
    tags: ["task 5", "consequence", "short applied", "peer attention"],
  }),
  makeQuestion({
    id: "q-t5-antecedent-vs-setting",
    taskNumber: 5,
    questionType: "multiple-choice",
    prompt: "Which entry best fits the antecedent field for a behavior event?",
    choices: [
      { id: "a", text: "The therapist gave a transition warning and removed the iPad." },
      { id: "b", text: "The learner was rude." },
      { id: "c", text: "Staff talked with the learner after behavior." },
      { id: "d", text: "The graph showed an upward trend." },
    ],
    correctAnswer: "a",
    explanation:
      "The transition warning and iPad removal happened before behavior and are specific enough to be useful antecedent information.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This is a judgment, not a specific antecedent or observable behavior.",
        whenWouldBeCorrect: "A behavior field would be correct if it described exactly what the learner said or did.",
      },
      c: {
        whyNotCorrectHere: "Staff talking after behavior belongs in the consequence field, not the antecedent field.",
        whenWouldBeCorrect: "It would be correct if the question asked what happened after behavior.",
      },
      d: {
        whyNotCorrectHere: "A graph trend summarizes data over time and is not an immediate before-event.",
        whenWouldBeCorrect: "It would be correct for Task 3 visual analysis.",
      },
    },
    scenario: "A trainee practices selecting useful antecedent language for ABC data.",
    difficulty: "core",
    tags: ["task 5", "antecedent", "ABC data", "observable language"],
  }),
  makeQuestion({
    id: "q-t5-abc-limits",
    taskNumber: 5,
    questionType: "multiple-choice",
    prompt: "Which statement best describes what ABC data can do?",
    choices: [
      { id: "a", text: "It can show patterns in events around behavior that may guide supervisor analysis." },
      { id: "b", text: "It proves the function of behavior from one event." },
      { id: "c", text: "It replaces the need for observable behavior definitions." },
      { id: "d", text: "It identifies preferred items without presenting choices." },
    ],
    correctAnswer: "a",
    explanation:
      "ABC data can help identify patterns, but interpretation should be guided by the supervisor and broader clinical information.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "One ABC event does not prove function; it is one piece of descriptive information.",
        whenWouldBeCorrect: "Function conclusions require appropriate assessment and supervisor interpretation.",
      },
      c: {
        whyNotCorrectHere: "ABC data still requires clear, observable behavior descriptions.",
        whenWouldBeCorrect: "Observable definitions are correct when writing the B portion of ABC data.",
      },
      d: {
        whyNotCorrectHere: "Identifying preferred items is preference-assessment work, not ABC data.",
        whenWouldBeCorrect: "It would be correct for indirect preference assessment if gathered through interviews or surveys.",
      },
    },
    scenario: "A trainee explains the role and limits of ABC data during supervision.",
    difficulty: "challenge",
    tags: ["task 5", "ABC data", "patterns", "function", "supervisor analysis"],
  }),
  makeQuestion({
    id: "q-t6-dtt-error-correction",
    taskNumber: 6,
    questionType: "scenario-choice",
    prompt: "During DTT, the technician says, 'Touch cup.' The learner touches the spoon. What should the technician do next?",
    choices: [
      { id: "a", text: "Follow the written error-correction procedure for that program" },
      { id: "b", text: "Deliver the planned reinforcer because the learner responded" },
      { id: "c", text: "Switch to a preference assessment" },
      { id: "d", text: "Record only ABC data and stop teaching" },
    ],
    correctAnswer: "a",
    explanation:
      "The best answer is to follow the written error-correction procedure because the learner made an incorrect response during a structured teaching trial.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Delivering the reinforcer as if the response were correct can teach the wrong selection.",
        whenWouldBeCorrect: "Reinforcement would be correct after the learner makes the target response or after the plan says to reinforce a corrected response.",
      },
      c: {
        whyNotCorrectHere: "A preference assessment identifies possible reinforcers; it does not correct an error inside this DTT trial.",
        whenWouldBeCorrect: "It would be correct if the team needed updated information about likely preferred items.",
      },
      d: {
        whyNotCorrectHere: "ABC data may be useful for behavior context, but the prompt asks about a teaching error, not a behavior event sequence.",
        whenWouldBeCorrect: "ABC data would fit if the target was to document antecedents and consequences around challenging behavior.",
      },
    },
    scenario: "A trainee is role-playing a receptive-label DTT program and the learner selects the wrong item.",
    difficulty: "core",
    tags: ["task 6", "DTT", "error correction", "incorrect response"],
  }),
  makeQuestion({
    id: "q-t6-sd-response-consequence",
    taskNumber: 6,
    questionType: "multiple-choice",
    prompt: "Which option correctly labels the parts of this DTT trial: 'Clap hands,' learner claps, technician says 'Nice clapping' and gives a token?",
    choices: [
      { id: "a", text: "SD: 'Clap hands'; response: clapping; consequence: praise and token" },
      { id: "b", text: "SD: clapping; response: token; consequence: 'Clap hands'" },
      { id: "c", text: "SD: praise; response: instruction; consequence: clapping" },
      { id: "d", text: "Antecedent: token; behavior: praise; consequence: instruction" },
    ],
    correctAnswer: "a",
    explanation:
      "The instruction is the SD, the learner's action is the response, and the praise plus token is the consequence delivered after the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This reverses the order. The token follows the response; it is not the learner's response.",
        whenWouldBeCorrect: "A token would be relevant as a consequence in a token system or DTT reinforcement plan.",
      },
      c: {
        whyNotCorrectHere: "Praise came after clapping, so it cannot be the SD for this trial.",
        whenWouldBeCorrect: "Praise could function as feedback or reinforcement after a correct response.",
      },
      d: {
        whyNotCorrectHere: "This uses ABC labels incorrectly and places the events out of sequence.",
        whenWouldBeCorrect: "ABC labels would fit if the goal was to record context around a behavior event rather than label a DTT trial.",
      },
    },
    scenario: "A supervisor asks the trainee to identify the structure of a completed DTT trial.",
    difficulty: "intro",
    tags: ["task 6", "DTT", "SD", "response", "consequence"],
  }),
  makeQuestion({
    id: "q-t6-nonexample-naturalistic",
    taskNumber: 6,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of DTT?",
    choices: [
      { id: "a", text: "A planned table trial begins with 'Match same' and ends with feedback" },
      { id: "b", text: "The technician runs ten structured receptive ID trials with clear SDs" },
      { id: "c", text: "The learner reaches for bubbles during play, so the therapist prompts 'bubbles please'" },
      { id: "d", text: "A trial has an instruction, learner response, and programmed consequence" },
    ],
    correctAnswer: "c",
    explanation:
      "The bubbles example is more naturalistic because the learner's motivation during play created the teaching opportunity.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "A planned table trial with an instruction and feedback is a DTT example.",
        whenWouldBeCorrect: "It would be a nonexample if the teaching occurred inside a naturally occurring play opportunity.",
      },
      b: {
        whyNotCorrectHere: "A set of structured trials with clear SDs is typical DTT.",
        whenWouldBeCorrect: "It would be a nonexample if there were no discrete trials or planned SDs.",
      },
      d: {
        whyNotCorrectHere: "Instruction, response, and consequence are core DTT components.",
        whenWouldBeCorrect: "It would be a nonexample if the sequence described an ABC data entry instead of a teaching trial.",
      },
    },
    scenario: "A trainee sorts examples of structured DTT and learner-led naturalistic teaching.",
    difficulty: "core",
    tags: ["task 6", "DTT", "naturalistic teaching", "nonexample"],
  }),
  makeQuestion({
    id: "q-t6-error-correction-boundary",
    taskNumber: 6,
    questionType: "multiple-choice",
    prompt: "Why is scolding not an appropriate substitute for a DTT error-correction procedure?",
    choices: [
      { id: "a", text: "Error correction is a teaching sequence; scolding does not teach the correct response" },
      { id: "b", text: "Scolding is the same as least-to-most prompting" },
      { id: "c", text: "Scolding turns DTT into momentary time sampling" },
      { id: "d", text: "Scolding is required before every corrected trial" },
    ],
    correctAnswer: "a",
    explanation:
      "Error correction should guide the learner toward the correct response according to the teaching plan. Scolding adds emotion without teaching the target skill.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Least-to-most prompting is a planned prompt hierarchy, not a reprimand.",
        whenWouldBeCorrect: "Least-to-most would be correct if the plan starts with minimal help and increases prompts as needed.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling is a measurement procedure and has nothing to do with correcting a DTT response.",
        whenWouldBeCorrect: "It would be correct if the task were to check behavior at interval endpoints.",
      },
      d: {
        whyNotCorrectHere: "Scolding is not a required part of DTT and may be harmful or counterproductive.",
        whenWouldBeCorrect: "Following the written error-correction steps would be required when the learner responds incorrectly.",
      },
    },
    scenario: "A trainee asks whether a stern reprimand can replace the written correction steps after an error.",
    difficulty: "core",
    tags: ["task 6", "error correction", "DTT", "wrong-answer boundary"],
  }),
  makeQuestion({
    id: "q-t6-no-response",
    taskNumber: 6,
    questionType: "scenario-choice",
    prompt: "In a DTT trial, the technician gives the SD and the learner does not respond within the planned wait time. What should guide the next action?",
    choices: [
      { id: "a", text: "The program's prompt or error-correction plan" },
      { id: "b", text: "The technician's personal preference that day" },
      { id: "c", text: "A new behavior-reduction plan invented during the session" },
      { id: "d", text: "A bar graph of past data only" },
    ],
    correctAnswer: "a",
    explanation:
      "A no-response during DTT should be handled according to the written prompt or correction procedure so teaching stays consistent.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Personal preference creates inconsistent teaching and may change the procedure without authorization.",
        whenWouldBeCorrect: "Preference may matter when choosing reinforcers after a preference assessment, not when replacing the teaching plan.",
      },
      c: {
        whyNotCorrectHere: "RBTs should not invent new behavior-reduction plans during DTT.",
        whenWouldBeCorrect: "A new plan would need supervisor design and approval before implementation.",
      },
      d: {
        whyNotCorrectHere: "Graphs can inform decisions, but they do not replace the immediate programmed response to a no-response trial.",
        whenWouldBeCorrect: "A bar or line graph would be useful when reviewing patterns with the supervisor.",
      },
    },
    scenario: "A learner looks away and gives no response after a receptive instruction during a structured trial.",
    difficulty: "core",
    tags: ["task 6", "DTT", "no response", "prompting", "error correction"],
  }),
  makeQuestion({
    id: "q-t6-trial-boundary",
    taskNumber: 6,
    questionType: "true-false",
    prompt: "True or false: In DTT, the consequence should be connected to the learner's response in that trial.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct. A DTT trial includes a consequence that follows the response, such as reinforcement for correct responding or correction for errors.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because consequences are part of the trial structure and should match the response according to the plan.",
        whenWouldBeCorrect: "False would fit if the statement said consequences should be random and unrelated to responding.",
      },
    },
    scenario: "A trainee reviews why planned feedback matters inside discrete teaching trials.",
    difficulty: "intro",
    tags: ["task 6", "DTT", "consequence", "true false"],
  }),
  makeQuestion({
    id: "q-t6-clean-trial",
    taskNumber: 6,
    questionType: "identify-nonexample",
    prompt: "Which action would most likely interfere with a clean DTT trial?",
    choices: [
      { id: "a", text: "Giving the SD clearly and waiting the planned response interval" },
      { id: "b", text: "Presenting the materials listed in the program" },
      { id: "c", text: "Adding extra hints not listed in the plan before the learner can respond" },
      { id: "d", text: "Recording whether the response was correct" },
    ],
    correctAnswer: "c",
    explanation:
      "Extra unplanned hints can change the prompt level and make it unclear whether the learner responded to the SD or to the added help.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "A clear SD and planned wait time support a clean trial.",
        whenWouldBeCorrect: "It would interfere if the SD were unclear or the wait time ignored the plan.",
      },
      b: {
        whyNotCorrectHere: "Using listed materials supports procedural integrity.",
        whenWouldBeCorrect: "It would interfere if materials were changed in a way that altered the task.",
      },
      d: {
        whyNotCorrectHere: "Recording correct or incorrect responses is part of implementing many DTT programs.",
        whenWouldBeCorrect: "It would interfere only if data recording distracted from safety or changed trial delivery.",
      },
    },
    scenario: "A supervisor watches for extra cues during the trainee's DTT role-play.",
    difficulty: "challenge",
    tags: ["task 6", "DTT", "prompting", "procedural integrity", "nonexample"],
  }),
  makeQuestion({
    id: "q-t6-corrected-response",
    taskNumber: 6,
    questionType: "short-applied",
    prompt: "After an incorrect DTT response, the technician models the correct response and has the learner try again. What should determine whether praise or a token follows?",
    choices: [
      { id: "a", text: "The written error-correction and reinforcement procedure" },
      { id: "b", text: "Whether the learner smiles after the prompt" },
      { id: "c", text: "Whether the technician wants to end the session quickly" },
      { id: "d", text: "The number of choices in the preference array" },
    ],
    correctAnswer: "a",
    explanation:
      "The plan should state how to respond to corrected trials. Some programs reinforce corrected responses differently from independent correct responses.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A smile does not define the programmed consequence for a corrected trial.",
        whenWouldBeCorrect: "Learner affect may be relevant to rapport or preference observations, but not as the rule for DTT consequences.",
      },
      c: {
        whyNotCorrectHere: "Convenience should not determine teaching consequences.",
        whenWouldBeCorrect: "Session timing matters for scheduling, but it does not replace the clinical plan.",
      },
      d: {
        whyNotCorrectHere: "Preference array size relates to Task 4 assessments, not the consequence rule after DTT correction.",
        whenWouldBeCorrect: "It would be relevant when conducting MSW or MSWO preference assessments.",
      },
    },
    scenario: "A trainee asks how much reinforcement to deliver after a prompted correction.",
    difficulty: "challenge",
    tags: ["task 6", "DTT", "corrected response", "reinforcement", "error correction"],
  }),
  makeQuestion({
    id: "q-t6-dtt-vs-abc",
    taskNumber: 6,
    questionType: "multiple-choice",
    prompt: "A trial begins with 'Point to red,' the learner points to red, and the therapist delivers praise. Why is this DTT rather than ABC data collection?",
    choices: [
      { id: "a", text: "It is a planned teaching trial with an SD, response, and consequence" },
      { id: "b", text: "It records only what happened after challenging behavior" },
      { id: "c", text: "It samples behavior at the end of intervals" },
      { id: "d", text: "It identifies preferred items through choices" },
    ],
    correctAnswer: "a",
    explanation:
      "The sequence is DTT because it is an arranged teaching opportunity with a specific SD, target response, and planned consequence.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "ABC data would document before, behavior, and after events around behavior, not deliver a structured teaching trial.",
        whenWouldBeCorrect: "It would be correct if the task were to record context around challenging behavior.",
      },
      c: {
        whyNotCorrectHere: "Interval sampling is discontinuous measurement, not DTT.",
        whenWouldBeCorrect: "It would be correct if behavior were scored only at interval endpoints or across intervals.",
      },
      d: {
        whyNotCorrectHere: "Preference assessment identifies possible reinforcers, while this prompt is teaching color discrimination.",
        whenWouldBeCorrect: "It would be correct if the learner were choosing among items to show preference.",
      },
    },
    scenario: "A trainee compares a DTT trial to other task areas from the competency map.",
    difficulty: "core",
    tags: ["task 6", "DTT", "ABC data", "task discrimination"],
  }),
  makeQuestion({
    id: "q-t6-fade-extra-cues",
    taskNumber: 6,
    questionType: "scenario-choice",
    prompt: "During DTT, the learner answers only when the technician leans toward the correct item. What should the trainee consider with the supervisor?",
    choices: [
      { id: "a", text: "The learner may be responding to an unintended prompt that needs to be faded" },
      { id: "b", text: "The learner has mastered the skill under the natural SD" },
      { id: "c", text: "The trial should be scored as independent every time" },
      { id: "d", text: "The behavior should be measured with whole-interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "The lean may be an unintended prompt. If the learner depends on it, the team should address prompt fading or stimulus control transfer.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Mastery under the natural SD is not shown if the learner needs an extra body cue.",
        whenWouldBeCorrect: "It would be correct if the learner responded reliably to the planned SD without added cues.",
      },
      c: {
        whyNotCorrectHere: "Scoring as independent may be inaccurate when an unintended prompt controls the response.",
        whenWouldBeCorrect: "Independent scoring would fit if no prompt or cue beyond the planned SD was used.",
      },
      d: {
        whyNotCorrectHere: "Whole interval measures sustained behavior and does not solve prompt dependence in DTT.",
        whenWouldBeCorrect: "It would be correct for scoring behavior that must occur for an entire interval.",
      },
    },
    scenario: "A supervisor notices the trainee's body position may cue correct answers during receptive-label trials.",
    difficulty: "challenge",
    tags: ["task 6", "DTT", "prompt fading", "stimulus control transfer"],
  }),
  makeQuestion({
    id: "q-t7-capturing-opportunity",
    taskNumber: 7,
    questionType: "scenario-choice",
    prompt: "A learner reaches for a closed paint bottle during art. The therapist prompts the learner to request 'open.' What is this?",
    choices: [
      { id: "a", text: "Capturing a learning opportunity" },
      { id: "b", text: "Contriving a learning opportunity" },
      { id: "c", text: "Backward chaining" },
      { id: "d", text: "Whole-interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "This is capturing because the learner's motivation and opportunity appeared naturally during the activity.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Contriving would mean the therapist arranged the setup ahead of time to create the opportunity.",
        whenWouldBeCorrect: "It would be correct if the therapist intentionally placed desired materials in a hard-to-open container.",
      },
      c: {
        whyNotCorrectHere: "Backward chaining teaches a step sequence from the last step backward, not a request in a natural moment.",
        whenWouldBeCorrect: "It would be correct if the learner practiced the final step of a task analysis first.",
      },
      d: {
        whyNotCorrectHere: "Whole interval is a measurement system and does not describe the teaching opportunity.",
        whenWouldBeCorrect: "It would be correct if behavior had to occur for a full interval to be scored.",
      },
    },
    scenario: "A therapist uses the learner's naturally occurring motivation during art to teach communication.",
    difficulty: "intro",
    tags: ["task 7", "naturalistic teaching", "capturing", "motivation"],
  }),
  makeQuestion({
    id: "q-t7-contriving-opportunity",
    taskNumber: 7,
    questionType: "scenario-choice",
    prompt: "Before snack, the therapist puts the learner's favorite crackers in a clear container that the learner cannot open independently. What is this?",
    choices: [
      { id: "a", text: "Contriving a learning opportunity" },
      { id: "b", text: "Capturing a learning opportunity" },
      { id: "c", text: "Stimulus fading" },
      { id: "d", text: "DRO" },
    ],
    correctAnswer: "a",
    explanation:
      "This is contriving because the therapist arranged the environment to create a reason for the learner to communicate.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Capturing uses an opportunity that naturally appears; here the therapist set up the situation.",
        whenWouldBeCorrect: "It would be correct if the learner independently approached a naturally closed container during routine snack.",
      },
      c: {
        whyNotCorrectHere: "Stimulus fading gradually removes an added cue; the prompt describes arranging motivation.",
        whenWouldBeCorrect: "It would be correct if a highlighted cue on the container were gradually reduced.",
      },
      d: {
        whyNotCorrectHere: "DRO reinforces the absence of a target behavior for an interval and is not shown here.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered for no target behavior during a set interval.",
      },
    },
    scenario: "A therapist prepares snack materials to create a communication opportunity before the learner enters the room.",
    difficulty: "core",
    tags: ["task 7", "naturalistic teaching", "contriving", "communication"],
  }),
  makeQuestion({
    id: "q-t7-natural-reinforcement",
    taskNumber: 7,
    questionType: "multiple-choice",
    prompt: "A learner asks for a ball during play, and the therapist gives the ball. Why is this a natural reinforcer?",
    choices: [
      { id: "a", text: "The consequence directly matches what the learner requested" },
      { id: "b", text: "The therapist gives an unrelated token for every response" },
      { id: "c", text: "The therapist waits until the end of the day to deliver reinforcement" },
      { id: "d", text: "The learner receives correction instead of access" },
    ],
    correctAnswer: "a",
    explanation:
      "The ball is a natural reinforcer because it is the direct outcome of asking for the ball in that context.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "An unrelated token can be a programmed reinforcer, but it is less directly tied to the response than access to the requested ball.",
        whenWouldBeCorrect: "A token would be correct in a token system when the plan says responses earn exchangeable tokens.",
      },
      c: {
        whyNotCorrectHere: "Delayed reinforcement is not the natural immediate result of the request in play.",
        whenWouldBeCorrect: "A delayed exchange might fit some token systems, not this naturalistic request.",
      },
      d: {
        whyNotCorrectHere: "Correction after an appropriate request would not match the learner's motivation or reinforce the request.",
        whenWouldBeCorrect: "Correction would fit an incorrect response when the teaching plan calls for it.",
      },
    },
    scenario: "A trainee is identifying the consequence in a naturalistic communication opportunity.",
    difficulty: "intro",
    tags: ["task 7", "naturalistic teaching", "natural reinforcement"],
  }),
  makeQuestion({
    id: "q-t7-nonexample-naturalistic",
    taskNumber: 7,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of naturalistic teaching?",
    choices: [
      { id: "a", text: "Prompting a request when the learner reaches for bubbles during play" },
      { id: "b", text: "Embedding a color label while the learner chooses crayons" },
      { id: "c", text: "Running a planned table set of 20 identical receptive trials with unrelated edibles" },
      { id: "d", text: "Arranging a toy slightly out of reach to create a request opportunity" },
    ],
    correctAnswer: "c",
    explanation:
      "A planned table set of repeated trials with unrelated reinforcers is more like DTT than naturalistic teaching.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This captures a natural opportunity created by the learner's motivation.",
        whenWouldBeCorrect: "It would be a nonexample if the request were drilled outside the play context with no natural motivation.",
      },
      b: {
        whyNotCorrectHere: "Teaching during crayon choice embeds instruction in an ongoing routine.",
        whenWouldBeCorrect: "It would be a nonexample if labels were taught only in isolated table trials.",
      },
      d: {
        whyNotCorrectHere: "Arranging materials can contrive a naturalistic teaching opportunity.",
        whenWouldBeCorrect: "It would be a nonexample if no natural activity or motivation were involved.",
      },
    },
    scenario: "A trainee compares embedded teaching with structured DTT examples.",
    difficulty: "core",
    tags: ["task 7", "naturalistic teaching", "DTT", "nonexample"],
  }),
  makeQuestion({
    id: "q-t7-common-stimuli",
    taskNumber: 7,
    questionType: "multiple-choice",
    prompt: "Why might a therapist teach requesting with the learner's actual snack cup instead of a picture used only at the table?",
    choices: [
      { id: "a", text: "The common material can make the skill more useful in the natural routine" },
      { id: "b", text: "Naturalistic teaching never uses prompts" },
      { id: "c", text: "The snack cup changes the procedure into whole-interval recording" },
      { id: "d", text: "Using real materials means data are not needed" },
    ],
    correctAnswer: "a",
    explanation:
      "Using common materials from the routine can support generalization because the learner practices with stimuli that matter in the natural setting.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Naturalistic teaching can use prompts; the difference is that teaching is embedded in meaningful routines.",
        whenWouldBeCorrect: "A prompt-free response would be correct if the learner responds independently.",
      },
      c: {
        whyNotCorrectHere: "Whole-interval recording is a measurement method and is unrelated to material choice.",
        whenWouldBeCorrect: "It would be correct if scoring sustained behavior across a full interval.",
      },
      d: {
        whyNotCorrectHere: "Data are still needed when teaching in natural routines.",
        whenWouldBeCorrect: "No data would not be appropriate for competency demonstration of a teaching procedure.",
      },
    },
    scenario: "A trainee plans naturalistic teaching materials for snack time.",
    difficulty: "core",
    tags: ["task 7", "naturalistic teaching", "common stimuli", "generalization"],
  }),
  makeQuestion({
    id: "q-t7-capture-vs-contrive",
    taskNumber: 7,
    questionType: "short-applied",
    prompt: "The learner spontaneously brings a broken train track to the therapist. The therapist prompts, 'Help please.' Is this capture or contrive?",
    choices: [
      { id: "a", text: "Capture" },
      { id: "b", text: "Contrive" },
      { id: "c", text: "Forward chaining" },
      { id: "d", text: "S-delta training" },
    ],
    correctAnswer: "a",
    explanation:
      "This is capture because the learner created the opportunity by bringing the problem to the therapist.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Contrive would mean the therapist arranged the broken track or setup ahead of time.",
        whenWouldBeCorrect: "It would be correct if the therapist intentionally removed a connector to create a help request.",
      },
      c: {
        whyNotCorrectHere: "Forward chaining teaches the first step of a sequence first; no task analysis is being taught here.",
        whenWouldBeCorrect: "It would be correct if teaching the first step of assembling the train track.",
      },
      d: {
        whyNotCorrectHere: "S-delta training involves learning when reinforcement is not available for a response.",
        whenWouldBeCorrect: "It would be correct if one stimulus signaled that requesting help would not be reinforced.",
      },
    },
    scenario: "A therapist uses a naturally occurring problem during play to teach a help request.",
    difficulty: "intro",
    tags: ["task 7", "capture", "contrive", "naturalistic teaching"],
  }),
  makeQuestion({
    id: "q-t7-naturalistic-true-false",
    taskNumber: 7,
    questionType: "true-false",
    prompt: "True or false: Naturalistic teaching can include planned prompts and data collection.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct. Naturalistic teaching is embedded in routines and motivation, but it still follows a teaching plan and can include prompts and data.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because naturalistic does not mean unplanned or undocumented.",
        whenWouldBeCorrect: "False would fit if the statement said naturalistic teaching is the same as free play with no teaching goals.",
      },
    },
    scenario: "A trainee is clarifying whether embedded teaching still needs procedural integrity.",
    difficulty: "core",
    tags: ["task 7", "naturalistic teaching", "prompts", "data", "true false"],
  }),
  makeQuestion({
    id: "q-t7-contrive-boundary",
    taskNumber: 7,
    questionType: "multiple-choice",
    prompt: "Which setup best contrives a teaching opportunity without blocking access in an unsafe or disrespectful way?",
    choices: [
      { id: "a", text: "Placing a desired puzzle on a visible shelf so the learner can request it" },
      { id: "b", text: "Taking away all communication options until the learner screams" },
      { id: "c", text: "Ignoring safety needs so motivation becomes stronger" },
      { id: "d", text: "Changing the target skill without supervisor approval" },
    ],
    correctAnswer: "a",
    explanation:
      "The visible shelf arrangement creates a reason to communicate while keeping the opportunity respectful and plan-consistent.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Removing communication options can provoke problem behavior and does not support appropriate communication.",
        whenWouldBeCorrect: "Restricting access may be appropriate only in a safe, approved plan that still supports communication.",
      },
      c: {
        whyNotCorrectHere: "Safety cannot be ignored to create motivation.",
        whenWouldBeCorrect: "Safety steps are always correct when required by the plan or situation.",
      },
      d: {
        whyNotCorrectHere: "RBTs should not change target skills independently.",
        whenWouldBeCorrect: "Skill changes would be correct after supervisor direction and plan updates.",
      },
    },
    scenario: "A trainee arranges the environment before a naturalistic communication session.",
    difficulty: "challenge",
    tags: ["task 7", "contriving", "naturalistic teaching", "environment arrangement"],
  }),
  makeQuestion({
    id: "q-t7-dtt-vs-naturalistic",
    taskNumber: 7,
    questionType: "multiple-choice",
    prompt: "What is the clearest reason this example is naturalistic: the learner asks for more swing, and the therapist prompts a clearer request before pushing again?",
    choices: [
      { id: "a", text: "The teaching is tied to the learner's current motivation and natural reinforcer" },
      { id: "b", text: "The therapist uses no planned target skill" },
      { id: "c", text: "The consequence is unrelated to the request" },
      { id: "d", text: "The therapist is collecting ABC data instead of teaching" },
    ],
    correctAnswer: "a",
    explanation:
      "The current motivation for swinging and access to more swinging make the teaching opportunity naturalistic.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Naturalistic teaching can still have planned targets, such as clearer requests.",
        whenWouldBeCorrect: "No planned target would describe casual play, not a teaching procedure.",
      },
      c: {
        whyNotCorrectHere: "An unrelated consequence would make the teaching less natural, not more naturalistic.",
        whenWouldBeCorrect: "Unrelated programmed reinforcers may appear in DTT or token systems.",
      },
      d: {
        whyNotCorrectHere: "The therapist is teaching a request, not just recording antecedent, behavior, and consequence.",
        whenWouldBeCorrect: "ABC data would be correct if the goal was documenting events around behavior.",
      },
    },
    scenario: "A trainee explains why a playground communication opportunity fits Task 7.",
    difficulty: "core",
    tags: ["task 7", "naturalistic teaching", "DTT", "natural reinforcement"],
  }),
  makeQuestion({
    id: "q-t7-missed-motivation",
    taskNumber: 7,
    questionType: "identify-nonexample",
    prompt: "Which therapist response most clearly misses the naturalistic teaching opportunity?",
    choices: [
      { id: "a", text: "The learner reaches for a toy, and the therapist prompts a request for that toy" },
      { id: "b", text: "The learner pauses at a locked gate, and the therapist prompts 'open'" },
      { id: "c", text: "The learner asks for water, and the therapist switches to unrelated color flashcards" },
      { id: "d", text: "The learner looks at a snack, and the therapist prompts a snack label" },
    ],
    correctAnswer: "c",
    explanation:
      "Switching to unrelated flashcards ignores the learner's current motivation for water and misses the embedded opportunity.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Prompting a request for the desired toy uses the learner's current motivation.",
        whenWouldBeCorrect: "It would miss the opportunity if the therapist blocked the toy without communication support.",
      },
      b: {
        whyNotCorrectHere: "Prompting 'open' at a locked gate uses the real situation as a teaching moment.",
        whenWouldBeCorrect: "It would miss the opportunity if the therapist opened it without giving a chance to communicate.",
      },
      d: {
        whyNotCorrectHere: "Prompting a snack label can be naturalistic if it connects to the learner's interest in the snack.",
        whenWouldBeCorrect: "It would miss the opportunity if the prompt were unrelated to the snack context.",
      },
    },
    scenario: "A supervisor asks which response fails to use learner motivation in the moment.",
    difficulty: "challenge",
    tags: ["task 7", "natural motivation", "nonexample", "naturalistic teaching"],
  }),
  makeQuestion({
    id: "q-t8-task-analysis",
    taskNumber: 8,
    questionType: "multiple-choice",
    prompt: "What is a task analysis?",
    choices: [
      { id: "a", text: "A larger skill broken into smaller teachable steps" },
      { id: "b", text: "A list of preferred items ranked by selection" },
      { id: "c", text: "A graph showing behavior over time" },
      { id: "d", text: "A single SD followed by one response" },
    ],
    correctAnswer: "a",
    explanation:
      "A task analysis breaks a multi-step skill into smaller steps so a chaining procedure can teach the sequence.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A ranked list of items comes from preference assessment, not chaining.",
        whenWouldBeCorrect: "It would be correct after an MSWO or paired-choice assessment.",
      },
      c: {
        whyNotCorrectHere: "A graph displays data; it does not define skill steps.",
        whenWouldBeCorrect: "It would be correct when updating data and graphs for Task 3.",
      },
      d: {
        whyNotCorrectHere: "One SD and response can describe a DTT trial, not a full task analysis.",
        whenWouldBeCorrect: "It would be correct for a discrete-trial teaching example.",
      },
    },
    scenario: "A trainee is preparing to teach handwashing as a chain.",
    difficulty: "intro",
    tags: ["task 8", "task analysis", "chaining"],
  }),
  makeQuestion({
    id: "q-t8-forward-chaining",
    taskNumber: 8,
    questionType: "scenario-choice",
    prompt: "The learner independently completes step 1 of toothbrushing while later steps are prompted. More steps are opened from the beginning of the chain over time. Which method is this?",
    choices: [
      { id: "a", text: "Forward chaining" },
      { id: "b", text: "Backward chaining" },
      { id: "c", text: "Total task chaining" },
      { id: "d", text: "Shaping" },
    ],
    correctAnswer: "a",
    explanation:
      "Forward chaining teaches the first step independently first and then opens later steps in order.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Backward chaining opens the last step first, not the first step.",
        whenWouldBeCorrect: "It would be correct if the learner completed the final step while earlier steps were prompted.",
      },
      c: {
        whyNotCorrectHere: "Total task chaining has the learner practice all steps each time with support as needed.",
        whenWouldBeCorrect: "It would be correct if every step were open on every practice opportunity.",
      },
      d: {
        whyNotCorrectHere: "Shaping changes one response through approximations, not a sequence of separate steps.",
        whenWouldBeCorrect: "It would be correct if reinforcing closer forms of one target response.",
      },
    },
    scenario: "A supervisor asks the trainee to identify the chaining direction in a toothbrushing program.",
    difficulty: "core",
    tags: ["task 8", "forward chaining", "task analysis", "chaining method"],
  }),
  makeQuestion({
    id: "q-t8-backward-chaining",
    taskNumber: 8,
    questionType: "scenario-choice",
    prompt: "During shoe tying, the technician completes all steps except the final pull tight. The learner completes that last step and contacts the natural result. Which method is shown?",
    choices: [
      { id: "a", text: "Backward chaining" },
      { id: "b", text: "Forward chaining" },
      { id: "c", text: "Free operant assessment" },
      { id: "d", text: "DRO" },
    ],
    correctAnswer: "a",
    explanation:
      "Backward chaining is correct because the learner performs the final step first while earlier steps are prompted or completed for them.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Forward chaining begins with the first step, not the last step.",
        whenWouldBeCorrect: "It would be correct if the learner independently began the shoe-tying sequence with step 1.",
      },
      c: {
        whyNotCorrectHere: "Free operant assessment observes engagement with available items and is unrelated to teaching a chain.",
        whenWouldBeCorrect: "It would be correct if the learner freely explored items while preferences were recorded.",
      },
      d: {
        whyNotCorrectHere: "DRO reinforces absence of behavior during an interval and does not teach a task sequence.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered for zero occurrences of a target behavior.",
      },
    },
    scenario: "A trainee observes the final step of a self-care chain being opened first.",
    difficulty: "intro",
    tags: ["task 8", "backward chaining", "task analysis", "natural result"],
  }),
  makeQuestion({
    id: "q-t8-total-task",
    taskNumber: 8,
    questionType: "scenario-choice",
    prompt: "In each practice, the learner goes through every step of making a sandwich with prompts only when needed. Which method is this?",
    choices: [
      { id: "a", text: "Total task chaining" },
      { id: "b", text: "Forward chaining" },
      { id: "c", text: "Backward chaining" },
      { id: "d", text: "Single-stimulus assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Total task chaining is correct because all steps are practiced each time, with prompts as needed.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Forward chaining would open steps from the beginning while later steps are not independently practiced yet.",
        whenWouldBeCorrect: "It would be correct if only the first step, then first two steps, were opened in sequence.",
      },
      c: {
        whyNotCorrectHere: "Backward chaining would start independent practice at the final step.",
        whenWouldBeCorrect: "It would be correct if the learner completed only the last step independently at first.",
      },
      d: {
        whyNotCorrectHere: "Single stimulus is a preference assessment format, not a chaining method.",
        whenWouldBeCorrect: "It would be correct if one item were presented at a time to assess preference.",
      },
    },
    scenario: "A trainee is selecting a chaining label for a sandwich-making program.",
    difficulty: "core",
    tags: ["task 8", "total task chaining", "task analysis"],
  }),
  makeQuestion({
    id: "q-t8-open-closed-steps",
    taskNumber: 8,
    questionType: "multiple-choice",
    prompt: "In a chaining plan, what does an open step usually mean?",
    choices: [
      { id: "a", text: "The learner has an opportunity to perform that step" },
      { id: "b", text: "The step is skipped from the task analysis" },
      { id: "c", text: "The step is always a reinforcer" },
      { id: "d", text: "The step is an S-delta" },
    ],
    correctAnswer: "a",
    explanation:
      "An open step is available for the learner to perform or practice. Closed steps are immediately prompted or not yet targeted for independent responding.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Open does not mean skipped; it means the learner gets a chance to respond.",
        whenWouldBeCorrect: "A skipped step would be relevant only if the task analysis were revised by the supervisor.",
      },
      c: {
        whyNotCorrectHere: "A step may contact natural reinforcement, but open step does not mean reinforcer.",
        whenWouldBeCorrect: "Reinforcer would be correct when describing the consequence following a response.",
      },
      d: {
        whyNotCorrectHere: "An S-delta signals reinforcement is not available for a response; it is not a chaining step status.",
        whenWouldBeCorrect: "It would be correct in a discrimination-training question.",
      },
    },
    scenario: "A supervisor asks the trainee which steps are open in a forward chaining program.",
    difficulty: "core",
    tags: ["task 8", "open steps", "closed steps", "chaining"],
  }),
  makeQuestion({
    id: "q-t8-chaining-vs-shaping",
    taskNumber: 8,
    questionType: "multiple-choice",
    prompt: "Which statement best separates chaining from shaping?",
    choices: [
      { id: "a", text: "Chaining links separate steps; shaping changes one response through closer approximations" },
      { id: "b", text: "Chaining never uses prompts; shaping always uses task analyses" },
      { id: "c", text: "Chaining is only for preference assessment; shaping is only for graphs" },
      { id: "d", text: "Chaining and shaping are the same procedure" },
    ],
    correctAnswer: "a",
    explanation:
      "Chaining teaches a sequence of steps, while shaping reinforces closer versions of a single target behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Chaining often uses prompts, and shaping does not require a task analysis of separate steps.",
        whenWouldBeCorrect: "Prompts would be relevant when teaching steps within a chain.",
      },
      c: {
        whyNotCorrectHere: "Neither statement matches the procedures. Preference assessment and graphs are separate task areas.",
        whenWouldBeCorrect: "Preference assessment would fit Task 4; graphing would fit Task 3.",
      },
      d: {
        whyNotCorrectHere: "They are related teaching procedures but not the same.",
        whenWouldBeCorrect: "They might both appear in skill acquisition plans, but the teaching logic differs.",
      },
    },
    scenario: "A trainee is deciding whether a program teaches a sequence or changes the form of one response.",
    difficulty: "challenge",
    tags: ["task 8", "task 9", "chaining", "shaping", "comparison"],
  }),
  makeQuestion({
    id: "q-t8-task-analysis-quality",
    taskNumber: 8,
    questionType: "short-applied",
    prompt: "A toothbrushing task analysis says only: 'Brush teeth.' What is the main issue?",
    choices: [
      { id: "a", text: "The step is too broad to guide a chaining procedure" },
      { id: "b", text: "It is a complete backward chain" },
      { id: "c", text: "It is an S-delta" },
      { id: "d", text: "It is a preference hierarchy" },
    ],
    correctAnswer: "a",
    explanation:
      "The step is too broad because a task analysis should break the larger skill into teachable actions, such as getting the toothbrush, applying toothpaste, brushing surfaces, and rinsing.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A backward chain describes the order of teaching steps, not a one-step task analysis.",
        whenWouldBeCorrect: "It would be correct if the plan opened the final step first.",
      },
      c: {
        whyNotCorrectHere: "An S-delta is a discrimination-training stimulus, not a task-analysis step.",
        whenWouldBeCorrect: "It would be correct if a stimulus signaled reinforcement was unavailable.",
      },
      d: {
        whyNotCorrectHere: "A preference hierarchy ranks items, not self-care steps.",
        whenWouldBeCorrect: "It would be correct after a preference assessment ranked selected items.",
      },
    },
    scenario: "A trainee reviews whether a task analysis is detailed enough to implement.",
    difficulty: "core",
    tags: ["task 8", "task analysis", "step size", "short applied"],
  }),
  makeQuestion({
    id: "q-t8-select-method-for-natural-end",
    taskNumber: 8,
    questionType: "select-best-measurement",
    prompt: "A learner is motivated by seeing the finished snack. The supervisor wants the learner to complete the final step first so the natural outcome follows immediately. Which chaining method fits?",
    choices: [
      { id: "a", text: "Backward chaining" },
      { id: "b", text: "Forward chaining" },
      { id: "c", text: "Partial-interval recording" },
      { id: "d", text: "Indirect preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Backward chaining fits because it lets the learner complete the final step and immediately contact the natural outcome of the chain.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Forward chaining starts at the first step, so it does not emphasize immediate independent completion of the final step.",
        whenWouldBeCorrect: "It would be correct if the plan opened the first step first.",
      },
      c: {
        whyNotCorrectHere: "Partial interval is a measurement procedure and does not teach the snack-making sequence.",
        whenWouldBeCorrect: "It would be correct for scoring whether behavior occurred during intervals.",
      },
      d: {
        whyNotCorrectHere: "Indirect preference assessment gathers preference reports and does not teach a task chain.",
        whenWouldBeCorrect: "It would be correct if interviewing caregivers about preferred snacks.",
      },
    },
    scenario: "A trainee is selecting a chaining direction for a snack-preparation task.",
    difficulty: "challenge",
    tags: ["task 8", "backward chaining", "natural outcome", "select best measurement system"],
  }),
  makeQuestion({
    id: "q-t8-nonexample-chaining",
    taskNumber: 8,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of chaining?",
    choices: [
      { id: "a", text: "Teaching handwashing from first step to last step" },
      { id: "b", text: "Teaching a laundry routine with all steps practiced each time" },
      { id: "c", text: "Reinforcing closer and closer speech sounds for one word" },
      { id: "d", text: "Teaching the last step of shoe tying first" },
    ],
    correctAnswer: "c",
    explanation:
      "Reinforcing closer speech sounds for one word is shaping because the form of one response changes across approximations.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Teaching from first to last step is forward chaining.",
        whenWouldBeCorrect: "It would be a nonexample if no sequence of steps were being taught.",
      },
      b: {
        whyNotCorrectHere: "Practicing all steps each time is total task chaining.",
        whenWouldBeCorrect: "It would be a nonexample if only one response form were gradually changed.",
      },
      d: {
        whyNotCorrectHere: "Teaching the last step first is backward chaining.",
        whenWouldBeCorrect: "It would be a nonexample if the target were a single response rather than a step sequence.",
      },
    },
    scenario: "A supervisor asks the trainee to separate shaping examples from chaining examples.",
    difficulty: "core",
    tags: ["task 8", "chaining", "shaping", "nonexample"],
  }),
  makeQuestion({
    id: "q-t8-closed-step-error",
    taskNumber: 8,
    questionType: "scenario-choice",
    prompt: "A closed step in a chain is supposed to be prompted immediately, but the technician waits and lets the learner struggle for 45 seconds. What is the concern?",
    choices: [
      { id: "a", text: "The technician is not following the plan for closed steps" },
      { id: "b", text: "The technician is conducting MSWO" },
      { id: "c", text: "The learner has reached terminal behavior" },
      { id: "d", text: "The SD has become an S-delta" },
    ],
    correctAnswer: "a",
    explanation:
      "Closed steps are not currently opened for independent practice, so the technician should provide the planned prompt rather than waiting outside the procedure.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "MSWO is a preference assessment format and does not describe closed chaining steps.",
        whenWouldBeCorrect: "It would be correct if selected items were removed from a preference array.",
      },
      c: {
        whyNotCorrectHere: "Terminal behavior refers to the final target in shaping, not struggling on a closed chain step.",
        whenWouldBeCorrect: "It would be correct if discussing the endpoint response in a shaping program.",
      },
      d: {
        whyNotCorrectHere: "An S-delta signals reinforcement is unavailable for a response; this is a procedural issue in chaining.",
        whenWouldBeCorrect: "It would be correct in a discrimination-training scenario.",
      },
    },
    scenario: "A supervisor reviews whether a trainee followed open and closed step rules during a chain.",
    difficulty: "challenge",
    tags: ["task 8", "closed steps", "prompting", "chaining"],
  }),
  makeQuestion({
    id: "q-t9-shaping-definition",
    taskNumber: 9,
    questionType: "multiple-choice",
    prompt: "What is shaping?",
    choices: [
      { id: "a", text: "Reinforcing responses that get progressively closer to a target behavior" },
      { id: "b", text: "Teaching a sequence of separate steps from a task analysis" },
      { id: "c", text: "Checking behavior only at the end of an interval" },
      { id: "d", text: "Presenting two items and recording a choice" },
    ],
    correctAnswer: "a",
    explanation:
      "Shaping reinforces successive approximations, meaning responses that more closely resemble the terminal behavior over time.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Teaching a step sequence is chaining, not shaping.",
        whenWouldBeCorrect: "It would be correct if teaching handwashing or shoe tying steps from a task analysis.",
      },
      c: {
        whyNotCorrectHere: "Checking at the interval endpoint is momentary time sampling, not a teaching procedure.",
        whenWouldBeCorrect: "It would be correct if collecting discontinuous measurement data.",
      },
      d: {
        whyNotCorrectHere: "Two-item choice trials are paired-choice preference assessment, not shaping.",
        whenWouldBeCorrect: "It would be correct when identifying preference between two items.",
      },
    },
    scenario: "A trainee is asked to define shaping before implementing a skill-acquisition program.",
    difficulty: "intro",
    tags: ["task 9", "shaping", "successive approximations", "terminal behavior"],
  }),
  makeQuestion({
    id: "q-t9-step-too-large",
    taskNumber: 9,
    questionType: "scenario-choice",
    prompt: "A learner says 'buh' for bubbles. The therapist stops reinforcing until the learner says 'I want bubbles please.' Progress stalls. What is the likely issue?",
    choices: [
      { id: "a", text: "The next approximation is too large" },
      { id: "b", text: "The therapist is using backward chaining" },
      { id: "c", text: "The therapist is using momentary time sampling" },
      { id: "d", text: "The learner has mastered the terminal behavior" },
    ],
    correctAnswer: "a",
    explanation:
      "The jump from 'buh' to a full sentence is likely too large. Shaping should move through achievable approximations.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Backward chaining teaches the last step of a sequence first; this is about changing one vocal response.",
        whenWouldBeCorrect: "It would be correct if teaching a task analysis from the final step backward.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling is measurement, not the size of a shaping step.",
        whenWouldBeCorrect: "It would be correct if behavior were checked only at interval endpoints.",
      },
      d: {
        whyNotCorrectHere: "Mastery is not shown because the learner is not producing the terminal sentence.",
        whenWouldBeCorrect: "It would be correct if the learner consistently said the full target phrase under planned conditions.",
      },
    },
    scenario: "A trainee observes that a learner stops responding after the response requirement increases sharply.",
    difficulty: "challenge",
    tags: ["task 9", "shaping", "successive approximations", "step too large"],
  }),
  makeQuestion({
    id: "q-t9-step-too-small",
    taskNumber: 9,
    questionType: "scenario-choice",
    prompt: "A learner has said 'ball' clearly for three sessions, but the therapist still reinforces only touching the lips together before any sound. What is the likely issue?",
    choices: [
      { id: "a", text: "The current approximation may be too small or outdated" },
      { id: "b", text: "The therapist is using MSW" },
      { id: "c", text: "The therapist is correctly requiring the terminal behavior" },
      { id: "d", text: "The behavior is an S-delta" },
    ],
    correctAnswer: "a",
    explanation:
      "If the learner already produces a clearer response, reinforcing a much earlier approximation may slow progress toward the terminal behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "MSW is a preference assessment with multiple stimuli and replacement, not a shaping step.",
        whenWouldBeCorrect: "It would be correct if an item array were presented and selected items returned.",
      },
      c: {
        whyNotCorrectHere: "Touching lips together is not the terminal word 'ball.'",
        whenWouldBeCorrect: "It would be correct if reinforcement required the clear 'ball' response when that is the current criterion.",
      },
      d: {
        whyNotCorrectHere: "S-delta is a stimulus condition, not a response approximation.",
        whenWouldBeCorrect: "It would be correct if a stimulus signaled the response would not be reinforced.",
      },
    },
    scenario: "A supervisor reviews whether the shaping criterion has kept pace with learner progress.",
    difficulty: "challenge",
    tags: ["task 9", "shaping", "step too small", "terminal behavior"],
  }),
  makeQuestion({
    id: "q-t9-terminal-behavior",
    taskNumber: 9,
    questionType: "multiple-choice",
    prompt: "In shaping, what is the terminal behavior?",
    choices: [
      { id: "a", text: "The final target response the plan is building toward" },
      { id: "b", text: "The first rough response ever reinforced" },
      { id: "c", text: "The last step in a task analysis" },
      { id: "d", text: "The item selected most often in preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "The terminal behavior is the endpoint response that successive approximations should move toward.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "The first rough response may be an early approximation, not the endpoint.",
        whenWouldBeCorrect: "It would be correct if the question asked about an entry approximation.",
      },
      c: {
        whyNotCorrectHere: "The last step in a task analysis belongs to chaining, not shaping.",
        whenWouldBeCorrect: "It would be correct when discussing backward chaining or final steps in a chain.",
      },
      d: {
        whyNotCorrectHere: "A frequently selected item is a preference result, not a shaping target.",
        whenWouldBeCorrect: "It would be correct if the question asked about preference-assessment outcomes.",
      },
    },
    scenario: "A trainee checks the endpoint of a shaping program before implementing the next criterion.",
    difficulty: "intro",
    tags: ["task 9", "terminal behavior", "shaping"],
  }),
  makeQuestion({
    id: "q-t9-successive-approximations",
    taskNumber: 9,
    questionType: "scenario-choice",
    prompt: "The plan reinforces reaching toward a cup, then touching it, then picking it up, and later drinking from it. What does this show?",
    choices: [
      { id: "a", text: "Successive approximations" },
      { id: "b", text: "MSWO" },
      { id: "c", text: "Whole-interval recording" },
      { id: "d", text: "S-delta control" },
    ],
    correctAnswer: "a",
    explanation:
      "The responses become progressively closer to the final drinking behavior, which is the pattern of successive approximations.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "MSWO is a preference assessment format and does not describe response progression.",
        whenWouldBeCorrect: "It would be correct if selected items were removed from an array.",
      },
      c: {
        whyNotCorrectHere: "Whole interval is a measurement procedure, not a teaching progression.",
        whenWouldBeCorrect: "It would be correct if behavior had to occur for the full interval to be scored.",
      },
      d: {
        whyNotCorrectHere: "S-delta control is about responding differently in stimulus conditions, not approximations toward one response.",
        whenWouldBeCorrect: "It would be correct if a learner withheld a response when reinforcement was unavailable.",
      },
    },
    scenario: "A trainee reviews a shaping plan for independent cup use.",
    difficulty: "core",
    tags: ["task 9", "successive approximations", "shaping", "scenario"],
  }),
  makeQuestion({
    id: "q-t9-shaping-vs-chaining",
    taskNumber: 9,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of shaping?",
    choices: [
      { id: "a", text: "Reinforcing louder approximations of a vocal request" },
      { id: "b", text: "Reinforcing closer pencil grasps over time" },
      { id: "c", text: "Teaching each step of making a bed from a task analysis" },
      { id: "d", text: "Reinforcing closer throws toward a target" },
    ],
    correctAnswer: "c",
    explanation:
      "Teaching each step of making a bed is chaining because it links separate steps in a sequence.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Louder versions of one vocal request can be successive approximations.",
        whenWouldBeCorrect: "It would be a nonexample if separate steps in a routine were being taught.",
      },
      b: {
        whyNotCorrectHere: "Closer pencil grasps are changes in one response form, so this can be shaping.",
        whenWouldBeCorrect: "It would be a nonexample if the skill were a sequence like gather pencil, open book, write name.",
      },
      d: {
        whyNotCorrectHere: "Throws that get closer to a target can be shaped toward a terminal behavior.",
        whenWouldBeCorrect: "It would be a nonexample if each throw were a separate step in a chain.",
      },
    },
    scenario: "A supervisor asks the trainee to identify which example belongs to chaining instead of shaping.",
    difficulty: "core",
    tags: ["task 9", "shaping", "chaining", "nonexample"],
  }),
  makeQuestion({
    id: "q-t9-shaping-true-false",
    taskNumber: 9,
    questionType: "true-false",
    prompt: "True or false: In shaping, the reinforcement criterion may change as the learner gets closer to the target behavior.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct because shaping involves shifting reinforcement from earlier approximations to closer approximations.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because never changing the criterion can keep the learner at an early approximation.",
        whenWouldBeCorrect: "False would fit if the statement said the criterion should change randomly without a plan.",
      },
    },
    scenario: "A trainee reviews why shaping criteria are adjusted carefully over time.",
    difficulty: "intro",
    tags: ["task 9", "shaping", "criterion", "true false"],
  }),
  makeQuestion({
    id: "q-t9-criterion-change",
    taskNumber: 9,
    questionType: "short-applied",
    prompt: "A learner is successful at the current approximation 90% of opportunities. The RBT thinks the next criterion should change. What should happen?",
    choices: [
      { id: "a", text: "Follow the plan or ask the supervisor before changing the criterion" },
      { id: "b", text: "Immediately stop all reinforcement" },
      { id: "c", text: "Switch to ABC data and abandon the shaping program" },
      { id: "d", text: "Require the final response even if the plan says otherwise" },
    ],
    correctAnswer: "a",
    explanation:
      "Criterion changes should follow the shaping plan or supervisor direction because changing too fast or too slowly can disrupt progress.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Stopping all reinforcement can produce frustration and does not teach the next approximation.",
        whenWouldBeCorrect: "Withholding reinforcement may be part of extinction, but only under an approved behavior-reduction plan.",
      },
      c: {
        whyNotCorrectHere: "ABC data does not replace a skill-acquisition shaping plan.",
        whenWouldBeCorrect: "ABC data would be correct if collecting context around challenging behavior.",
      },
      d: {
        whyNotCorrectHere: "Jumping to the final response may make the approximation too large.",
        whenWouldBeCorrect: "It would be correct only when the plan says the terminal response is now the criterion.",
      },
    },
    scenario: "A trainee notices a learner is ready for possible movement in a shaping program.",
    difficulty: "challenge",
    tags: ["task 9", "shaping", "criterion", "supervisor guidance"],
  }),
  makeQuestion({
    id: "q-t9-entry-behavior",
    taskNumber: 9,
    questionType: "multiple-choice",
    prompt: "Why is identifying the learner's current response important before shaping?",
    choices: [
      { id: "a", text: "It helps choose a first approximation the learner can already do or nearly do" },
      { id: "b", text: "It replaces the terminal behavior" },
      { id: "c", text: "It tells the RBT to ignore the teaching plan" },
      { id: "d", text: "It turns the program into paired-choice assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Shaping starts from the learner's current behavior and moves toward the terminal behavior through realistic approximations.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "The current response is the starting point, not the endpoint.",
        whenWouldBeCorrect: "Terminal behavior would be correct if asking for the final target response.",
      },
      c: {
        whyNotCorrectHere: "Knowing current behavior helps implement the plan; it does not authorize ignoring it.",
        whenWouldBeCorrect: "Supervisor guidance would be correct if the plan does not match current performance.",
      },
      d: {
        whyNotCorrectHere: "Paired-choice assessment identifies preferences and is unrelated to entry behavior for shaping.",
        whenWouldBeCorrect: "It would be correct if presenting two items and recording which one is selected.",
      },
    },
    scenario: "A trainee is preparing a shaping program for a new motor response.",
    difficulty: "core",
    tags: ["task 9", "entry behavior", "shaping", "successive approximations"],
  }),
  makeQuestion({
    id: "q-t9-too-many-approximations",
    taskNumber: 9,
    questionType: "scenario-choice",
    prompt: "A learner can already say 'water,' but the therapist keeps reinforcing only 'wa' and never requires the full word. What is the best concern?",
    choices: [
      { id: "a", text: "The approximation criterion may be too low and slow progress" },
      { id: "b", text: "The therapist is correctly using backward chaining" },
      { id: "c", text: "The therapist has created an S-delta" },
      { id: "d", text: "The learner needs momentary time sampling" },
    ],
    correctAnswer: "a",
    explanation:
      "If the learner can already produce the clearer response, reinforcing only an easier approximation may prevent movement toward or maintenance of the terminal response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Backward chaining is for step sequences, not improving one vocal response.",
        whenWouldBeCorrect: "It would be correct if teaching the final step of a task chain first.",
      },
      c: {
        whyNotCorrectHere: "An S-delta is a stimulus condition, not an approximation criterion.",
        whenWouldBeCorrect: "It would be correct if a stimulus signaled the response would not be reinforced.",
      },
      d: {
        whyNotCorrectHere: "Momentary time sampling is a measurement method and does not address the shaping criterion.",
        whenWouldBeCorrect: "It would be correct when checking behavior at interval endpoints.",
      },
    },
    scenario: "A supervisor asks whether the shaping requirement is still appropriate for the learner's current skill.",
    difficulty: "challenge",
    tags: ["task 9", "shaping", "step too small", "vocal response"],
  }),
  makeQuestion({
    id: "q-t10-sd-definition",
    taskNumber: 10,
    questionType: "multiple-choice",
    prompt: "What is an SD?",
    choices: [
      { id: "a", text: "A stimulus that signals reinforcement is available for a specific response" },
      { id: "b", text: "A stimulus that signals reinforcement is not available for a specific response" },
      { id: "c", text: "A consequence delivered after every response" },
      { id: "d", text: "A task analysis step" },
    ],
    correctAnswer: "a",
    explanation:
      "An SD signals that a particular response can contact reinforcement in that situation.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "This describes an S-delta, not an SD.",
        whenWouldBeCorrect: "It would be correct if the stimulus signaled the response would not be reinforced.",
      },
      c: {
        whyNotCorrectHere: "A consequence follows behavior; an SD comes before the response.",
        whenWouldBeCorrect: "It would be correct if asking what happens after a correct response.",
      },
      d: {
        whyNotCorrectHere: "A task analysis step is part of chaining, not a discrimination stimulus.",
        whenWouldBeCorrect: "It would be correct if teaching a multi-step routine.",
      },
    },
    scenario: "A trainee is reviewing discrimination-training vocabulary.",
    difficulty: "intro",
    tags: ["task 10", "SD", "discrimination training"],
  }),
  makeQuestion({
    id: "q-t10-s-delta-definition",
    taskNumber: 10,
    questionType: "multiple-choice",
    prompt: "What is an S-delta?",
    choices: [
      { id: "a", text: "A stimulus that signals reinforcement is not available for a specific response" },
      { id: "b", text: "A stimulus that always requires physical prompting" },
      { id: "c", text: "The final behavior in shaping" },
      { id: "d", text: "A token exchanged for backup reinforcement" },
    ],
    correctAnswer: "a",
    explanation:
      "An S-delta signals that a specific response will not contact reinforcement in that stimulus condition.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Prompting may occur during teaching, but S-delta does not mean physical prompting is required.",
        whenWouldBeCorrect: "Physical prompting would be correct if the plan calls for guided movement support.",
      },
      c: {
        whyNotCorrectHere: "The final behavior in shaping is the terminal behavior, not an S-delta.",
        whenWouldBeCorrect: "It would be correct if asking for the endpoint response in shaping.",
      },
      d: {
        whyNotCorrectHere: "A token belongs to a token system and is not a discrimination stimulus.",
        whenWouldBeCorrect: "It would be correct if asking what the learner earns and later exchanges.",
      },
    },
    scenario: "A supervisor asks the trainee to define the stimulus that signals no reinforcement for a response.",
    difficulty: "intro",
    tags: ["task 10", "S-delta", "SD", "discrimination training"],
  }),
  makeQuestion({
    id: "q-t10-responds-one-stimulus",
    taskNumber: 10,
    questionType: "scenario-choice",
    prompt: "A learner responds in the presence of a dog picture by saying 'dog' and stays quiet when shown a car picture. What is developing?",
    choices: [
      { id: "a", text: "Stimulus control" },
      { id: "b", text: "Free operant preference" },
      { id: "c", text: "Duration recording" },
      { id: "d", text: "Backward chaining" },
    ],
    correctAnswer: "a",
    explanation:
      "Stimulus control is developing because the response occurs in the presence of the relevant stimulus and not in the presence of a different stimulus.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Free operant preference assessment measures engagement with available items, not correct responding to pictures.",
        whenWouldBeCorrect: "It would be correct if the learner freely explored items while engagement was recorded.",
      },
      c: {
        whyNotCorrectHere: "Duration records how long behavior lasts; this scenario is about which stimulus evokes the response.",
        whenWouldBeCorrect: "It would be correct if timing how long the learner looked at a picture.",
      },
      d: {
        whyNotCorrectHere: "Backward chaining teaches a step sequence from the last step first.",
        whenWouldBeCorrect: "It would be correct if teaching the final step of a task analysis first.",
      },
    },
    scenario: "A trainee observes a learner label one picture but not a different picture.",
    difficulty: "core",
    tags: ["task 10", "stimulus control", "discrimination training", "scenario"],
  }),
  makeQuestion({
    id: "q-t10-sd-vs-sdelta-scenario",
    taskNumber: 10,
    questionType: "scenario-choice",
    prompt: "The green card means asking for a break will be honored. The red card means break requests are not available right now. What is the green card for the break request?",
    choices: [
      { id: "a", text: "SD" },
      { id: "b", text: "S-delta" },
      { id: "c", text: "Terminal behavior" },
      { id: "d", text: "Permanent product" },
    ],
    correctAnswer: "a",
    explanation:
      "The green card is the SD because it signals reinforcement is available for the break request.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "The red card, not the green card, functions as the S-delta in this scenario.",
        whenWouldBeCorrect: "It would be correct if the question asked what the red card signals.",
      },
      c: {
        whyNotCorrectHere: "Terminal behavior is a shaping endpoint and does not label the green card.",
        whenWouldBeCorrect: "It would be correct if asking for the final target response in shaping.",
      },
      d: {
        whyNotCorrectHere: "Permanent product is a measurement of a result left behind, not a stimulus signal.",
        whenWouldBeCorrect: "It would be correct if measuring completed work after behavior occurs.",
      },
    },
    scenario: "A trainee identifies stimulus roles in a discrimination program for functional communication.",
    difficulty: "core",
    tags: ["task 10", "SD", "S-delta", "functional communication"],
  }),
  makeQuestion({
    id: "q-t10-sdelta-scenario",
    taskNumber: 10,
    questionType: "scenario-choice",
    prompt: "Using the green-card/red-card break program, what is the red card for the break request?",
    choices: [
      { id: "a", text: "S-delta" },
      { id: "b", text: "SD" },
      { id: "c", text: "Prompt fading" },
      { id: "d", text: "Paired choice" },
    ],
    correctAnswer: "a",
    explanation:
      "The red card is the S-delta because it signals the break request will not be reinforced at that moment.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "The SD is the signal that reinforcement is available; here the red card signals it is not.",
        whenWouldBeCorrect: "It would be correct if the red card signaled break requests were available.",
      },
      c: {
        whyNotCorrectHere: "Prompt fading is reducing help over time, not the role of the red card.",
        whenWouldBeCorrect: "It would be correct if extra cues for card use were gradually removed.",
      },
      d: {
        whyNotCorrectHere: "Paired choice is a preference assessment with two items, not a discrimination signal.",
        whenWouldBeCorrect: "It would be correct if two items were presented and the learner selected one.",
      },
    },
    scenario: "A trainee practices separating SD and S-delta in a break-card program.",
    difficulty: "core",
    tags: ["task 10", "S-delta", "SD", "discrimination training"],
  }),
  makeQuestion({
    id: "q-t10-transfer-control",
    taskNumber: 10,
    questionType: "multiple-choice",
    prompt: "What is stimulus control transfer?",
    choices: [
      { id: "a", text: "Shifting control from a prompt or temporary cue to the intended natural SD" },
      { id: "b", text: "Changing a preferred item into a backup reinforcer" },
      { id: "c", text: "Scoring behavior only at the end of an interval" },
      { id: "d", text: "Removing selected items from a preference array" },
    ],
    correctAnswer: "a",
    explanation:
      "Stimulus control transfer occurs when the learner no longer depends on the prompt and responds to the intended cue.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Backup reinforcers belong to token systems and do not describe transfer from prompt to SD.",
        whenWouldBeCorrect: "It would be correct if tokens were exchanged for items or activities.",
      },
      c: {
        whyNotCorrectHere: "Endpoint scoring describes momentary time sampling, not stimulus control transfer.",
        whenWouldBeCorrect: "It would be correct if checking behavior at interval endpoints.",
      },
      d: {
        whyNotCorrectHere: "Removing selected items describes MSWO preference assessment.",
        whenWouldBeCorrect: "It would be correct if conducting multiple stimulus without replacement.",
      },
    },
    scenario: "A trainee is reviewing how prompt fading relates to discrimination training.",
    difficulty: "intro",
    tags: ["task 10", "stimulus control transfer", "prompt fading", "SD"],
  }),
  makeQuestion({
    id: "q-t10-transfer-scenario",
    taskNumber: 10,
    questionType: "scenario-choice",
    prompt: "At first, the learner says 'apple' only after the therapist whispers the word. Later, the learner says 'apple' when shown the apple picture without the whisper. What changed?",
    choices: [
      { id: "a", text: "Stimulus control transferred from the verbal prompt to the picture" },
      { id: "b", text: "The picture became a backup reinforcer" },
      { id: "c", text: "The response became a task analysis" },
      { id: "d", text: "The learner began whole-interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "The response moved from depending on the whispered prompt to occurring in response to the picture, which is stimulus control transfer.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A picture cue is not a backup reinforcer in this scenario.",
        whenWouldBeCorrect: "Backup reinforcer would be correct if the picture represented an item exchanged for tokens.",
      },
      c: {
        whyNotCorrectHere: "A task analysis is a sequence of steps, not a single picture label response.",
        whenWouldBeCorrect: "It would be correct if teaching a multi-step routine.",
      },
      d: {
        whyNotCorrectHere: "Whole interval is a measurement system, not a learner behavior.",
        whenWouldBeCorrect: "It would be correct if scoring whether behavior lasted the full interval.",
      },
    },
    scenario: "A trainee reviews a program where verbal prompts are faded from picture labeling.",
    difficulty: "core",
    tags: ["task 10", "stimulus control transfer", "verbal prompt", "picture cue"],
  }),
  makeQuestion({
    id: "q-t10-nonexample-discrimination",
    taskNumber: 10,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of discrimination training?",
    choices: [
      { id: "a", text: "Teaching 'sit' when the chair card is shown but not when the ball card is shown" },
      { id: "b", text: "Teaching a learner to choose the red card when asked for red and not blue" },
      { id: "c", text: "Breaking toothbrushing into 12 steps and teaching the first step first" },
      { id: "d", text: "Fading a prompt so the learner responds to the natural cue" },
    ],
    correctAnswer: "c",
    explanation:
      "Breaking toothbrushing into steps and teaching the first step first is chaining, not discrimination training.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Responding in one stimulus condition and not another is discrimination training.",
        whenWouldBeCorrect: "It would be a nonexample if no different stimulus conditions were involved.",
      },
      b: {
        whyNotCorrectHere: "Selecting red when asked for red and not blue involves discriminating between stimuli.",
        whenWouldBeCorrect: "It would be a nonexample if teaching a step sequence instead.",
      },
      d: {
        whyNotCorrectHere: "Fading prompts to the natural cue supports stimulus control transfer, which is related to discrimination training.",
        whenWouldBeCorrect: "It would be a nonexample if the prompt fading were unrelated to stimulus control.",
      },
    },
    scenario: "A trainee separates discrimination examples from chaining examples.",
    difficulty: "core",
    tags: ["task 10", "discrimination training", "chaining", "nonexample"],
  }),
  makeQuestion({
    id: "q-t10-overprompting-boundary",
    taskNumber: 10,
    questionType: "short-applied",
    prompt: "A learner touches the correct picture only when the therapist points to it, not when the SD is given alone. What is the best interpretation?",
    choices: [
      { id: "a", text: "The response may be under control of the point prompt rather than the SD" },
      { id: "b", text: "The learner has full stimulus control under the SD" },
      { id: "c", text: "The behavior is a permanent product" },
      { id: "d", text: "The learner is completing backward chaining" },
    ],
    correctAnswer: "a",
    explanation:
      "The learner may be prompt dependent because the point, not the intended SD, is controlling the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Full stimulus control under the SD is not shown if the learner needs the point prompt.",
        whenWouldBeCorrect: "It would be correct if the learner selected the picture after the SD without prompts.",
      },
      c: {
        whyNotCorrectHere: "Permanent product measures a result left behind; no product measurement is described.",
        whenWouldBeCorrect: "It would be correct if counting completed work after the task.",
      },
      d: {
        whyNotCorrectHere: "Backward chaining teaches the last step of a chain first; picture selection is not a chain here.",
        whenWouldBeCorrect: "It would be correct if the learner practiced the final step of a task analysis first.",
      },
    },
    scenario: "A trainee notices the learner responds only with a prompt during receptive ID trials.",
    difficulty: "challenge",
    tags: ["task 10", "stimulus control", "prompt dependency", "SD"],
  }),
  makeQuestion({
    id: "q-t10-generalization-boundary",
    taskNumber: 10,
    questionType: "multiple-choice",
    prompt: "A learner labels only one photo of a dog but not other dog pictures. Which concern is most related to discrimination training?",
    choices: [
      { id: "a", text: "The response may be too narrowly controlled by one stimulus" },
      { id: "b", text: "The learner has completed a token exchange" },
      { id: "c", text: "The behavior is being measured with duration" },
      { id: "d", text: "The learner is using total task chaining" },
    ],
    correctAnswer: "a",
    explanation:
      "The learner may have stimulus control only with one specific picture, so the team may need programming across relevant examples.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Token exchange is not described and does not explain narrow stimulus control.",
        whenWouldBeCorrect: "It would be correct if the learner traded earned tokens for a backup reinforcer.",
      },
      c: {
        whyNotCorrectHere: "Duration measures time, not whether the learner responds across examples.",
        whenWouldBeCorrect: "It would be correct if timing how long the learner engaged with pictures.",
      },
      d: {
        whyNotCorrectHere: "Total task chaining teaches all steps of a sequence, not dog-picture discrimination.",
        whenWouldBeCorrect: "It would be correct if the learner practiced every step of a routine each time.",
      },
    },
    scenario: "A trainee notices correct responding with one picture but errors with similar examples.",
    difficulty: "challenge",
    tags: ["task 10", "stimulus control", "generalization", "discrimination training"],
  }),
  makeQuestion({
    id: "q-t11-physical-prompt-selection",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "A learner reaches toward a zipper tab but cannot grasp it. The plan allows hand guidance only when lighter help is not enough. Which prompt type is being used if the technician gently guides the learner's fingers to the tab?",
    choices: [
      { id: "a", text: "Physical prompt" },
      { id: "b", text: "Verbal prompt" },
      { id: "c", text: "Model prompt" },
      { id: "d", text: "Positional prompt" },
    ],
    correctAnswer: "a",
    explanation:
      "A physical prompt is correct because the technician uses physical guidance to help the learner complete the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A verbal prompt would use spoken words, not hand guidance.",
        whenWouldBeCorrect: "It would be correct if the technician said, 'Pinch the zipper tab,' without touching the learner.",
      },
      c: {
        whyNotCorrectHere: "A model prompt would show the action for the learner to imitate, not guide the learner's fingers.",
        whenWouldBeCorrect: "It would be correct if the technician zipped their own jacket to demonstrate the movement.",
      },
      d: {
        whyNotCorrectHere: "A positional prompt changes item placement; it does not involve guiding the learner's hand.",
        whenWouldBeCorrect: "It would be correct if the zipper pull were placed closer or made more obvious among options.",
      },
    },
    scenario: "A trainee is selecting the prompt type used during a dressing skill program.",
    difficulty: "intro",
    tags: ["task 11", "physical prompt", "prompt type selection", "prompting"],
  }),
  makeQuestion({
    id: "q-t11-verbal-vs-model-prompt",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "During a manding program, the technician says, 'Say help,' after presenting a closed container. What prompt type is this?",
    choices: [
      { id: "a", text: "Verbal prompt" },
      { id: "b", text: "Model prompt" },
      { id: "c", text: "Stimulus fading" },
      { id: "d", text: "Response effort" },
    ],
    correctAnswer: "a",
    explanation:
      "A verbal prompt is correct because the extra help is spoken language that tells the learner what to say.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A model prompt would demonstrate the target response for imitation rather than simply saying the words as a cue.",
        whenWouldBeCorrect: "It would be correct if the technician modeled signing or pointing and expected the learner to copy it.",
      },
      c: {
        whyNotCorrectHere: "Stimulus fading changes features of the teaching stimulus over time; no stimulus feature is being faded here.",
        whenWouldBeCorrect: "It would be correct if a highlighted cue on the container were gradually made less obvious.",
      },
      d: {
        whyNotCorrectHere: "Response effort is about how easy or hard a response is, not the type of prompt used.",
        whenWouldBeCorrect: "It would be correct if the plan made communication easier, such as putting a break card within reach.",
      },
    },
    scenario: "A supervisor asks a trainee to label the extra cue used during a functional communication trial.",
    difficulty: "intro",
    tags: ["task 11", "verbal prompt", "manding", "prompt type selection"],
  }),
  makeQuestion({
    id: "q-t11-gesture-vs-positional",
    taskNumber: 11,
    questionType: "multiple-choice",
    prompt: "The technician points to the correct picture after giving the instruction, without moving the picture closer. Which prompt type best fits?",
    choices: [
      { id: "a", text: "Gesture or movement prompt" },
      { id: "b", text: "Positional prompt" },
      { id: "c", text: "Physical prompt" },
      { id: "d", text: "Backup reinforcer" },
    ],
    correctAnswer: "a",
    explanation:
      "A gesture or movement prompt is correct because pointing is an added movement cue that guides the learner to the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A positional prompt would arrange the correct item in a more obvious position; the item was not moved.",
        whenWouldBeCorrect: "It would be correct if the correct picture were placed closer to the learner than the distractors.",
      },
      c: {
        whyNotCorrectHere: "A physical prompt would involve touch or guidance; pointing does not physically guide the response.",
        whenWouldBeCorrect: "It would be correct if the technician guided the learner's hand to touch the picture.",
      },
      d: {
        whyNotCorrectHere: "A backup reinforcer is exchanged for tokens and is not a prompt type.",
        whenWouldBeCorrect: "It would be correct if the learner traded tokens for access to a preferred activity.",
      },
    },
    scenario: "A trainee compares common prompt types during receptive identification practice.",
    difficulty: "core",
    tags: ["task 11", "gesture prompt", "movement prompt", "positional prompt"],
  }),
  makeQuestion({
    id: "q-t11-prompt-fading-sequence",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "Across sessions, help changes from full physical guidance to a light touch to a point, then no extra help. What procedure is this?",
    choices: [
      { id: "a", text: "Prompt fading" },
      { id: "b", text: "Stimulus fading" },
      { id: "c", text: "Extinction burst" },
      { id: "d", text: "Whole interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "Prompt fading is correct because the extra assistance for the response is systematically reduced until the learner responds independently.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Stimulus fading changes the features of the teaching materials, not the amount of response assistance.",
        whenWouldBeCorrect: "It would be correct if a visual cue on the correct item were gradually made smaller or lighter.",
      },
      c: {
        whyNotCorrectHere: "An extinction burst is a temporary increase in behavior after reinforcement is withheld; no behavior increase is described.",
        whenWouldBeCorrect: "It would be correct if a previously reinforced behavior briefly intensified when it no longer worked.",
      },
      d: {
        whyNotCorrectHere: "Whole interval recording is a measurement system, not a teaching procedure for reducing prompts.",
        whenWouldBeCorrect: "It would be correct if the observer scored whether behavior occurred for an entire interval.",
      },
    },
    scenario: "A trainee reviews data showing the level of help decreasing over time.",
    difficulty: "core",
    tags: ["task 11", "prompt fading", "physical prompt", "gesture prompt"],
  }),
  makeQuestion({
    id: "q-t11-stimulus-fading-example",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "A correct word card starts with a bright border. Over trials, the border becomes lighter until the learner reads the card without the border. Which procedure is shown?",
    choices: [
      { id: "a", text: "Stimulus fading" },
      { id: "b", text: "Prompt fading" },
      { id: "c", text: "DRO" },
      { id: "d", text: "Free operant assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Stimulus fading is correct because an added feature of the stimulus is gradually removed while the natural stimulus remains.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Prompt fading would reduce response help such as verbal, model, or physical assistance; the response help is not changing here.",
        whenWouldBeCorrect: "It would be correct if the technician moved from a model prompt to a gesture prompt to no prompt.",
      },
      c: {
        whyNotCorrectHere: "DRO reinforces the absence of a target behavior for an interval; it is not about changing stimulus features.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered after no elopement occurred for five minutes.",
      },
      d: {
        whyNotCorrectHere: "Free operant assessment lets the learner access items freely to observe preference, not fade a teaching cue.",
        whenWouldBeCorrect: "It would be correct if the learner freely moved among toys while engagement was recorded.",
      },
    },
    scenario: "A reading program uses a temporary visual cue that is gradually removed.",
    difficulty: "core",
    tags: ["task 11", "stimulus fading", "stimulus control transfer", "visual cue"],
  }),
  makeQuestion({
    id: "q-t11-errorless-teaching",
    taskNumber: 11,
    questionType: "multiple-choice",
    prompt: "A new matching program begins with immediate prompts so the learner contacts the correct response before errors are likely. What approach is being used?",
    choices: [
      { id: "a", text: "Errorless teaching" },
      { id: "b", text: "DRL" },
      { id: "c", text: "Latency recording" },
      { id: "d", text: "Paired-stimulus preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Errorless teaching is correct because prompts are arranged early to reduce mistakes while the learner contacts reinforcement for correct responding.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRL reinforces lower rates of a behavior; it does not describe preventing errors during acquisition.",
        whenWouldBeCorrect: "It would be correct if the goal were fewer interruptions while still allowing some appropriate interruptions.",
      },
      c: {
        whyNotCorrectHere: "Latency recording measures delay from cue to response; it is not a prompting approach.",
        whenWouldBeCorrect: "It would be correct if timing how long the learner takes to begin after an instruction.",
      },
      d: {
        whyNotCorrectHere: "A paired-stimulus assessment compares two items at a time; it is not a matching prompt strategy.",
        whenWouldBeCorrect: "It would be correct if two preferred items were presented and selections were tracked.",
      },
    },
    scenario: "A trainee identifies why a supervisor prompts immediately during early teaching trials.",
    difficulty: "core",
    tags: ["task 11", "errorless teaching", "prompting", "prompt fading"],
  }),
  makeQuestion({
    id: "q-t11-least-to-most",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "The technician gives the SD, waits briefly, then provides a verbal cue, then a gesture, and only then a model if needed. Which prompting sequence is this?",
    choices: [
      { id: "a", text: "Least-to-most prompting" },
      { id: "b", text: "Most-to-least prompting" },
      { id: "c", text: "Backward chaining" },
      { id: "d", text: "Noncontingent reinforcement" },
    ],
    correctAnswer: "a",
    explanation:
      "Least-to-most prompting is correct because the technician starts with the least intrusive help and increases support only as needed.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Most-to-least starts with more intrusive help and fades downward; this sequence begins with minimal help.",
        whenWouldBeCorrect: "It would be correct if the technician began with full guidance and faded to lighter prompts.",
      },
      c: {
        whyNotCorrectHere: "Backward chaining teaches the last step of a task chain first; the scenario describes prompt levels, not chain steps.",
        whenWouldBeCorrect: "It would be correct if teaching the final step of handwashing first.",
      },
      d: {
        whyNotCorrectHere: "Noncontingent reinforcement delivers reinforcement on a time-based schedule independent of behavior.",
        whenWouldBeCorrect: "It would be correct if attention were delivered every two minutes regardless of the learner's behavior.",
      },
    },
    scenario: "A trainee watches the level of prompt increase only after the learner does not respond independently.",
    difficulty: "core",
    tags: ["task 11", "least-to-most prompting", "prompt hierarchy", "prompting"],
  }),
  makeQuestion({
    id: "q-t11-most-to-least",
    taskNumber: 11,
    questionType: "scenario-choice",
    prompt: "A learner is starting a safety routine. The plan begins with full physical guidance, then moves to partial physical guidance, then to a model. Which sequence is this?",
    choices: [
      { id: "a", text: "Most-to-least prompting" },
      { id: "b", text: "Least-to-most prompting" },
      { id: "c", text: "Momentary time sampling" },
      { id: "d", text: "DRH" },
    ],
    correctAnswer: "a",
    explanation:
      "Most-to-least prompting is correct because teaching starts with the most supportive prompt and fades toward independence.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Least-to-most would begin with no or minimal help and increase only if the learner needs it.",
        whenWouldBeCorrect: "It would be correct if the sequence started with a wait, then a verbal prompt, then a model.",
      },
      c: {
        whyNotCorrectHere: "Momentary time sampling checks behavior at specific moments and is not a prompt sequence.",
        whenWouldBeCorrect: "It would be correct if behavior were scored only at the end of each interval.",
      },
      d: {
        whyNotCorrectHere: "DRH reinforces higher rates of a behavior; it is not about prompt level.",
        whenWouldBeCorrect: "It would be correct if the goal were increasing a low-rate appropriate response.",
      },
    },
    scenario: "A safety skill plan begins with high support because independent errors could be risky.",
    difficulty: "core",
    tags: ["task 11", "most-to-least prompting", "safety routine", "prompt fading"],
  }),
  makeQuestion({
    id: "q-t11-prompt-dependence-boundary",
    taskNumber: 11,
    questionType: "short-applied",
    prompt: "A learner answers only after the technician whispers the answer, even though the picture is visible. What is the best next concern to bring to the supervisor?",
    choices: [
      { id: "a", text: "The response may be controlled by the prompt instead of the picture" },
      { id: "b", text: "The learner has mastered stimulus fading" },
      { id: "c", text: "The behavior should be put on extinction immediately" },
      { id: "d", text: "The prompt should become the permanent SD" },
    ],
    correctAnswer: "a",
    explanation:
      "The concern is prompt dependence because the learner responds to the whispered answer rather than the intended picture cue.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Mastery is not shown when the learner still needs the prompt to answer correctly.",
        whenWouldBeCorrect: "It would be correct if the learner responded correctly to the natural cue after the extra cue was removed.",
      },
      c: {
        whyNotCorrectHere: "Extinction is not a default response to prompt dependence and should not be started outside the plan.",
        whenWouldBeCorrect: "It would be correct only if the behavior plan directed withholding the maintaining reinforcer for a specific behavior.",
      },
      d: {
        whyNotCorrectHere: "The goal is usually transfer to the natural SD, not making the artificial prompt permanent.",
        whenWouldBeCorrect: "A prompt might remain only if the clinical plan intentionally uses it as an accommodation or cue.",
      },
    },
    scenario: "A trainee notices correct answers occur only after a verbal prompt.",
    difficulty: "challenge",
    tags: ["task 11", "prompt dependence", "stimulus control transfer", "verbal prompt"],
  }),
  makeQuestion({
    id: "q-t11-redundant-cue",
    taskNumber: 11,
    questionType: "multiple-choice",
    prompt: "The correct letter card is made larger and brighter than the other cards during early teaching, then those extra features are removed. What is the added cue functioning as?",
    choices: [
      { id: "a", text: "A temporary stimulus prompt" },
      { id: "b", text: "A backup reinforcer" },
      { id: "c", text: "A crisis protocol" },
      { id: "d", text: "A duration measure" },
    ],
    correctAnswer: "a",
    explanation:
      "The larger, brighter card is a temporary stimulus prompt because features of the stimulus are altered to guide the correct response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A backup reinforcer is something earned through a token exchange, not a modified teaching card.",
        whenWouldBeCorrect: "It would be correct if the learner exchanged tokens for extra computer time.",
      },
      c: {
        whyNotCorrectHere: "A crisis protocol directs emergency or dangerous-situation responses; no crisis response is described.",
        whenWouldBeCorrect: "It would be correct if staff followed written emergency steps during imminent danger.",
      },
      d: {
        whyNotCorrectHere: "Duration measures how long behavior lasts; the card feature is a teaching cue.",
        whenWouldBeCorrect: "It would be correct if timing how long the learner engaged with the card.",
      },
    },
    scenario: "A trainee identifies a stimulus prompt in an early letter discrimination program.",
    difficulty: "core",
    tags: ["task 11", "stimulus prompt", "stimulus fading", "redundant cue"],
  }),
  makeQuestion({
    id: "q-t11-stimulus-control-transfer",
    taskNumber: 11,
    questionType: "multiple-choice",
    prompt: "What shows successful stimulus control transfer during prompting?",
    choices: [
      { id: "a", text: "The learner responds to the natural SD after prompts are faded" },
      { id: "b", text: "The learner receives tokens without an exchange system" },
      { id: "c", text: "The target behavior increases during extinction" },
      { id: "d", text: "The technician changes the definition of the response" },
    ],
    correctAnswer: "a",
    explanation:
      "Successful transfer means the intended cue, not the prompt, now evokes the response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Tokens without an exchange system do not describe stimulus control or prompt fading.",
        whenWouldBeCorrect: "It would relate to token systems if tokens were earned and exchanged for backup reinforcers according to the plan.",
      },
      c: {
        whyNotCorrectHere: "A behavior increase during extinction is an extinction burst, not successful prompt transfer.",
        whenWouldBeCorrect: "It would be correct if withholding reinforcement briefly increased the behavior.",
      },
      d: {
        whyNotCorrectHere: "Changing response definitions is not a prompting outcome and should not be done by the RBT independently.",
        whenWouldBeCorrect: "A definition change would be relevant only if the supervisor formally revised the program.",
      },
    },
    scenario: "A trainee is checking whether prompt fading has produced independent responding.",
    difficulty: "intro",
    tags: ["task 11", "stimulus control transfer", "prompt fading", "SD"],
  }),
  makeQuestion({
    id: "q-t11-nonexample-prompting",
    taskNumber: 11,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of a prompt?",
    choices: [
      { id: "a", text: "Delivering attention every two minutes regardless of behavior" },
      { id: "b", text: "Pointing to the correct item" },
      { id: "c", text: "Showing the learner how to complete the response" },
      { id: "d", text: "Placing the correct item closer than the distractors" },
    ],
    correctAnswer: "a",
    explanation:
      "Delivering attention on a schedule is noncontingent reinforcement, not extra assistance that helps the learner emit a specific response.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Pointing is a gesture prompt, so it is an example of a prompt.",
        whenWouldBeCorrect: "It would be the correct answer if the question asked for a gesture prompt example.",
      },
      c: {
        whyNotCorrectHere: "Showing the response is a model prompt, so it is not the nonexample.",
        whenWouldBeCorrect: "It would be correct if asked to identify a model prompt.",
      },
      d: {
        whyNotCorrectHere: "Placing the correct item closer is a positional prompt.",
        whenWouldBeCorrect: "It would be correct if asked for a positional prompt example.",
      },
    },
    scenario: "A trainee separates prompting procedures from antecedent reinforcement schedules.",
    difficulty: "challenge",
    tags: ["task 11", "nonexample", "prompting", "noncontingent reinforcement"],
  }),
  makeQuestion({
    id: "q-t12-token-system-components",
    taskNumber: 12,
    questionType: "multiple-choice",
    prompt: "Which set best describes the core parts of a token system?",
    choices: [
      { id: "a", text: "Target behaviors, tokens, backup reinforcers, and exchange rules" },
      { id: "b", text: "A timer, interval sheet, and momentary checks" },
      { id: "c", text: "A task analysis, open steps, and closed steps" },
      { id: "d", text: "A crisis protocol and emergency contacts only" },
    ],
    correctAnswer: "a",
    explanation:
      "A token system needs clear earning criteria, a token or point, backup reinforcers, and rules for exchange.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Those materials fit discontinuous measurement, not a token reinforcement system.",
        whenWouldBeCorrect: "It would be correct if the task were momentary time sampling or interval recording.",
      },
      c: {
        whyNotCorrectHere: "A task analysis organizes steps in a chain; it does not define how tokens are earned and exchanged.",
        whenWouldBeCorrect: "It would be correct if teaching a multi-step routine such as handwashing.",
      },
      d: {
        whyNotCorrectHere: "A crisis protocol may be important, but it is not the structure of a token system.",
        whenWouldBeCorrect: "It would be correct when describing emergency response procedures.",
      },
    },
    scenario: "A trainee is asked what must be in place before implementing a token board.",
    difficulty: "intro",
    tags: ["task 12", "token system", "backup reinforcers", "exchange rules"],
  }),
  makeQuestion({
    id: "q-t12-backup-reinforcer",
    taskNumber: 12,
    questionType: "scenario-choice",
    prompt: "A learner earns stars during work and later trades five stars for drawing time. In this system, what is drawing time?",
    choices: [
      { id: "a", text: "Backup reinforcer" },
      { id: "b", text: "Token" },
      { id: "c", text: "S-delta" },
      { id: "d", text: "Physical prompt" },
    ],
    correctAnswer: "a",
    explanation:
      "Drawing time is the backup reinforcer because tokens are exchanged for it after the learner earns enough stars.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "The stars are the tokens; drawing time is what the tokens buy.",
        whenWouldBeCorrect: "It would be correct if the question asked what the stars are.",
      },
      c: {
        whyNotCorrectHere: "An S-delta signals reinforcement is not available for a response; drawing time is an earned consequence.",
        whenWouldBeCorrect: "It would be correct if a red card signaled a request would not be reinforced right now.",
      },
      d: {
        whyNotCorrectHere: "A physical prompt is hand-over-hand or body guidance, not an exchanged activity.",
        whenWouldBeCorrect: "It would be correct if the technician guided the learner's hand to complete a response.",
      },
    },
    scenario: "A trainee identifies the parts of a classroom token board.",
    difficulty: "intro",
    tags: ["task 12", "backup reinforcer", "token", "token exchange"],
  }),
  makeQuestion({
    id: "q-t12-token-delivery-timing",
    taskNumber: 12,
    questionType: "scenario-choice",
    prompt: "The plan says to give one token immediately after each independent request. The learner independently says, 'Break please.' What should the technician do?",
    choices: [
      { id: "a", text: "Deliver the token according to the plan and label the behavior if that is part of the procedure" },
      { id: "b", text: "Wait until the end of the session so the token feels more valuable" },
      { id: "c", text: "Give two tokens because the response was especially clear" },
      { id: "d", text: "Skip the token because the learner already knows how to request" },
    ],
    correctAnswer: "a",
    explanation:
      "The token should be delivered as written because the learner met the earning criterion for an independent request.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Delaying the token changes the contingency and may weaken the connection to the target response.",
        whenWouldBeCorrect: "Delayed exchange could be correct only if the written token plan specifies that tokens are exchanged later.",
      },
      c: {
        whyNotCorrectHere: "Giving extra tokens changes the schedule and can make the system inconsistent.",
        whenWouldBeCorrect: "It would be correct if the plan defined that response as earning two tokens.",
      },
      d: {
        whyNotCorrectHere: "Skipping programmed reinforcement changes the plan and may reduce the target behavior.",
        whenWouldBeCorrect: "It would be correct only if the supervisor revised the plan to fade token delivery.",
      },
    },
    scenario: "A trainee practices following token delivery rules exactly during communication teaching.",
    difficulty: "core",
    tags: ["task 12", "token delivery", "contingency", "functional communication"],
  }),
  makeQuestion({
    id: "q-t12-exchange-rules",
    taskNumber: 12,
    questionType: "short-applied",
    prompt: "A token board says five tokens can be exchanged for one item from the choice menu. The learner has four tokens and asks to trade now. What is the best response?",
    choices: [
      { id: "a", text: "Follow the exchange rule and prompt earning the next token if appropriate" },
      { id: "b", text: "Exchange early so the learner stays happy" },
      { id: "c", text: "Erase the board and restart" },
      { id: "d", text: "Switch to extinction because the learner asked early" },
    ],
    correctAnswer: "a",
    explanation:
      "The technician should follow the written exchange rule so the token system remains predictable and consistent.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Exchanging early changes the token requirement and may make the system unclear.",
        whenWouldBeCorrect: "It would be correct only if the supervisor changed the exchange requirement to four tokens.",
      },
      c: {
        whyNotCorrectHere: "Restarting would remove earned tokens without a stated plan and could be unfair or disruptive.",
        whenWouldBeCorrect: "Clearing a board would be correct after a completed exchange if the plan says to reset it.",
      },
      d: {
        whyNotCorrectHere: "Asking early is not a reason to start extinction; extinction must be planned for a specific behavior and function.",
        whenWouldBeCorrect: "It would be correct only if the behavior plan directed withholding a maintaining consequence for a target behavior.",
      },
    },
    scenario: "A learner wants to exchange tokens before reaching the written price.",
    difficulty: "core",
    tags: ["task 12", "exchange schedule", "token system", "consistency"],
  }),
  makeQuestion({
    id: "q-t12-token-vs-backup-boundary",
    taskNumber: 12,
    questionType: "multiple-choice",
    prompt: "Which statement best separates a token from a backup reinforcer?",
    choices: [
      { id: "a", text: "A token is earned first; a backup reinforcer is what the learner exchanges tokens for" },
      { id: "b", text: "A backup reinforcer is always a sticker; a token is always food" },
      { id: "c", text: "A token is a prompt; a backup reinforcer is an SD" },
      { id: "d", text: "A token is used only during crisis procedures" },
    ],
    correctAnswer: "a",
    explanation:
      "Tokens are conditioned items or points earned for behavior, while backup reinforcers are the items or activities available through exchange.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Tokens and backup reinforcers are not limited to those forms; the plan defines what they are.",
        whenWouldBeCorrect: "It would be correct only in a specific plan that used stickers as backups and food as tokens, which would be unusual and plan-specific.",
      },
      c: {
        whyNotCorrectHere: "Tokens and prompts have different functions; prompts help responses occur, while tokens are consequences.",
        whenWouldBeCorrect: "It would be correct if identifying a cue that helped the learner respond before reinforcement.",
      },
      d: {
        whyNotCorrectHere: "Token systems are reinforcement systems and are not limited to crisis procedures.",
        whenWouldBeCorrect: "Crisis procedures would be relevant when immediate safety steps are required.",
      },
    },
    scenario: "A trainee explains token terminology before practicing an exchange.",
    difficulty: "intro",
    tags: ["task 12", "token", "backup reinforcer", "comparison"],
  }),
  makeQuestion({
    id: "q-t12-token-system-not-bribe",
    taskNumber: 12,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of correctly implementing a token system?",
    choices: [
      { id: "a", text: "Offering a token after refusal to persuade the learner to start, even though that is not in the plan" },
      { id: "b", text: "Delivering a token immediately after the target behavior listed in the plan" },
      { id: "c", text: "Letting the learner exchange earned tokens for a listed backup reinforcer" },
      { id: "d", text: "Resetting the board after a completed exchange when the plan says to reset it" },
    ],
    correctAnswer: "a",
    explanation:
      "Offering tokens after refusal outside the plan can turn the token into a negotiation tool instead of a planned consequence for target behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "That is correct implementation because the token follows the target behavior as planned.",
        whenWouldBeCorrect: "It would be the answer if asked for an example of correct token delivery.",
      },
      c: {
        whyNotCorrectHere: "Exchanging earned tokens for a backup reinforcer is a core part of token systems.",
        whenWouldBeCorrect: "It would be correct if asked what happens after enough tokens are earned.",
      },
      d: {
        whyNotCorrectHere: "Resetting after exchange is correct when it is part of the written procedure.",
        whenWouldBeCorrect: "It would be incorrect only if tokens were removed before an earned exchange or outside the plan.",
      },
    },
    scenario: "A trainee identifies the boundary between planned reinforcement and improvised bargaining.",
    difficulty: "challenge",
    tags: ["task 12", "token system", "nonexample", "boundaries"],
  }),
  makeQuestion({
    id: "q-t12-response-cost-boundary",
    taskNumber: 12,
    questionType: "scenario-choice",
    prompt: "A learner swears after earning three tokens. The token plan does not mention removing tokens. What should the technician do?",
    choices: [
      { id: "a", text: "Do not remove tokens unless the written plan directs it; follow the behavior plan and ask for guidance if needed" },
      { id: "b", text: "Remove all tokens because swearing occurred" },
      { id: "c", text: "Add an extra exchange requirement without telling the learner" },
      { id: "d", text: "Ignore the token system for the rest of the day" },
    ],
    correctAnswer: "a",
    explanation:
      "The technician should not add token loss procedures independently because token removal changes the reinforcement system and must be in the plan.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Removing all tokens is not authorized by the described plan and could be punitive or inconsistent.",
        whenWouldBeCorrect: "Token removal would be correct only if a supervisor-written plan specifically included that procedure and the RBT was trained on it.",
      },
      c: {
        whyNotCorrectHere: "Changing the exchange requirement without notice makes the system unpredictable and outside the RBT role.",
        whenWouldBeCorrect: "It would be correct only if the supervisor formally changed the exchange schedule.",
      },
      d: {
        whyNotCorrectHere: "Stopping the system without direction changes the plan and may disrupt programmed reinforcement.",
        whenWouldBeCorrect: "Pausing might be correct only if the protocol or supervisor directs it for safety or procedural reasons.",
      },
    },
    scenario: "A trainee considers whether tokens can be taken away when a behavior occurs.",
    difficulty: "challenge",
    tags: ["task 12", "token system", "response cost", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t12-generalized-conditioned",
    taskNumber: 12,
    questionType: "multiple-choice",
    prompt: "Why can tokens stay useful across several activities when the exchange menu is maintained well?",
    choices: [
      { id: "a", text: "They can be exchanged for different backup reinforcers" },
      { id: "b", text: "They physically prompt every response" },
      { id: "c", text: "They remove the need for supervision" },
      { id: "d", text: "They make extinction unnecessary in every plan" },
    ],
    correctAnswer: "a",
    explanation:
      "Tokens can function as conditioned reinforcers because they are linked to backup reinforcers available through exchange.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Tokens are consequences, not physical prompts that guide movement.",
        whenWouldBeCorrect: "It would be correct if the technician physically guided the learner through a response.",
      },
      c: {
        whyNotCorrectHere: "Token systems do not remove supervision requirements or the need to follow the plan.",
        whenWouldBeCorrect: "Supervision would be discussed under RBT supervision requirements, not token value.",
      },
      d: {
        whyNotCorrectHere: "Token systems and extinction are different procedures; one does not automatically replace the other.",
        whenWouldBeCorrect: "Extinction would be relevant if the plan withholds the maintaining reinforcer for a target behavior.",
      },
    },
    scenario: "A trainee reviews why the same tokens can support more than one program.",
    difficulty: "core",
    tags: ["task 12", "conditioned reinforcer", "backup reinforcer", "token system"],
  }),
  makeQuestion({
    id: "q-t12-backup-not-effective",
    taskNumber: 12,
    questionType: "short-applied",
    prompt: "The learner earns all tokens but refuses every backup reinforcer on the menu. What is the best RBT response?",
    choices: [
      { id: "a", text: "Report the issue and follow supervisor direction about updating reinforcers" },
      { id: "b", text: "Pick a new backup reinforcer without telling the supervisor" },
      { id: "c", text: "Stop delivering tokens because they are not working today" },
      { id: "d", text: "Require more tokens for the same menu items" },
    ],
    correctAnswer: "a",
    explanation:
      "If backup reinforcers are not effective, the RBT should communicate the observation and follow clinical direction rather than redesign the system independently.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Changing reinforcers can alter the plan and should be directed by the supervisor.",
        whenWouldBeCorrect: "It would be correct if the supervisor gave a revised, approved menu to use.",
      },
      c: {
        whyNotCorrectHere: "Stopping token delivery changes the contingency and may remove reinforcement for target behavior.",
        whenWouldBeCorrect: "It would be correct only if the supervisor or written plan directed pausing the token system.",
      },
      d: {
        whyNotCorrectHere: "Making items more expensive would not solve low reinforcer value and changes the exchange schedule.",
        whenWouldBeCorrect: "It would be correct only if the supervisor revised the token price as part of a plan.",
      },
    },
    scenario: "A trainee notices the exchange menu is no longer motivating for the learner.",
    difficulty: "core",
    tags: ["task 12", "backup reinforcer", "token exchange", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t12-consistent-criteria",
    taskNumber: 12,
    questionType: "true-false",
    prompt: "True or false: If a token system says one token is earned for each completed math problem, the technician should deliver tokens based on that criterion rather than mood, convenience, or personal judgment.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "a",
    explanation:
      "True is correct because token systems depend on clear, consistent earning criteria.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "False is not correct because changing delivery based on mood or convenience weakens the planned contingency.",
        whenWouldBeCorrect: "It would be correct only if the written plan gave staff discretion to use different criteria, which is not described here.",
      },
    },
    scenario: "A trainee reviews whether personal judgment can replace written token criteria.",
    difficulty: "intro",
    tags: ["task 12", "token criteria", "consistency", "true false"],
  }),
  makeQuestion({
    id: "q-t13-prevention-vs-deescalation",
    taskNumber: 13,
    questionType: "multiple-choice",
    prompt: "Which statement best separates crisis prevention from de-escalation?",
    choices: [
      { id: "a", text: "Prevention reduces the chance of escalation before it starts; de-escalation responds after warning signs appear" },
      { id: "b", text: "Prevention is only paperwork; de-escalation is only physical blocking" },
      { id: "c", text: "Prevention happens after a crisis; de-escalation happens only during monthly supervision" },
      { id: "d", text: "Prevention and de-escalation are the same procedure with different names" },
    ],
    correctAnswer: "a",
    explanation:
      "Prevention is proactive, while de-escalation is used when behavior is rising and staff are trying to reduce intensity safely.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Prevention can include environmental changes, schedules, reinforcement, and clear routines; de-escalation is broader than physical blocking.",
        whenWouldBeCorrect: "Physical blocking would be relevant only if a trained, approved protocol calls for it to protect safety.",
      },
      c: {
        whyNotCorrectHere: "Prevention occurs before escalation, not after a crisis, and de-escalation is used during rising behavior.",
        whenWouldBeCorrect: "Monthly supervision would be relevant to RBT supervision requirements, not the timing of crisis procedures.",
      },
      d: {
        whyNotCorrectHere: "They are related but not identical because they occur at different points in the behavior cycle.",
        whenWouldBeCorrect: "It would be correct only if a specific training used one umbrella term, which this question does not describe.",
      },
    },
    scenario: "A trainee is asked to explain the difference between preventing escalation and responding to early escalation.",
    difficulty: "intro",
    tags: ["task 13", "crisis prevention", "de-escalation", "comparison"],
  }),
  makeQuestion({
    id: "q-t13-follow-crisis-protocol",
    taskNumber: 13,
    questionType: "scenario-choice",
    prompt: "A learner begins a behavior that the written crisis protocol defines as an emergency response situation. What should the RBT do first?",
    choices: [
      { id: "a", text: "Follow the trained crisis protocol and call for help as the protocol directs" },
      { id: "b", text: "Invent a new response because the protocol might take too long" },
      { id: "c", text: "Ignore the behavior until the next scheduled data entry" },
      { id: "d", text: "Start teaching a new replacement skill during the emergency" },
    ],
    correctAnswer: "a",
    explanation:
      "The RBT should follow the trained protocol because crisis procedures are safety procedures that must be implemented as written.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Improvising can create safety and ethical risks and may go outside the RBT's training.",
        whenWouldBeCorrect: "A different response would be correct only after the supervisor formally updates the protocol and trains staff.",
      },
      c: {
        whyNotCorrectHere: "Ignoring an emergency-level behavior could leave people unsafe and does not follow the protocol.",
        whenWouldBeCorrect: "Planned ignoring may be correct only for a behavior and function specified in a behavior plan, not an emergency described here.",
      },
      d: {
        whyNotCorrectHere: "Active skill teaching is usually not the first priority during an emergency-level behavior.",
        whenWouldBeCorrect: "Teaching a replacement skill would be correct during planned instruction or after safety is restored, according to the plan.",
      },
    },
    scenario: "A trainee must choose the safest response when a written crisis procedure is triggered.",
    difficulty: "core",
    tags: ["task 13", "crisis protocol", "emergency procedures", "safety"],
  }),
  makeQuestion({
    id: "q-t13-deescalation-scenario",
    taskNumber: 13,
    questionType: "scenario-choice",
    prompt: "A learner starts pacing, raises their voice, and clenches their fists. The crisis plan lists these as early escalation signs and says to reduce demands, use a calm tone, and offer space. Which response fits?",
    choices: [
      { id: "a", text: "Use the listed de-escalation steps" },
      { id: "b", text: "Increase demands to finish the lesson faster" },
      { id: "c", text: "Give a long lecture about expected behavior" },
      { id: "d", text: "Start a preference assessment in the middle of escalation" },
    ],
    correctAnswer: "a",
    explanation:
      "The listed steps fit de-escalation because they are designed to reduce intensity when early warning signs appear.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Increasing demands may raise intensity when the plan says to reduce demands.",
        whenWouldBeCorrect: "Increasing task expectations would be correct only in a different teaching plan and when the learner is ready for that demand.",
      },
      c: {
        whyNotCorrectHere: "A long lecture adds verbal stimulation and is not the calm, brief response described in the plan.",
        whenWouldBeCorrect: "Brief feedback may be correct later if the plan includes it and the learner is calm enough to benefit.",
      },
      d: {
        whyNotCorrectHere: "A preference assessment is not the immediate response to early crisis signs in this plan.",
        whenWouldBeCorrect: "It would be correct during planned assessment time when the learner is safe and available for assessment.",
      },
    },
    scenario: "A trainee sees early signs of escalation and must follow the de-escalation section of the plan.",
    difficulty: "core",
    tags: ["task 13", "de-escalation", "crisis prevention", "early signs"],
  }),
  makeQuestion({
    id: "q-t13-prevention-environment",
    taskNumber: 13,
    questionType: "multiple-choice",
    prompt: "Which option is most clearly a crisis prevention strategy?",
    choices: [
      { id: "a", text: "Arranging materials, choices, and breaks before known triggers usually occur" },
      { id: "b", text: "Waiting for dangerous behavior before deciding what to do" },
      { id: "c", text: "Changing the crisis protocol without supervisor review" },
      { id: "d", text: "Arguing with the learner until they comply" },
    ],
    correctAnswer: "a",
    explanation:
      "Arranging supports before known triggers is prevention because it reduces the likelihood of escalation before crisis behavior occurs.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Waiting until danger occurs is reactive, not preventive.",
        whenWouldBeCorrect: "A reactive protocol is used only after defined crisis signs occur.",
      },
      c: {
        whyNotCorrectHere: "RBTs should not independently change crisis protocols.",
        whenWouldBeCorrect: "Protocol changes would be correct only when directed by the qualified supervisor and trained.",
      },
      d: {
        whyNotCorrectHere: "Arguing is likely to escalate behavior and does not follow a calm prevention approach.",
        whenWouldBeCorrect: "Clear, brief directions may be correct in some plans, but arguing is not a prevention strategy.",
      },
    },
    scenario: "A trainee prepares the session to reduce predictable escalation triggers.",
    difficulty: "intro",
    tags: ["task 13", "crisis prevention", "environmental arrangement", "antecedent support"],
  }),
  makeQuestion({
    id: "q-t13-protocol-boundary",
    taskNumber: 13,
    questionType: "short-applied",
    prompt: "A coworker suggests using a hands-on procedure that is not in the learner's crisis plan and that you have not been trained to use. What is the best response?",
    choices: [
      { id: "a", text: "Do not use it; follow the approved protocol and seek supervisor direction" },
      { id: "b", text: "Try it once because the coworker recommended it" },
      { id: "c", text: "Use it only if no one is watching" },
      { id: "d", text: "Replace the written plan with the coworker's idea" },
    ],
    correctAnswer: "a",
    explanation:
      "Crisis procedures must be approved and trained; using an unapproved hands-on procedure can create safety and ethical problems.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A coworker's suggestion does not replace training, consent, supervision, or the written protocol.",
        whenWouldBeCorrect: "A new procedure would be correct only after supervisor approval and competency-based training.",
      },
      c: {
        whyNotCorrectHere: "Visibility does not determine whether a procedure is ethical or allowed.",
        whenWouldBeCorrect: "Privacy may matter for dignity, but it does not make an unapproved procedure acceptable.",
      },
      d: {
        whyNotCorrectHere: "RBTs do not replace crisis plans independently.",
        whenWouldBeCorrect: "A plan replacement would be correct only through the supervisor's formal revision process.",
      },
    },
    scenario: "A trainee is pressured to use an emergency procedure outside the written protocol.",
    difficulty: "challenge",
    tags: ["task 13", "crisis protocol", "scope", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t13-brief-calm-communication",
    taskNumber: 13,
    questionType: "multiple-choice",
    prompt: "During escalation, the plan says to use brief, calm statements. Why is a long explanation usually a poor fit at that moment?",
    choices: [
      { id: "a", text: "It can add demands and stimulation when the goal is to reduce intensity" },
      { id: "b", text: "It is the same as a backup reinforcer" },
      { id: "c", text: "It measures duration incorrectly" },
      { id: "d", text: "It proves the learner has mastered discrimination training" },
    ],
    correctAnswer: "a",
    explanation:
      "Brief, calm communication can reduce extra stimulation and demands, which supports de-escalation when that is in the plan.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A backup reinforcer is earned through exchange; a long explanation is not a token-system item.",
        whenWouldBeCorrect: "It would be correct if the learner traded tokens for a preferred activity.",
      },
      c: {
        whyNotCorrectHere: "The issue is de-escalation, not the accuracy of a duration measure.",
        whenWouldBeCorrect: "Duration would be relevant if timing how long the escalation lasts.",
      },
      d: {
        whyNotCorrectHere: "Discrimination training involves responding differently in the presence of different stimuli; long explanations do not prove mastery.",
        whenWouldBeCorrect: "It would be correct if the learner responded correctly to one SD and not to an S-delta.",
      },
    },
    scenario: "A trainee reviews why communication style matters during de-escalation.",
    difficulty: "core",
    tags: ["task 13", "de-escalation", "communication", "calm tone"],
  }),
  makeQuestion({
    id: "q-t13-after-crisis-documentation",
    taskNumber: 13,
    questionType: "scenario-choice",
    prompt: "After a crisis event is resolved and everyone is safe, the protocol requires notification and objective documentation. What should the RBT include?",
    choices: [
      { id: "a", text: "Observable events, times, procedures used, and notifications required by the protocol" },
      { id: "b", text: "Personal opinions about the learner's motives" },
      { id: "c", text: "A new behavior plan written by the RBT" },
      { id: "d", text: "Only positive events so the report sounds better" },
    ],
    correctAnswer: "a",
    explanation:
      "Objective details and required notifications support accurate follow-up while staying within the RBT role.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Motives are interpretations; documentation should focus on observable facts and required details.",
        whenWouldBeCorrect: "Hypotheses may be discussed by the supervisor when analyzing data, but they should not replace objective notes.",
      },
      c: {
        whyNotCorrectHere: "Writing a new behavior plan is outside the RBT role.",
        whenWouldBeCorrect: "A revised plan would be correct only when developed by the qualified supervisor.",
      },
      d: {
        whyNotCorrectHere: "Leaving out relevant facts makes the documentation inaccurate.",
        whenWouldBeCorrect: "Positive events should be included when relevant, but not at the expense of required crisis details.",
      },
    },
    scenario: "A trainee completes follow-up steps after implementing a crisis protocol.",
    difficulty: "core",
    tags: ["task 13", "documentation", "crisis protocol", "objective notes"],
  }),
  makeQuestion({
    id: "q-t13-interview-scope",
    taskNumber: 13,
    questionType: "multiple-choice",
    prompt: "During an interview portion of competency assessment, what is the strongest answer to, 'What do you do if you are unsure whether a crisis procedure applies?'",
    choices: [
      { id: "a", text: "Keep people safe, follow known emergency procedures, and contact the supervisor or emergency supports as directed" },
      { id: "b", text: "Guess quickly so services are not interrupted" },
      { id: "c", text: "Ask the learner to decide which protocol should be used" },
      { id: "d", text: "Ignore the written protocol and rely on personal experience" },
    ],
    correctAnswer: "a",
    explanation:
      "The RBT should prioritize safety, stay within training, and seek clinical direction when the protocol is unclear.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Guessing can lead to unsafe or unapproved procedures.",
        whenWouldBeCorrect: "Fast action is correct only when it follows a known emergency protocol or immediate safety requirement.",
      },
      c: {
        whyNotCorrectHere: "Learner choice is important, but the learner does not choose emergency protocols.",
        whenWouldBeCorrect: "Choice would be correct for appropriate options within a teaching or antecedent support plan.",
      },
      d: {
        whyNotCorrectHere: "Personal experience does not replace the written plan or supervisor direction.",
        whenWouldBeCorrect: "Experience can help implement trained procedures accurately, but not override the protocol.",
      },
    },
    scenario: "A trainee practices an interview response for task 13.",
    difficulty: "challenge",
    tags: ["task 13", "interview", "crisis protocol", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t13-emergency-vs-behavior-plan",
    taskNumber: 13,
    questionType: "scenario-choice",
    prompt: "A fire alarm sounds during session. The learner is calm, but the building emergency plan says to evacuate. Which action fits best?",
    choices: [
      { id: "a", text: "Follow the site emergency procedure while supporting the learner safely" },
      { id: "b", text: "Continue the teaching program because behavior is calm" },
      { id: "c", text: "Start an extinction procedure for leaving the room" },
      { id: "d", text: "Run a token exchange before evacuating" },
    ],
    correctAnswer: "a",
    explanation:
      "A fire alarm triggers the emergency procedure; safety takes priority over routine instruction or token exchange.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Continuing instruction ignores an active emergency procedure.",
        whenWouldBeCorrect: "Continuing instruction would be correct when there is no emergency and the session plan is still appropriate.",
      },
      c: {
        whyNotCorrectHere: "Leaving during a fire alarm is not a target behavior for extinction; it is part of safety response.",
        whenWouldBeCorrect: "Extinction would be correct only for a specific behavior and function in a written plan.",
      },
      d: {
        whyNotCorrectHere: "A token exchange should not delay evacuation during an emergency.",
        whenWouldBeCorrect: "Token exchange would be correct during routine conditions when the learner has earned exchange access.",
      },
    },
    scenario: "A trainee distinguishes building emergency procedures from behavior programming.",
    difficulty: "core",
    tags: ["task 13", "emergency procedures", "safety", "protocol"],
  }),
  makeQuestion({
    id: "q-t13-nonexample-crisis-response",
    taskNumber: 13,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of appropriate crisis or emergency responding?",
    choices: [
      { id: "a", text: "Blocking the learner's exit with your body because you feel frustrated, without a written safety protocol" },
      { id: "b", text: "Using the trained de-escalation steps listed in the plan" },
      { id: "c", text: "Calling for help when the protocol says to do so" },
      { id: "d", text: "Documenting observable events after the situation is safe" },
    ],
    correctAnswer: "a",
    explanation:
      "Blocking based on frustration and without a written, trained protocol is not appropriate crisis responding.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Using trained de-escalation steps from the plan is appropriate, not the nonexample.",
        whenWouldBeCorrect: "It would be correct if asked for an appropriate response to early escalation signs.",
      },
      c: {
        whyNotCorrectHere: "Calling for help as directed is part of many crisis protocols.",
        whenWouldBeCorrect: "It would be correct if asked what to do when the protocol requires additional support.",
      },
      d: {
        whyNotCorrectHere: "Objective documentation after safety is restored is appropriate follow-up.",
        whenWouldBeCorrect: "It would be correct if asked what to include after an incident.",
      },
    },
    scenario: "A trainee identifies the unsafe boundary in crisis response options.",
    difficulty: "challenge",
    tags: ["task 13", "nonexample", "crisis protocol", "safety"],
  }),
  makeQuestion({
    id: "q-t14-antecedent-intervention-definition",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "Which option best describes an antecedent intervention?",
    choices: [
      { id: "a", text: "A strategy used before behavior occurs to reduce problem behavior or support desired behavior" },
      { id: "b", text: "A graph used only after all treatment is complete" },
      { id: "c", text: "Withholding reinforcement after a behavior because it previously worked" },
      { id: "d", text: "Counting each occurrence of a behavior" },
    ],
    correctAnswer: "a",
    explanation:
      "Antecedent interventions change conditions before behavior occurs so the learner is more likely to respond successfully.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Graphs display data; they are not antecedent strategies used before behavior.",
        whenWouldBeCorrect: "It would be correct if the question asked how to visually display data trends.",
      },
      c: {
        whyNotCorrectHere: "Withholding the maintaining reinforcer after behavior is extinction, a consequence procedure.",
        whenWouldBeCorrect: "It would be correct if the plan stopped reinforcing a behavior that previously produced attention, escape, or access.",
      },
      d: {
        whyNotCorrectHere: "Counting occurrences is frequency measurement, not an intervention.",
        whenWouldBeCorrect: "It would be correct if the observer recorded each instance of a discrete behavior.",
      },
    },
    scenario: "A trainee sorts task 14 procedures into antecedent and consequence-based categories.",
    difficulty: "intro",
    tags: ["task 14", "antecedent intervention", "definition", "comparison"],
  }),
  makeQuestion({
    id: "q-t14-motivating-operations",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "Before a hard table-work block, the plan gives brief scheduled attention because attention-seeking behavior is more likely after long periods without attention. Which concept is the plan addressing?",
    choices: [
      { id: "a", text: "Motivating operations" },
      { id: "b", text: "Permanent product" },
      { id: "c", text: "Backward chaining" },
      { id: "d", text: "S-delta" },
    ],
    correctAnswer: "a",
    explanation:
      "The plan is addressing motivating operations by changing the value of attention before the problem behavior is likely.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Permanent product measures work left behind; it does not explain why attention is more or less valuable.",
        whenWouldBeCorrect: "It would be correct if scoring completed worksheets after the session.",
      },
      c: {
        whyNotCorrectHere: "Backward chaining teaches the last step of a chain first and is unrelated to the value of attention.",
        whenWouldBeCorrect: "It would be correct if teaching the final step of a task analysis first.",
      },
      d: {
        whyNotCorrectHere: "An S-delta signals reinforcement is unavailable for a response; the scenario is changing motivation before behavior.",
        whenWouldBeCorrect: "It would be correct if a signal showed that attention requests would not be reinforced now.",
      },
    },
    scenario: "A trainee identifies why scheduled attention can reduce the motivation for attention-seeking behavior.",
    difficulty: "core",
    tags: ["task 14", "motivating operations", "antecedent intervention", "attention"],
  }),
  makeQuestion({
    id: "q-t14-response-effort",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A learner throws materials when the break card is across the room. The plan places the break card on the desk and keeps throwables out of reach. Which antecedent concept is most directly targeted?",
    choices: [
      { id: "a", text: "Response effort" },
      { id: "b", text: "Extinction-induced variability" },
      { id: "c", text: "DRH" },
      { id: "d", text: "Whole interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "The plan decreases effort for the appropriate break request and increases effort for throwing materials.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Extinction-induced variability is new or different behavior during extinction, not arranging effort before behavior.",
        whenWouldBeCorrect: "It would be correct if the learner tried new forms of problem behavior after the old form no longer worked.",
      },
      c: {
        whyNotCorrectHere: "DRH reinforces higher rates of a behavior; no rate-increase criterion is described.",
        whenWouldBeCorrect: "It would be correct if reinforcing more frequent appropriate requests above a set rate.",
      },
      d: {
        whyNotCorrectHere: "Whole interval recording is measurement, not an antecedent arrangement.",
        whenWouldBeCorrect: "It would be correct if scoring whether a behavior occurred for an entire interval.",
      },
    },
    scenario: "A trainee reviews an antecedent plan that makes the desired response easier than problem behavior.",
    difficulty: "core",
    tags: ["task 14", "response effort", "antecedent intervention", "functional communication"],
  }),
  makeQuestion({
    id: "q-t14-noncontingent-reinforcement",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "Which example best shows noncontingent reinforcement?",
    choices: [
      { id: "a", text: "Providing attention every three minutes on a timer, regardless of whether problem behavior occurred" },
      { id: "b", text: "Giving attention only after the learner screams" },
      { id: "c", text: "Giving a token only after correct responding" },
      { id: "d", text: "Reinforcing the absence of behavior for a full interval" },
    ],
    correctAnswer: "a",
    explanation:
      "Noncontingent reinforcement delivers the reinforcer on a schedule independent of the target behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Giving attention after screaming reinforces the problem behavior rather than delivering attention independent of it.",
        whenWouldBeCorrect: "It would describe the maintaining consequence if screaming is attention-maintained.",
      },
      c: {
        whyNotCorrectHere: "A token after correct responding is contingent reinforcement, not noncontingent reinforcement.",
        whenWouldBeCorrect: "It would be correct for a token system tied to target responses.",
      },
      d: {
        whyNotCorrectHere: "Reinforcing no target behavior for an interval is DRO, not NCR.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered only when the target behavior did not occur during the interval.",
      },
    },
    scenario: "A trainee distinguishes time-based access to attention from response-dependent reinforcement.",
    difficulty: "core",
    tags: ["task 14", "NCR", "noncontingent reinforcement", "antecedent intervention"],
  }),
  makeQuestion({
    id: "q-t14-high-p-sequence",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "Before asking a learner to complete a difficult writing response, the technician asks the learner to clap, touch head, and give a high five, which the learner usually does quickly. What antecedent strategy is this?",
    choices: [
      { id: "a", text: "High-p instruction sequence" },
      { id: "b", text: "DRL" },
      { id: "c", text: "Extinction burst" },
      { id: "d", text: "Momentary time sampling" },
    ],
    correctAnswer: "a",
    explanation:
      "A high-p sequence uses several high-probability responses before a harder request to build momentum for cooperation.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRL reinforces lower rates of behavior; this strategy presents easy requests before a hard one.",
        whenWouldBeCorrect: "It would be correct if reinforcing fewer but still acceptable interruptions.",
      },
      c: {
        whyNotCorrectHere: "An extinction burst is a temporary increase after reinforcement is withheld, not a series of easy instructions.",
        whenWouldBeCorrect: "It would be correct if behavior briefly intensified when it stopped producing reinforcement.",
      },
      d: {
        whyNotCorrectHere: "Momentary time sampling is a recording method and does not involve instruction sequencing.",
        whenWouldBeCorrect: "It would be correct if scoring behavior at the exact end of intervals.",
      },
    },
    scenario: "A trainee observes easy instructions placed before a more difficult task demand.",
    difficulty: "intro",
    tags: ["task 14", "high-p sequence", "antecedent intervention", "behavioral momentum"],
  }),
  makeQuestion({
    id: "q-t14-task-interspersal",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A technician mixes mastered matching trials between new reading trials so the work period contains easier and harder items. Which antecedent intervention is this?",
    choices: [
      { id: "a", text: "Task interspersal" },
      { id: "b", text: "Extinction" },
      { id: "c", text: "Paired-stimulus preference assessment" },
      { id: "d", text: "IRT recording" },
    ],
    correctAnswer: "a",
    explanation:
      "Task interspersal is correct because easier or mastered tasks are mixed with harder tasks to improve cooperation and reduce aversiveness.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Extinction withholds a maintaining reinforcer after behavior; no consequence is being withheld here.",
        whenWouldBeCorrect: "It would be correct if problem behavior no longer produced the reinforcer that maintained it.",
      },
      c: {
        whyNotCorrectHere: "A paired-stimulus assessment compares two preference items at a time; it is not mixing teaching tasks.",
        whenWouldBeCorrect: "It would be correct if two items were presented and the learner's choice was recorded.",
      },
      d: {
        whyNotCorrectHere: "IRT records time between responses; no timing between responses is described.",
        whenWouldBeCorrect: "It would be correct if recording the seconds between one response and the next.",
      },
    },
    scenario: "A trainee identifies why mastered tasks are mixed into a difficult work set.",
    difficulty: "core",
    tags: ["task 14", "task interspersal", "antecedent intervention", "mastered tasks"],
  }),
  makeQuestion({
    id: "q-t14-visual-schedule-priming",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "A learner sees a visual schedule before transitions and practices what will happen before entering a new room. What antecedent support is most represented?",
    choices: [
      { id: "a", text: "Visual schedule and priming" },
      { id: "b", text: "Spontaneous recovery" },
      { id: "c", text: "Whole interval recording" },
      { id: "d", text: "Response cost" },
    ],
    correctAnswer: "a",
    explanation:
      "The visual schedule previews the sequence and priming prepares the learner before the transition occurs.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Spontaneous recovery is the return of an extinguished behavior after a pause, not transition preparation.",
        whenWouldBeCorrect: "It would be correct if a behavior reappeared after it had decreased during extinction.",
      },
      c: {
        whyNotCorrectHere: "Whole interval recording is data collection, not a transition support.",
        whenWouldBeCorrect: "It would be correct if scoring whether behavior lasted the entire observation interval.",
      },
      d: {
        whyNotCorrectHere: "Response cost removes a reinforcer after behavior and is not described here.",
        whenWouldBeCorrect: "It would be correct only if a written plan removed tokens after a defined behavior.",
      },
    },
    scenario: "A trainee identifies proactive supports used before transitions.",
    difficulty: "intro",
    tags: ["task 14", "visual schedule", "priming", "antecedent intervention"],
  }),
  makeQuestion({
    id: "q-t14-antecedent-nonexample",
    taskNumber: 14,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of an antecedent intervention?",
    choices: [
      { id: "a", text: "Withholding attention after attention-maintained yelling occurs" },
      { id: "b", text: "Offering choices before a work task" },
      { id: "c", text: "Using a visual timer before a transition" },
      { id: "d", text: "Interspersing mastered tasks with new tasks" },
    ],
    correctAnswer: "a",
    explanation:
      "Withholding attention after yelling is a consequence-based extinction procedure, not a strategy arranged before behavior.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Offering choices before the task is an antecedent intervention.",
        whenWouldBeCorrect: "It would be correct if asked for an example of antecedent choice-making support.",
      },
      c: {
        whyNotCorrectHere: "A visual timer before a transition is an antecedent support.",
        whenWouldBeCorrect: "It would be correct if asked for an antecedent strategy that clarifies time remaining.",
      },
      d: {
        whyNotCorrectHere: "Task interspersal happens before and during work arrangement to reduce difficulty or aversiveness.",
        whenWouldBeCorrect: "It would be correct if asked for an antecedent intervention for difficult work periods.",
      },
    },
    scenario: "A trainee separates antecedent interventions from consequence procedures.",
    difficulty: "challenge",
    tags: ["task 14", "antecedent intervention", "nonexample", "extinction"],
  }),
  makeQuestion({
    id: "q-t14-dra-functional-communication",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A learner used to hit to escape work. The plan reinforces saying, 'Break please,' while not reinforcing hitting with escape. Which differential reinforcement procedure is emphasized?",
    choices: [
      { id: "a", text: "DRA" },
      { id: "b", text: "DRO" },
      { id: "c", text: "DRL" },
      { id: "d", text: "Duration recording" },
    ],
    correctAnswer: "a",
    explanation:
      "DRA reinforces an appropriate alternative response that can replace the problem behavior, such as a break request.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRO reinforces the absence of a target behavior for an interval; the key here is reinforcing a specific alternative response.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered after no hitting occurred for a set interval.",
      },
      c: {
        whyNotCorrectHere: "DRL reinforces lower rates of a behavior; the plan teaches an alternative communication response.",
        whenWouldBeCorrect: "It would be correct if the goal were fewer requests per hour while still allowing some requests.",
      },
      d: {
        whyNotCorrectHere: "Duration recording measures how long behavior lasts; it is not a reinforcement procedure.",
        whenWouldBeCorrect: "It would be correct if timing how long each work refusal episode lasted.",
      },
    },
    scenario: "A trainee identifies the differential reinforcement procedure in a functional communication plan.",
    difficulty: "core",
    tags: ["task 14", "DRA", "functional communication", "differential reinforcement"],
  }),
  makeQuestion({
    id: "q-t14-dro-interval",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "The learner earns a sticker if no loud vocalizations occur during a five-minute interval. Which procedure is this?",
    choices: [
      { id: "a", text: "DRO" },
      { id: "b", text: "DRI" },
      { id: "c", text: "High-p sequence" },
      { id: "d", text: "Stimulus fading" },
    ],
    correctAnswer: "a",
    explanation:
      "DRO is correct because reinforcement is delivered when the target behavior is absent for the specified interval.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRI reinforces a behavior physically incompatible with the target behavior; no incompatible response is specified.",
        whenWouldBeCorrect: "It would be correct if reinforcing quietly reading aloud into a microphone while loud vocalizing cannot occur.",
      },
      c: {
        whyNotCorrectHere: "High-p sequence presents easy instructions before a harder one; no instruction sequence is described.",
        whenWouldBeCorrect: "It would be correct if the technician gave several easy directions before a difficult request.",
      },
      d: {
        whyNotCorrectHere: "Stimulus fading removes added stimulus features over time, not reinforces absence during an interval.",
        whenWouldBeCorrect: "It would be correct if a highlighted visual cue were gradually faded.",
      },
    },
    scenario: "A trainee reviews an interval-based differential reinforcement procedure.",
    difficulty: "intro",
    tags: ["task 14", "DRO", "differential reinforcement", "interval"],
  }),
  makeQuestion({
    id: "q-t14-dri-incompatible",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A learner throws items from the table. The plan reinforces keeping both hands on a lap mat during work because throwing cannot happen at the same time. Which procedure is this?",
    choices: [
      { id: "a", text: "DRI" },
      { id: "b", text: "DRA" },
      { id: "c", text: "MSWO" },
      { id: "d", text: "Latency recording" },
    ],
    correctAnswer: "a",
    explanation:
      "DRI is correct because the reinforced behavior is incompatible with throwing items.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRA reinforces an alternative behavior, but it does not have to be physically incompatible; this scenario emphasizes incompatibility.",
        whenWouldBeCorrect: "It would be correct if reinforcing asking for help instead of throwing, even though asking and throwing are not physically incompatible.",
      },
      c: {
        whyNotCorrectHere: "MSWO is a preference assessment, not a differential reinforcement procedure.",
        whenWouldBeCorrect: "It would be correct if items were presented, selected items removed, and choices repeated without replacement.",
      },
      d: {
        whyNotCorrectHere: "Latency recording measures delay from cue to response; it is not reinforcing an incompatible behavior.",
        whenWouldBeCorrect: "It would be correct if timing from instruction to the first response.",
      },
    },
    scenario: "A trainee compares DRA and DRI in a table-work behavior plan.",
    difficulty: "core",
    tags: ["task 14", "DRI", "DRA", "differential reinforcement"],
  }),
  makeQuestion({
    id: "q-t14-drh-higher-rate",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "A learner rarely asks for help. The plan reinforces the learner for making at least four appropriate help requests during a session. Which procedure best fits?",
    choices: [
      { id: "a", text: "DRH" },
      { id: "b", text: "DRL" },
      { id: "c", text: "Extinction" },
      { id: "d", text: "Whole interval recording" },
    ],
    correctAnswer: "a",
    explanation:
      "DRH reinforces higher rates of a behavior, which fits increasing appropriate help requests.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRL reinforces lower rates, but the plan wants more help requests.",
        whenWouldBeCorrect: "It would be correct if the learner requested help too often and the goal was fewer requests while still allowing some.",
      },
      c: {
        whyNotCorrectHere: "Extinction withholds a maintaining reinforcer; the plan is reinforcing a higher rate.",
        whenWouldBeCorrect: "It would be correct if the plan stopped reinforcing a target behavior that previously produced reinforcement.",
      },
      d: {
        whyNotCorrectHere: "Whole interval recording measures behavior for entire intervals and is not a reinforcement schedule.",
        whenWouldBeCorrect: "It would be correct if the observer recorded whether help-seeking occurred throughout each interval.",
      },
    },
    scenario: "A trainee identifies a procedure for increasing an appropriate low-rate response.",
    difficulty: "core",
    tags: ["task 14", "DRH", "differential reinforcement", "higher rate"],
  }),
  makeQuestion({
    id: "q-t14-drl-lower-rate",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "A learner asks the same question 30 times per hour. The plan reinforces the learner when question-asking stays below 10 times per hour. Which procedure is this?",
    choices: [
      { id: "a", text: "DRL" },
      { id: "b", text: "DRH" },
      { id: "c", text: "DTT" },
      { id: "d", text: "Duration" },
    ],
    correctAnswer: "a",
    explanation:
      "DRL is correct because reinforcement is provided for a lower rate of a behavior that may still be acceptable in smaller amounts.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "DRH would reinforce a higher rate, but the plan wants fewer repeated questions.",
        whenWouldBeCorrect: "It would be correct if increasing a low-rate appropriate response.",
      },
      c: {
        whyNotCorrectHere: "DTT is a structured teaching format, not a lower-rate reinforcement procedure.",
        whenWouldBeCorrect: "It would be correct if teaching with SD, response, and consequence in repeated trials.",
      },
      d: {
        whyNotCorrectHere: "Duration measures time spent in behavior; the scenario is about rate of question-asking.",
        whenWouldBeCorrect: "It would be correct if measuring how long each question-asking episode lasted.",
      },
    },
    scenario: "A trainee distinguishes reducing excessive behavior from eliminating it entirely.",
    difficulty: "core",
    tags: ["task 14", "DRL", "differential reinforcement", "lower rate"],
  }),
  makeQuestion({
    id: "q-t14-dra-dri-boundary",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "What is the clearest difference between DRA and DRI?",
    choices: [
      { id: "a", text: "DRI reinforces a response that cannot occur at the same time as the target behavior; DRA reinforces an appropriate alternative that may or may not be incompatible" },
      { id: "b", text: "DRA is used only for measurement; DRI is used only for preference assessment" },
      { id: "c", text: "DRA always reduces behavior to zero; DRI always increases behavior" },
      { id: "d", text: "There is no difference between DRA and DRI" },
    ],
    correctAnswer: "a",
    explanation:
      "The key boundary is physical or practical incompatibility: DRI is a narrower type of alternative reinforcement.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Both DRA and DRI are differential reinforcement procedures, not measurement or preference assessment procedures.",
        whenWouldBeCorrect: "Measurement and preference assessment labels would be correct for tasks 1-5, not this boundary.",
      },
      c: {
        whyNotCorrectHere: "Neither procedure guarantees zero behavior, and both can increase the reinforced response.",
        whenWouldBeCorrect: "A zero target may be relevant in DRO or extinction goals, depending on the plan.",
      },
      d: {
        whyNotCorrectHere: "They overlap, but DRI specifically requires incompatibility.",
        whenWouldBeCorrect: "It would be correct only in casual wording that treats DRI as a type of DRA, but competency questions often expect the distinction.",
      },
    },
    scenario: "A trainee chooses between similar differential reinforcement labels.",
    difficulty: "challenge",
    tags: ["task 14", "DRA", "DRI", "comparison"],
  }),
  makeQuestion({
    id: "q-t14-extinction-definition",
    taskNumber: 14,
    questionType: "multiple-choice",
    prompt: "Which statement best describes extinction in a behavior plan?",
    choices: [
      { id: "a", text: "The behavior no longer produces the reinforcer that previously maintained it" },
      { id: "b", text: "The technician ignores every behavior in every setting" },
      { id: "c", text: "The learner is given tokens more often than before" },
      { id: "d", text: "The technician physically guides each response" },
    ],
    correctAnswer: "a",
    explanation:
      "Extinction means withholding the maintaining reinforcer for a specific behavior according to the plan.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Extinction is function-based and specific; it does not mean ignoring everything.",
        whenWouldBeCorrect: "Planned ignoring could be correct only if attention is the maintaining reinforcer and the plan specifies that response.",
      },
      c: {
        whyNotCorrectHere: "Increasing token delivery is reinforcement, not extinction.",
        whenWouldBeCorrect: "It would be correct for a token system or differential reinforcement procedure.",
      },
      d: {
        whyNotCorrectHere: "Physical guidance is a prompt, not withholding a maintaining reinforcer.",
        whenWouldBeCorrect: "It would be correct if implementing a physical prompt in a teaching program.",
      },
    },
    scenario: "A trainee defines extinction before reviewing possible side effects.",
    difficulty: "intro",
    tags: ["task 14", "extinction", "maintaining reinforcer", "definition"],
  }),
  makeQuestion({
    id: "q-t14-extinction-burst",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A learner's attention-maintained yelling no longer produces attention. During the first two days, yelling becomes louder and more frequent before it starts decreasing. What is this called?",
    choices: [
      { id: "a", text: "Extinction burst" },
      { id: "b", text: "Stimulus fading" },
      { id: "c", text: "DRL" },
      { id: "d", text: "Free operant assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "An extinction burst is a temporary increase in frequency, intensity, or duration after the maintaining reinforcer is withheld.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Stimulus fading gradually removes a stimulus cue; it does not describe an early increase during extinction.",
        whenWouldBeCorrect: "It would be correct if a visual prompt were made less noticeable over trials.",
      },
      c: {
        whyNotCorrectHere: "DRL reinforces lower rates; the scenario describes a side effect after reinforcement is withheld.",
        whenWouldBeCorrect: "It would be correct if reinforcement were delivered for keeping yelling below a rate criterion.",
      },
      d: {
        whyNotCorrectHere: "Free operant assessment observes free access to items; it is not an extinction side effect.",
        whenWouldBeCorrect: "It would be correct if the learner moved among available items and engagement was recorded.",
      },
    },
    scenario: "A trainee recognizes a common early pattern during an extinction procedure.",
    difficulty: "core",
    tags: ["task 14", "extinction burst", "extinction", "side effects"],
  }),
  makeQuestion({
    id: "q-t14-spontaneous-recovery",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "A behavior decreased during extinction. After a weekend with no sessions, the behavior briefly returns on Monday even though the plan is still followed. What is this?",
    choices: [
      { id: "a", text: "Spontaneous recovery" },
      { id: "b", text: "High-p sequence" },
      { id: "c", text: "DRH" },
      { id: "d", text: "Paired-choice preference assessment" },
    ],
    correctAnswer: "a",
    explanation:
      "Spontaneous recovery is the temporary reappearance of a behavior after it had decreased under extinction.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A high-p sequence is an antecedent strategy with easy instructions before a harder one.",
        whenWouldBeCorrect: "It would be correct if several easy instructions were delivered before a difficult demand.",
      },
      c: {
        whyNotCorrectHere: "DRH reinforces higher rates of behavior; the scenario is a return of behavior after a break.",
        whenWouldBeCorrect: "It would be correct if the goal were to increase a low-rate appropriate behavior.",
      },
      d: {
        whyNotCorrectHere: "A paired-choice assessment presents two items and records selection; no preference assessment is described.",
        whenWouldBeCorrect: "It would be correct if the learner chose between two items across trials.",
      },
    },
    scenario: "A trainee reviews what may happen after extinction progress and a gap in sessions.",
    difficulty: "core",
    tags: ["task 14", "spontaneous recovery", "extinction", "side effects"],
  }),
  makeQuestion({
    id: "q-t14-extinction-induced-variability",
    taskNumber: 14,
    questionType: "scenario-choice",
    prompt: "When whining no longer produces a snack, the learner tries tapping the table, pulling the adult's sleeve, and pointing to the cabinet. What side effect does this best illustrate?",
    choices: [
      { id: "a", text: "Extinction-induced variability" },
      { id: "b", text: "Most-to-least prompting" },
      { id: "c", text: "MSW preference assessment" },
      { id: "d", text: "Frequency recording" },
    ],
    correctAnswer: "a",
    explanation:
      "Extinction-induced variability occurs when different forms of behavior appear after the old response no longer produces reinforcement.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Most-to-least prompting begins with more intrusive help and fades it; no prompting sequence is described.",
        whenWouldBeCorrect: "It would be correct if the technician started with full guidance and faded to less help.",
      },
      c: {
        whyNotCorrectHere: "MSW is a preference assessment with multiple items; the scenario is about new behavior forms during extinction.",
        whenWouldBeCorrect: "It would be correct if several items were presented and selections were recorded without removing items.",
      },
      d: {
        whyNotCorrectHere: "Frequency recording counts behavior; the question asks for the extinction side effect label.",
        whenWouldBeCorrect: "It would be correct if the observer counted each table tap or sleeve pull.",
      },
    },
    scenario: "A trainee identifies why new behavior forms may appear during extinction.",
    difficulty: "challenge",
    tags: ["task 14", "extinction-induced variability", "extinction", "side effects"],
  }),
  makeQuestion({
    id: "q-t15-objective-note-best-wording",
    taskNumber: 15,
    questionType: "scenario-choice",
    prompt: "Which session-note sentence is the most objective?",
    choices: [
      { id: "a", text: "The client was lazy and did not care about work today." },
      { id: "b", text: "The client completed 8 of 10 matching trials and left the table twice during the worksheet routine." },
      { id: "c", text: "The client seemed annoyed because the parent was rushing." },
      { id: "d", text: "The client had a bad session and refused everything." },
    ],
    correctAnswer: "b",
    explanation:
      "The best note uses observable behavior and data: completed trials and leaving the table. Another provider could verify those details.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Lazy and did not care are judgments about motivation, not observable session events.",
        whenWouldBeCorrect: "A note about low task completion would be correct if it stated observable behavior, such as number of tasks completed or prompts needed.",
      },
      c: {
        whyNotCorrectHere: "Seemed annoyed and the assumed reason both infer private feelings or causes without direct data.",
        whenWouldBeCorrect: "It would fit if rewritten as observable events, such as 'client frowned, crossed arms, and said no after the transition instruction.'",
      },
      d: {
        whyNotCorrectHere: "Bad session and refused everything are broad labels and do not describe specific responses or data.",
        whenWouldBeCorrect: "It would be usable if it listed what was presented, what responses occurred, and how often refusal occurred.",
      },
    },
    scenario: "A trainee chooses wording for a session-note entry after a tabletop program.",
    difficulty: "intro",
    tags: ["task 15", "session notes", "objective language", "observable behavior"],
  }),
  makeQuestion({
    id: "q-t15-subjective-nonexample",
    taskNumber: 15,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of objective session-note language?",
    choices: [
      { id: "a", text: "The learner screamed for 45 seconds after the puzzle was removed." },
      { id: "b", text: "The learner was trying to embarrass staff." },
      { id: "c", text: "The learner independently requested help three times." },
      { id: "d", text: "The learner completed the handwashing routine with two gesture prompts." },
    ],
    correctAnswer: "b",
    explanation:
      "Trying to embarrass staff guesses intent. Objective notes should describe what was seen or measured, not why the learner supposedly did it.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This is objective because it gives an observable behavior, duration, and context.",
        whenWouldBeCorrect: "It would be the answer if the question asked for an example of observable duration wording.",
      },
      c: {
        whyNotCorrectHere: "This is objective because it states a count of independent requests.",
        whenWouldBeCorrect: "It would be correct when documenting communication data from session.",
      },
      d: {
        whyNotCorrectHere: "This is objective because it names the routine and prompt level.",
        whenWouldBeCorrect: "It would be correct when documenting skill-acquisition performance.",
      },
    },
    scenario: "A trainee reviews four note samples and identifies the one that should be rewritten.",
    difficulty: "core",
    tags: ["task 15", "subjective language", "nonexample", "session notes"],
  }),
  makeQuestion({
    id: "q-t15-observable-rewrite",
    taskNumber: 15,
    questionType: "multiple-choice",
    prompt: "A draft note says, 'He got angry during cleanup.' Which rewrite is more observable?",
    choices: [
      { id: "a", text: "He was clearly angry and upset by cleanup." },
      { id: "b", text: "He hated cleanup and wanted to avoid it." },
      { id: "c", text: "After the cleanup instruction, he pushed the bin away and yelled for 20 seconds." },
      { id: "d", text: "Cleanup caused emotional behavior." },
    ],
    correctAnswer: "c",
    explanation:
      "The rewrite describes the antecedent, observable responses, and duration without labeling the learner's emotion or motive.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Clearly angry still labels an internal state rather than describing observable behavior.",
        whenWouldBeCorrect: "It would be better if paired with observable details, but the objective note should lead with what the learner did.",
      },
      b: {
        whyNotCorrectHere: "Hated and wanted to avoid are interpretations of preference and function, not objective note language.",
        whenWouldBeCorrect: "Avoidance could be discussed as a hypothesis by a supervisor after reviewing data, not stated as fact in the note.",
      },
      d: {
        whyNotCorrectHere: "This is vague and implies causation without describing the actual behavior.",
        whenWouldBeCorrect: "It would be more appropriate if rewritten with specific events and data from the session.",
      },
    },
    scenario: "A technician edits a note before submitting it to the clinical record.",
    difficulty: "core",
    tags: ["task 15", "observable language", "rewrite", "session notes"],
  }),
  makeQuestion({
    id: "q-t15-note-includes-relevant-data",
    taskNumber: 15,
    questionType: "multiple-choice",
    prompt: "Which detail is most appropriate to include in a session note when relevant to services?",
    choices: [
      { id: "a", text: "A personal opinion that the family is not trying hard enough" },
      { id: "b", text: "The learner's trial performance, prompt levels, behavior data, and notable session events" },
      { id: "c", text: "A joke the caregiver told about a neighbor" },
      { id: "d", text: "A guess that the learner behaved this way because they are stubborn" },
    ],
    correctAnswer: "b",
    explanation:
      "Session notes should capture service-relevant facts such as programs run, data, prompt levels, and events that affected treatment.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "A personal opinion about family effort is subjective and may be disrespectful.",
        whenWouldBeCorrect: "A concern about barriers could be reported through the appropriate supervisor channel using observable facts.",
      },
      c: {
        whyNotCorrectHere: "A neighbor joke is not relevant to behavior-analytic services or session outcomes.",
        whenWouldBeCorrect: "A caregiver statement could be relevant if it directly affects treatment, safety, scheduling, or consent and is documented objectively.",
      },
      d: {
        whyNotCorrectHere: "Stubborn is a character label and does not help another provider understand the actual behavior.",
        whenWouldBeCorrect: "It would be replaced by observable information, such as tasks presented and responses observed.",
      },
    },
    scenario: "A trainee decides what belongs in the objective record after a home session.",
    difficulty: "intro",
    tags: ["task 15", "session notes", "data", "documentation"],
  }),
  makeQuestion({
    id: "q-t15-family-concern-documentation",
    taskNumber: 15,
    questionType: "short-applied",
    prompt: "A caregiver says, 'We stopped using the bedtime visual schedule this week.' What is the best documentation approach?",
    choices: [
      { id: "a", text: "Write, 'The family is noncompliant and does not value treatment.'" },
      { id: "b", text: "Ignore it because caregiver comments never belong in notes." },
      { id: "c", text: "Objectively note the caregiver report if relevant and inform the supervisor according to procedure." },
      { id: "d", text: "Change the treatment plan in the note." },
    ],
    correctAnswer: "c",
    explanation:
      "The caregiver report may be relevant, but it should be documented factually and routed to the supervisor rather than judged or independently acted on.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Noncompliant and does not value treatment are judgments and may damage professional documentation.",
        whenWouldBeCorrect: "A concern would be appropriate if written as observable or reported information and shared through the right channel.",
      },
      b: {
        whyNotCorrectHere: "Relevant caregiver reports can belong in notes when they affect services or context.",
        whenWouldBeCorrect: "Ignoring unrelated casual comments would be correct if they have no bearing on services.",
      },
      d: {
        whyNotCorrectHere: "The RBT should not revise the treatment plan through a session note.",
        whenWouldBeCorrect: "A plan change would be correct only when made by the qualified supervisor and then documented according to procedure.",
      },
    },
    scenario: "A trainee documents a caregiver report that may affect intervention consistency.",
    difficulty: "challenge",
    tags: ["task 15", "caregiver report", "objective notes", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t15-confidential-note-boundary",
    taskNumber: 15,
    questionType: "multiple-choice",
    prompt: "Which session-note practice best protects confidentiality?",
    choices: [
      { id: "a", text: "Include only service-relevant information in the approved record system" },
      { id: "b", text: "Text a detailed note to a friend who also works with children" },
      { id: "c", text: "Leave printed notes in a public waiting area until the end of the day" },
      { id: "d", text: "Use the note to compare this client with another named client" },
    ],
    correctAnswer: "a",
    explanation:
      "Approved documentation systems and service-relevant content reduce unnecessary disclosure of client information.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A friend is not automatically authorized to receive client information.",
        whenWouldBeCorrect: "Sharing details would be appropriate only with authorized team members through approved channels for a treatment purpose.",
      },
      c: {
        whyNotCorrectHere: "Leaving notes in a public area risks exposing protected information.",
        whenWouldBeCorrect: "Printed materials may be used if kept secure according to agency policy.",
      },
      d: {
        whyNotCorrectHere: "Comparing named clients adds unnecessary information and can breach confidentiality.",
        whenWouldBeCorrect: "General clinical comparison may be appropriate in supervision without unnecessary identifying details.",
      },
    },
    scenario: "A trainee considers how session notes should be handled after a school session.",
    difficulty: "core",
    tags: ["task 15", "confidentiality", "session notes", "documentation"],
  }),
  makeQuestion({
    id: "q-t15-causation-boundary",
    taskNumber: 15,
    questionType: "true-false",
    prompt: "True or false: An RBT should write 'The behavior happened because the client wanted control' when that function has not been confirmed in the plan.",
    choices: [
      { id: "a", text: "True" },
      { id: "b", text: "False" },
    ],
    correctAnswer: "b",
    explanation:
      "False is correct because unconfirmed causal statements go beyond objective session-note language.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "The statement guesses function and motive instead of documenting observable events.",
        whenWouldBeCorrect: "Function language may be appropriate when it is part of an approved clinical interpretation or behavior plan, not as an unsupported note assumption.",
      },
    },
    scenario: "A trainee decides whether to include a causal interpretation in a note.",
    difficulty: "challenge",
    tags: ["task 15", "causation", "objective notes", "true false"],
  }),
  makeQuestion({
    id: "q-t15-objective-vs-subjective-best",
    taskNumber: 15,
    questionType: "multiple-choice",
    prompt: "Which statement best explains the difference between objective and subjective notes?",
    choices: [
      { id: "a", text: "Objective notes include opinions; subjective notes include data." },
      { id: "b", text: "Objective notes describe observable events and data; subjective notes rely on interpretations, labels, or guesses." },
      { id: "c", text: "Objective notes should be longer than subjective notes." },
      { id: "d", text: "Subjective notes are acceptable if the RBT feels strongly about the session." },
    ],
    correctAnswer: "b",
    explanation:
      "Objective documentation focuses on what happened and what was measured, while subjective wording adds opinions or unverifiable interpretations.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This reverses the distinction.",
        whenWouldBeCorrect: "Data belong in objective notes when they are relevant and accurately recorded.",
      },
      c: {
        whyNotCorrectHere: "Length does not determine objectivity; a short note can be objective or subjective.",
        whenWouldBeCorrect: "Longer notes may be needed when more relevant events occurred, but they still must stay factual.",
      },
      d: {
        whyNotCorrectHere: "Strong feelings do not make subjective wording appropriate in clinical documentation.",
        whenWouldBeCorrect: "A concern can be raised to the supervisor using objective examples and appropriate reporting procedures.",
      },
    },
    scenario: "A trainee summarizes the documentation standard for task 15.",
    difficulty: "intro",
    tags: ["task 15", "objective vs subjective", "session notes", "documentation"],
  }),
  makeQuestion({
    id: "q-t16-dignity-definition",
    taskNumber: 16,
    questionType: "multiple-choice",
    prompt: "Which action best maintains client dignity during everyday services?",
    choices: [
      { id: "a", text: "Using respectful language, protecting privacy, and offering appropriate choices within the plan" },
      { id: "b", text: "Talking about the client as if they are not present" },
      { id: "c", text: "Using baby talk with every client because it sounds friendly" },
      { id: "d", text: "Sharing session details with anyone who asks politely" },
    ],
    correctAnswer: "a",
    explanation:
      "Dignity is supported by respectful interaction, privacy, confidentiality, and plan-consistent choice.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Talking as if the client is not present can be disrespectful and reduces the client's personhood.",
        whenWouldBeCorrect: "Team discussion may occur when needed, but it should be respectful and mindful of the client's presence and privacy.",
      },
      c: {
        whyNotCorrectHere: "Baby talk can be patronizing, especially with older clients.",
        whenWouldBeCorrect: "Simplified language may be appropriate when it matches the client's communication plan, but it should still be respectful.",
      },
      d: {
        whyNotCorrectHere: "Politeness does not create authorization to receive confidential information.",
        whenWouldBeCorrect: "Information can be shared with authorized people for appropriate treatment or administrative purposes.",
      },
    },
    scenario: "A trainee prepares examples for the client dignity interview task.",
    difficulty: "intro",
    tags: ["task 16", "client dignity", "privacy", "choice"],
  }),
  makeQuestion({
    id: "q-t16-privacy-hygiene",
    taskNumber: 16,
    questionType: "scenario-choice",
    prompt: "A learner needs help with a hygiene routine. Which response best protects dignity?",
    choices: [
      { id: "a", text: "Announce the hygiene need loudly so everyone knows why the learner is leaving." },
      { id: "b", text: "Move to the appropriate private area, use respectful language, and follow the care plan." },
      { id: "c", text: "Invite unrelated staff to watch so they can learn." },
      { id: "d", text: "Skip the routine even though it is required because privacy is difficult." },
    ],
    correctAnswer: "b",
    explanation:
      "Privacy, respectful language, and following the plan protect dignity during sensitive care routines.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Loud public announcements expose private information unnecessarily.",
        whenWouldBeCorrect: "Brief communication may be appropriate with authorized staff in a discreet way when support is needed.",
      },
      c: {
        whyNotCorrectHere: "Unrelated observation exposes the client during a sensitive routine without a treatment need.",
        whenWouldBeCorrect: "Observation could be appropriate for authorized training or supervision with safeguards and permission as required.",
      },
      d: {
        whyNotCorrectHere: "Privacy challenges do not justify ignoring a required care routine.",
        whenWouldBeCorrect: "Pausing could be correct if safety, consent, or supervisor guidance requires it.",
      },
    },
    scenario: "A trainee describes dignity-preserving support during personal care.",
    difficulty: "core",
    tags: ["task 16", "privacy", "hygiene", "client dignity"],
  }),
  makeQuestion({
    id: "q-t16-confidentiality-hallway",
    taskNumber: 16,
    questionType: "scenario-choice",
    prompt: "Two staff members begin discussing a client's behavior plan in a busy hallway. What should the RBT do?",
    choices: [
      { id: "a", text: "Join the conversation because both staff members know the client." },
      { id: "b", text: "Move the discussion to a private approved setting or pause it until privacy is available." },
      { id: "c", text: "Record the conversation on a personal phone for later review." },
      { id: "d", text: "Share extra details so the hallway conversation is complete." },
    ],
    correctAnswer: "b",
    explanation:
      "Confidential information should be discussed only in appropriate settings with authorized people and a treatment purpose.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Authorized people still need an appropriate private setting.",
        whenWouldBeCorrect: "Joining would be appropriate in a private team meeting when the discussion is necessary for services.",
      },
      c: {
        whyNotCorrectHere: "Recording on a personal phone risks unauthorized storage and disclosure.",
        whenWouldBeCorrect: "Recording would be appropriate only if allowed by policy, consent, and approved systems.",
      },
      d: {
        whyNotCorrectHere: "Adding more details increases the confidentiality risk in a public place.",
        whenWouldBeCorrect: "Extra detail may be appropriate in supervision or team communication through approved channels.",
      },
    },
    scenario: "A trainee responds to a confidentiality risk in a school hallway.",
    difficulty: "core",
    tags: ["task 16", "confidentiality", "privacy", "client dignity"],
  }),
  makeQuestion({
    id: "q-t16-choice-within-plan",
    taskNumber: 16,
    questionType: "multiple-choice",
    prompt: "Which example shows offering choice while still following the plan?",
    choices: [
      { id: "a", text: "Letting the learner skip all goals for the day without checking the plan" },
      { id: "b", text: "Offering a choice of two approved tasks or two approved reinforcers" },
      { id: "c", text: "Letting the caregiver choose to stop data collection permanently" },
      { id: "d", text: "Allowing a safety routine to be optional because the learner dislikes it" },
    ],
    correctAnswer: "b",
    explanation:
      "Choice supports dignity when options are appropriate, safe, and consistent with the treatment plan.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Skipping all goals changes the session plan without clinical direction.",
        whenWouldBeCorrect: "Changing demands may be appropriate if the supervisor or plan specifies it for illness, safety, or clinical reasons.",
      },
      c: {
        whyNotCorrectHere: "Stopping data collection permanently is a clinical or administrative decision beyond an in-session choice.",
        whenWouldBeCorrect: "Caregiver preferences can be discussed with the supervisor as part of treatment planning.",
      },
      d: {
        whyNotCorrectHere: "Safety routines cannot simply become optional because they are disliked.",
        whenWouldBeCorrect: "Choice might be offered within the safety routine, such as which safe route or visual support to use.",
      },
    },
    scenario: "A trainee identifies how choice can be included without abandoning intervention goals.",
    difficulty: "intro",
    tags: ["task 16", "choice", "client dignity", "treatment plan"],
  }),
  makeQuestion({
    id: "q-t16-age-appropriate-language",
    taskNumber: 16,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of dignity-supporting communication?",
    choices: [
      { id: "a", text: "Using age-appropriate words with a teenager while still simplifying directions as needed" },
      { id: "b", text: "Speaking to an adult client in baby talk because it entertains staff" },
      { id: "c", text: "Asking a client privately which shirt they prefer before a community outing" },
      { id: "d", text: "Using the client's preferred name and respectful tone" },
    ],
    correctAnswer: "b",
    explanation:
      "Baby talk for staff amusement is patronizing and does not respect the client's age or dignity.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This supports dignity because it balances age-appropriate respect with needed communication support.",
        whenWouldBeCorrect: "It would be correct if asked for an example of respectful communication.",
      },
      c: {
        whyNotCorrectHere: "Private choice-making supports dignity and autonomy.",
        whenWouldBeCorrect: "It would be correct when identifying a dignity-supporting choice example.",
      },
      d: {
        whyNotCorrectHere: "Preferred name and respectful tone are dignity-supporting practices.",
        whenWouldBeCorrect: "It would be correct if asked for a respectful communication example.",
      },
    },
    scenario: "A trainee separates respectful communication from patronizing communication.",
    difficulty: "core",
    tags: ["task 16", "age-appropriate language", "respectful tone", "nonexample"],
  }),
  makeQuestion({
    id: "q-t16-public-correction",
    taskNumber: 16,
    questionType: "scenario-choice",
    prompt: "A learner makes an error during group instruction. Which response best protects dignity?",
    choices: [
      { id: "a", text: "Correct loudly so peers hear what the learner did wrong." },
      { id: "b", text: "Laugh with peers to make the moment feel lighter." },
      { id: "c", text: "Provide the planned prompt or correction as privately and respectfully as practical." },
      { id: "d", text: "Tell the learner they should know better." },
    ],
    correctAnswer: "c",
    explanation:
      "Dignity is protected by keeping correction respectful, plan-based, and as discreet as practical.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Loud correction can embarrass the learner and disclose more than needed.",
        whenWouldBeCorrect: "A louder voice may be needed only for safety or accessibility, not public shaming.",
      },
      b: {
        whyNotCorrectHere: "Laughing with peers can humiliate the learner.",
        whenWouldBeCorrect: "Humor can be appropriate if client-led, respectful, and not at the client's expense.",
      },
      d: {
        whyNotCorrectHere: "This is scolding rather than a respectful teaching response.",
        whenWouldBeCorrect: "Clear feedback can be correct when it is objective, respectful, and part of the plan.",
      },
    },
    scenario: "A trainee supports dignity while correcting an error in a classroom group.",
    difficulty: "core",
    tags: ["task 16", "client dignity", "public correction", "respectful tone"],
  }),
  makeQuestion({
    id: "q-t16-client-present-conversation",
    taskNumber: 16,
    questionType: "short-applied",
    prompt: "A supervisor and RBT need to discuss a client's toileting data while the client and several peers are nearby. What is the best action?",
    choices: [
      { id: "a", text: "Discuss it immediately because the data are clinically important." },
      { id: "b", text: "Use vague jokes so peers do not understand." },
      { id: "c", text: "Move to a private setting or schedule the discussion for an appropriate time." },
      { id: "d", text: "Ask the peers to promise not to repeat it." },
    ],
    correctAnswer: "c",
    explanation:
      "Sensitive information should be discussed privately with authorized people, even when the topic is clinically important.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Clinical importance does not remove the need for privacy.",
        whenWouldBeCorrect: "Immediate discussion would be correct if safety required urgent communication, using the most discreet method available.",
      },
      b: {
        whyNotCorrectHere: "Jokes can still be disrespectful and may not protect confidentiality.",
        whenWouldBeCorrect: "Brief coded or minimal communication may be acceptable in urgent situations if approved and respectful.",
      },
      d: {
        whyNotCorrectHere: "Peers are not authorized recipients of private client information.",
        whenWouldBeCorrect: "Confidentiality agreements apply to authorized roles, not casual peer promises.",
      },
    },
    scenario: "A trainee decides how to handle sensitive data around others.",
    difficulty: "challenge",
    tags: ["task 16", "confidentiality", "privacy", "sensitive information"],
  }),
  makeQuestion({
    id: "q-t16-dignity-boundary",
    taskNumber: 16,
    questionType: "multiple-choice",
    prompt: "Which statement best captures the boundary between dignity and treatment follow-through?",
    choices: [
      { id: "a", text: "Maintaining dignity means the client never experiences demands." },
      { id: "b", text: "Maintaining dignity means using respectful, private, and choice-supporting methods while implementing the plan." },
      { id: "c", text: "Maintaining dignity means the RBT can change goals whenever the client dislikes them." },
      { id: "d", text: "Maintaining dignity applies only to adults." },
    ],
    correctAnswer: "b",
    explanation:
      "Dignity and treatment can both be maintained when the RBT follows the plan in respectful, privacy-protecting ways.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Treatment may include demands; dignity depends on how they are presented and supported.",
        whenWouldBeCorrect: "Reducing demands could be correct when the plan or supervisor directs it for clinical reasons.",
      },
      c: {
        whyNotCorrectHere: "RBTs do not independently change goals because the client dislikes them.",
        whenWouldBeCorrect: "Client preferences should be shared with the supervisor and considered in planning.",
      },
      d: {
        whyNotCorrectHere: "Dignity applies to all clients regardless of age.",
        whenWouldBeCorrect: "Age affects how language and supports are selected, not whether dignity matters.",
      },
    },
    scenario: "A trainee explains dignity during an interview-style competency check.",
    difficulty: "intro",
    tags: ["task 16", "client dignity", "treatment follow-through", "interview"],
  }),
  makeQuestion({
    id: "q-t17-boundaries-definition",
    taskNumber: 17,
    questionType: "multiple-choice",
    prompt: "Which statement best describes professional boundaries for an RBT?",
    choices: [
      { id: "a", text: "Limits that keep the relationship focused on client services, safety, privacy, and the RBT role" },
      { id: "b", text: "Avoiding all friendly conversation with families" },
      { id: "c", text: "Doing any favor a family requests if it builds rapport" },
      { id: "d", text: "Sharing personal details so the family feels close to the RBT" },
    ],
    correctAnswer: "a",
    explanation:
      "Professional boundaries keep interactions role-focused and protect the client, family, and RBT from conflicts or blurred responsibilities.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Boundaries do not require being cold or unfriendly; professional rapport can still be warm.",
        whenWouldBeCorrect: "Limiting conversation would be appropriate when discussion becomes personal, irrelevant, or interferes with services.",
      },
      c: {
        whyNotCorrectHere: "Some favors create dual relationships, conflicts, or work outside the RBT role.",
        whenWouldBeCorrect: "Helping may be appropriate when it is part of the service plan or agency role and supervisor-approved.",
      },
      d: {
        whyNotCorrectHere: "Excessive personal disclosure can shift the relationship away from treatment and create boundary issues.",
        whenWouldBeCorrect: "Brief neutral rapport comments may be appropriate if they do not distract from services or create role confusion.",
      },
    },
    scenario: "A trainee defines professional boundaries during the task 17 interview.",
    difficulty: "intro",
    tags: ["task 17", "professional boundaries", "role", "ethics"],
  }),
  makeQuestion({
    id: "q-t17-expensive-gift",
    taskNumber: 17,
    questionType: "scenario-choice",
    prompt: "A family offers the RBT an expensive gift card after a difficult month. What is the best response?",
    choices: [
      { id: "a", text: "Accept it because refusing could hurt rapport." },
      { id: "b", text: "Thank them kindly, decline or pause acceptance, and follow supervisor or agency policy." },
      { id: "c", text: "Accept it but do not tell anyone." },
      { id: "d", text: "Ask for a larger gift that better matches the effort." },
    ],
    correctAnswer: "b",
    explanation:
      "Gift situations can create pressure or conflicts. The safest boundary response is respectful, transparent, and policy-based.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Rapport does not override gift and conflict-of-interest concerns.",
        whenWouldBeCorrect: "A small permitted token might be acceptable only if policy and supervisor guidance allow it.",
      },
      c: {
        whyNotCorrectHere: "Hiding the gift increases the boundary problem and removes supervisor oversight.",
        whenWouldBeCorrect: "Documentation or disclosure would be appropriate if policy requires reporting a gift offer.",
      },
      d: {
        whyNotCorrectHere: "Requesting gifts is a serious boundary violation.",
        whenWouldBeCorrect: "Compensation concerns should be handled through the employer, not client families.",
      },
    },
    scenario: "A trainee responds to a gift offer while keeping a professional boundary.",
    difficulty: "core",
    tags: ["task 17", "gifts", "professional boundaries", "policy"],
  }),
  makeQuestion({
    id: "q-t17-small-gift-policy",
    taskNumber: 17,
    questionType: "multiple-choice",
    prompt: "A caregiver offers the RBT a homemade cookie after session. The RBT is unsure whether policy allows it. What should the RBT do?",
    choices: [
      { id: "a", text: "Accept immediately because it is small." },
      { id: "b", text: "Ask for supervisor or agency guidance before accepting if policy is unclear." },
      { id: "c", text: "Accept it secretly because small gifts do not count." },
      { id: "d", text: "Tell the caregiver they are unethical for offering it." },
    ],
    correctAnswer: "b",
    explanation:
      "Even small gifts can have agency-specific rules. If unclear, the RBT should seek guidance without shaming the family.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Size alone does not determine whether accepting is allowed.",
        whenWouldBeCorrect: "Accepting could be correct if policy clearly permits that type of small item and no conflict is present.",
      },
      c: {
        whyNotCorrectHere: "Keeping it secret is inconsistent with professional transparency.",
        whenWouldBeCorrect: "Private acceptance is not the right standard; policy and supervision should guide the response.",
      },
      d: {
        whyNotCorrectHere: "A harsh accusation is unnecessary and damages respectful communication.",
        whenWouldBeCorrect: "A respectful explanation of policy would be appropriate if the gift cannot be accepted.",
      },
    },
    scenario: "A trainee handles a low-value gift offer when the policy is not clear.",
    difficulty: "challenge",
    tags: ["task 17", "gifts", "agency policy", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t17-babysitting-dual-relationship",
    taskNumber: 17,
    questionType: "scenario-choice",
    prompt: "A caregiver asks the RBT to babysit the client on Saturday for private pay. What is the main boundary concern?",
    choices: [
      { id: "a", text: "It may create a dual or multiple relationship outside the service role." },
      { id: "b", text: "It is automatically fine because the RBT already knows the client." },
      { id: "c", text: "It should be accepted if the family pays cash." },
      { id: "d", text: "It means the client no longer needs ABA services." },
    ],
    correctAnswer: "a",
    explanation:
      "A separate babysitting role can blur responsibilities, affect professional judgment, and conflict with agency or ethics expectations.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Knowing the client is exactly why the added role can blur boundaries.",
        whenWouldBeCorrect: "Familiarity helps during authorized services, not private side arrangements.",
      },
      c: {
        whyNotCorrectHere: "Payment method does not resolve multiple relationship concerns.",
        whenWouldBeCorrect: "Compensation is appropriate through authorized employment or service arrangements.",
      },
      d: {
        whyNotCorrectHere: "A babysitting request says nothing about clinical need.",
        whenWouldBeCorrect: "Service needs should be evaluated by the supervisor using assessment and progress data.",
      },
    },
    scenario: "A trainee identifies the boundary issue in a parent request for private work.",
    difficulty: "core",
    tags: ["task 17", "dual relationships", "multiple relationships", "babysitting"],
  }),
  makeQuestion({
    id: "q-t17-social-media-request",
    taskNumber: 17,
    questionType: "scenario-choice",
    prompt: "A caregiver sends the RBT a friend request on a personal social media account. What is the best response?",
    choices: [
      { id: "a", text: "Accept because it helps the family see the RBT as a real person." },
      { id: "b", text: "Do not connect through personal social media; follow agency communication policy." },
      { id: "c", text: "Accept but block the supervisor from seeing it." },
      { id: "d", text: "Post vague stories about the client's progress." },
    ],
    correctAnswer: "b",
    explanation:
      "Personal social media connections can blur professional boundaries and risk confidentiality. Agency-approved communication channels should be used.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Rapport does not require personal social media access.",
        whenWouldBeCorrect: "A professional agency communication platform may be appropriate if approved.",
      },
      c: {
        whyNotCorrectHere: "Hiding the connection worsens the boundary problem.",
        whenWouldBeCorrect: "Transparency with supervisors is appropriate when a boundary issue arises.",
      },
      d: {
        whyNotCorrectHere: "Posting about client progress can violate confidentiality even if names are omitted.",
        whenWouldBeCorrect: "Client progress may be shared only through approved channels with authorized people.",
      },
    },
    scenario: "A trainee responds to a personal social media request from a caregiver.",
    difficulty: "core",
    tags: ["task 17", "social media", "professional boundaries", "confidentiality"],
  }),
  makeQuestion({
    id: "q-t17-irrelevant-conversations",
    taskNumber: 17,
    questionType: "multiple-choice",
    prompt: "A parent repeatedly asks the RBT for dating advice during session. Which response best maintains boundaries?",
    choices: [
      { id: "a", text: "Spend the session giving advice because rapport matters." },
      { id: "b", text: "Redirect politely to session-related topics and continue client services." },
      { id: "c", text: "Share detailed personal stories so the parent feels supported." },
      { id: "d", text: "End services permanently without telling the supervisor." },
    ],
    correctAnswer: "b",
    explanation:
      "A polite redirect keeps the relationship respectful and role-focused without escalating the situation.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "The conversation is outside the therapy purpose and distracts from client services.",
        whenWouldBeCorrect: "Brief rapport talk may be fine when it does not interfere with services or boundaries.",
      },
      c: {
        whyNotCorrectHere: "Detailed self-disclosure can deepen a personal relationship and blur boundaries.",
        whenWouldBeCorrect: "A brief neutral statement may be acceptable if it supports rapport and quickly returns to services.",
      },
      d: {
        whyNotCorrectHere: "The RBT should not independently end services because of a boundary challenge.",
        whenWouldBeCorrect: "Service changes should involve the supervisor and agency process.",
      },
    },
    scenario: "A trainee practices redirecting conversations that are outside the therapy purpose.",
    difficulty: "intro",
    tags: ["task 17", "irrelevant conversations", "professional boundaries", "rapport"],
  }),
  makeQuestion({
    id: "q-t17-personal-space",
    taskNumber: 17,
    questionType: "scenario-choice",
    prompt: "A client repeatedly moves very close to the RBT during breaks. There is no safety concern, but the interaction is becoming uncomfortable and distracting. What is the best boundary response?",
    choices: [
      { id: "a", text: "Use respectful prompts or environmental supports consistent with the plan and ask the supervisor if guidance is needed." },
      { id: "b", text: "Shame the client loudly for being too close." },
      { id: "c", text: "Ignore all personal space concerns because boundaries only apply to adults." },
      { id: "d", text: "Physically push the client away." },
    ],
    correctAnswer: "a",
    explanation:
      "Personal space can be addressed respectfully through planned teaching, environmental arrangement, and supervisor guidance when needed.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Shaming violates dignity and is not a professional teaching response.",
        whenWouldBeCorrect: "Clear feedback may be appropriate if it is respectful and plan-consistent.",
      },
      c: {
        whyNotCorrectHere: "Boundaries apply to all client relationships, not only adults.",
        whenWouldBeCorrect: "Age and skill level affect how boundaries are taught, not whether they matter.",
      },
      d: {
        whyNotCorrectHere: "Physical pushing is not an appropriate boundary strategy and may be unsafe.",
        whenWouldBeCorrect: "Physical blocking may be used only when an approved safety protocol and training require it.",
      },
    },
    scenario: "A trainee handles personal space while preserving dignity and role boundaries.",
    difficulty: "challenge",
    tags: ["task 17", "personal space", "professional boundaries", "client dignity"],
  }),
  makeQuestion({
    id: "q-t17-family-friend-boundary",
    taskNumber: 17,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of maintaining professional boundaries?",
    choices: [
      { id: "a", text: "Using agency-approved channels for schedule questions" },
      { id: "b", text: "Declining a weekend party invitation from a client's family" },
      { id: "c", text: "Starting a close personal friendship with a caregiver while providing services" },
      { id: "d", text: "Asking the supervisor before responding to a confusing gift offer" },
    ],
    correctAnswer: "c",
    explanation:
      "A close personal friendship with a caregiver during services can blur roles and create conflicts of interest.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Agency-approved channels help maintain boundaries and confidentiality.",
        whenWouldBeCorrect: "It would be correct if asked for an example of role-appropriate communication.",
      },
      b: {
        whyNotCorrectHere: "Declining a social invitation usually supports professional boundaries.",
        whenWouldBeCorrect: "It would be correct if asked how to avoid a dual relationship.",
      },
      d: {
        whyNotCorrectHere: "Seeking supervisor guidance is appropriate when a boundary situation is unclear.",
        whenWouldBeCorrect: "It would be correct if asked how to handle uncertainty about gifts.",
      },
    },
    scenario: "A trainee identifies which relationship choice crosses a professional boundary.",
    difficulty: "core",
    tags: ["task 17", "professional boundaries", "dual relationship", "nonexample"],
  }),
  makeQuestion({
    id: "q-t18-five-percent-calculation",
    taskNumber: 18,
    questionType: "short-applied",
    prompt: "An RBT provides 120 hours of behavior-analytic services in a month. What is the 5% supervision minimum for that month?",
    choices: [
      { id: "a", text: "2 hours" },
      { id: "b", text: "4 hours" },
      { id: "c", text: "6 hours" },
      { id: "d", text: "12 hours" },
    ],
    correctAnswer: "c",
    explanation:
      "Five percent of 120 hours is 6 hours, calculated as 120 x 0.05.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Two hours is below 5% of 120 service hours.",
        whenWouldBeCorrect: "Two hours would be 5% of 40 service hours.",
      },
      b: {
        whyNotCorrectHere: "Four hours is 5% of 80 hours, not 120 hours.",
        whenWouldBeCorrect: "Four hours would be correct for 80 monthly service hours.",
      },
      d: {
        whyNotCorrectHere: "Twelve hours is 10% of 120 hours, not 5%.",
        whenWouldBeCorrect: "Twelve hours could exceed the minimum, but it is not the 5% minimum.",
      },
    },
    scenario: "A trainee calculates monthly RBT supervision based on service hours.",
    difficulty: "core",
    tags: ["task 18", "supervision requirements", "5% supervised hours", "calculation"],
  }),
  makeQuestion({
    id: "q-t18-supervision-monthly-rule",
    taskNumber: 18,
    questionType: "multiple-choice",
    prompt: "Which statement best describes the RBT monthly supervision requirement?",
    choices: [
      { id: "a", text: "At least 5% of monthly behavior-analytic service hours must be supervised." },
      { id: "b", text: "Supervision is optional once the RBT feels confident." },
      { id: "c", text: "One annual meeting is enough if documentation is good." },
      { id: "d", text: "Only difficult sessions count toward the supervision requirement." },
    ],
    correctAnswer: "a",
    explanation:
      "RBT supervision is an ongoing monthly requirement tied to behavior-analytic service hours.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Confidence does not remove monthly supervision requirements.",
        whenWouldBeCorrect: "Confidence may reduce the type of coaching needed, but not the requirement itself.",
      },
      c: {
        whyNotCorrectHere: "Annual contact does not satisfy ongoing monthly supervision standards.",
        whenWouldBeCorrect: "Annual items may relate to renewal or other requirements, not monthly supervision minimums.",
      },
      d: {
        whyNotCorrectHere: "The requirement is based on service hours, not only difficult sessions.",
        whenWouldBeCorrect: "Difficult sessions may be especially useful to review during supervision.",
      },
    },
    scenario: "A trainee summarizes the monthly supervision standard in an interview response.",
    difficulty: "intro",
    tags: ["task 18", "supervision requirements", "monthly supervision", "5%"],
  }),
  makeQuestion({
    id: "q-t18-two-live-meetings",
    taskNumber: 18,
    questionType: "multiple-choice",
    prompt: "Which contact requirement should an RBT know for monthly supervision?",
    choices: [
      { id: "a", text: "At least two face-to-face live supervision meetings per month" },
      { id: "b", text: "Only one text message from a supervisor per month" },
      { id: "c", text: "A yearly email confirming employment" },
      { id: "d", text: "A meeting only after a serious incident" },
    ],
    correctAnswer: "a",
    explanation:
      "The RBT should know the monthly live supervision meeting expectation, not rely on informal or rare contact.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A text message is not the same as a face-to-face live supervision meeting.",
        whenWouldBeCorrect: "Text communication can support scheduling or quick updates, but it does not replace required live meetings.",
      },
      c: {
        whyNotCorrectHere: "A yearly email does not meet monthly supervision contact expectations.",
        whenWouldBeCorrect: "Email may be appropriate for administrative confirmation, not live supervision contact.",
      },
      d: {
        whyNotCorrectHere: "Supervision is proactive and recurring, not only incident-driven.",
        whenWouldBeCorrect: "Additional supervision after a serious incident may be appropriate, but it is not the only required contact.",
      },
    },
    scenario: "A trainee identifies the live contact portion of RBT supervision standards.",
    difficulty: "intro",
    tags: ["task 18", "face-to-face live supervision", "monthly meetings", "supervision requirements"],
  }),
  makeQuestion({
    id: "q-t18-monthly-observation",
    taskNumber: 18,
    questionType: "multiple-choice",
    prompt: "Which observation requirement is part of monthly RBT supervision?",
    choices: [
      { id: "a", text: "At least one observation while the RBT is providing services" },
      { id: "b", text: "Observation only while the RBT completes payroll" },
      { id: "c", text: "Observation only if the family complains" },
      { id: "d", text: "A self-observation written by the RBT with no supervisor contact" },
    ],
    correctAnswer: "a",
    explanation:
      "The monthly observation requirement includes observing the RBT while services are being provided.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Payroll completion does not show the RBT delivering behavior-analytic services.",
        whenWouldBeCorrect: "Administrative review may be useful but does not replace service observation.",
      },
      c: {
        whyNotCorrectHere: "Observation is not limited to complaint situations.",
        whenWouldBeCorrect: "A complaint may lead to extra observation or coaching.",
      },
      d: {
        whyNotCorrectHere: "Self-review alone is not supervisor observation.",
        whenWouldBeCorrect: "Self-reflection can supplement supervision but cannot replace required observation.",
      },
    },
    scenario: "A trainee describes what must happen during monthly supervision.",
    difficulty: "intro",
    tags: ["task 18", "monthly observation", "supervision requirements", "service delivery"],
  }),
  makeQuestion({
    id: "q-t18-missed-supervision",
    taskNumber: 18,
    questionType: "scenario-choice",
    prompt: "It is the last week of the month and the RBT realizes only one supervision meeting has occurred. What should the RBT do?",
    choices: [
      { id: "a", text: "Wait and hope the supervisor notices." },
      { id: "b", text: "Document fake supervision time." },
      { id: "c", text: "Notify the supervisor promptly and help schedule needed supervision." },
      { id: "d", text: "Ignore it because supervision is only the supervisor's responsibility." },
    ],
    correctAnswer: "c",
    explanation:
      "The RBT should track requirements and raise concerns early enough to address missing supervision.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Waiting risks missing the monthly requirement.",
        whenWouldBeCorrect: "Waiting briefly may be fine for a routine scheduled meeting, but not when a requirement may be missed.",
      },
      b: {
        whyNotCorrectHere: "Falsifying supervision records is unethical and inaccurate.",
        whenWouldBeCorrect: "Accurate documentation is correct after supervision actually occurs.",
      },
      d: {
        whyNotCorrectHere: "Supervisors manage supervision, but RBTs still need to know and communicate about requirements.",
        whenWouldBeCorrect: "The supervisor is responsible for providing appropriate oversight, but that does not justify silence from the RBT.",
      },
    },
    scenario: "A trainee responds to a possible supervision compliance problem before month-end.",
    difficulty: "challenge",
    tags: ["task 18", "missed supervision", "supervision requirements", "ethics"],
  }),
  makeQuestion({
    id: "q-t18-service-hours-basis",
    taskNumber: 18,
    questionType: "multiple-choice",
    prompt: "The 5% supervision minimum is based on which hours?",
    choices: [
      { id: "a", text: "The RBT's monthly hours providing behavior-analytic services" },
      { id: "b", text: "All hours the RBT is awake during the month" },
      { id: "c", text: "Only hours spent driving to sessions" },
      { id: "d", text: "Only hours when challenging behavior occurs" },
    ],
    correctAnswer: "a",
    explanation:
      "The supervision percentage is tied to monthly behavior-analytic service hours.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Personal non-work time is not part of behavior-analytic service hours.",
        whenWouldBeCorrect: "Total awake time is not used for this supervision calculation.",
      },
      c: {
        whyNotCorrectHere: "Travel alone is not the basis for the supervision percentage.",
        whenWouldBeCorrect: "Travel time may matter for employment records, but not this service-hour calculation unless policy says otherwise.",
      },
      d: {
        whyNotCorrectHere: "The requirement is not limited to sessions with challenging behavior.",
        whenWouldBeCorrect: "Challenging behavior sessions may be important to review, but all service hours matter for the percentage.",
      },
    },
    scenario: "A trainee clarifies what hours are used to estimate the monthly supervision minimum.",
    difficulty: "core",
    tags: ["task 18", "service hours", "5% supervision", "supervision requirements"],
  }),
  makeQuestion({
    id: "q-t18-live-supervision-boundary",
    taskNumber: 18,
    questionType: "scenario-choice",
    prompt: "An RBT receives several written notes from a supervisor but has no live supervision meetings that month. What is the concern?",
    choices: [
      { id: "a", text: "Written notes can be useful, but they do not by themselves meet the live meeting expectation." },
      { id: "b", text: "Written notes are better than live meetings, so there is no concern." },
      { id: "c", text: "The RBT should count each note as a separate face-to-face meeting." },
      { id: "d", text: "The RBT should stop providing services permanently." },
    ],
    correctAnswer: "a",
    explanation:
      "Written feedback can supplement supervision, but the RBT should still receive required live supervision contacts.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "Written feedback does not replace the live contact requirement.",
        whenWouldBeCorrect: "Written feedback may be appropriate as an additional coaching tool.",
      },
      c: {
        whyNotCorrectHere: "A written note is not a face-to-face live meeting.",
        whenWouldBeCorrect: "A live meeting would be counted when it actually occurs through an allowed live format.",
      },
      d: {
        whyNotCorrectHere: "Stopping services permanently is not the RBT's unilateral response to a supervision scheduling concern.",
        whenWouldBeCorrect: "Service changes should be handled through the supervisor and employer if supervision cannot be arranged.",
      },
    },
    scenario: "A trainee distinguishes written feedback from live supervision contact.",
    difficulty: "challenge",
    tags: ["task 18", "live supervision", "face-to-face meetings", "written feedback"],
  }),
  makeQuestion({
    id: "q-t18-requirements-nonexample",
    taskNumber: 18,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of describing RBT supervision requirements accurately?",
    choices: [
      { id: "a", text: "RBTs need at least 5% supervised service hours each month." },
      { id: "b", text: "RBTs should have two face-to-face live supervision meetings per month." },
      { id: "c", text: "RBTs need at least one monthly observation while providing services." },
      { id: "d", text: "RBTs only need supervision when they are brand new." },
    ],
    correctAnswer: "d",
    explanation:
      "Supervision is ongoing. It is not limited to the first month or only to new RBTs.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "This accurately states the monthly percentage requirement.",
        whenWouldBeCorrect: "It would be correct if asked for a true supervision requirement.",
      },
      b: {
        whyNotCorrectHere: "This accurately describes the live meeting expectation.",
        whenWouldBeCorrect: "It would be correct if asked for a monthly contact requirement.",
      },
      c: {
        whyNotCorrectHere: "This accurately states the monthly observation expectation.",
        whenWouldBeCorrect: "It would be correct if asked for the observation component of supervision.",
      },
    },
    scenario: "A trainee identifies the inaccurate supervision statement.",
    difficulty: "intro",
    tags: ["task 18", "supervision requirements", "nonexample", "monthly supervision"],
  }),
  makeQuestion({
    id: "q-t19-clinical-direction-definition",
    taskNumber: 19,
    questionType: "multiple-choice",
    prompt: "Which statement best describes seeking clinical direction?",
    choices: [
      { id: "a", text: "Asking the supervisor or appropriate clinician for guidance when a situation is outside the RBT's role, training, or current plan" },
      { id: "b", text: "Changing the treatment plan independently when the RBT has a good idea" },
      { id: "c", text: "Waiting until the next annual review for every problem" },
      { id: "d", text: "Asking another parent what worked for their child" },
    ],
    correctAnswer: "a",
    explanation:
      "Clinical direction means getting supervisor guidance before acting when clinical judgment, scope, safety, or plan clarity is involved.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "RBTs do not independently revise treatment plans.",
        whenWouldBeCorrect: "Sharing an idea with the supervisor would be appropriate so the supervisor can decide whether to change the plan.",
      },
      c: {
        whyNotCorrectHere: "Some issues need prompt direction, especially if procedures are unclear or safety is involved.",
        whenWouldBeCorrect: "Annual review may be relevant for broader credentialing or planning, not urgent clinical questions.",
      },
      d: {
        whyNotCorrectHere: "Another parent is not the clinical supervisor and may not know this client's plan.",
        whenWouldBeCorrect: "Caregiver input may be relevant when shared with the supervisor through appropriate channels.",
      },
    },
    scenario: "A trainee defines clinical direction during the task 19 interview.",
    difficulty: "intro",
    tags: ["task 19", "clinical direction", "scope", "supervisor guidance"],
  }),
  makeQuestion({
    id: "q-t19-unclear-procedure",
    taskNumber: 19,
    questionType: "scenario-choice",
    prompt: "The written procedure says to use 'prompt fading as needed,' but the RBT has not been trained on the prompt hierarchy for this learner. What should the RBT do?",
    choices: [
      { id: "a", text: "Guess a prompt order and adjust later." },
      { id: "b", text: "Seek clinical direction and training before implementing unclear steps independently." },
      { id: "c", text: "Skip data collection because the procedure is unclear." },
      { id: "d", text: "Ask the learner's sibling to choose the prompt level." },
    ],
    correctAnswer: "b",
    explanation:
      "Unclear procedures are a direct reason to ask for supervisor guidance before implementing in a way that may affect learning.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Guessing can create inconsistent teaching and prompt dependence or errors.",
        whenWouldBeCorrect: "Using judgment within a clearly trained plan may be appropriate, but not when the procedure itself is unclear.",
      },
      c: {
        whyNotCorrectHere: "Skipping data collection changes the plan and removes information the supervisor needs.",
        whenWouldBeCorrect: "A data change would be appropriate only if the supervisor directs it.",
      },
      d: {
        whyNotCorrectHere: "A sibling is not responsible for clinical decisions about prompt levels.",
        whenWouldBeCorrect: "Family input may be useful when gathered appropriately and reviewed by the supervisor.",
      },
    },
    scenario: "A trainee recognizes that unclear teaching procedures require guidance.",
    difficulty: "core",
    tags: ["task 19", "unclear procedures", "prompting", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t19-parent-request-plan-change",
    taskNumber: 19,
    questionType: "scenario-choice",
    prompt: "A parent says, 'Stop using the extinction part of the plan today; I do not like hearing the behavior increase.' What should the RBT do?",
    choices: [
      { id: "a", text: "Stop the procedure permanently because the parent requested it." },
      { id: "b", text: "Acknowledge the concern, follow safety procedures, and contact the supervisor for clinical direction." },
      { id: "c", text: "Argue with the parent until they agree." },
      { id: "d", text: "Secretly continue and do not document the concern." },
    ],
    correctAnswer: "b",
    explanation:
      "A parent concern about a behavior-reduction procedure should be handled respectfully and referred to the supervisor rather than independently changing the plan.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "The RBT cannot independently stop a treatment component permanently.",
        whenWouldBeCorrect: "Stopping or revising a procedure would be correct if the supervisor changes the plan or safety requires immediate action under protocol.",
      },
      c: {
        whyNotCorrectHere: "Arguing is unprofessional and does not solve the scope issue.",
        whenWouldBeCorrect: "Respectful explanation of the current plan may be appropriate within the RBT's role.",
      },
      d: {
        whyNotCorrectHere: "Hiding the concern undermines documentation and supervisor oversight.",
        whenWouldBeCorrect: "Continuing a plan may be appropriate while promptly reporting the concern, unless safety or supervisor direction says otherwise.",
      },
    },
    scenario: "A trainee handles a caregiver request that would change a behavior plan.",
    difficulty: "challenge",
    tags: ["task 19", "parent request", "outside RBT scope", "behavior plan"],
  }),
  makeQuestion({
    id: "q-t19-medication-advice",
    taskNumber: 19,
    questionType: "multiple-choice",
    prompt: "A caregiver asks the RBT whether medication should be increased because challenging behavior occurred this week. What is the best response?",
    choices: [
      { id: "a", text: "Recommend a dose increase based on the session." },
      { id: "b", text: "Say medication questions are outside the RBT role and refer the caregiver to the supervisor or appropriate medical professional." },
      { id: "c", text: "Tell the caregiver to stop medication immediately." },
      { id: "d", text: "Ask other RBTs what medication advice they give." },
    ],
    correctAnswer: "b",
    explanation:
      "Medication advice is outside the RBT scope. The RBT can share objective behavior data through appropriate channels and refer the question up.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "The RBT is not qualified to prescribe or adjust medication.",
        whenWouldBeCorrect: "Objective data may be shared with authorized professionals if requested through proper channels.",
      },
      c: {
        whyNotCorrectHere: "Telling a caregiver to stop medication is medical advice and outside scope.",
        whenWouldBeCorrect: "Medication changes should come from an appropriate medical professional.",
      },
      d: {
        whyNotCorrectHere: "Other RBTs do not make medication decisions either.",
        whenWouldBeCorrect: "Peer discussion may be useful for role reminders, but the caregiver should be referred to appropriate professionals.",
      },
    },
    scenario: "A trainee responds to a medical question from a caregiver.",
    difficulty: "core",
    tags: ["task 19", "medication", "outside RBT scope", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t19-new-severe-behavior",
    taskNumber: 19,
    questionType: "scenario-choice",
    prompt: "A learner engages in a new dangerous behavior that is not addressed in the current plan. What should the RBT do?",
    choices: [
      { id: "a", text: "Create a new consequence procedure during the session." },
      { id: "b", text: "Follow immediate safety or emergency protocols and contact the supervisor for clinical direction." },
      { id: "c", text: "Ignore it because it is not in the plan." },
      { id: "d", text: "Ask the caregiver to design a behavior plan." },
    ],
    correctAnswer: "b",
    explanation:
      "New dangerous behavior requires safety response within training and prompt supervisor direction because the current plan does not cover it.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Inventing a consequence procedure is outside the RBT role and may be unsafe.",
        whenWouldBeCorrect: "A new procedure would be correct only after supervisor assessment, plan revision, and staff training.",
      },
      c: {
        whyNotCorrectHere: "Ignoring dangerous behavior can put people at risk.",
        whenWouldBeCorrect: "Planned ignoring would be appropriate only for a specific behavior and function in a written plan, not new danger.",
      },
      d: {
        whyNotCorrectHere: "Caregivers provide input, but they do not replace clinical plan development.",
        whenWouldBeCorrect: "Caregiver information can help the supervisor assess and update the plan.",
      },
    },
    scenario: "A trainee decides what to do when behavior changes beyond the written plan.",
    difficulty: "challenge",
    tags: ["task 19", "challenging behavior", "safety", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t19-new-complex-goal",
    taskNumber: 19,
    questionType: "scenario-choice",
    prompt: "A supervisor adds a complex AAC communication goal, but the RBT has not been trained on the device or data sheet. What should the RBT do before running it independently?",
    choices: [
      { id: "a", text: "Seek training and clinical direction from the supervisor." },
      { id: "b", text: "Run the goal from memory based on a different client." },
      { id: "c", text: "Skip the goal forever." },
      { id: "d", text: "Let the caregiver train the RBT without supervisor involvement." },
    ],
    correctAnswer: "a",
    explanation:
      "New or complex goals require clear training on the procedure, prompting, reinforcement, and data collection before independent implementation.",
    distractorExplanations: {
      b: {
        whyNotCorrectHere: "A different client's program may not match this learner's plan.",
        whenWouldBeCorrect: "Prior experience can help after the RBT is trained on this client's specific procedure.",
      },
      c: {
        whyNotCorrectHere: "Skipping the goal permanently changes treatment without direction.",
        whenWouldBeCorrect: "Temporarily pausing may be appropriate if the supervisor says not to run it until training occurs.",
      },
      d: {
        whyNotCorrectHere: "Caregiver input can help, but supervisor-directed training is needed for clinical implementation.",
        whenWouldBeCorrect: "A caregiver may show device preferences or routines as part of supervisor-approved training.",
      },
    },
    scenario: "A trainee identifies when a new complex goal requires training before implementation.",
    difficulty: "core",
    tags: ["task 19", "new goals", "complex goals", "AAC", "clinical direction"],
  }),
  makeQuestion({
    id: "q-t19-ethical-uncertainty",
    taskNumber: 19,
    questionType: "multiple-choice",
    prompt: "The RBT is unsure whether a requested action is ethical, but it is not an immediate emergency. What is the best next step?",
    choices: [
      { id: "a", text: "Do it first and ask questions later." },
      { id: "b", text: "Ask social media for advice using vague client details." },
      { id: "c", text: "Pause if appropriate and seek supervisor or ethics-related guidance through approved channels." },
      { id: "d", text: "Let the family decide whether it is ethical." },
    ],
    correctAnswer: "c",
    explanation:
      "Ethical uncertainty is a reason to seek clinical or supervisory direction before acting when there is time to clarify.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Acting first can create avoidable ethical or clinical harm.",
        whenWouldBeCorrect: "Immediate action is appropriate only for safety emergencies within training and protocol.",
      },
      b: {
        whyNotCorrectHere: "Social media is not an approved confidential supervision channel.",
        whenWouldBeCorrect: "General ethics education can be discussed without client details, but active cases require approved supervision channels.",
      },
      d: {
        whyNotCorrectHere: "Families are important stakeholders but do not replace ethics or clinical supervision.",
        whenWouldBeCorrect: "Family preferences should be considered by the supervisor when making clinical decisions.",
      },
    },
    scenario: "A trainee recognizes ethical uncertainty as a reason to ask before acting.",
    difficulty: "challenge",
    tags: ["task 19", "ethical uncertainty", "clinical direction", "supervisor guidance"],
  }),
  makeQuestion({
    id: "q-t19-scope-nonexample",
    taskNumber: 19,
    questionType: "identify-nonexample",
    prompt: "Which option is a nonexample of staying within the RBT role when clinical direction is needed?",
    choices: [
      { id: "a", text: "Contacting the supervisor when the procedure is unclear" },
      { id: "b", text: "Referring a caregiver's medication question to the appropriate professional" },
      { id: "c", text: "Independently changing the mastery criterion because the RBT thinks it is too easy" },
      { id: "d", text: "Reporting new dangerous behavior and following safety protocol" },
    ],
    correctAnswer: "c",
    explanation:
      "Changing mastery criteria is a clinical decision and should not be done independently by the RBT.",
    distractorExplanations: {
      a: {
        whyNotCorrectHere: "Asking the supervisor is exactly what the RBT should do when a procedure is unclear.",
        whenWouldBeCorrect: "It would be correct if asked for an example of seeking clinical direction.",
      },
      b: {
        whyNotCorrectHere: "Referring medical questions protects scope and client safety.",
        whenWouldBeCorrect: "It would be correct if asked how to handle a parent request outside RBT scope.",
      },
      d: {
        whyNotCorrectHere: "Safety protocol and supervisor notification are appropriate when new dangerous behavior appears.",
        whenWouldBeCorrect: "It would be correct if asked what to do when behavior is outside the current plan.",
      },
    },
    scenario: "A trainee identifies the action that crosses from implementation into clinical decision-making.",
    difficulty: "core",
    tags: ["task 19", "scope", "mastery criteria", "nonexample"],
  }),
];

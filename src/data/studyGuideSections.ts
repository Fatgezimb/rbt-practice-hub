import type { StudyGuideSection } from "../types";

export const studyGuideSections: StudyGuideSection[] = [
  {
    id: "guide-measurement",
    title: "Measurement",
    section: "Measurement",
    taskNumbers: [1, 2, 3],
    overview:
      "Measurement is the habit of turning what happened in session into usable information. The goal is to select the right data system, record accurately, and keep graphs current enough for the supervisor to make decisions.",
    studyGoal:
      "Be able to explain what you are measuring, why that system fits the behavior, and how the data should be displayed after session.",
    keyConcepts: [
      "continuous measurement",
      "frequency",
      "duration",
      "latency",
      "interresponse time",
      "whole interval",
      "partial interval",
      "momentary time sampling",
      "permanent product",
      "line graphs",
      "bar graphs",
      "visual analysis",
    ],
    practiceFocus: [
      "Choose frequency, duration, latency, IRT, interval recording, or permanent product from a short scenario.",
      "Record a small sample of data without adding interpretation.",
      "Explain what a simple graph shows using plain, objective language.",
    ],
    commonMixUps: [
      "Frequency counts how many times behavior occurs; rate adds a time unit.",
      "Latency starts after a cue or instruction; IRT starts after the previous response ends.",
      "Partial interval can overestimate behavior; whole interval can underestimate behavior.",
      "A graph is not the intervention. It is a display that helps the supervisor evaluate patterns.",
    ],
    taskGuides: [
      {
        taskNumber: 1,
        title: "Continuous Measurement",
        learnerGoal:
          "Record every occurrence or exact time value for behavior that has a clear count, start, end, or response-to-response gap.",
        keyIdeas: [
          "Frequency counts each occurrence.",
          "Duration records how long behavior lasts.",
          "Latency records the time from a cue to the first response.",
          "IRT records the time between one response and the next.",
          "Rate is frequency divided by time, such as 12 responses in 10 minutes.",
        ],
        examples: [
          "Counting every hand raise during group is frequency.",
          "Timing how long a learner cries after a demand is duration.",
          "Timing from 'touch cup' to the learner touching the cup is latency.",
          "Timing between one request and the next request is IRT.",
        ],
        nonExamples: [
          "Marking whether behavior happened at the end of each minute is not continuous measurement.",
          "Writing 'had a bad session' is not measurement because it is not observable or countable.",
        ],
        practicePrompt:
          "Watch a five-minute sample and decide whether you would count, time total duration, time latency, or time between responses.",
        quickCheck: "If the procedure captures every event or exact time value, it is probably continuous measurement.",
      },
      {
        taskNumber: 2,
        title: "Discontinuous Measurement",
        learnerGoal:
          "Use interval or momentary systems when the plan calls for sampled observation instead of recording every event.",
        keyIdeas: [
          "Whole interval records yes only if behavior occurs for the entire interval.",
          "Partial interval records yes if behavior occurs at any time during the interval.",
          "Momentary time sampling records whether behavior is happening at the exact check moment.",
          "Permanent product records an outcome left behind by behavior, such as completed problems.",
        ],
        examples: [
          "Marking yes only if on-task behavior lasts the full 30 seconds is whole interval.",
          "Marking yes if yelling happens at any point in a 10-second interval is partial interval.",
          "Looking up when the timer beeps and recording whether the learner is seated is momentary time sampling.",
          "Counting completed worksheet items after class is permanent product.",
        ],
        nonExamples: [
          "Counting every yell across the session is frequency, not discontinuous measurement.",
          "Guessing whether behavior occurred during missed intervals is not accurate data collection.",
        ],
        practicePrompt:
          "For each sample behavior, decide whether the team needs every occurrence or a sampled estimate, then choose the system.",
        quickCheck: "If the observer checks intervals or moments instead of every response, think discontinuous measurement.",
      },
      {
        taskNumber: 3,
        title: "Data and Graphs",
        learnerGoal:
          "Enter data carefully and update the correct display so the team can review patterns, trends, and changes over time.",
        keyIdeas: [
          "Line graphs are useful for repeated data across time.",
          "Bar graphs compare categories or summary totals.",
          "Visual analysis looks for level, trend, variability, and changes after interventions.",
          "Data entry should match the datasheet and include the correct date, target, and unit.",
        ],
        examples: [
          "Adding today's number of independent requests to a weekly line graph is a data-and-graph task.",
          "Comparing total mastered targets across three programs with bars is a bar graph use.",
          "Noticing that duration decreases after a schedule change is a visual-analysis observation.",
        ],
        nonExamples: [
          "Changing the intervention because one data point looks unusual is not the RBT's independent decision.",
          "Graphing percentages when the datasheet recorded raw counts can misrepresent the data unless directed.",
        ],
        practicePrompt:
          "Given five session data points, enter them in order and explain one pattern you see without making a treatment decision.",
        quickCheck: "Accurate graphing means the display matches the measurement system and the dates are in sequence.",
      },
    ],
    sourceNote: "Fresh learner wording based on the competency task map and study-guide measurement concepts.",
    tags: ["measurement", "data", "graphs"],
  },
  {
    id: "guide-assessment",
    title: "Assessment",
    section: "Assessment",
    taskNumbers: [4, 5],
    overview:
      "Assessment tasks ask the trainee to collect information that helps the supervisor understand preferences and behavior patterns. The RBT role is to follow the procedure, record what happens, and avoid over-interpreting the results.",
    studyGoal:
      "Be able to run common preference formats, record selections or engagement, and collect ABC data with observable language.",
    keyConcepts: [
      "indirect preference assessment",
      "free operant",
      "single stimulus",
      "paired choice",
      "multiple stimulus with replacement",
      "multiple stimulus without replacement",
      "antecedent",
      "behavior",
      "consequence",
    ],
    practiceFocus: [
      "Match a preference assessment format to the setup.",
      "Write ABC entries that separate events before, behavior, and events after.",
      "Explain why a preferred item is not automatically a reinforcer until behavior increases.",
    ],
    commonMixUps: [
      "Preference means the learner chooses or engages; reinforcement means future behavior increases.",
      "Antecedent is what happened before behavior, not the assumed reason for behavior.",
      "A consequence is what followed behavior, not whether the outcome was good or bad.",
    ],
    taskGuides: [
      {
        taskNumber: 4,
        title: "Preference Assessments",
        learnerGoal:
          "Arrange materials and record selections or engagement according to the preference assessment format in the plan.",
        keyIdeas: [
          "Indirect assessments ask caregivers or staff what the learner may like.",
          "Free operant lets the learner move among available items while engagement is recorded.",
          "Single stimulus presents one item at a time.",
          "Paired choice presents two items and records which one is selected.",
          "MSW keeps chosen items available again; MSWO removes selected items from the array.",
        ],
        examples: [
          "Showing bubbles and a puzzle together and recording bubbles as selected is paired choice.",
          "Placing six items out and removing the chosen one after each trial is MSWO.",
          "Asking a parent which snacks the learner often chooses is indirect assessment.",
        ],
        nonExamples: [
          "Giving the same toy because it worked last week is not conducting a preference assessment.",
          "Calling an item a reinforcer before seeing an effect on behavior over time is too strong.",
        ],
        practicePrompt:
          "Set up three mini preference assessments with common classroom items and state exactly what you would record.",
        quickCheck: "Preference assessment tells you what may work; reinforcement is confirmed by behavior change.",
      },
      {
        taskNumber: 5,
        title: "ABC Data",
        learnerGoal:
          "Record the antecedent, behavior, and consequence as separate observable events so patterns can be reviewed by the supervisor.",
        keyIdeas: [
          "Antecedent is the event or condition right before the behavior.",
          "Behavior is the observable action the learner did.",
          "Consequence is what happened immediately after.",
          "Good ABC data avoids labels such as angry, manipulative, or noncompliant unless those are operationally defined.",
        ],
        examples: [
          "Antecedent: worksheet placed on desk. Behavior: learner pushed worksheet to floor. Consequence: staff removed worksheet and redirected.",
          "Antecedent: peer picked up train. Behavior: learner screamed and grabbed train. Consequence: peer dropped train.",
        ],
        nonExamples: [
          "'He wanted attention' is not an antecedent; it is an interpretation.",
          "'She was disrespectful' is not a behavior description because it does not say what she did.",
        ],
        practicePrompt:
          "Rewrite three subjective notes as ABC entries using only events someone else could observe.",
        quickCheck: "If another trained observer could read the note and picture the same event, the ABC entry is stronger.",
      },
    ],
    sourceNote: "Fresh learner wording based on the competency task map and study-guide assessment concepts.",
    tags: ["assessment", "preference assessment", "ABC data"],
  },
  {
    id: "guide-skill-acquisition-behavior-reduction",
    title: "Skill Acquisition and Behavior Reduction",
    section: "Skill Acquisition and Behavior Reduction",
    taskNumbers: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    overview:
      "This section covers direct teaching, support fading, reinforcement systems, crisis protocols, and behavior-reduction procedures. Many tasks can be shown in role-play, but at least three of tasks 6-14 must be demonstrated with a client.",
    studyGoal:
      "Be able to describe the procedure, carry it out as written, respond to errors calmly, and know when the supervisor's plan controls your next step.",
    keyConcepts: [
      "DTT",
      "naturalistic teaching",
      "task analysis",
      "forward chaining",
      "backward chaining",
      "total task chaining",
      "successive approximations",
      "SD and S-delta",
      "stimulus control",
      "prompt fading",
      "token systems",
      "crisis protocol",
      "antecedent interventions",
      "DRA, DRI, DRO, DRH, DRL",
      "extinction",
    ],
    practiceFocus: [
      "Role-play each procedure with a script and datasheet.",
      "Identify which tasks could count toward the three required client demonstrations.",
      "Explain the difference between prevention, teaching, reinforcement, and extinction.",
    ],
    commonMixUps: [
      "Prompting is help before or during a response; reinforcement follows a response.",
      "Naturalistic teaching still has a planned target even though the opportunity looks natural.",
      "Extinction means withholding the maintaining reinforcer, not ignoring every behavior.",
      "Crisis prevention, de-escalation, and crisis protocol are different points in the safety process.",
    ],
    taskGuides: [
      {
        taskNumber: 6,
        title: "Discrete-Trial Teaching",
        learnerGoal: "Run structured teaching trials with a clear SD, learner response, and planned consequence.",
        keyIdeas: [
          "The SD tells the learner which response can contact reinforcement.",
          "The response is what the learner does after the SD.",
          "The consequence follows the response and may include reinforcement or error correction.",
          "Error correction should follow the written teaching plan.",
        ],
        examples: [
          "SD: 'Touch car.' Response: learner touches car. Consequence: praise and token as planned.",
          "If the learner touches the wrong picture, the technician follows the error-correction sequence rather than scolding.",
        ],
        nonExamples: [
          "Repeating the SD louder several times without following the plan is not clean DTT.",
          "Changing targets mid-trial because the learner seems bored is not following the procedure.",
        ],
        practicePrompt: "Run five mock trials and name the SD, response, and consequence after each trial.",
        quickCheck: "DTT should feel structured: one instruction, one response opportunity, one planned consequence.",
      },
      {
        taskNumber: 7,
        title: "Naturalistic Teaching",
        learnerGoal: "Use learner motivation and naturally occurring activities to teach a planned skill.",
        keyIdeas: [
          "Capturing means using an opportunity that naturally happens.",
          "Contriving means arranging the environment so an opportunity is likely.",
          "Natural reinforcement is directly related to the learner's response.",
          "The RBT still follows target definitions and prompting rules.",
        ],
        examples: [
          "A learner reaches for bubbles, so the technician prompts 'bubbles' and then blows bubbles after the request.",
          "Placing a favorite snack in sight but out of reach can contrive a request opportunity if it is in the plan.",
        ],
        nonExamples: [
          "Turning every play action into a demand can reduce natural motivation.",
          "Letting the learner play without tracking targets is not naturalistic teaching unless no teaching procedure is being run.",
        ],
        practicePrompt: "List three naturally motivating moments and one target you could teach in each.",
        quickCheck: "If the consequence is access to what the learner was trying to get, natural reinforcement is likely involved.",
      },
      {
        taskNumber: 8,
        title: "Chaining",
        learnerGoal: "Teach a multi-step skill from a task analysis using the chaining method in the plan.",
        keyIdeas: [
          "A task analysis breaks a larger skill into teachable steps.",
          "Forward chaining teaches from the first step onward.",
          "Backward chaining teaches the last step first so the learner contacts completion.",
          "Total task chaining supports the learner through every step each time.",
          "Open steps can vary; closed steps have a clear start and finish.",
        ],
        examples: [
          "Teaching handwashing by prompting every step from water on to towel dry is total task chaining.",
          "Having the learner complete only the final zipper pull after help with earlier steps is backward chaining.",
        ],
        nonExamples: [
          "Teaching 'get ready for school' without listing steps is too broad for a task analysis.",
          "Skipping data on prompted steps makes it harder to know where the learner needs support.",
        ],
        practicePrompt: "Write a five-step task analysis for packing a backpack and choose a chaining method.",
        quickCheck: "Chaining is for linked steps where completing one step sets up the next.",
      },
      {
        taskNumber: 9,
        title: "Shaping",
        learnerGoal: "Reinforce successive approximations that move closer to a terminal behavior.",
        keyIdeas: [
          "The terminal behavior is the final target response.",
          "Successive approximations are closer versions of the target.",
          "Criteria should change gradually enough that the learner can contact reinforcement.",
          "Old approximations usually stop contacting reinforcement once the learner is ready for the next step.",
        ],
        examples: [
          "Reinforcing any vocal sound, then sounds closer to 'ma,' then the full word is shaping.",
          "Reinforcing longer independent writing attempts in small steps can shape writing endurance.",
        ],
        nonExamples: [
          "Prompting every response and reinforcing completion is not shaping by itself.",
          "Raising the criterion from one sound to a full sentence may be too large a step.",
        ],
        practicePrompt: "Choose a terminal behavior and write four realistic approximations toward it.",
        quickCheck: "Shaping asks, 'What closer version will we reinforce next?'",
      },
      {
        taskNumber: 10,
        title: "Discrimination Training",
        learnerGoal: "Teach the learner when a response should occur and when it should not occur.",
        keyIdeas: [
          "An SD signals that a response can contact reinforcement.",
          "An S-delta signals that reinforcement is not available for that response.",
          "Stimulus control means the response happens in the presence of the right stimulus and not others.",
          "Stimulus control transfer moves control from prompts to natural cues.",
        ],
        examples: [
          "The learner says 'red' when shown a red card, not when shown a blue card.",
          "A prompt is faded until the printed word, not the adult's hint, controls the response.",
        ],
        nonExamples: [
          "The learner responding correctly only when the adult points means the prompt may still control the response.",
          "Reinforcing the same response for every picture does not build discrimination.",
        ],
        practicePrompt: "Create three SD/S-delta pairs for a receptive-labeling target.",
        quickCheck: "Discrimination training is about responding differently when the relevant stimulus changes.",
      },
      {
        taskNumber: 11,
        title: "Prompting",
        learnerGoal: "Use prompts that support correct responding, then fade them so independence increases.",
        keyIdeas: [
          "Physical prompts involve touch or guided movement.",
          "Model prompts show the response.",
          "Gesture prompts point or motion toward the response.",
          "Verbal prompts use words or vocal cues.",
          "Stimulus fading changes features of the materials over time.",
          "Least-to-most and most-to-least are prompt hierarchies.",
        ],
        examples: [
          "Pointing to the correct picture is a gesture prompt.",
          "Making the correct card larger at first and gradually matching card sizes is stimulus fading.",
          "Using hand guidance only after lighter help fails may be least-to-most prompting.",
        ],
        nonExamples: [
          "Leaving the same prompt in place forever does not build independence.",
          "Calling every type of help a verbal prompt blurs important procedure differences.",
        ],
        practicePrompt: "Sort ten sample prompts by type and decide how each could be faded.",
        quickCheck: "A prompt is temporary help; fading is the planned path away from that help.",
      },
      {
        taskNumber: 12,
        title: "Token Systems",
        learnerGoal: "Deliver, track, and exchange tokens exactly as described in the learner's plan.",
        keyIdeas: [
          "Tokens are conditioned reinforcers paired with backup reinforcers.",
          "The learner should know how tokens are earned and exchanged when appropriate.",
          "Backup reinforcers are the items or activities the tokens can buy.",
          "The exchange rate and timing should match the written procedure.",
        ],
        examples: [
          "A learner earns one star for each completed task and trades five stars for two minutes of a game.",
          "The technician marks tokens immediately after target responses if that is the plan.",
        ],
        nonExamples: [
          "Taking away tokens because staff feel frustrated is not appropriate unless the plan explicitly includes response cost.",
          "Changing the price of backup items mid-session can damage the system.",
        ],
        practicePrompt: "Build a sample token board and explain when tokens are delivered and exchanged.",
        quickCheck: "Tokens only work as a system when earning, saving, and exchanging are predictable.",
      },
      {
        taskNumber: 13,
        title: "Crisis / Emergency Procedures",
        learnerGoal: "Follow the approved safety protocol within training, role, and supervision limits.",
        keyIdeas: [
          "Prevention happens before escalation through known supports and environmental arrangement.",
          "De-escalation responds to early signs while trying to reduce risk.",
          "Crisis protocol is followed when safety procedures are required.",
          "The RBT should know when to call for help and document objectively afterward.",
        ],
        examples: [
          "Moving extra materials away before a known transition difficulty can be prevention.",
          "Using a calm voice and reducing demands according to the plan can be de-escalation.",
          "Following the written emergency contact procedure during injury risk is crisis protocol.",
        ],
        nonExamples: [
          "Inventing a restraint or safety procedure is outside role and training.",
          "Debating with a learner during escalation may increase risk and is not de-escalation.",
        ],
        practicePrompt: "Describe what you would do before, during, and after a crisis using only actions in the plan.",
        quickCheck: "In crisis work, the plan and safety training decide the response, not improvisation.",
      },
      {
        taskNumber: 14,
        title: "Behavior Reduction Option",
        learnerGoal:
          "Demonstrate one approved option: antecedent intervention, differential reinforcement, or extinction.",
        keyIdeas: [
          "Antecedent interventions change conditions before behavior occurs.",
          "Differential reinforcement strengthens a desired alternative, incompatible, lower-rate, higher-rate, or absent behavior depending on the procedure.",
          "Extinction withholds the reinforcer that previously maintained behavior.",
          "Extinction bursts, spontaneous recovery, and variability may occur and should be handled through the plan.",
        ],
        examples: [
          "Offering choices before work starts is an antecedent intervention.",
          "Reinforcing a hand raise instead of calling out is DRA.",
          "No longer giving escape from a demand after task refusal may be extinction if escape maintained the behavior and the plan says to do it.",
        ],
        nonExamples: [
          "Ignoring dangerous behavior is not extinction unless the maintaining reinforcer is attention and safety is addressed.",
          "Reinforcing any behavior that is simply quiet may be too vague unless the DRO interval and criteria are clear.",
        ],
        practicePrompt:
          "For one behavior, write an antecedent option, a differential reinforcement option, and an extinction boundary.",
        quickCheck: "Ask: Are we changing what happens before, what we reinforce, or what reinforcer no longer follows behavior?",
      },
    ],
    sourceNote: "Fresh learner wording based on the competency task map and study-guide teaching/procedure concepts.",
    tags: ["skill acquisition", "behavior reduction", "client demonstration"],
  },
  {
    id: "guide-professionalism",
    title: "Professionalism and Requirements",
    section: "Professionalism and Requirements",
    taskNumbers: [15, 16, 17, 18, 19],
    overview:
      "Professionalism tasks focus on how an RBT communicates, documents, protects dignity, follows boundaries, and seeks supervision. These are often assessed through interview examples, so practical workplace scenarios matter.",
    studyGoal:
      "Be able to explain what you would do in common workplace situations while staying within the RBT role and supervisor direction.",
    keyConcepts: [
      "objective session notes",
      "observable language",
      "client dignity",
      "privacy",
      "confidentiality",
      "boundaries",
      "dual relationships",
      "5 percent supervision",
      "two live meetings",
      "monthly observation",
      "clinical direction",
    ],
    practiceFocus: [
      "Rewrite subjective language into objective session notes.",
      "Prepare interview examples for dignity, boundaries, and confidentiality.",
      "Identify when supervisor direction is required before acting.",
    ],
    commonMixUps: [
      "Friendly is not the same as personal friendship.",
      "Confidentiality includes casual conversations, screens, paperwork, and public spaces.",
      "Parents can share concerns, but RBTs do not redesign goals or procedures independently.",
      "When unsure ethically or clinically, pause and contact the supervisor.",
    ],
    taskGuides: [
      {
        taskNumber: 15,
        title: "Session Notes",
        learnerGoal:
          "Write objective notes that describe relevant session events, teaching targets, behavior, and follow-up without opinion language.",
        keyIdeas: [
          "Objective notes use observable actions and measurable details.",
          "Subjective labels should be replaced with what was seen or heard.",
          "Notes should match the session, not include unsupported assumptions.",
          "Clinical concerns should be routed to the supervisor as directed.",
        ],
        examples: [
          "Objective: 'Learner completed 8 of 10 matching trials independently.'",
          "Objective: 'Learner cried for 3 minutes after the tablet was removed.'",
        ],
        nonExamples: [
          "'Learner was lazy today' is subjective and disrespectful.",
          "'Parent was difficult' does not describe observable events.",
        ],
        practicePrompt: "Rewrite five subjective statements into objective session-note language.",
        quickCheck: "If the note includes a judgment, replace it with what happened.",
      },
      {
        taskNumber: 16,
        title: "Client Dignity",
        learnerGoal: "Give practical examples of protecting dignity through privacy, tone, choice, and respect.",
        keyIdeas: [
          "Use age-appropriate and respectful language.",
          "Offer choices when choices are available in the plan or setting.",
          "Protect privacy during personal care, behavior events, and documentation.",
          "Speak about clients as people, not as problems or labels.",
        ],
        examples: [
          "Discussing a behavior plan privately instead of in a public hallway protects dignity.",
          "Offering a choice between two approved activities can support autonomy.",
        ],
        nonExamples: [
          "Talking about a client's behavior in front of unrelated people violates privacy.",
          "Using baby talk with an adolescent because they have a disability is not age-appropriate.",
        ],
        practicePrompt: "Prepare three interview examples: one about privacy, one about choice, and one about respectful tone.",
        quickCheck: "Dignity asks, 'Would this still feel respectful if the client or family heard it?'",
      },
      {
        taskNumber: 17,
        title: "Professional Boundaries",
        learnerGoal:
          "Maintain a professional role by avoiding dual relationships, gifts, personal disclosures, and irrelevant conversations.",
        keyIdeas: [
          "The therapy relationship has a purpose: client care under the supervisor's plan.",
          "Gifts, social invitations, and personal favors can create boundary problems.",
          "Personal space and communication should match professional expectations.",
          "Irrelevant conversations should be redirected respectfully.",
        ],
        examples: [
          "Declining a parent gift and asking the supervisor how to respond protects boundaries.",
          "Redirecting a long conversation about your personal life back to session goals keeps the interaction professional.",
        ],
        nonExamples: [
          "Adding a caregiver on personal social media creates a dual relationship risk.",
          "Sharing private relationship problems during session shifts attention away from the client.",
        ],
        practicePrompt: "Write a short script for declining a gift and notifying the supervisor.",
        quickCheck: "If the relationship would continue outside therapy, pause and ask the supervisor.",
      },
      {
        taskNumber: 18,
        title: "Supervision Requirements",
        learnerGoal: "Describe core RBT supervision requirements and why supervision protects clients and RBTs.",
        keyIdeas: [
          "RBTs must receive ongoing supervision tied to service hours.",
          "A common requirement is at least 5 percent of service hours supervised each month.",
          "Supervision includes at least two face-to-face live contacts per month.",
          "At least one monthly observation should occur while the RBT provides services.",
          "Current requirements should be checked against official BACB materials and employer policy.",
        ],
        examples: [
          "If an RBT works 80 service hours in a month, 5 percent equals 4 supervised hours.",
          "A live video meeting may count as face-to-face if it meets the applicable standard and organization policy.",
        ],
        nonExamples: [
          "Counting only casual text messages as supervision would not meet live meeting expectations.",
          "Waiting several months between observations does not match monthly observation expectations.",
        ],
        practicePrompt: "Calculate 5 percent supervision for 60, 80, and 100 service hours.",
        quickCheck: "Know the numbers, but verify the current official standard before relying on memory.",
      },
      {
        taskNumber: 19,
        title: "Clinical Direction",
        learnerGoal:
          "Identify situations where the RBT should pause and seek supervisor guidance before changing procedures or responding independently.",
        keyIdeas: [
          "Ask for direction with new goals, unclear procedures, safety concerns, challenging behavior, and ethical uncertainty.",
          "Parent requests outside the plan should be referred to the supervisor.",
          "RBTs implement plans; they do not independently redesign treatment.",
          "Clinical direction should be sought early enough to prevent drift from the plan.",
        ],
        examples: [
          "A parent asks you to add toilet training; you acknowledge the request and tell the supervisor.",
          "The behavior plan is unclear about what to do after aggression; you stop and seek guidance.",
        ],
        nonExamples: [
          "Changing reinforcement schedules because you think progress is slow is outside the RBT role.",
          "Giving a caregiver a new behavior plan without supervisor approval is not appropriate.",
        ],
        practicePrompt: "List five situations from your workplace where supervisor direction would be needed.",
        quickCheck: "If the next step changes the plan, affects safety, or raises ethics concerns, seek direction.",
      },
    ],
    sourceNote: "Fresh learner wording based on the competency task map and study-guide professionalism concepts.",
    tags: ["documentation", "professionalism", "supervision"],
  },
];

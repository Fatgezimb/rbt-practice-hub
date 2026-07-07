# QA Worklog

This file tracks the current implementation/QA sequence so work can resume cleanly after interruptions.

## Current Sequence

1. Polish learning modes.
2. Run final QA pass and update README.
3. Audit the official 2026 RBT Initial Competency Assessment packet in batches:
   - Tasks 1-5, report findings, wait for approval before implementing.
   - Tasks 6-11, report findings, wait for approval before implementing.
   - Tasks 12-19, report findings, wait for approval before implementing.
4. Whole-site review and final suggestions.

## Learning Mode Polish Checklist

- [x] Flashcards: normal card mode.
- [x] Flashcards: mini card mode.
- [x] Flashcards: shuffle.
- [x] Flashcards: search.
- [x] Flashcards: filter by task.
- [x] Flashcards: filter by section.
- [x] Flashcards: filter by difficulty.
- [x] Flashcards: Known / Needs Review buttons.
- [x] Flashcards: progress count.
- [x] Flashcards: keyboard support for space and arrows.
- [x] Flashcards: tablet/phone controls enlarged for touch while keeping keyboard support.
- [x] Practice: one question at a time.
- [x] Practice: immediate feedback for single-answer questions.
- [x] Practice: explanation after answering.
- [x] Practice: wrong-answer explanations and when-would-be-correct notes.
- [x] Practice: mark for review.
- [x] Practice: retry missed questions.
- [x] Practice: sidebar check/X marks.
- [x] Practice: displayed acronyms expanded with full terms in question surface.
- [x] Practice: verify all buttons route/work correctly.
- [x] Progress: localStorage persistence.
- [x] Progress: reset confirmation.
- [x] Progress: overall practice readiness score.
- [x] Progress: per-section progress.
- [x] Progress: client-demonstration reminder.
- [x] Progress: avoids official competency claims.
- [x] Accessibility/responsive: verify 14-inch, 16-inch, tablet, and phone layouts.

## Latest Implementation Notes

- Added `QA_WORKLOG.md` for recovery after interruptions.
- Flashcards now include normal/mini mode, shuffle, difficulty filtering, and touch-sized controls on smaller screens.
- Practice questions now answer immediately for single-answer items, keep manual check for select-all, and include Mark for Review.
- Mark for Review is stored separately from correct/missed status, so retry-missed still works after a question is flagged.
- Practice UI expands common acronyms such as RBT, BACB, DTT, IRT, MTS, MSW/MSWO, NCR, DRA/DRI/DRO/DRH/DRL, and SD in displayed question text.
- Progress and header wording now use practice readiness language instead of implying official competence.
- LocalStorage now stores timestamped question attempt history, flashcard mark history, and study-guide open/review activity.
- Study guide section modals now record opens and include a reviewed button; Progress displays guide activity and latest attempt timestamps.
- Browser QA verified flashcard normal/mini/shuffle/filter/keyboard controls, practice no-default-selection/immediate-feedback/retry/review controls, drawer behavior, and 1366/1728/tablet/phone layouts.
- Standalone Playwright fallback verified localStorage histories and reset confirmation because the in-app browser sandbox does not expose localStorage for inspection.

## Final QA Checklist

- [x] `npm install` works.
- [x] `npm run dev` works.
- [x] `npm run build` works.
- [x] GitHub Pages deployment works as a public site and URL is provided.
- [x] All routes work after refresh.
- [x] Sidebar works on desktop/mobile/tablet.
- [x] Progress drawer works on mobile/tablet.
- [x] Flashcard count makes sense.
- [x] Question count is >= 190.
- [x] Study guide opens correctly and is complete.
- [x] No BACB logo is used.
- [x] No unauthorized branding or copied third-party content appears.
- [x] Disclaimer appears in footer and About page.
- [x] Task names and assessment types match the BACB competency PDF.
- [x] Client-demonstration reminder appears in the right places.
- [x] Question/flashcard correct and incorrect attempt history tracks count and Date/Time.
- [x] Guide opens and reviewed state track count and Date/Time.
- [x] README updated.

## Final QA Results

- Live site: https://fatgezimb.github.io/rbt-practice-hub/
- Repository: https://github.com/Fatgezimb/rbt-practice-hub
- `npm install`, `npm run dev -- --host 127.0.0.1 --port 5183 --strictPort`, and `npm run build` passed.
- Public Pages workflow succeeded after enabling GitHub Pages for the new repo.
- Public React routes verified: Home, Flashcards, Practice, and Study Guide.
- Static assets verified with HTTP 200 responses: study guide PDF, official packet PDF, HTML study guide, favicon, and manifest.
- Counts verified: 105 flashcards, 190 practice questions, 4 guide sections.
- Official packet comparison verified task names and assessment type options; task 14 title/description was updated to reflect the packet's three behavior-reduction options.
- Deployment workflow shows GitHub Actions Node runtime deprecation warnings, but the build and deploy jobs pass.

## Official Packet Audit: Tasks 1-5

Status: completed review, pending user approval to move to tasks 6-11.

- Official PDF source checked: tasks 1-5 and assessment types match the app.
- Source limitation: `RBT_Comp_Study_Guide.docx` and its PDF copy appear image-based with no extractable text in local parsers; this audit used the official packet text plus the current learner guide content already built from the study-guide concepts.
- Required changes: none found for tasks 1-5.
- Optional polish only: add a small note that permanent product is a supplemental measurement concept in this app, while official task 3 specifically says data entry and graph updates; add one more hands-on graph/date/unit data-entry prompt if we want extra Task 3 practice later.

## Notes

- Current priority: official packet audit in batches. Start with tasks 1-5, report findings, and wait for approval before implementing content changes.
- Current active audit batch: tasks 1-5 only. Do not implement audit findings until the user approves the proposed changes.

## Current UI Progress Request

Status: completed locally; ready for final QA/deploy.

- [x] Add persistent known/needs-review visual color and short text animation for flashcard marking.
- [x] Add manual way to remove/clear a flashcard mark.
- [x] Show consistent question states while task-filtered: Correct, Review, Incorrect, Not attempted.
- [x] Make task completion obvious when all questions in a filtered task are finished.
- [x] Automatically mark task practice ready when all questions for that task are correct, no questions are marked review, and all flashcards for that task are known.
- [x] Add Competency Map practice-depth counts: question passes, flashcard known passes, practice days, section guide opens, and links to section guide.
- [x] Show the ideal target of 3 passes over 5 days without blocking the simpler automatic ready rule.

## Current UI Progress Results

- Flashcards: Known and Needs Review now animate briefly and keep a persistent color state until changed or cleared.
- Flashcards: Added Clear Mark and verified keyboard shortcuts: Space flips, arrow keys move, 1 marks review, 2 marks known.
- Practice: Single-answer questions now require selecting an answer and pressing Check Answer; answers are no longer submitted by default on click.
- Practice: Task-filtered view shows Correct, Review, Incorrect, and Not attempted state buttons, plus a completion message for the filtered task.
- Sidebar: task question counts now use the same four-state language and icons.
- Competency Map: manual task status dropdown was replaced by automatic practice-readiness evidence and section study-guide links.
- Study Guide: `/guide?section=...` opens the correct section modal and increments section guide-open tracking.
- Browser QA: Chrome/Playwright verified flashcard state colors, practice selection/check flow, review state, automatic Task 1 readiness after saved progress reload, guide done after three opens, mobile practice/map overflow, and keyboard shortcuts.

## Current Final QA Refresh

- `npm install` passed with 0 vulnerabilities.
- `npm run build` passed.
- `npm run dev -- --host 127.0.0.1 --port 5184 --strictPort` started successfully and returned HTTP 200 for the app shell.
- Local asset checks returned HTTP 200 for the study guide PDF, favicon, and manifest.
- Count check passed: 105 flashcards, 190 questions, 19 competency tasks.
- Branding/disclaimer scan found only permitted disclaimer/documentation references and no unauthorized branding.

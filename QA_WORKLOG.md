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

- [ ] `npm install` works.
- [ ] `npm run dev` works.
- [ ] `npm run build` works.
- [ ] GitHub Pages deployment works as a public site and URL is provided.
- [ ] All routes work after refresh.
- [ ] Sidebar works on desktop/mobile/tablet.
- [ ] Progress drawer works on mobile/tablet.
- [ ] Flashcard count makes sense.
- [ ] Question count is >= 190.
- [ ] Study guide opens correctly and is complete.
- [ ] No BACB logo is used.
- [ ] No Quizlet branding or copied Quizlet content appears.
- [ ] Disclaimer appears in footer and About page.
- [ ] Task names and assessment types match the BACB competency PDF.
- [ ] Client-demonstration reminder appears in the right places.
- [x] Question/flashcard correct and incorrect attempt history tracks count and Date/Time.
- [x] Guide opens and reviewed state track count and Date/Time.
- [ ] README updated.

## Notes

- Current priority: final QA pass and README update. Do not start the official task audit until final QA/README work is done.

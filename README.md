# RBT Practice Hub

RBT Practice Hub is a clean static study app for practicing RBT Initial Competency Assessment skills. It is built with React, Vite, TypeScript, and localStorage. It does not require a backend.

Live site: https://fatgezimb.github.io/rbt-practice-hub/

Repository: https://github.com/Fatgezimb/rbt-practice-hub

## Disclaimer

This is an independent learning resource, not an official BACB product. It does not replace the official assessment packet, assessor judgment, employer policy, supervision requirements, or BACB requirements. The app does not use BACB logos, Quizlet branding, copied Quizlet content, or copied third-party flashcard wording.

## Source Files Used

- `2026-RBT_Initial_Competency_Assessment-251106-a.pdf`: official task map, assessment type options, and competency packet requirements.
- `RBT_Comp_Study_Guide.docx`: learner-friendly concept source.
- `RBT_Comp_Study_Guide.pdf`: downloadable study guide source asset.
- Visual scaffold screenshots supplied during development were used as design direction only, not copied as branded content.

## Current App Features

- GitHub Pages-safe routing with `HashRouter`.
- Header, footer, desktop task sidebar, collapsible sidebar, and mobile/tablet progress drawer.
- Routes for dashboard, competency map, BCBA assessment form, flashcards, practice questions, study guide, progress review, and about/disclaimer.
- 19 typed competency tasks aligned to the 2026 assessment packet.
- 105 original flashcards.
- 190 original practice questions.
- HTML study guide with section modals and original visual memory aids.
- Local progress storage for automatic task readiness, flashcards, question attempts, guide activity, and client-demonstration tracking.
- Practice-readiness language only. The app does not claim official competence.
- Favicon, manifest, meta description, and `.nojekyll` for static hosting.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Production Build

```bash
npm run build
npm run preview
```

The production site is emitted to `dist/`.

## GitHub Pages Deployment

This repo includes `.github/workflows/deploy.yml`, which builds and publishes `dist/` with GitHub Actions.

1. Push the repository to GitHub on the `main` branch.
2. In GitHub repository settings, use GitHub Pages with GitHub Actions as the source if prompted.
3. Run the `Deploy to GitHub Pages` workflow or push to `main`.
4. The workflow installs dependencies with `npm ci`, runs `npm run build`, uploads `dist`, and deploys the Pages site.

The app uses `base: "./"` in `vite.config.ts` and `HashRouter`, so route refreshes work from GitHub Pages project paths.

## How To Add Or Edit Flashcards

Flashcards live in `src/data/flashcards.ts` and use the `Flashcard` type from `src/types.ts`.

Each card should include:

- `id`
- `taskNumber`
- `section`
- `front`
- `back`
- `cardType`
- `assessmentTypes`
- `explanation`
- `memoryAid`
- `tags`
- `difficulty`

Keep wording original. Do not copy Quizlet, BACB text beyond short task labels, or third-party study-set wording.

## How To Add Or Edit Questions

Practice questions live in `src/data/practiceQuestions.ts` and use the `PracticeQuestion` type from `src/types.ts`.

Each question should include:

- `id`
- `taskNumber`
- `section`
- `questionType`
- `prompt`
- `choices`
- `correctAnswer`
- `explanation`
- `distractorExplanations`
- `scenario`
- `assessmentTypes`
- `difficulty`
- `tags`

For each multiple-choice distractor, include both why the answer is not correct in this question and when it would be correct in another scenario.

## Study Guide HTML And PDF

The app opens the custom HTML study guide from `public/docs/rbt-study-guide.html`. Edit that file for the colorful static guide page.

The downloadable PDF currently lives at `public/docs/RBT_Comp_Study_Guide.pdf`. To regenerate it from the HTML guide, open `public/docs/rbt-study-guide.html` in a browser and print/save to PDF, then replace `public/docs/RBT_Comp_Study_Guide.pdf`.

## Progress Storage

Learner progress is stored in browser localStorage under:

```text
rbt-practice-hub:v2:learner-progress
```

It tracks task status, client demonstrations, flashcard known/needs-review marks with timestamps, question correct/incorrect attempts with timestamps, marked-for-review questions, and guide open/review timestamps.

Task practice readiness is calculated automatically from learner activity. A task becomes practice ready when all questions for that task are currently correct, no questions for that task are marked for review, and all flashcards for that task are marked known. The Competency Map also shows a longer practice-depth target of 3 question passes, 3 flashcard passes, 5 practice days, and 3 study-guide opens.

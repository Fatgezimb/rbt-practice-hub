import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AboutPage } from "./pages/AboutPage";
import { AssessmentFormPage } from "./pages/AssessmentFormPage";
import { CompetencyMapPage } from "./pages/CompetencyMapPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { HomePage } from "./pages/HomePage";
import { PracticeQuestionsPage } from "./pages/PracticeQuestionsPage";
import { ProgressReviewPage } from "./pages/ProgressReviewPage";
import { StudyGuidePage } from "./pages/StudyGuidePage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<CompetencyMapPage />} />
        <Route path="assessment" element={<AssessmentFormPage />} />
        <Route path="flashcards" element={<FlashcardsPage />} />
        <Route path="practice" element={<PracticeQuestionsPage />} />
        <Route path="guide" element={<StudyGuidePage />} />
        <Route path="progress" element={<ProgressReviewPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

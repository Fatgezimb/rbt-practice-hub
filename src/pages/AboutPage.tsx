import { studyAssets } from "../data/studyAssets";
import { PageHeader } from "../components/ui/PageHeader";

export function AboutPage() {
  return (
    <section className="page">
      <PageHeader title="About / Disclaimer">Scope and source notes for this learning app.</PageHeader>
      <div className="about-copy">
        <p>
          RBT Practice Hub is an independent learning resource for organizing practice around the Initial Competency
          Assessment. It is not an official BACB product and does not replace the official assessment packet,
          supervision requirements, or assessor judgment.
        </p>
        <p>
          The task map follows the structure of the official 2026 RBT Initial Competency Assessment packet. Learner
          explanations and future study materials should use original wording.
        </p>
        <p>
          The app intentionally avoids BACB logos, Quizlet branding, copied Quizlet content, and copied third-party
          flashcard wording.
        </p>
        <div className="source-links">
          <a href={studyAssets.officialPacketPdf} target="_blank" rel="noopener noreferrer">
            Open official assessment packet
          </a>
          <a href={studyAssets.studyGuideHtml} target="_blank" rel="noopener noreferrer">
            Open HTML study guide
          </a>
        </div>
      </div>
    </section>
  );
}

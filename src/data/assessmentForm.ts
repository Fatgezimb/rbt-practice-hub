import { competencyTasks } from "./competencyTasks";
import type { AssessmentType } from "../types";

export type CertificationType = "" | "BCaBA" | "BCBA" | "BCBA-D" | "FL-CBA";

export interface AssessmentTaskEntry {
  initials: string;
  assessmentType: AssessmentType | "";
  behaviorReductionOption?: "Antecedent Interventions" | "Differential Reinforcement" | "Extinction" | "";
  notes: string;
}

export interface AssessmentFormState {
  applicantName: string;
  applicantBacbId: string;
  applicantEmployer: string;
  fortyHourTrainingCompletedDate: string;
  assessmentStartDate: string;
  assessmentCompletionDate: string;
  clientServicesOrganization: string;
  assessorOrganization: string;
  assistantAssessorNames: string;
  assistantAssessorCertificationNumbers: string;
  responsibleAssessorChecklist: Record<string, boolean>;
  assistantAssessorChecklist: Record<string, boolean>;
  taskEntries: Record<number, AssessmentTaskEntry>;
  allTasksDemonstrated: boolean;
  relationshipAttestation: boolean;
  certificationType: CertificationType;
  responsibleAssessorCertificationNumber: string;
  responsibleAssessorPrintedName: string;
  responsibleAssessorSignature: string;
  responsibleAssessorSignatureDate: string;
  assessorNotes: string;
}

export const assessmentFormStorageKey = "rbt-practice-hub:v1:assessment-form";

export const responsibleAssessorChecklistItems = [
  { id: "active-cert", label: "Active BCaBA, BCBA, BCBA-D, or FL-CBA credential verified." },
  { id: "relationship", label: "Assessor, applicant, and involved client services relationship reviewed." },
  { id: "not-related-subordinate", label: "Assessor is not related to, subordinate to, or employed by the applicant." },
  { id: "supervision-training", label: "8-hour supervision training completed." },
  { id: "requirements-read", label: "Current packet requirements reviewed before assessment." },
  { id: "suitable-clients", label: "Suitable clients identified for required with-client demonstrations." },
  { id: "training-complete", label: "Applicant 40-hour training completion checked before assessment begins." },
  { id: "records-plan", label: "Record-retention process in place for completed assessments and assessor details." },
];

export const assistantAssessorChecklistItems = [
  { id: "readiness-criteria", label: "Assistant assessor readiness criteria and skill checks are documented." },
  { id: "materials", label: "Assistant assessors have instructions, scenarios, and scoring materials." },
  { id: "quality-checks", label: "Procedural integrity and agreement checks are planned when assistants are used." },
  { id: "relationship-check", label: "Assistant assessor relationship restrictions have been checked." },
  { id: "assistant-cert", label: "Assistant assessor certification level has been confirmed." },
];

export function createInitialAssessmentFormState(): AssessmentFormState {
  return {
    applicantName: "",
    applicantBacbId: "",
    applicantEmployer: "",
    fortyHourTrainingCompletedDate: "",
    assessmentStartDate: "",
    assessmentCompletionDate: "",
    clientServicesOrganization: "",
    assessorOrganization: "",
    assistantAssessorNames: "",
    assistantAssessorCertificationNumbers: "",
    responsibleAssessorChecklist: Object.fromEntries(responsibleAssessorChecklistItems.map((item) => [item.id, false])),
    assistantAssessorChecklist: Object.fromEntries(assistantAssessorChecklistItems.map((item) => [item.id, false])),
    taskEntries: Object.fromEntries(
      competencyTasks.map((task) => [
        task.taskNumber,
        {
          initials: "",
          assessmentType: "",
          behaviorReductionOption: task.taskNumber === 14 ? "" : undefined,
          notes: "",
        },
      ]),
    ),
    allTasksDemonstrated: false,
    relationshipAttestation: false,
    certificationType: "",
    responsibleAssessorCertificationNumber: "",
    responsibleAssessorPrintedName: "",
    responsibleAssessorSignature: "",
    responsibleAssessorSignatureDate: "",
    assessorNotes: "",
  };
}

export function normalizeAssessmentFormState(raw: unknown): AssessmentFormState {
  const initial = createInitialAssessmentFormState();

  if (!raw || typeof raw !== "object") {
    return initial;
  }

  const value = raw as Partial<AssessmentFormState>;

  return {
    ...initial,
    ...value,
    responsibleAssessorChecklist: {
      ...initial.responsibleAssessorChecklist,
      ...(value.responsibleAssessorChecklist ?? {}),
    },
    assistantAssessorChecklist: {
      ...initial.assistantAssessorChecklist,
      ...(value.assistantAssessorChecklist ?? {}),
    },
    taskEntries: {
      ...initial.taskEntries,
      ...(value.taskEntries ?? {}),
    },
  };
}

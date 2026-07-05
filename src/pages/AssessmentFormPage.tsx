import { ClipboardCheck, ExternalLink, Printer, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  assessmentFormStorageKey,
  assistantAssessorChecklistItems,
  createInitialAssessmentFormState,
  normalizeAssessmentFormState,
  responsibleAssessorChecklistItems,
  type AssessmentFormState,
  type AssessmentTaskEntry,
  type CertificationType,
} from "../data/assessmentForm";
import { clientDemonstrationRule, competencyTasks, sectionOrder, sectionRanges } from "../data/competencyTasks";
import { studyAssets } from "../data/studyAssets";
import { PageHeader } from "../components/ui/PageHeader";
import type { AssessmentType, CompetencyTask } from "../types";
import { getTasksBySection } from "../utils/dataSelectors";

const certificationTypes: CertificationType[] = ["BCaBA", "BCBA", "BCBA-D", "FL-CBA"];

function loadAssessmentFormState() {
  if (typeof window === "undefined") {
    return createInitialAssessmentFormState();
  }

  try {
    return normalizeAssessmentFormState(JSON.parse(window.localStorage.getItem(assessmentFormStorageKey) ?? "null"));
  } catch {
    return createInitialAssessmentFormState();
  }
}

function taskIsComplete(task: CompetencyTask, entry: AssessmentTaskEntry) {
  return Boolean(entry.initials.trim() && entry.assessmentType && (task.taskNumber !== 14 || entry.behaviorReductionOption));
}

export function AssessmentFormPage() {
  const [form, setForm] = useState<AssessmentFormState>(() => loadAssessmentFormState());

  useEffect(() => {
    window.localStorage.setItem(assessmentFormStorageKey, JSON.stringify(form));
  }, [form]);

  const summary = useMemo(() => {
    const completedTasks = competencyTasks.filter((task) => taskIsComplete(task, form.taskEntries[task.taskNumber])).length;
    const withClientSkillTasks = competencyTasks.filter(
      (task) =>
        task.requiresClientTracking &&
        form.taskEntries[task.taskNumber]?.assessmentType === "With Client" &&
        taskIsComplete(task, form.taskEntries[task.taskNumber]),
    ).length;
    const responsibleChecklistComplete = responsibleAssessorChecklistItems.filter(
      (item) => form.responsibleAssessorChecklist[item.id],
    ).length;
    const assistantChecklistComplete = assistantAssessorChecklistItems.filter(
      (item) => form.assistantAssessorChecklist[item.id],
    ).length;

    return {
      completedTasks,
      withClientSkillTasks,
      responsibleChecklistComplete,
      assistantChecklistComplete,
    };
  }, [form]);

  function updateFormField(field: keyof AssessmentFormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateTaskEntry(taskNumber: number, patch: Partial<AssessmentTaskEntry>) {
    setForm((current) => ({
      ...current,
      taskEntries: {
        ...current.taskEntries,
        [taskNumber]: {
          ...current.taskEntries[taskNumber],
          ...patch,
        },
      },
    }));
  }

  function updateChecklist(group: "responsibleAssessorChecklist" | "assistantAssessorChecklist", id: string, checked: boolean) {
    setForm((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [id]: checked,
      },
    }));
  }

  function resetForm() {
    const confirmed = window.confirm("Clear the saved BCBA assessment form workspace?");
    if (!confirmed) {
      return;
    }

    setForm(createInitialAssessmentFormState());
  }

  return (
    <section className="page assessment-form-page">
      <PageHeader title="BCBA Assessment Form">
        A local workspace for documenting Initial Competency Assessment task completion, assessor initials, assessment
        types, relationship details, and final attestation items.
      </PageHeader>

      <div className="assessment-form-notice">
        <ClipboardCheck size={24} aria-hidden="true" />
        <p>
          Use this workspace for preparation and internal tracking. Final submission requirements should be checked
          against the official packet.
        </p>
        <a href={studyAssets.officialPacketPdf} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={17} aria-hidden="true" />
          Open official packet
        </a>
      </div>

      <div className="assessment-form-summary" aria-label="Assessment form completion summary">
        <div>
          <span>Task rows complete</span>
          <strong>{summary.completedTasks} / 19</strong>
        </div>
        <div>
          <span>With-client tasks 6-14</span>
          <strong className={summary.withClientSkillTasks >= 3 ? "is-good" : "is-warning"}>
            {summary.withClientSkillTasks} / 3
          </strong>
        </div>
        <div>
          <span>Responsible checklist</span>
          <strong>
            {summary.responsibleChecklistComplete} / {responsibleAssessorChecklistItems.length}
          </strong>
        </div>
        <div>
          <span>Assistant checklist</span>
          <strong>
            {summary.assistantChecklistComplete} / {assistantAssessorChecklistItems.length}
          </strong>
        </div>
      </div>

      <div className="assessment-form-actions">
        <button type="button" onClick={() => window.print()}>
          <Printer size={18} aria-hidden="true" />
          Print
        </button>
        <button type="button" onClick={resetForm}>
          <RotateCcw size={18} aria-hidden="true" />
          Clear saved form
        </button>
      </div>

      <section className="assessment-form-panel">
        <h2>Applicant and Assessment Details</h2>
        <div className="assessment-field-grid">
          <label>
            <span>Applicant name</span>
            <input value={form.applicantName} onChange={(event) => updateFormField("applicantName", event.target.value)} />
          </label>
          <label>
            <span>Applicant BACB ID</span>
            <input value={form.applicantBacbId} onChange={(event) => updateFormField("applicantBacbId", event.target.value)} />
          </label>
          <label className="wide-field">
            <span>Organization where applicant is employed</span>
            <input value={form.applicantEmployer} onChange={(event) => updateFormField("applicantEmployer", event.target.value)} />
          </label>
          <label>
            <span>40-hour training completed</span>
            <input
              type="date"
              value={form.fortyHourTrainingCompletedDate}
              onChange={(event) => updateFormField("fortyHourTrainingCompletedDate", event.target.value)}
            />
          </label>
          <label>
            <span>Assessment start date</span>
            <input
              type="date"
              value={form.assessmentStartDate}
              onChange={(event) => updateFormField("assessmentStartDate", event.target.value)}
            />
          </label>
          <label>
            <span>Assessment completion date</span>
            <input
              type="date"
              value={form.assessmentCompletionDate}
              onChange={(event) => updateFormField("assessmentCompletionDate", event.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="assessment-form-panel">
        <h2>Responsible Assessor Checklist</h2>
        <div className="checklist-grid">
          {responsibleAssessorChecklistItems.map((item) => (
            <label className="assessment-check" key={item.id}>
              <input
                type="checkbox"
                checked={form.responsibleAssessorChecklist[item.id] ?? false}
                onChange={(event) => updateChecklist("responsibleAssessorChecklist", item.id, event.target.checked)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="assessment-form-panel">
        <h2>Task Assessment Record</h2>
        <p className="assessment-panel-note">{clientDemonstrationRule}</p>
        <div className="assessment-task-sections">
          {sectionOrder.map((section) => (
            <div className="assessment-task-section" key={section}>
              <div className="assessment-task-section-header">
                <h3>{section}</h3>
                <span>Tasks {sectionRanges[section]}</span>
              </div>
              <div className="assessment-task-table">
                {getTasksBySection(section).map((task) => {
                  const entry = form.taskEntries[task.taskNumber];
                  return (
                    <article className="assessment-task-row" key={task.id}>
                      <div className="assessment-task-main">
                        <span className="assessment-task-number">{task.taskNumber}</span>
                        <div>
                          <h4>{task.title}</h4>
                          <p>{task.officialDescription}</p>
                          {task.options ? (
                            <label className="assessment-inline-field">
                              <span>Task 14 option demonstrated</span>
                              <select
                                value={entry.behaviorReductionOption ?? ""}
                                onChange={(event) =>
                                  updateTaskEntry(task.taskNumber, {
                                    behaviorReductionOption: event.target.value as AssessmentTaskEntry["behaviorReductionOption"],
                                  })
                                }
                              >
                                <option value="">Select option</option>
                                {task.options.map((option) => (
                                  <option value={option} key={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </label>
                          ) : null}
                        </div>
                      </div>
                      <label>
                        <span>Initials</span>
                        <input
                          value={entry.initials}
                          onChange={(event) => updateTaskEntry(task.taskNumber, { initials: event.target.value })}
                          maxLength={8}
                        />
                      </label>
                      <label>
                        <span>Assessment type</span>
                        <select
                          value={entry.assessmentType}
                          onChange={(event) =>
                            updateTaskEntry(task.taskNumber, { assessmentType: event.target.value as AssessmentType | "" })
                          }
                        >
                          <option value="">Select type</option>
                          {task.assessmentTypes.map((type) => (
                            <option value={type} key={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Notes</span>
                        <input
                          value={entry.notes}
                          onChange={(event) => updateTaskEntry(task.taskNumber, { notes: event.target.value })}
                          placeholder="Optional internal note"
                        />
                      </label>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="assessment-form-panel">
        <h2>Assistant Assessors and Organizations</h2>
        <div className="assessment-field-grid">
          <label className="wide-field">
            <span>Organization where involved client(s) received services</span>
            <input
              value={form.clientServicesOrganization}
              onChange={(event) => updateFormField("clientServicesOrganization", event.target.value)}
            />
          </label>
          <label className="wide-field">
            <span>Organization where assessor(s) are employed or contracted</span>
            <input value={form.assessorOrganization} onChange={(event) => updateFormField("assessorOrganization", event.target.value)} />
          </label>
          <label className="wide-field">
            <span>Assistant assessor names</span>
            <textarea
              value={form.assistantAssessorNames}
              onChange={(event) => updateFormField("assistantAssessorNames", event.target.value)}
              rows={3}
            />
          </label>
          <label className="wide-field">
            <span>Assistant assessor certification numbers</span>
            <textarea
              value={form.assistantAssessorCertificationNumbers}
              onChange={(event) => updateFormField("assistantAssessorCertificationNumbers", event.target.value)}
              rows={3}
            />
          </label>
        </div>

        <h3>Assistant Assessor Oversight</h3>
        <div className="checklist-grid">
          {assistantAssessorChecklistItems.map((item) => (
            <label className="assessment-check" key={item.id}>
              <input
                type="checkbox"
                checked={form.assistantAssessorChecklist[item.id] ?? false}
                onChange={(event) => updateChecklist("assistantAssessorChecklist", item.id, event.target.checked)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="assessment-form-panel">
        <h2>Final Attestation and Signature Details</h2>
        <div className="checklist-grid">
          <label className="assessment-check">
            <input
              type="checkbox"
              checked={form.allTasksDemonstrated}
              onChange={(event) => updateFormField("allTasksDemonstrated", event.target.checked)}
            />
            <span>Applicant has competently demonstrated task items 1-19.</span>
          </label>
          <label className="assessment-check">
            <input
              type="checkbox"
              checked={form.relationshipAttestation}
              onChange={(event) => updateFormField("relationshipAttestation", event.target.checked)}
            />
            <span>Assessment relationship and client-service organization requirements have been reviewed.</span>
          </label>
        </div>

        <div className="assessment-field-grid">
          <label>
            <span>Certification type</span>
            <select
              value={form.certificationType}
              onChange={(event) => updateFormField("certificationType", event.target.value as CertificationType)}
            >
              <option value="">Select certification</option>
              {certificationTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Responsible assessor certification #</span>
            <input
              value={form.responsibleAssessorCertificationNumber}
              onChange={(event) => updateFormField("responsibleAssessorCertificationNumber", event.target.value)}
            />
          </label>
          <label>
            <span>Responsible assessor printed name</span>
            <input
              value={form.responsibleAssessorPrintedName}
              onChange={(event) => updateFormField("responsibleAssessorPrintedName", event.target.value)}
            />
          </label>
          <label>
            <span>Responsible assessor signature entry</span>
            <input
              value={form.responsibleAssessorSignature}
              onChange={(event) => updateFormField("responsibleAssessorSignature", event.target.value)}
            />
          </label>
          <label>
            <span>Signature date</span>
            <input
              type="date"
              value={form.responsibleAssessorSignatureDate}
              onChange={(event) => updateFormField("responsibleAssessorSignatureDate", event.target.value)}
            />
          </label>
          <label className="wide-field">
            <span>Internal assessor notes</span>
            <textarea value={form.assessorNotes} onChange={(event) => updateFormField("assessorNotes", event.target.value)} rows={4} />
          </label>
        </div>
      </section>
    </section>
  );
}

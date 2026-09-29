"use client";

import { useMemo, useState } from "react";
import { getJob } from "@/data/jobs";
import { getQuestionnaireForm } from "@/data/questionnaireForms";
import { getLabTestsForJob } from "@/data/labPanels";
import {
  createEmptyAssessmentDraft,
  protocolFromEmploymentStatus,
  EMPTY_LAB_ROW,
  type AssessmentDraft,
  type LabResultRow,
} from "@/data/assessment";
import { RegistrationStep } from "./steps/RegistrationStep";
import { VitalsStep } from "./steps/VitalsStep";
import { QuestionnaireStep } from "./steps/QuestionnaireStep";
import { ClinicalExamStep } from "./steps/ClinicalExamStep";
import { LabTestsStep } from "./steps/LabTestsStep";
import { FinalDecisionStep } from "./steps/FinalDecisionStep";
import { WizardStepper, WIZARD_STEPS } from "./WizardStepper";
import {
  adminDialogCancelButtonClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminSecondaryTextClass,
  adminSectionTitleClass,
  riskBadgeClass,
} from "@/styles/admin-ui";

const RISK_LABEL: Record<string, string> = {
  basic: "Basic",
  advanced: "Advanced",
  special: "Special",
};

const DECISION_LABEL: Record<string, string> = {
  fit: "Fit",
  fit_considerations: "Fit with considerations",
  fit_restrictions: "Fit with restrictions",
  unfit: "Unfit",
};

function BeneficiaryBar({ draft }: { draft: AssessmentDraft }) {
  const job = getJob(draft.registration.jobCode);
  if (!draft.registration.fullName && !job) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-4">
      <div>
        <p className={adminSecondaryTextClass}>Beneficiary</p>
        <p className="text-sm font-semibold text-[color:var(--color-text)]">
          {draft.registration.fullName || "—"}
        </p>
      </div>
      {job ? (
        <>
          <div>
            <p className={adminSecondaryTextClass}>Occupation</p>
            <p className="text-sm font-semibold text-[color:var(--color-text)]">{job.nameEn}</p>
          </div>
          <div>
            <p className={adminSecondaryTextClass}>Risk class</p>
            <span className={riskBadgeClass[job.riskClass]}>{RISK_LABEL[job.riskClass]}</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function BeneficiaryWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AssessmentDraft>(() => createEmptyAssessmentDraft());
  const [submitted, setSubmitted] = useState(false);

  const job = getJob(draft.registration.jobCode);
  const protocol = protocolFromEmploymentStatus(draft.registration.employmentStatus);

  const formKey = useMemo(() => {
    if (!job || !protocol) return "general";
    return protocol === "pre_placement" ? job.prePlacementForm : job.periodicForm;
  }, [job, protocol]);

  const questionnaireForm = useMemo(() => getQuestionnaireForm(formKey), [formKey]);

  const labTests = useMemo(() => {
    if (!draft.registration.jobCode || !protocol) return [];
    return getLabTestsForJob(draft.registration.jobCode, protocol);
  }, [draft.registration.jobCode, protocol]);

  const canGoNext = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(
          draft.registration.fullName.trim() && draft.registration.jobCode && draft.registration.employmentStatus,
        );
      case 5:
        return Boolean(draft.finalDecision.decision);
      default:
        return true;
    }
  }, [step, draft.registration, draft.finalDecision.decision]);

  function goNext() {
    if (!canGoNext) return;
    if (step === WIZARD_STEPS.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function startNew() {
    setDraft(createEmptyAssessmentDraft());
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    const decision = draft.finalDecision.decision;
    return (
      <div className="space-y-5">
        <BeneficiaryBar draft={draft} />
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-6 text-center">
          <p className={adminSectionTitleClass}>Assessment submitted</p>
          <p className={`${adminSecondaryTextClass} mt-2`}>
            Final decision:{" "}
            <span className="font-semibold text-[color:var(--color-text)]">
              {decision ? DECISION_LABEL[decision] : "—"}
            </span>
          </p>
          {decision === "fit_restrictions" && draft.finalDecision.restrictionsDescription ? (
            <p className={`${adminSecondaryTextClass} mt-1`}>{draft.finalDecision.restrictionsDescription}</p>
          ) : null}
        </div>
        <div className="flex justify-center">
          <button type="button" className={adminPrimaryButtonClass} onClick={startNew}>
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WizardStepper current={step} onNext={goNext} nextEnabled={canGoNext} nextLabel={step === 5 ? "Submit" : "Next Step"} />

      {step > 0 ? <BeneficiaryBar draft={draft} /> : null}

      <div className="rounded-xl border border-[color:var(--color-border)] p-5">
        {step === 0 ? (
          <RegistrationStep
            value={draft.registration}
            onChange={(registration) => setDraft((d) => ({ ...d, registration }))}
          />
        ) : null}

        {step === 1 ? (
          <VitalsStep value={draft.vitals} onChange={(vitals) => setDraft((d) => ({ ...d, vitals }))} />
        ) : null}

        {step === 2 ? (
          <>
            {job?.externalAuthorityNote ? (
              <p className="mb-4 rounded-lg border border-[color:var(--color-orange)]/30 bg-[color:var(--color-orange-soft)] p-3 text-sm text-[color:var(--color-text)]">
                {job.externalAuthorityNote}
              </p>
            ) : null}
            <QuestionnaireStep
              form={questionnaireForm}
              value={draft.questionnaire}
              onChange={(questionnaire) => setDraft((d) => ({ ...d, questionnaire }))}
            />
          </>
        ) : null}

        {step === 3 ? (
          <ClinicalExamStep
            form={questionnaireForm}
            value={draft.clinicalExam}
            onChange={(clinicalExam) => setDraft((d) => ({ ...d, clinicalExam }))}
          />
        ) : null}

        {step === 4 ? (
          <LabTestsStep
            tests={labTests}
            results={draft.labResults}
            onChange={(index, patch) =>
              setDraft((d) => ({
                ...d,
                labResults: {
                  ...d.labResults,
                  [index]: { ...(d.labResults[index] ?? EMPTY_LAB_ROW), ...patch } satisfies LabResultRow,
                },
              }))
            }
          />
        ) : null}

        {step === 5 ? (
          <FinalDecisionStep
            value={draft.finalDecision}
            onChange={(finalDecision) => setDraft((d) => ({ ...d, finalDecision }))}
          />
        ) : null}
      </div>

      <div className="flex justify-between border-t border-[color:var(--color-border)] pt-4">
        <button
          type="button"
          className={adminDialogCancelButtonClass}
          onClick={goBack}
          disabled={step === 0}
        >
          Back
        </button>
        <div className="flex gap-2">
          <button type="button" className={adminSecondaryButtonClass}>
            Save Draft
          </button>
          <button type="button" className={adminPrimaryButtonClass} disabled={!canGoNext} onClick={goNext}>
            {step === WIZARD_STEPS.length - 1 ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

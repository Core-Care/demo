"use client";

import { useMemo, useState } from "react";
import { getJob } from "@/data/jobs";
import { getQuestionnaireForm } from "@/data/questionnaireForms";
import { getLabTestsForJob } from "@/data/labPanels";
import type { ExamProtocol } from "@/data/types";
import { type BeneficiaryDraft, CreateBeneficiaryForm } from "./CreateBeneficiaryForm";
import { QuestionnaireFormView } from "./QuestionnaireFormView";
import { LabTestsPanel } from "./LabTestsPanel";
import { Stepper } from "./Stepper";
import {
  adminDialogCancelButtonClass,
  adminPrimaryButtonClass,
  adminSecondaryTextClass,
  adminSectionTitleClass,
  adminSubsectionTitleClass,
  riskBadgeClass,
} from "@/styles/admin-ui";

type Step = 0 | 1 | 2;

const RISK_LABEL: Record<string, string> = {
  basic: "Basic",
  advanced: "Advanced",
  special: "Special",
};

const PROTOCOL_LABEL: Record<ExamProtocol, string> = {
  pre_placement: "Pre-Employment",
  periodic: "Periodic",
};

function BeneficiarySummary({ beneficiary }: { beneficiary: BeneficiaryDraft }) {
  const job = getJob(beneficiary.jobCode);
  if (!job) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-4">
      <div>
        <p className={adminSecondaryTextClass}>Beneficiary</p>
        <p className="text-sm font-semibold text-[color:var(--color-text)]">{beneficiary.fullName}</p>
      </div>
      <div>
        <p className={adminSecondaryTextClass}>Occupation</p>
        <p className="text-sm font-semibold text-[color:var(--color-text)]">{job.nameEn}</p>
      </div>
      <div>
        <p className={adminSecondaryTextClass}>Risk class</p>
        <span className={riskBadgeClass[job.riskClass]}>{RISK_LABEL[job.riskClass]}</span>
      </div>
      <div>
        <p className={adminSecondaryTextClass}>Exam protocol</p>
        <p className="text-sm font-semibold text-[color:var(--color-text)]">
          {beneficiary.examProtocol ? PROTOCOL_LABEL[beneficiary.examProtocol] : "—"}
        </p>
      </div>
    </div>
  );
}

export function BeneficiaryWizard() {
  const [step, setStep] = useState<Step>(0);
  const [beneficiary, setBeneficiary] = useState<BeneficiaryDraft | null>(null);

  const job = beneficiary ? getJob(beneficiary.jobCode) : undefined;
  const protocol = beneficiary?.examProtocol || undefined;

  const formKey = useMemo(() => {
    if (!job || !protocol) return "general";
    return protocol === "pre_placement" ? job.prePlacementForm : job.periodicForm;
  }, [job, protocol]);

  const questionnaireForm = useMemo(() => getQuestionnaireForm(formKey), [formKey]);

  const labTests = useMemo(() => {
    if (!beneficiary || !protocol) return [];
    return getLabTestsForJob(beneficiary.jobCode, protocol);
  }, [beneficiary, protocol]);

  return (
    <div className="space-y-6">
      <Stepper current={step} />

      {step === 0 ? (
        <CreateBeneficiaryForm
          onCreate={(draft) => {
            setBeneficiary(draft);
            setStep(1);
          }}
        />
      ) : null}

      {step === 1 && beneficiary && job ? (
        <div className="space-y-5">
          <BeneficiarySummary beneficiary={beneficiary} />

          <div>
            <h2 className={adminSectionTitleClass}>Form to fill</h2>
            <p className={`${adminSecondaryTextClass} mt-1`}>
              {formKey === "general"
                ? "This occupation uses the General Medical Assessment (covers every job unless a dedicated form is required)."
                : `This occupation requires the dedicated ${questionnaireForm.title}.`}{" "}
              <span className="text-[color:var(--color-muted)]">({questionnaireForm.sourceLabel})</span>
            </p>
            {job.externalAuthorityNote ? (
              <p className="mt-2 rounded-lg border border-[color:var(--color-orange)]/30 bg-[color:var(--color-orange-soft)] p-3 text-sm text-[color:var(--color-text)]">
                {job.externalAuthorityNote}
              </p>
            ) : null}
          </div>

          <div className="rounded-xl border border-[color:var(--color-border)] p-4">
            <p className={`${adminSubsectionTitleClass} mb-3`}>{questionnaireForm.title}</p>
            <QuestionnaireFormView form={questionnaireForm} />
          </div>

          <div className="flex justify-between border-t border-[color:var(--color-border)] pt-4">
            <button type="button" className={adminDialogCancelButtonClass} onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className={adminPrimaryButtonClass} onClick={() => setStep(2)}>
              Continue to Lab Tests
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 && beneficiary && job ? (
        <div className="space-y-5">
          <BeneficiarySummary beneficiary={beneficiary} />

          <div>
            <h2 className={adminSectionTitleClass}>Mandatory lab tests</h2>
            <p className={`${adminSecondaryTextClass} mt-1`}>
              {labTests.length} test{labTests.length === 1 ? "" : "s"} required for{" "}
              <span className="font-medium text-[color:var(--color-text)]">{job.nameEn}</span> —{" "}
              {protocol ? PROTOCOL_LABEL[protocol] : ""} exam.
            </p>
          </div>

          <LabTestsPanel tests={labTests} />

          <div className="flex justify-between border-t border-[color:var(--color-border)] pt-4">
            <button type="button" className={adminDialogCancelButtonClass} onClick={() => setStep(1)}>
              Back
            </button>
            <button
              type="button"
              className={adminPrimaryButtonClass}
              onClick={() => {
                setBeneficiary(null);
                setStep(0);
              }}
            >
              Finish & Create Another
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

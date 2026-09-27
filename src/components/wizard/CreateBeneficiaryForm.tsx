"use client";

import { useState } from "react";
import { JOBS } from "@/data/jobs";
import type { ExamProtocol, RiskClass } from "@/data/types";
import {
  adminCaptionTextClass,
  adminDialogCancelButtonClass,
  adminFieldLabelClass,
  adminPrimaryButtonClass,
  adminSectionTitleClass,
  adminTextInputClass,
  riskBadgeClass,
} from "@/styles/admin-ui";

export interface BeneficiaryDraft {
  fullName: string;
  gender: "male" | "female" | "";
  jobCode: string;
  examProtocol: ExamProtocol | "";
  employmentStatus: "new_hire" | "rehire";
  email: string;
  mobile: string;
  dob: string;
  nationality: string;
  notes: string;
}

const EMPTY_DRAFT: BeneficiaryDraft = {
  fullName: "",
  gender: "",
  jobCode: "",
  examProtocol: "",
  employmentStatus: "new_hire",
  email: "",
  mobile: "",
  dob: "",
  nationality: "",
  notes: "",
};

const RISK_LABEL: Record<RiskClass, string> = {
  basic: "Basic",
  advanced: "Advanced",
  special: "Special",
};

export function CreateBeneficiaryForm({
  onCreate,
}: {
  onCreate: (draft: BeneficiaryDraft) => void;
}) {
  const [draft, setDraft] = useState<BeneficiaryDraft>(EMPTY_DRAFT);
  const selectedJob = JOBS.find((j) => j.code === draft.jobCode);
  const canSubmit = draft.fullName.trim() && draft.jobCode && draft.examProtocol;

  function set<K extends keyof BeneficiaryDraft>(key: K, value: BeneficiaryDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onCreate(draft);
      }}
    >
      <h2 className={adminSectionTitleClass}>Create Beneficiary</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={adminFieldLabelClass}>
            Company <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <input
            type="text"
            placeholder="Search companies..."
            className={`${adminTextInputClass} mt-1`}
            disabled
          />
          <p className={`${adminCaptionTextClass} mt-1`}>Not required for this demo.</p>
        </div>

        <div>
          <label className={adminFieldLabelClass}>
            Occupation <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <select
            value={draft.jobCode}
            onChange={(e) => set("jobCode", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
            required
          >
            <option value="">Select occupation</option>
            {JOBS.map((job) => (
              <option key={job.code} value={job.code}>
                {job.nameEn}
              </option>
            ))}
          </select>
          {selectedJob ? (
            <span className={`${riskBadgeClass[selectedJob.riskClass]} mt-2`}>
              {RISK_LABEL[selectedJob.riskClass]} risk
            </span>
          ) : null}
        </div>

        <div>
          <label className={adminFieldLabelClass}>
            Exam protocol <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <select
            value={draft.examProtocol}
            onChange={(e) => set("examProtocol", e.target.value as ExamProtocol)}
            className={`${adminTextInputClass} mt-1`}
            required
          >
            <option value="">Select protocol timing</option>
            <option value="pre_placement">Pre-Employment (pre-placement)</option>
            <option value="periodic">Periodic</option>
          </select>
          {selectedJob && draft.examProtocol === "periodic" ? (
            <p className={`${adminCaptionTextClass} mt-1`}>Frequency: {selectedJob.periodicFrequency}</p>
          ) : null}
        </div>

        <div>
          <label className={adminFieldLabelClass}>Employee External ID</label>
          <input type="text" className={`${adminTextInputClass} mt-1`} />
        </div>

        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>
            Full Name <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <input
            type="text"
            value={draft.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
            required
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Gender</label>
          <select
            value={draft.gender}
            onChange={(e) => set("gender", e.target.value as BeneficiaryDraft["gender"])}
            className={`${adminTextInputClass} mt-1`}
          >
            <option value="">— None —</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className={adminFieldLabelClass}>Employment Status</label>
          <select
            value={draft.employmentStatus}
            onChange={(e) => set("employmentStatus", e.target.value as BeneficiaryDraft["employmentStatus"])}
            className={`${adminTextInputClass} mt-1`}
          >
            <option value="new_hire">New Employee</option>
            <option value="rehire">Rehire</option>
          </select>
        </div>

        <div>
          <label className={adminFieldLabelClass}>Email</label>
          <input
            type="email"
            value={draft.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Mobile</label>
          <input
            type="tel"
            value={draft.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Date of Birth</label>
          <input
            type="date"
            value={draft.dob}
            onChange={(e) => set("dob", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Nationality</label>
          <input
            type="text"
            value={draft.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>Notes</label>
          <textarea
            rows={2}
            value={draft.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-[color:var(--color-border)] pt-4">
        <button type="button" className={adminDialogCancelButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={!canSubmit} className={adminPrimaryButtonClass}>
          Create
        </button>
      </div>
    </form>
  );
}

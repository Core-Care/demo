"use client";

import { JOBS } from "@/data/jobs";
import type { RiskClass } from "@/data/types";
import { protocolFromEmploymentStatus, type BeneficiaryDraft } from "@/data/assessment";
import {
  adminCaptionTextClass,
  adminFieldLabelClass,
  adminSectionTitleClass,
  adminTextInputClass,
  riskBadgeClass,
} from "@/styles/admin-ui";

const RISK_LABEL: Record<RiskClass, string> = {
  basic: "Basic",
  advanced: "Advanced",
  special: "Special",
};

export function RegistrationStep({
  value,
  onChange,
}: {
  value: BeneficiaryDraft;
  onChange: (next: BeneficiaryDraft) => void;
}) {
  const selectedJob = JOBS.find((j) => j.code === value.jobCode);
  const protocol = protocolFromEmploymentStatus(value.employmentStatus);

  function set<K extends keyof BeneficiaryDraft>(key: K, val: BeneficiaryDraft[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-6">
      <h2 className={adminSectionTitleClass}>Registration</h2>

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
            value={value.jobCode}
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

        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>
            Full Name <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <input
            type="text"
            value={value.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
            required
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Gender</label>
          <select
            value={value.gender}
            onChange={(e) => set("gender", e.target.value as BeneficiaryDraft["gender"])}
            className={`${adminTextInputClass} mt-1`}
          >
            <option value="">— None —</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className={adminFieldLabelClass}>
            Employment Status <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <select
            value={value.employmentStatus}
            onChange={(e) => set("employmentStatus", e.target.value as BeneficiaryDraft["employmentStatus"])}
            className={`${adminTextInputClass} mt-1`}
            required
          >
            <option value="">Select status</option>
            <option value="new_employee">New Employee</option>
            <option value="employee">Employee</option>
          </select>
          {protocol && selectedJob ? (
            <p className={`${adminCaptionTextClass} mt-1`}>
              {protocol === "pre_placement" ? "Pre-Employment exam" : "Periodic exam"}
              {protocol === "periodic" ? ` — ${selectedJob.periodicFrequency}` : ""}
            </p>
          ) : null}
        </div>

        <div>
          <label className={adminFieldLabelClass}>Email</label>
          <input
            type="email"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Mobile</label>
          <input
            type="tel"
            value={value.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Date of Birth</label>
          <input
            type="date"
            value={value.dob}
            onChange={(e) => set("dob", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div>
          <label className={adminFieldLabelClass}>Nationality</label>
          <input
            type="text"
            value={value.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>Notes</label>
          <textarea
            rows={2}
            value={value.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>
      </div>
    </div>
  );
}

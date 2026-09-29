"use client";

import type { DetailFields } from "@/data/assessment";
import { adminFieldLabelClass, adminSecondaryTextClass, adminTextInputClass } from "@/styles/admin-ui";

export function FollowUpPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 mb-1 rounded-md border border-[color:var(--color-mint)] bg-[color:var(--color-header-surface)] p-3">
      {children}
    </div>
  );
}

export function DetailField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className={adminFieldLabelClass}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${adminTextInputClass} mt-1`}
      />
    </div>
  );
}

export function OccupationalExposureFollowUp({
  detail,
  onChange,
}: {
  detail: DetailFields;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <FollowUpPanel>
      <p className={`${adminSecondaryTextClass} mb-2`}>
        Exposure details — refer to the Occupational Exposure Questionnaire for the full record.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <DetailField label="Industry" value={detail.industry ?? ""} onChange={(v) => onChange("industry", v)} />
        <DetailField label="Job title" value={detail.jobTitle ?? ""} onChange={(v) => onChange("jobTitle", v)} />
        <div className="sm:col-span-2">
          <DetailField
            label="Employer address"
            value={detail.employerAddress ?? ""}
            onChange={(v) => onChange("employerAddress", v)}
          />
        </div>
        <DetailField
          label="Employment dates — from"
          type="date"
          value={detail.dateFrom ?? ""}
          onChange={(v) => onChange("dateFrom", v)}
        />
        <DetailField
          label="Employment dates — to"
          type="date"
          value={detail.dateTo ?? ""}
          onChange={(v) => onChange("dateTo", v)}
        />
        <DetailField
          label="Type of exposure"
          value={detail.typeOfExposure ?? ""}
          onChange={(v) => onChange("typeOfExposure", v)}
        />
        <DetailField
          label="Duration of exposure"
          value={detail.durationOfExposure ?? ""}
          onChange={(v) => onChange("durationOfExposure", v)}
        />
      </div>
    </FollowUpPanel>
  );
}

export function RestrictedDutyFollowUp({
  detail,
  onChange,
}: {
  detail: DetailFields;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <FollowUpPanel>
      <DetailField
        label="List type and duration"
        value={detail.typeAndDuration ?? ""}
        onChange={(v) => onChange("typeAndDuration", v)}
      />
    </FollowUpPanel>
  );
}

export function RecentExamFollowUp({
  detail,
  onChange,
}: {
  detail: DetailFields;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <FollowUpPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <DetailField
          label="Type of assessment"
          value={detail.typeOfAssessment ?? ""}
          onChange={(v) => onChange("typeOfAssessment", v)}
        />
        <DetailField label="Purpose" value={detail.purpose ?? ""} onChange={(v) => onChange("purpose", v)} />
        <DetailField
          label="Medical facility"
          value={detail.medicalFacility ?? ""}
          onChange={(v) => onChange("medicalFacility", v)}
        />
        <DetailField
          label="Date of examination"
          type="date"
          value={detail.dateOfExamination ?? ""}
          onChange={(v) => onChange("dateOfExamination", v)}
        />
      </div>
      <div className="mt-3">
        <label className={adminFieldLabelClass}>Attach results (if applicable)</label>
        <label className="mt-1 flex h-[42px] cursor-pointer items-center justify-center rounded-md border border-dashed border-[color:var(--color-border)] px-3 text-sm text-[color:var(--color-muted)] hover:border-[color:var(--color-primary)]">
          {detail.fileName || "Choose file"}
          <input
            type="file"
            className="hidden"
            onChange={(e) => onChange("fileName", e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>
    </FollowUpPanel>
  );
}

export function SubstanceUseFollowUp({
  detail,
  onChange,
}: {
  detail: DetailFields;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <FollowUpPanel>
      <p className={`${adminFieldLabelClass} mb-2`}>Current or previous use?</p>
      <div className="flex items-center gap-4 text-sm">
        {(["current", "previous"] as const).map((opt) => (
          <label key={opt} className="flex items-center gap-1.5 capitalize">
            <input
              type="radio"
              name="substance-use-recency"
              checked={detail.recency === opt}
              onChange={() => onChange("recency", opt)}
              className="h-4 w-4 accent-[color:var(--color-primary)]"
            />
            {opt} use
          </label>
        ))}
      </div>
      <div className="mt-3">
        <DetailField label="Give details" value={detail.notes ?? ""} onChange={(v) => onChange("notes", v)} />
      </div>
    </FollowUpPanel>
  );
}

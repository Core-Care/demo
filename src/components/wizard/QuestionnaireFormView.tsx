"use client";

import { useMemo, useState } from "react";
import type { QuestionnaireForm, QuestionnaireItem } from "@/data/types";
import {
  adminFieldLabelClass,
  adminSubsectionTitleClass,
  adminSecondaryTextClass,
  adminTextInputClass,
} from "@/styles/admin-ui";

type YesNo = "yes" | "no" | null;
type NormalAbnormal = "normal" | "abnormal" | null;
type Decision = "fit" | "fit_considerations" | "fit_restrictions" | "unfit";

const DECISION_OPTIONS: { value: Decision; label: string }[] = [
  { value: "fit", label: "Fit" },
  { value: "fit_considerations", label: "Fit with considerations" },
  { value: "fit_restrictions", label: "Fit with restrictions" },
  { value: "unfit", label: "Unfit" },
];

/** Shared free-text bag for a follow-up sub-form, keyed by field name. */
type DetailFields = Record<string, string>;

function FollowUpPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 mb-1 rounded-md border border-[color:var(--color-mint)] bg-[color:var(--color-header-surface)] p-3">
      {children}
    </div>
  );
}

function DetailField({
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

function OccupationalExposureFollowUp({
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

function RestrictedDutyFollowUp({
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

function RecentExamFollowUp({
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

function SubstanceUseFollowUp({
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

function YesNoRow({
  item,
  value,
  onChange,
  detail,
  onDetailChange,
}: {
  item: QuestionnaireItem;
  value: YesNo;
  onChange: (v: YesNo) => void;
  detail: DetailFields;
  onDetailChange: (field: string, v: string) => void;
}) {
  const showFollowUp = value === "yes" && item.followUp && item.followUp !== "substance_use";

  return (
    <div className="border-b border-[color:var(--color-border)] py-2.5 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <p className={`${adminFieldLabelClass} flex-1`}>{item.label}</p>
        <div className="flex shrink-0 items-center gap-3 text-sm">
          {(["yes", "no"] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-1.5 capitalize">
              <input
                type="radio"
                name={item.id}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="h-4 w-4 accent-[color:var(--color-primary)]"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      {showFollowUp && item.followUp === "occupational_exposure" ? (
        <OccupationalExposureFollowUp detail={detail} onChange={onDetailChange} />
      ) : null}
      {showFollowUp && item.followUp === "restricted_duty" ? (
        <RestrictedDutyFollowUp detail={detail} onChange={onDetailChange} />
      ) : null}
      {showFollowUp && item.followUp === "recent_exam" ? (
        <RecentExamFollowUp detail={detail} onChange={onDetailChange} />
      ) : null}
    </div>
  );
}

function NormalAbnormalRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: NormalAbnormal;
  onChange: (v: NormalAbnormal) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] py-2.5 last:border-b-0">
      <p className={`${adminFieldLabelClass} flex-1`}>{label}</p>
      <div className="flex shrink-0 items-center gap-3 text-sm">
        {(["normal", "abnormal"] as const).map((opt) => (
          <label key={opt} className="flex items-center gap-1.5 capitalize">
            <input
              type="radio"
              name={label}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="h-4 w-4 accent-[color:var(--color-primary)]"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-[color:var(--color-border)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg bg-[color:var(--color-header-surface)] px-4 py-3 text-left"
      >
        <span className={adminSubsectionTitleClass}>{title}</span>
        <span className="text-[color:var(--color-muted)]">{open ? "−" : "+"}</span>
      </button>
      {open ? <div className="px-4 py-2">{children}</div> : null}
    </div>
  );
}

export function QuestionnaireFormView({ form }: { form: QuestionnaireForm }) {
  const [hx, setHx] = useState<Record<string, YesNo>>({});
  const [occ, setOcc] = useState<Record<string, YesNo>>({});
  const [life, setLife] = useState<Record<string, YesNo>>({});
  const [pe, setPe] = useState<Record<string, NormalAbnormal>>({});
  const [decision, setDecision] = useState<Decision | null>(null);
  const [details, setDetails] = useState<Record<string, DetailFields>>({});
  const [substanceDetail, setSubstanceDetail] = useState<DetailFields>({});

  function setDetailField(itemId: string, field: string, value: string) {
    setDetails((s) => ({ ...s, [itemId]: { ...(s[itemId] ?? {}), [field]: value } }));
  }

  const totalFields =
    form.healthHistory.length + form.occupationalHistory.length + form.lifestyle.length + form.physicalExam.length;
  const answered = useMemo(
    () =>
      Object.values(hx).filter(Boolean).length +
      Object.values(occ).filter(Boolean).length +
      Object.values(life).filter(Boolean).length +
      Object.values(pe).filter(Boolean).length,
    [hx, occ, life, pe],
  );

  const anyHealthHistoryYes = form.healthHistory.some((q) => hx[q.id] === "yes");
  const anyGeneralOccupationalYes = form.occupationalHistory.some(
    (q) => !q.followUp && occ[q.id] === "yes",
  );
  const substanceItems = form.lifestyle.filter((q) => q.followUp === "substance_use");
  const anySubstanceYes = substanceItems.some((q) => life[q.id] === "yes");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={adminSecondaryTextClass}>
          {answered} / {totalFields} fields completed
        </p>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-[color:var(--color-canvas)]">
          <div
            className="h-full rounded-full bg-[color:var(--color-primary)] transition-all"
            style={{ width: `${totalFields ? (answered / totalFields) * 100 : 0}%` }}
          />
        </div>
      </div>

      <Section title="Health questionnaire" defaultOpen>
        {form.healthHistory.map((q) => (
          <YesNoRow
            key={q.id}
            item={q}
            value={hx[q.id] ?? null}
            onChange={(v) => setHx((s) => ({ ...s, [q.id]: v }))}
            detail={details[q.id] ?? {}}
            onDetailChange={(field, v) => setDetailField(q.id, field, v)}
          />
        ))}
        {anyHealthHistoryYes ? (
          <FollowUpPanel>
            <p className={`${adminSecondaryTextClass} mb-2`}>
              For every item answered &quot;Yes&quot;, reference the item number and provide diagnosis/treatment
              details (including dates).
            </p>
            <textarea
              rows={2}
              className={adminTextInputClass}
              placeholder="e.g. Item 9 — Type 2 diabetes, diagnosed 2019, on metformin"
            />
          </FollowUpPanel>
        ) : null}
      </Section>

      <Section title="Occupational history">
        {form.occupationalHistory.map((q) => (
          <YesNoRow
            key={q.id}
            item={q}
            value={occ[q.id] ?? null}
            onChange={(v) => setOcc((s) => ({ ...s, [q.id]: v }))}
            detail={details[q.id] ?? {}}
            onDetailChange={(field, v) => setDetailField(q.id, field, v)}
          />
        ))}
        {anyGeneralOccupationalYes ? (
          <FollowUpPanel>
            <p className={`${adminSecondaryTextClass} mb-2`}>
              For every item answered &quot;Yes&quot;, reference the item number and give details.
            </p>
            <textarea rows={2} className={adminTextInputClass} />
          </FollowUpPanel>
        ) : null}
      </Section>

      <Section title="Lifestyle & vaccination">
        {form.lifestyle.map((q) => (
          <YesNoRow
            key={q.id}
            item={q}
            value={life[q.id] ?? null}
            onChange={(v) => setLife((s) => ({ ...s, [q.id]: v }))}
            detail={details[q.id] ?? {}}
            onDetailChange={(field, v) => setDetailField(q.id, field, v)}
          />
        ))}
        {anySubstanceYes ? (
          <SubstanceUseFollowUp
            detail={substanceDetail}
            onChange={(field, v) => setSubstanceDetail((s) => ({ ...s, [field]: v }))}
          />
        ) : null}
      </Section>

      <Section title="Physical examination (Normal / Abnormal)">
        {form.physicalExam.map((q) => (
          <NormalAbnormalRow
            key={q.id}
            label={q.label}
            value={pe[q.id] ?? null}
            onChange={(v) => setPe((s) => ({ ...s, [q.id]: v }))}
          />
        ))}
        <div className="pt-3">
          <label className={adminFieldLabelClass}>Details of abnormality</label>
          <textarea rows={2} className={`${adminTextInputClass} mt-1`} placeholder="Reference item number and describe findings" />
        </div>
      </Section>

      <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-4">
        <p className={`${adminSubsectionTitleClass} mb-2`}>Final decision (occupational medicine specialist)</p>
        <div className="flex flex-wrap gap-2">
          {DECISION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDecision(opt.value)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                decision === opt.value
                  ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] text-white"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] hover:bg-[color:var(--color-canvas)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

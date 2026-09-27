"use client";

import { useMemo, useState } from "react";
import type { QuestionnaireForm } from "@/data/types";
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

function YesNoRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] py-2.5 last:border-b-0">
      <p className={`${adminFieldLabelClass} flex-1`}>{label}</p>
      <div className="flex shrink-0 items-center gap-3 text-sm">
        {(["yes", "no"] as const).map((opt) => (
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
            label={q.label}
            value={hx[q.id] ?? null}
            onChange={(v) => setHx((s) => ({ ...s, [q.id]: v }))}
          />
        ))}
      </Section>

      <Section title="Occupational history">
        {form.occupationalHistory.map((q) => (
          <YesNoRow
            key={q.id}
            label={q.label}
            value={occ[q.id] ?? null}
            onChange={(v) => setOcc((s) => ({ ...s, [q.id]: v }))}
          />
        ))}
      </Section>

      <Section title="Lifestyle & vaccination">
        {form.lifestyle.map((q) => (
          <YesNoRow
            key={q.id}
            label={q.label}
            value={life[q.id] ?? null}
            onChange={(v) => setLife((s) => ({ ...s, [q.id]: v }))}
          />
        ))}
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

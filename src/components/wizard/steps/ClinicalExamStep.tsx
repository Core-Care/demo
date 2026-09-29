"use client";

import { useMemo } from "react";
import type { QuestionnaireForm } from "@/data/types";
import type { ClinicalExamAnswers, NormalAbnormal } from "@/data/assessment";
import {
  adminFieldLabelClass,
  adminSecondaryTextClass,
  adminSectionTitleClass,
  adminTextInputClass,
} from "@/styles/admin-ui";

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

export function ClinicalExamStep({
  form,
  value,
  onChange,
}: {
  form: QuestionnaireForm;
  value: ClinicalExamAnswers;
  onChange: (next: ClinicalExamAnswers) => void;
}) {
  const answered = useMemo(() => Object.values(value.pe).filter(Boolean).length, [value.pe]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className={adminSectionTitleClass}>Clinical Exam</h2>
        <p className={`${adminSecondaryTextClass} mt-1`}>{form.title} — Physical examination (Normal / Abnormal)</p>
      </div>

      <div className="flex items-center justify-between">
        <p className={adminSecondaryTextClass}>
          {answered} / {form.physicalExam.length} fields completed
        </p>
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-[color:var(--color-canvas)]">
          <div
            className="h-full rounded-full bg-[color:var(--color-primary)] transition-all"
            style={{ width: `${form.physicalExam.length ? (answered / form.physicalExam.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="rounded-lg border border-[color:var(--color-border)] px-4 py-2">
        {form.physicalExam.map((q) => (
          <NormalAbnormalRow
            key={q.id}
            label={q.label}
            value={value.pe[q.id] ?? null}
            onChange={(v) => onChange({ ...value, pe: { ...value.pe, [q.id]: v } })}
          />
        ))}
        <div className="py-3">
          <label className={adminFieldLabelClass}>Details of abnormality</label>
          <textarea
            rows={2}
            value={value.abnormalityNotes}
            onChange={(e) => onChange({ ...value, abnormalityNotes: e.target.value })}
            className={`${adminTextInputClass} mt-1`}
            placeholder="Reference item number and describe findings"
          />
        </div>
      </div>
    </div>
  );
}

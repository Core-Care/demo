"use client";

import { useMemo, useState } from "react";
import type { QuestionnaireForm, QuestionnaireItem } from "@/data/types";
import type { QuestionnaireAnswers, YesNo } from "@/data/assessment";
import {
  FollowUpPanel,
  OccupationalExposureFollowUp,
  RestrictedDutyFollowUp,
  RecentExamFollowUp,
  SubstanceUseFollowUp,
} from "../FollowUpFields";
import {
  adminFieldLabelClass,
  adminSecondaryTextClass,
  adminSectionTitleClass,
  adminSubsectionTitleClass,
  adminTextInputClass,
} from "@/styles/admin-ui";

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
  detail: Record<string, string>;
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

export function QuestionnaireStep({
  form,
  value,
  onChange,
}: {
  form: QuestionnaireForm;
  value: QuestionnaireAnswers;
  onChange: (next: QuestionnaireAnswers) => void;
}) {
  function setHx(id: string, v: YesNo) {
    onChange({ ...value, hx: { ...value.hx, [id]: v } });
  }
  function setOcc(id: string, v: YesNo) {
    onChange({ ...value, occ: { ...value.occ, [id]: v } });
  }
  function setLife(id: string, v: YesNo) {
    onChange({ ...value, life: { ...value.life, [id]: v } });
  }
  function setDetailField(itemId: string, field: string, v: string) {
    onChange({
      ...value,
      details: { ...value.details, [itemId]: { ...(value.details[itemId] ?? {}), [field]: v } },
    });
  }
  function setSubstanceField(field: string, v: string) {
    onChange({ ...value, substanceDetail: { ...value.substanceDetail, [field]: v } });
  }

  const totalFields = form.healthHistory.length + form.occupationalHistory.length + form.lifestyle.length;
  const answered = useMemo(
    () =>
      Object.values(value.hx).filter(Boolean).length +
      Object.values(value.occ).filter(Boolean).length +
      Object.values(value.life).filter(Boolean).length,
    [value.hx, value.occ, value.life],
  );

  const anyHealthHistoryYes = form.healthHistory.some((q) => value.hx[q.id] === "yes");
  const anyGeneralOccupationalYes = form.occupationalHistory.some((q) => !q.followUp && value.occ[q.id] === "yes");
  const substanceItems = form.lifestyle.filter((q) => q.followUp === "substance_use");
  const anySubstanceYes = substanceItems.some((q) => value.life[q.id] === "yes");

  return (
    <div className="space-y-4">
      <div>
        <h2 className={adminSectionTitleClass}>Questionnaire</h2>
        <p className={`${adminSecondaryTextClass} mt-1`}>{form.title}</p>
      </div>

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
            value={value.hx[q.id] ?? null}
            onChange={(v) => setHx(q.id, v)}
            detail={value.details[q.id] ?? {}}
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
              value={value.hxNotes}
              onChange={(e) => onChange({ ...value, hxNotes: e.target.value })}
            />
          </FollowUpPanel>
        ) : null}
      </Section>

      <Section title="Occupational history">
        {form.occupationalHistory.map((q) => (
          <YesNoRow
            key={q.id}
            item={q}
            value={value.occ[q.id] ?? null}
            onChange={(v) => setOcc(q.id, v)}
            detail={value.details[q.id] ?? {}}
            onDetailChange={(field, v) => setDetailField(q.id, field, v)}
          />
        ))}
        {anyGeneralOccupationalYes ? (
          <FollowUpPanel>
            <p className={`${adminSecondaryTextClass} mb-2`}>
              For every item answered &quot;Yes&quot;, reference the item number and give details.
            </p>
            <textarea
              rows={2}
              className={adminTextInputClass}
              value={value.occNotes}
              onChange={(e) => onChange({ ...value, occNotes: e.target.value })}
            />
          </FollowUpPanel>
        ) : null}
      </Section>

      <Section title="Lifestyle & vaccination">
        {form.lifestyle.map((q) => (
          <YesNoRow
            key={q.id}
            item={q}
            value={value.life[q.id] ?? null}
            onChange={(v) => setLife(q.id, v)}
            detail={value.details[q.id] ?? {}}
            onDetailChange={(field, v) => setDetailField(q.id, field, v)}
          />
        ))}
        {anySubstanceYes ? (
          <SubstanceUseFollowUp detail={value.substanceDetail} onChange={setSubstanceField} />
        ) : null}
      </Section>
    </div>
  );
}

"use client";

import type { Decision, FinalDecisionData } from "@/data/assessment";
import { adminFieldLabelClass, adminSectionTitleClass, adminTextInputClass } from "@/styles/admin-ui";

const DECISION_OPTIONS: { value: Decision; label: string }[] = [
  { value: "fit", label: "Fit" },
  { value: "fit_considerations", label: "Fit with considerations" },
  { value: "fit_restrictions", label: "Fit with restrictions" },
  { value: "unfit", label: "Unfit" },
];

export function FinalDecisionStep({
  value,
  onChange,
}: {
  value: FinalDecisionData;
  onChange: (next: FinalDecisionData) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className={adminSectionTitleClass}>Final Decision</h2>

      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-5">
        <div>
          <label className={adminFieldLabelClass}>
            Final fitness decision <span className="text-[color:var(--color-orange)]">*</span>
          </label>
          <select
            value={value.decision ?? ""}
            onChange={(e) => onChange({ ...value, decision: (e.target.value || null) as Decision | null })}
            className={`${adminTextInputClass} mt-1`}
            required
          >
            <option value="">Select decision</option>
            {DECISION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {value.decision === "fit_restrictions" ? (
          <div className="mt-4">
            <label className={adminFieldLabelClass}>Describe the work restrictions</label>
            <textarea
              rows={3}
              value={value.restrictionsDescription}
              onChange={(e) => onChange({ ...value, restrictionsDescription: e.target.value })}
              className={`${adminTextInputClass} mt-1`}
            />
          </div>
        ) : null}

        <div className="mt-4">
          <label className={adminFieldLabelClass}>Additional clinical notes</label>
          <textarea
            rows={3}
            value={value.notes}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>
      </div>
    </div>
  );
}

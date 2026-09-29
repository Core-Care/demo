import {
  adminCaptionTextClass,
  adminPrimaryButtonClass,
  adminStepBadgeActiveClass,
  adminStepBadgeDoneClass,
  adminStepBadgeIdleClass,
} from "@/styles/admin-ui";

export const WIZARD_STEPS = [
  "Registration",
  "Vitals",
  "Questionnaire",
  "Clinical Exam",
  "Laboratory",
  "Final Decision",
] as const;

export function WizardStepper({
  current,
  onNext,
  nextEnabled,
  nextLabel = "Next Step",
}: {
  current: number;
  onNext: () => void;
  nextEnabled: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 shadow-sm">
      <ol className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {WIZARD_STEPS.map((label, i) => {
          const state = i < current ? "done" : i === current ? "active" : "idle";
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={
                  state === "done"
                    ? adminStepBadgeDoneClass
                    : state === "active"
                      ? adminStepBadgeActiveClass
                      : adminStepBadgeIdleClass
                }
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <div className="leading-tight">
                <p
                  className={
                    state === "idle"
                      ? adminCaptionTextClass
                      : "text-sm font-medium text-[color:var(--color-text)]"
                  }
                >
                  {i + 1}. {label}
                </p>
                <p className={adminCaptionTextClass}>
                  {state === "done" ? "Completed" : state === "active" ? "In progress" : "Pending"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <button type="button" onClick={onNext} disabled={!nextEnabled} className={adminPrimaryButtonClass}>
        {nextLabel} ›
      </button>
    </div>
  );
}

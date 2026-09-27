import {
  adminCaptionTextClass,
  adminStepBadgeActiveClass,
  adminStepBadgeDoneClass,
  adminStepBadgeIdleClass,
} from "@/styles/admin-ui";

const STEPS = ["Create Beneficiary", "Required Forms", "Lab Tests"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-3">
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "idle";
        return (
          <li key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
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
              <span
                className={
                  state === "idle"
                    ? adminCaptionTextClass
                    : "text-sm font-medium text-[color:var(--color-text)]"
                }
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <span className="h-px w-8 bg-[color:var(--color-border)]" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Shared dashboard UI typography and form control classes.
 */

export const adminPageTitleClass = "text-xl font-semibold text-[color:var(--color-text)]";

export const adminPageDescriptionClass = "mt-1 text-sm text-[color:var(--color-muted)]";

export const adminSectionTitleClass = "text-lg font-semibold text-[color:var(--color-text)]";

export const adminSubsectionTitleClass = "text-sm font-semibold text-[color:var(--color-text)]";

export const adminBodyTextClass = "text-sm text-[color:var(--color-text)]";

export const adminSecondaryTextClass = "text-sm text-[color:var(--color-muted)]";

export const adminCaptionTextClass = "text-xs text-[color:var(--color-muted)]";

export const adminFieldLabelClass = "text-sm text-[color:var(--color-text)]";

export const adminFieldValueClass = "text-sm text-[color:var(--color-text)]";

export const adminTableHeaderClass = "font-semibold text-[color:var(--color-text)]";

export const adminTableCellClass = "text-[color:var(--color-text)]";

export const adminCompactActionButtonClass =
  "rounded border border-[color:var(--color-border)] px-2 py-1 text-xs font-medium text-[color:var(--color-text)] hover:bg-[color:var(--color-canvas)]";

export const adminDialogCancelButtonClass =
  "rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-medium text-[color:var(--color-text)] disabled:opacity-50";

export const adminPrimaryButtonClass =
  "rounded-lg bg-[color:var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[color:var(--color-primary-hover)] disabled:opacity-50";

export const adminSearchInputClass =
  "rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mint)]";

export const adminSearchInputBlockClass = `w-full ${adminSearchInputClass}`;

export const adminSearchInputBlockWideClass = `${adminSearchInputBlockClass} md:max-w-md`;

export const adminTextInputClass = `w-full ${adminSearchInputClass} shadow-sm`;

export const adminTextLinkClass =
  "inline-block text-sm font-medium text-[color:var(--color-primary)] underline underline-offset-4 hover:text-[color:var(--color-primary-hover)]";

export const adminSelectInputClass = `w-full ${adminSearchInputClass} shadow-sm`;

export const adminSecondaryButtonClass =
  "rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-medium text-[color:var(--color-text)] hover:bg-[color:var(--color-canvas)] disabled:opacity-50";

export const adminCardClass =
  "rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm";

/** Risk-class badge tones keyed by risk level. */
export const riskBadgeClass: Record<"basic" | "advanced" | "special", string> = {
  basic:
    "inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-muted)]",
  advanced:
    "inline-flex items-center rounded-full border border-[color:var(--color-blue)]/30 bg-[color:var(--color-blue-soft)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-blue)]",
  special:
    "inline-flex items-center rounded-full border border-[color:var(--color-orange)]/30 bg-[color:var(--color-orange-soft)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-orange)]",
};

export const adminStepBadgeActiveClass =
  "flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-sm font-semibold text-white";

export const adminStepBadgeDoneClass =
  "flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-mint)] text-sm font-semibold text-[color:var(--color-sidebar)]";

export const adminStepBadgeIdleClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-border)] text-sm font-semibold text-[color:var(--color-muted)]";

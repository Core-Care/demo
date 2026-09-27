import type { ReactNode } from "react";
import {
  adminPageDescriptionClass,
  adminPageTitleClass,
} from "@/styles/admin-ui";

type PageContainerProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
};

/** Page header + content surface used across dashboards. */
export function PageContainer({
  title,
  description,
  children,
  actions,
}: PageContainerProps) {
  return (
    <section className="space-y-5">
      <header className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-header-surface)] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className={adminPageTitleClass}>{title}</h1>
            {description ? (
              <p className={adminPageDescriptionClass}>{description}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </header>
      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 shadow-sm">
        {children}
      </div>
    </section>
  );
}

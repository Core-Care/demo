"use client";

import { useState } from "react";
import type { LabTest } from "@/data/types";
import {
  adminFieldLabelClass,
  adminSecondaryTextClass,
  adminSubsectionTitleClass,
  adminTextInputClass,
} from "@/styles/admin-ui";

type SampleCollected = "yes" | "no" | null;
type ResultStatus = "normal" | "abnormal" | "pending";

interface RowState {
  sampleCollected: SampleCollected;
  resultStatus: ResultStatus;
  notes: string;
  fileName: string | null;
}

function LabTestRow({ test, index }: { test: LabTest; index: number }) {
  const [row, setRow] = useState<RowState>({
    sampleCollected: null,
    resultStatus: "pending",
    notes: "",
    fileName: null,
  });

  return (
    <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className={adminSubsectionTitleClass}>
            Entry {index + 1} — {test.name}
          </p>
          {test.note ? <p className={adminSecondaryTextClass}>{test.note}</p> : null}
        </div>
        <span className="shrink-0 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-canvas)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--color-muted)]">
          Required
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={adminFieldLabelClass}>Laboratory exam</label>
          <input
            type="text"
            readOnly
            value={test.name}
            className={`${adminTextInputClass} mt-1 cursor-not-allowed bg-[color:var(--color-canvas)]`}
          />
        </div>

        <div>
          <p className={adminFieldLabelClass}>Sample collected</p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            {(["yes", "no"] as const).map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 capitalize">
                <input
                  type="radio"
                  name={`sample-${index}`}
                  checked={row.sampleCollected === opt}
                  onChange={() => setRow((s) => ({ ...s, sampleCollected: opt }))}
                  className="h-4 w-4 accent-[color:var(--color-primary)]"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={adminFieldLabelClass}>Result status</label>
          <select
            value={row.resultStatus}
            onChange={(e) => setRow((s) => ({ ...s, resultStatus: e.target.value as ResultStatus }))}
            className={`${adminTextInputClass} mt-1`}
          >
            <option value="pending">Pending</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
          </select>
        </div>

        <div>
          <label className={adminFieldLabelClass}>Upload laboratory report</label>
          <label className="mt-1 flex h-[42px] cursor-pointer items-center justify-center rounded-md border border-dashed border-[color:var(--color-border)] px-3 text-sm text-[color:var(--color-muted)] hover:border-[color:var(--color-primary)]">
            {row.fileName ?? "Choose file (PDF, JPG, or PNG up to 10 MB)"}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setRow((s) => ({ ...s, fileName: e.target.files?.[0]?.name ?? null }))}
            />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>Result value / notes</label>
          <textarea
            rows={2}
            value={row.notes}
            onChange={(e) => setRow((s) => ({ ...s, notes: e.target.value }))}
            className={`${adminTextInputClass} mt-1`}
            placeholder="Enter value, units, or clinical notes"
          />
        </div>
      </div>
    </div>
  );
}

export function LabTestsPanel({ tests }: { tests: LabTest[] }) {
  if (tests.length === 0) {
    return <p className={adminSecondaryTextClass}>No mandatory lab tests apply to this job/protocol.</p>;
  }

  return (
    <div className="space-y-3">
      {tests.map((test, i) => (
        <LabTestRow key={`${test.name}-${i}`} test={test} index={i} />
      ))}
    </div>
  );
}

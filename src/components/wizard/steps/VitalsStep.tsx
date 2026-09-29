"use client";

import { computeBmi, type VitalsData } from "@/data/assessment";
import { adminFieldLabelClass, adminSectionTitleClass, adminTextInputClass } from "@/styles/admin-ui";

function Field({
  label,
  value,
  onChange,
  unit,
  type = "number",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={adminFieldLabelClass}>
        {label} {unit ? <span className="text-[color:var(--color-muted)]">({unit})</span> : null}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${adminTextInputClass} mt-1`}
      />
    </div>
  );
}

export function VitalsStep({
  value,
  onChange,
}: {
  value: VitalsData;
  onChange: (next: VitalsData) => void;
}) {
  function set<K extends keyof VitalsData>(key: K, val: VitalsData[K]) {
    onChange({ ...value, [key]: val });
  }

  const bmi = computeBmi(value.height, value.weight);

  return (
    <div className="space-y-6">
      <h2 className={adminSectionTitleClass}>Vitals</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Heart Rate" unit="bpm" value={value.heartRate} onChange={(v) => set("heartRate", v)} />
        <Field label="Temperature" unit="°C" value={value.temperature} onChange={(v) => set("temperature", v)} />
        <Field
          label="Respiratory Rate"
          unit="breaths/min"
          value={value.respiratoryRate}
          onChange={(v) => set("respiratoryRate", v)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Blood Pressure — Systolic"
            value={value.bpSystolic}
            onChange={(v) => set("bpSystolic", v)}
          />
          <Field
            label="Blood Pressure — Diastolic"
            value={value.bpDiastolic}
            onChange={(v) => set("bpDiastolic", v)}
          />
        </div>
        <Field
          label="Pain Scale"
          placeholder="0 = no pain, 10 = worst pain"
          value={value.painScale}
          onChange={(v) => set("painScale", v)}
        />
        <Field
          label="Oxygen Saturation"
          unit="%"
          value={value.oxygenSaturation}
          onChange={(v) => set("oxygenSaturation", v)}
        />
        <Field label="Height" unit="cm" value={value.height} onChange={(v) => set("height", v)} />
        <Field label="Weight" unit="kg" value={value.weight} onChange={(v) => set("weight", v)} />
        <Field
          label="Glasgow Coma Scale"
          placeholder="Total (eye + verbal + motor)"
          value={value.glasgowScale}
          onChange={(v) => set("glasgowScale", v)}
        />
        <div>
          <label className={adminFieldLabelClass}>Body Mass Index</label>
          <input
            type="text"
            readOnly
            value={bmi}
            className={`${adminTextInputClass} mt-1 cursor-not-allowed bg-[color:var(--color-canvas)]`}
          />
        </div>
        <Field label="Recorded By" type="text" value={value.recordedBy} onChange={(v) => set("recordedBy", v)} />
        <Field
          label="Registration Time"
          type="datetime-local"
          value={value.recordedAt}
          onChange={(v) => set("recordedAt", v)}
        />
        <div className="sm:col-span-2">
          <label className={adminFieldLabelClass}>Notes</label>
          <textarea
            rows={2}
            value={value.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={`${adminTextInputClass} mt-1`}
          />
        </div>
      </div>
    </div>
  );
}

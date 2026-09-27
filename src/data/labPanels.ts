import type { ExamProtocol, LabTest } from "./types";
import { getJob } from "./jobs";

/** Applies to every General-form job, pre-placement and periodic alike. */
export const BASELINE_LABS: LabTest[] = [
  { name: "Complete Urine Analysis" },
  { name: "HbA1c", note: "only if known diabetic or abnormal urinalysis" },
  { name: "Electrocardiogram (ECG)", note: "above age 40 only" },
  { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "if clinically indicated" },
  { name: "Audiometry", note: "if clinically indicated or as baseline for applicable jobs" },
];

/** Extra panel added on top of the General form, by job code — pre-placement. */
const PRE_PLACEMENT_EXTRA_LABS: Record<string, LabTest[]> = {
  healthcare_worker: [
    { name: "Complete Blood Count (CBC)" },
    { name: "Urine Drug Screening" },
    { name: "Liver and Renal Function" },
    {
      name: "HBV, HCV, and HIV Screening",
      note: "if vaccinated against HBV, an HBsAb titer should be performed",
    },
    {
      name: "Protective serum IgG (Measles, Mumps, Rubella, Varicella)",
      note: "required if vaccinated or previously infected",
    },
    { name: "Interferon-Gamma Release Assay (IGRA)" },
    { name: "Respiratory FIT Testing", note: "if needed" },
  ],
  radiation_worker: [
    { name: "Complete Blood Count (CBC) with differential", note: "baseline" },
    { name: "Liver and Renal Function Tests (LFTs, RFTs)", note: "baseline" },
    { name: "Respiratory FIT Testing", note: "baseline" },
  ],
  mining_worker: [
    { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "baseline" },
    { name: "Spirometry and Respiratory FIT Testing", note: "baseline" },
    { name: "Audiometry", note: "baseline" },
    { name: "Respiratory FIT Testing", note: "if needed" },
  ],
  armed_personnel: [
    { name: "Hepatic and Renal Function Tests" },
    { name: "CBC & Hemoglobin Electrophoresis, G6PD", note: "Air Force pilots/crew only" },
    { name: "HBV, HCV, and HIV Screening" },
    { name: "Spirometry" },
    { name: "Chest X-ray", note: "baseline" },
    { name: "Audiometry", note: "baseline" },
    { name: "Drug Screening", note: "pre-placement & random" },
  ],
  oil_gas_worker: [
    { name: "CBC and Hemoglobin Electrophoresis" },
    { name: "Audiometry", note: "baseline" },
    { name: "Spirometry and Respiratory FIT Testing", note: "baseline" },
  ],
  commercial_driver: [
    {
      name: "Audiometry",
      note: "baseline; average hearing loss at 0.5/1.0/2.0 kHz in better ear < 40dBA",
    },
    { name: "Visual Field Assessment", note: "if clinically indicated" },
  ],
  firefighter: [
    {
      name: "Aerobic Capacity",
      note: "minimum MET level of 12 — Harvard Step Test, Chester treadmill walk test, Bruce protocol or equivalent",
    },
    { name: "CBC with differential, RBC indices/morphology, platelet count" },
    { name: "Renal Function Test" },
    { name: "Fasting Blood Glucose" },
    { name: "Liver Function Test" },
    { name: "Lipid Profile" },
    { name: "HIV Ab" },
    {
      name: "Hepatitis C Screening",
      note: "confirmation only if positive baseline and following occupational exposure",
    },
    {
      name: "Hepatitis B (HBsAg)",
      note: "baseline + vaccination with titers 1–2 months after 3-dose series",
    },
    { name: "Tetanus/Diphtheria/Pertussis (Tdap)", note: "once, then Td booster every 10 years" },
    { name: "MMR", note: "document immunity or provide two doses per guidelines" },
    { name: "Spirometry", note: "annual — FVC, FEV1, and FEV1/FVC ratio" },
  ],
  electrical_line_worker: [
    { name: "Visual Assessment", note: "including color and depth perception testing" },
    { name: "Urine Drug Screening", note: "pre-placement and random" },
  ],
};

/** Overrides for periodic exams where the regulation lists a different panel. */
const PERIODIC_EXTRA_LABS: Record<string, LabTest[]> = {
  healthcare_worker: [
    {
      name: "HBV, HCV, and HIV Screening",
      note: "if vaccinated against HBV, an HBsAb titer should be performed",
    },
    { name: "Interferon-Gamma Release Assay (IGRA)", note: "annual, with baseline negative test" },
    { name: "Respiratory FIT Testing", note: "if not already done" },
    { name: "Urine Drug Screening", note: "random" },
  ],
  radiation_worker: [
    { name: "Complete Blood Count (CBC) with differential" },
    {
      name: "Exposure follow-up",
      note: "for overexposure, accidental exposure, pregnant or breastfeeding workers — follow exposure guidelines",
    },
  ],
  commercial_driver: [
    {
      name: "Audiometry",
      note: "periodic; average hearing loss at 0.5/1.0/2.0 kHz in better ear < 40dBA",
    },
    { name: "Visual Field Assessment", note: "if clinically indicated" },
  ],
  firefighter: [
    { name: "Aerobic Capacity", note: "minimum MET level of 12" },
    { name: "CBC with differential, RBC indices/morphology, platelet count" },
    { name: "Renal Function Test" },
    { name: "Fasting Blood Glucose" },
    { name: "Liver Function Test" },
    { name: "Lipid Profile" },
    { name: "HIV Ab" },
    { name: "Hepatitis C Screening", note: "confirmation only if positive baseline" },
    { name: "Hepatitis B (HBsAg)" },
    { name: "Tdap / Td booster" },
    { name: "MMR" },
    { name: "Spirometry", note: "annual — FVC, FEV1, and FEV1/FVC ratio" },
    { name: "Urine Drug Screening" },
  ],
  heavy_equipment_operator: [{ name: "Urine Drug Screening", note: "random" }],
  mining_worker: [
    {
      name: "Chest X-ray, Post-Ant view (CXR-PA)",
      note: "baseline, every 3 years, and annually after 10 years of exposure",
    },
    { name: "Spirometry and Respiratory FIT Testing", note: "baseline" },
    { name: "Audiometry", note: "baseline" },
    { name: "Urine Drug Screening", note: "random" },
    { name: "Respiratory FIT Testing", note: "if needed" },
    { name: "Spirometry" },
    {
      name: "Biological Markers — Lead (Pb), Manganese (Mn), Cadmium (Cd)",
      note: "for exposure above permissible limits; select applicable only",
    },
  ],
  aviation_worker: [{ name: "Follow GACA rules for periodic physical" }],
};

/** Full, self-contained investigation lists for the dedicated questionnaire forms. */
export const DEDICATED_FORM_LABS: Record<string, LabTest[]> = {
  marine: [
    { name: "Complete Urine Analysis" },
    { name: "HIV Ab and Hepatitis Screening" },
    { name: "HbA1c", note: "only if known diabetic or abnormal urinalysis" },
    { name: "Electrocardiogram (ECG)", note: "above age 40 only" },
    { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "if clinically indicated" },
    { name: "Audiometry", note: "if clinically indicated or as baseline for applicable jobs" },
  ],
  food_handler: [
    { name: "Complete Urine Analysis" },
    { name: "HbA1c", note: "only if known diabetic or abnormal urinalysis" },
    { name: "Electrocardiogram (ECG)", note: "above age 40 only" },
    { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "if clinically indicated" },
    { name: "Audiometry", note: "if clinically indicated or as baseline for applicable jobs" },
    { name: "QuantiFERON Test" },
    { name: "Widal Test" },
    { name: "Stool Examination for Ova & Parasite" },
    {
      name: "Stool Culture & Sensitivity for S. typhi",
      note: "if clinically indicated — history of typhoid fever",
    },
    {
      name: "Stool/Rectal Swab Culture & Sensitivity (Typhoid, Cholera, Shigellosis, EHEC)",
      note: "if clinically indicated — active diarrhea with or without fever/dysentery",
    },
    {
      name: "Anti-Hepatitis A Virus IgM",
      note: "if clinically indicated — jaundice and fever",
    },
  ],
  diving: [
    { name: "Complete Urine Analysis" },
    { name: "HbA1c", note: "only if known diabetic or abnormal urinalysis" },
    { name: "Electrocardiogram (ECG)", note: "above age 40 only" },
    { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "if clinically indicated" },
    { name: "Audiometry", note: "if clinically indicated or as baseline" },
    {
      name: "Aerobic Capacity",
      note: "minimum MET level of 12 — Harvard Step Test, Chester treadmill walk test, Bruce protocol; waist circumference",
    },
    { name: "Exercise Test" },
    { name: "Spirometry" },
    { name: "Post-Exercise PEF or FEV1" },
    { name: "Complete Blood Count", note: "if clinically indicated" },
    { name: "Sickle Cell Test", note: "if clinically indicated" },
  ],
  welder: [
    { name: "Complete Urine Analysis" },
    { name: "HbA1c", note: "only if known diabetic or abnormal urinalysis" },
    { name: "Electrocardiogram (ECG)", note: "above age 40 only" },
    { name: "Chest X-ray, Post-Ant view (CXR-PA)", note: "if clinically indicated" },
    { name: "Audiometry", note: "if clinically indicated or as baseline" },
    { name: "Spirometry" },
    { name: "Complete Blood Count" },
    {
      name: "Biological Markers — Lead (Pb), Manganese (Mn), Cadmium (Cd)",
      note: "for candidates with previous exposure; establish baseline, select applicable only",
    },
  ],
  mining: [
    {
      name: "Chest X-ray, Post-Ant view (CXR-PA)",
      note: "baseline, every 3 years, and annually after 10 years of exposure",
    },
    { name: "Spirometry and Respiratory FIT Testing", note: "baseline" },
    { name: "Audiometry", note: "baseline" },
    { name: "Urine Drug Screening", note: "random" },
    { name: "Respiratory FIT Testing", note: "if needed" },
    { name: "Spirometry" },
    {
      name: "Biological Markers — Lead (Pb), Manganese (Mn), Cadmium (Cd)",
      note: "for exposure above permissible limits; select applicable only",
    },
  ],
};

/**
 * Some job-specific panels re-list a test that's already in the baseline
 * panel (e.g. armed personnel's own "Audiometry — baseline" on top of the
 * generic baseline Audiometry). Collapse same-name tests to one row, in
 * their first-seen position, keeping the LAST (most specific / job-panel)
 * note — the job's own wording supersedes the generic baseline note.
 */
function dedupeLabTests(tests: LabTest[]): LabTest[] {
  const order: string[] = [];
  const byKey = new Map<string, LabTest>();
  for (const test of tests) {
    const key = test.name.trim().toLowerCase();
    if (!byKey.has(key)) order.push(key);
    byKey.set(key, test);
  }
  return order.map((key) => byKey.get(key)!);
}

/** Resolve the full lab-test list a beneficiary must complete for a job + protocol. */
export function getLabTestsForJob(jobCode: string, protocol: ExamProtocol): LabTest[] {
  const job = getJob(jobCode);
  if (!job) return [];

  const formKey = protocol === "pre_placement" ? job.prePlacementForm : job.periodicForm;

  if (formKey !== "general" && DEDICATED_FORM_LABS[formKey]) {
    return dedupeLabTests(DEDICATED_FORM_LABS[formKey]);
  }

  const extra =
    protocol === "periodic"
      ? PERIODIC_EXTRA_LABS[job.code] ?? PRE_PLACEMENT_EXTRA_LABS[job.code] ?? []
      : PRE_PLACEMENT_EXTRA_LABS[job.code] ?? [];

  return dedupeLabTests([...BASELINE_LABS, ...extra]);
}

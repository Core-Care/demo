/**
 * Wizard/form-state shapes for a single occupational fitness assessment.
 * Kept separate from types.ts (which models the regulation itself) since
 * these describe UI/draft state, not domain data.
 */
import type { ExamProtocol } from "./types";

/** Mirrors the real app's Employment Status field, which doubles as the
 * exam protocol selector: a new hire gets the pre-placement exam, an
 * existing employee gets the periodic one. */
export type EmploymentStatus = "new_employee" | "employee";

export function protocolFromEmploymentStatus(status: EmploymentStatus | ""): ExamProtocol | undefined {
  if (status === "new_employee") return "pre_placement";
  if (status === "employee") return "periodic";
  return undefined;
}

export interface BeneficiaryDraft {
  fullName: string;
  gender: "male" | "female" | "";
  jobCode: string;
  employmentStatus: EmploymentStatus | "";
  email: string;
  mobile: string;
  dob: string;
  nationality: string;
  notes: string;
}

export const EMPTY_BENEFICIARY_DRAFT: BeneficiaryDraft = {
  fullName: "",
  gender: "",
  jobCode: "",
  employmentStatus: "",
  email: "",
  mobile: "",
  dob: "",
  nationality: "",
  notes: "",
};

export interface VitalsData {
  heartRate: string;
  temperature: string;
  respiratoryRate: string;
  bpSystolic: string;
  bpDiastolic: string;
  painScale: string;
  oxygenSaturation: string;
  height: string;
  weight: string;
  glasgowScale: string;
  recordedBy: string;
  recordedAt: string;
  notes: string;
}

export const EMPTY_VITALS: VitalsData = {
  heartRate: "",
  temperature: "",
  respiratoryRate: "",
  bpSystolic: "",
  bpDiastolic: "",
  painScale: "",
  oxygenSaturation: "",
  height: "",
  weight: "",
  glasgowScale: "",
  recordedBy: "",
  recordedAt: "",
  notes: "",
};

/** BMI = kg / m^2, matching the real app's fallback of "–" when incomplete. */
export function computeBmi(heightCm: string, weightKg: string): string {
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  if (!h || !w) return "–";
  const meters = h / 100;
  return (w / (meters * meters)).toFixed(1);
}

export type YesNo = "yes" | "no" | null;
export type NormalAbnormal = "normal" | "abnormal" | null;
export type Decision = "fit" | "fit_considerations" | "fit_restrictions" | "unfit";
export type DetailFields = Record<string, string>;

export interface QuestionnaireAnswers {
  hx: Record<string, YesNo>;
  occ: Record<string, YesNo>;
  life: Record<string, YesNo>;
  /** Per-item follow-up sub-form values, keyed by QuestionnaireItem.id. */
  details: Record<string, DetailFields>;
  /** Shared Current/Previous-use panel for the tobacco/alcohol/substance trio. */
  substanceDetail: DetailFields;
  hxNotes: string;
  occNotes: string;
}

export const EMPTY_QUESTIONNAIRE_ANSWERS: QuestionnaireAnswers = {
  hx: {},
  occ: {},
  life: {},
  details: {},
  substanceDetail: {},
  hxNotes: "",
  occNotes: "",
};

export interface ClinicalExamAnswers {
  pe: Record<string, NormalAbnormal>;
  abnormalityNotes: string;
}

export const EMPTY_CLINICAL_EXAM: ClinicalExamAnswers = { pe: {}, abnormalityNotes: "" };

export interface LabResultRow {
  sampleCollected: YesNo;
  resultStatus: "pending" | "normal" | "abnormal";
  notes: string;
  fileName: string | null;
}

export const EMPTY_LAB_ROW: LabResultRow = {
  sampleCollected: null,
  resultStatus: "pending",
  notes: "",
  fileName: null,
};

export interface FinalDecisionData {
  decision: Decision | null;
  restrictionsDescription: string;
  notes: string;
}

export const EMPTY_FINAL_DECISION: FinalDecisionData = {
  decision: null,
  restrictionsDescription: "",
  notes: "",
};

export interface AssessmentDraft {
  registration: BeneficiaryDraft;
  vitals: VitalsData;
  questionnaire: QuestionnaireAnswers;
  clinicalExam: ClinicalExamAnswers;
  labResults: Record<string, LabResultRow>;
  finalDecision: FinalDecisionData;
}

export function createEmptyAssessmentDraft(): AssessmentDraft {
  return {
    registration: { ...EMPTY_BENEFICIARY_DRAFT },
    vitals: { ...EMPTY_VITALS },
    questionnaire: {
      hx: {},
      occ: {},
      life: {},
      details: {},
      substanceDetail: {},
      hxNotes: "",
      occNotes: "",
    },
    clinicalExam: { pe: {}, abnormalityNotes: "" },
    labResults: {},
    finalDecision: { decision: null, restrictionsDescription: "", notes: "" },
  };
}

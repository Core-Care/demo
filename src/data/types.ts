/**
 * Shared domain types for the occupational fitness demo.
 * Modeled on the NCOSH "Occupational Fitness & Non-communicable Diseases
 * Examinations Regulation" (2025).
 */

export type ExamProtocol = "pre_placement" | "periodic";

export type RiskClass = "basic" | "advanced" | "special";

/** Which questionnaire form applies. "general" covers every job unless a
 * dedicated form is required by the regulation. */
export type QuestionnaireFormKey =
  | "general"
  | "marine"
  | "food_handler"
  | "diving"
  | "welder"
  | "mining";

export interface Job {
  code: string;
  nameEn: string;
  riskClass: RiskClass;
  prePlacementForm: QuestionnaireFormKey;
  periodicForm: QuestionnaireFormKey;
  periodicFrequency: string;
  /** Free-text note shown alongside the job, e.g. an external regulator. */
  externalAuthorityNote?: string;
}

export interface LabTest {
  name: string;
  /** Conditional note, e.g. "if clinically indicated". */
  note?: string;
}

/** A yes/no health-history question. */
export interface QuestionnaireItem {
  id: string;
  label: string;
}

/** A normal/abnormal physical-exam row. */
export interface ExamItem {
  id: string;
  label: string;
}

export interface QuestionnaireSection {
  title: string;
  items: QuestionnaireItem[];
}

export interface QuestionnaireForm {
  key: QuestionnaireFormKey;
  title: string;
  /** e.g. "Marine Medical Sheet (Appendix 2)" */
  sourceLabel: string;
  healthHistory: QuestionnaireItem[];
  occupationalHistory: QuestionnaireItem[];
  lifestyle: QuestionnaireItem[];
  physicalExam: ExamItem[];
}

import type { Job } from "./types";

/**
 * The 15 occupational categories from the NCOSH regulation appendix.
 * "general" form/labs apply unless a dedicated form/panel is listed.
 */
export const JOBS: Job[] = [
  {
    code: "office_clerk",
    nameEn: "Office Clerk",
    riskClass: "basic",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Per employer policy",
  },
  {
    code: "heavy_equipment_operator",
    nameEn: "Heavy Equipment Operator",
    riskClass: "basic",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Every 3 years",
  },
  {
    code: "healthcare_worker",
    nameEn: "Healthcare Worker",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Every 2 years (high-risk roles)",
  },
  {
    code: "radiation_worker",
    nameEn: "Occupationally Exposed Radiation Worker",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Every 3 years",
  },
  {
    code: "armed_personnel",
    nameEn: "Armed Personnel",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Per service branch policy",
  },
  {
    code: "oil_gas_worker",
    nameEn: "Oil & Gas Worker",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Per employer policy",
  },
  {
    code: "commercial_driver",
    nameEn: "Commercial Driver",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Every 2 years",
  },
  {
    code: "firefighter",
    nameEn: "Firefighter",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Every 2 years",
  },
  {
    code: "electrical_line_worker",
    nameEn: "Electrical Line Worker",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Per employer policy",
  },
  {
    code: "mining_worker",
    nameEn: "Mining & Underground Worker",
    riskClass: "advanced",
    prePlacementForm: "general",
    periodicForm: "mining",
    periodicFrequency: "Every 3 years until age 50, then annually",
  },
  {
    code: "marine_worker",
    nameEn: "Marine Worker",
    riskClass: "special",
    prePlacementForm: "marine",
    periodicForm: "general",
    periodicFrequency: "Per flag-state / employer policy",
  },
  {
    code: "food_handler",
    nameEn: "Food Handler",
    riskClass: "special",
    prePlacementForm: "food_handler",
    periodicForm: "general",
    periodicFrequency: "Per employer / municipal policy",
  },
  {
    code: "diver",
    nameEn: "Diver",
    riskClass: "special",
    prePlacementForm: "diving",
    periodicForm: "diving",
    periodicFrequency: "Annual",
  },
  {
    code: "welder",
    nameEn: "Welder",
    riskClass: "special",
    prePlacementForm: "welder",
    periodicForm: "welder",
    periodicFrequency: "Every 3 years until age 50, then annually",
  },
  {
    code: "aviation_worker",
    nameEn: "Aviation Worker",
    riskClass: "special",
    prePlacementForm: "general",
    periodicForm: "general",
    periodicFrequency: "Annual",
    externalAuthorityNote:
      "Governed by the General Authority of Civil Aviation (GACA) / Unified Aeromedical Guidelines for GCC Armed Forces. Only an authorized Aviation Medical Examiner may issue the certificate; results are submitted via avmed.gaca.gov.sa/md.",
  },
];

export function getJob(code: string): Job | undefined {
  return JOBS.find((job) => job.code === code);
}

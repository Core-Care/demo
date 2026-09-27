import type { QuestionnaireForm, QuestionnaireItem, ExamItem } from "./types";

function items(labels: string[], prefix: string): QuestionnaireItem[] {
  return labels.map((label, i) => ({ id: `${prefix}-${i + 1}`, label }));
}

function examItems(labels: string[], prefix: string): ExamItem[] {
  return labels.map((label, i) => ({ id: `${prefix}-${i + 1}`, label }));
}

/** Shared 24-item health questionnaire that opens every form in the regulation. */
const BASE_HEALTH_HISTORY = [
  "Cardiovascular problems (high blood pressure, palpitation, heart/blood vessel disease or fainting) or others",
  "Chest problems (asthma, difficulty breathing, chest tightness, coughing or others)",
  "Any neurological disorder (severe/frequent headaches, unsteadiness, stroke, transient ischemic attacks, tremors, sleep disorder, paralysis) or others",
  "Epilepsy, convulsions or loss of consciousness",
  "Musculoskeletal problems (joint problems, restricted mobility, back problems, fractures/dislocations)",
  "Psychological disorders (anxiety, depression, psychosis, bipolar, phobia)",
  "Any eye/vision problem or color blindness",
  "Thyroid or other endocrine problem",
  "Diabetes",
  "Ear, nose, throat, hearing difficulties, tinnitus, or motion sickness requiring medication",
  "Blood disorders / anemia (e.g. sickle cell anemia) or others",
  "Urinary problem (kidney, bladder or prostate)",
  "Skin problem (e.g. allergies or dermatitis)",
  "Infectious / contagious diseases",
  "Tuberculosis",
  "Digestive problem",
  "Sleeping disorders (OSA or daytime sleepiness)",
  "Significant injuries",
  "Cancer",
  "Have you ever had any surgeries?",
  "Have you ever been hospitalized?",
  "Suicide attempt",
  "Autoimmune / connective tissue diseases (e.g. rheumatoid arthritis)",
  "Any health problem which requires visits to the doctor, or for which you take regular drugs",
];

const BASE_OCCUPATIONAL_HISTORY = [
  "Have you ever been exposed to fumes, dust, chemicals, loud noise, radiation, or other hazards at work or elsewhere?",
  "Have you ever received worker's disability benefits / compensation?",
  "Have you been absent from work for medical reasons in the past five years?",
  "Have you ever required light or restricted duty?",
  "Have you ever had any occupational illness?",
];

const HAZARDOUS_MATERIALS_HISTORY = [
  "Asbestos?",
  "Silica (e.g. in sandblasting)?",
  "Tungsten/cobalt (e.g. grinding or welding this material)?",
  "Beryllium?",
  "Aluminum?",
  "Coal (for example, mining)?",
  "Iron?",
  "Tin?",
  "Dusty environments?",
  "Any other hazardous exposures?",
];

const BASE_LIFESTYLE = [
  "Tobacco (cigarettes, shisha, pipe, vape, ...)",
  "Alcohol",
  "Substance use",
  "Were you subjected to medical examinations within the past 6 months?",
  "If not fully vaccinated, are you willing to take the vaccine(s) for work purposes in KSA?",
];

const BASE_PHYSICAL_EXAM = [
  "Pallor",
  "Edema",
  "Jaundice",
  "Heart (rhythm, sounds and murmurs)",
  "Cognitive functions",
  "Psychiatric (appearance, behavior, mood, thoughts, communication, memory)",
  "Mouth / teeth",
  "Ears, nose, throat",
  "Lung and chest (not including breast exam)",
  "Abdomen (including organomegaly and hernia)",
  "Urinary and genital system (not including pelvic exam)",
  "Upper & lower extremities (strength and range of motion)",
  "Spine",
  "Neurological (equilibrium, tendon reflexes, coordination, etc.)",
  "Skin",
];

export const QUESTIONNAIRE_FORMS: Record<string, QuestionnaireForm> = {
  general: {
    key: "general",
    title: "General Medical Assessment",
    sourceLabel: "Appendix 1 — General Medical Sheet",
    healthHistory: items(BASE_HEALTH_HISTORY, "gen-hx"),
    occupationalHistory: items(BASE_OCCUPATIONAL_HISTORY, "gen-occ"),
    lifestyle: items(BASE_LIFESTYLE, "gen-life"),
    physicalExam: examItems(BASE_PHYSICAL_EXAM, "gen-pe"),
  },
  marine: {
    key: "marine",
    title: "Marine Medical Assessment",
    sourceLabel: "Appendix 2 — Marine Medical Sheet",
    healthHistory: items(
      [
        ...BASE_HEALTH_HISTORY,
        "Dizziness",
        "Varicose veins / piles",
        "Allergies to any medication, food, etc.?",
        "Hernia",
        "Amputation",
        "Have you ever been signed off sick or repatriated from a ship?",
        "Have you ever been declared unfit for sea duty?",
        "Do you feel healthy and fit to perform the duties of your designated position/occupation?",
      ],
      "mar-hx",
    ),
    occupationalHistory: items(BASE_OCCUPATIONAL_HISTORY, "mar-occ"),
    lifestyle: items(BASE_LIFESTYLE, "mar-life"),
    physicalExam: examItems(
      [
        ...BASE_PHYSICAL_EXAM,
        "Eyes",
        "Ophthalmoscopy",
        "Pupils",
        "Eye movement",
        "Varicose veins",
        "Anus (not including digital examination)",
      ],
      "mar-pe",
    ),
  },
  food_handler: {
    key: "food_handler",
    title: "Food Handler Medical Assessment",
    sourceLabel: "Appendix 3 — Food Handlers Medical Sheet",
    healthHistory: items(
      [
        ...BASE_HEALTH_HISTORY,
        "Liver disease",
        "Deformity",
        "Jaundice",
        "Are you currently, or have you over the last seven days, suffered from diarrhea/vomiting?",
        "At present, are you suffering from skin trouble on hands/arms/face, boils/styes/sepsis on fingers or hands, or discharge from eye/ear/gums/mouth?",
        "Do you suffer from recurring skin or ear infection, or a recurring bowel disorder?",
        "In the last 5 days, have you been in contact with anyone who may have been suffering from cholera?",
        "In the last 7 days, have you been in contact with anyone with diarrhea or vomiting?",
        "In the last 21 days, have you been in contact with anyone who may have been suffering from typhoid, paratyphoid, or jaundice?",
        "Have you ever had, or are you now known to be a carrier of, typhoid or paratyphoid — or do you lack a valid (3-year) antityphoid vaccine certificate?",
        "Have you ever had, or are you now known to have, typhoid fever?",
      ],
      "food-hx",
    ),
    occupationalHistory: items(BASE_OCCUPATIONAL_HISTORY, "food-occ"),
    lifestyle: items(BASE_LIFESTYLE, "food-life"),
    physicalExam: examItems(
      [
        ...BASE_PHYSICAL_EXAM,
        "Eye",
        "Conjunctiva",
        "Clubbing",
        "Cyanosis",
        "Cervical lymph node enlargement",
        "Nails condition",
      ],
      "food-pe",
    ),
  },
  diving: {
    key: "diving",
    title: "Diving Medical Assessment",
    sourceLabel: "Appendix 4 / 7 — Diving Medical Sheet",
    healthHistory: items(
      [
        ...BASE_HEALTH_HISTORY,
        "Have you ever had any diving-related condition, e.g. barotrauma, decompression illness, immersion pulmonary oedema?",
        "Do you have any allergies?",
        "Do you have a family history of sudden cardiac death and/or abnormalities of heart rhythm?",
        "COVID-19",
        "Collapsed lung (pneumothorax)",
        "Dizziness",
        "Migraine",
        "Head injury with loss of consciousness, or surgery to the skull or brain",
        "Mental health problems (including panic attacks and claustrophobia)",
        "Stomach or intestinal problems or surgery (including stomas)",
      ],
      "dive-hx",
    ),
    occupationalHistory: items(BASE_OCCUPATIONAL_HISTORY, "dive-occ"),
    lifestyle: items(BASE_LIFESTYLE, "dive-life"),
    physicalExam: examItems(
      [
        ...BASE_PHYSICAL_EXAM,
        "Posture",
        "Gait",
        "Balance",
        "Involuntary movements",
        "Speech",
        "Varicose vein",
        "Cranial nerve II–XII",
      ],
      "dive-pe",
    ),
  },
  welder: {
    key: "welder",
    title: "Welder Medical Assessment",
    sourceLabel: "Appendix 5 / 9 — Welder Medical Sheet",
    healthHistory: items(
      [
        ...BASE_HEALTH_HISTORY,
        "Allergic reactions that interfere with your breathing",
        "Claustrophobia",
        "Smelling",
        "Pulmonary symptoms (cough, wheezing, etc.)",
        "Eye irritation",
      ],
      "weld-hx",
    ),
    occupationalHistory: items(
      [...BASE_OCCUPATIONAL_HISTORY, "Have you ever worked with any of the following materials, or under any of these conditions?", ...HAZARDOUS_MATERIALS_HISTORY],
      "weld-occ",
    ),
    lifestyle: items(BASE_LIFESTYLE, "weld-life"),
    physicalExam: examItems(
      [...BASE_PHYSICAL_EXAM, "Thyroid exam", "Lymph node", "Eye exam"],
      "weld-pe",
    ),
  },
  mining: {
    key: "mining",
    title: "Mining & Underground Medical Assessment",
    sourceLabel: "Appendix 8 / 10 — Mining Medical Sheet",
    healthHistory: items(
      [
        ...BASE_HEALTH_HISTORY,
        "Allergic reactions that interfere with your breathing",
        "Claustrophobia",
        "Smelling",
        "Pulmonary symptoms (cough, wheezing, etc.)",
        "Eye irritation",
      ],
      "mine-hx",
    ),
    occupationalHistory: items(
      [...BASE_OCCUPATIONAL_HISTORY, "Have you ever worked with any of the following materials, or under any of these conditions?", ...HAZARDOUS_MATERIALS_HISTORY],
      "mine-occ",
    ),
    lifestyle: items(BASE_LIFESTYLE, "mine-life"),
    physicalExam: examItems(
      [...BASE_PHYSICAL_EXAM, "Thyroid exam", "Lymph node", "Eye exam"],
      "mine-pe",
    ),
  },
};

export function getQuestionnaireForm(key: string): QuestionnaireForm {
  return QUESTIONNAIRE_FORMS[key] ?? QUESTIONNAIRE_FORMS.general;
}

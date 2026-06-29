export type QuestionOption = {
  value: string;
  label: string;
};

export type QuestionStep = {
  id:
    | "role"
    | "channel"
    | "presence"
    | "volume"
    | "goal"
    | "ads"
    | "timeline"
    | "budget";
  type: "single" | "multi";
  title: string;
  subtext?: string;
  options: QuestionOption[];
  exclusiveValue?: string; // selecting this value clears all other selections (multi-select only)
};

export const TOTAL_STEPS = 9; // 8 questions + contact step, used for the progress bar
export const TOTAL_QUESTIONS = 8;

export const QUESTIONS: QuestionStep[] = [
  {
    id: "role",
    type: "single",
    title: "Quel est votre rôle dans le cabinet ?",
    options: [
      { value: "owner", label: "Propriétaire / Gérant du cabinet" },
      { value: "associate", label: "Dentiste associé" },
      { value: "admin", label: "Responsable administratif" },
      { value: "assistant", label: "Assistant(e) ou secrétaire" },
      { value: "other", label: "Autre" },
    ],
  },
  {
    id: "channel",
    type: "single",
    title: "Comment les patients vous trouvent en ce moment ?",
    options: [
      { value: "word_of_mouth", label: "Bouche-à-oreille uniquement" },
      { value: "google", label: "Google et avis en ligne" },
      { value: "social", label: "Instagram ou Facebook" },
      { value: "dead_site", label: "On a un site mais il ne génère rien" },
      { value: "unknown", label: "Je ne sais pas vraiment" },
    ],
  },
  {
    id: "presence",
    type: "multi",
    title: "Votre cabinet est visible où en ligne aujourd'hui ?",
    subtext: "Plusieurs réponses possibles. Cochez tout ce qui s'applique.",
    exclusiveValue: "none",
    options: [
      { value: "website", label: "Site web professionnel actif" },
      { value: "maps", label: "Google Maps avec photos et avis récents" },
      { value: "instagram", label: "Instagram avec posts réguliers" },
      { value: "facebook", label: "Page Facebook active" },
      { value: "whatsapp_business", label: "WhatsApp Business configuré" },
      { value: "none", label: "Aucun de ces éléments" },
    ],
  },
  {
    id: "volume",
    type: "single",
    title: "Combien de nouveaux patients votre cabinet reçoit chaque mois actuellement ?",
    options: [
      { value: "under_10", label: "Moins de 10" },
      { value: "10_20", label: "10 à 20" },
      { value: "20_40", label: "20 à 40" },
      { value: "over_40", label: "Plus de 40" },
      { value: "no_idea", label: "Je ne compte pas précisément" },
    ],
  },
  {
    id: "goal",
    type: "single",
    title: "Combien de nouveaux patients voulez-vous atteindre chaque mois ?",
    options: [
      { value: "plus_5_10", label: "+5 à +10 patients de plus" },
      { value: "plus_10_20", label: "+10 à +20 patients de plus" },
      { value: "double", label: "Doubler ma patientèle actuelle" },
      {
        value: "just_works",
        label: "Je veux juste un système qui marche, peu importe le chiffre",
      },
    ],
  },
  {
    id: "ads",
    type: "single",
    title: "Faites-vous de la publicité en ligne pour votre cabinet ?",
    options: [
      { value: "managed", label: "Oui, on gère des campagnes Meta ou Google" },
      { value: "boost", label: "On booste des posts de temps en temps" },
      { value: "tried_failed", label: "On a essayé mais ça n'a pas converti" },
      { value: "never", label: "Non, jamais" },
    ],
  },
  {
    id: "timeline",
    type: "single",
    title: "Quand voulez-vous voir les premiers résultats ?",
    options: [
      { value: "urgent", label: "Ce mois-ci, c'est urgent" },
      { value: "2_3_months", label: "Dans les 2 à 3 prochains mois" },
      { value: "this_year", label: "Cette année" },
      { value: "browsing", label: "Je m'informe pour le moment" },
    ],
  },
  {
    id: "budget",
    type: "single",
    title:
      "Pour gagner 10 nouveaux patients confirmés par mois, combien seriez-vous prêt à investir ?",
    subtext: "Budget mensuel total (publicité + accompagnement).",
    options: [
      {
        value: "under_2000",
        label: "Moins de 2 000 MAD — je cherche le moins cher possible",
      },
      { value: "2000_4000", label: "2 000 à 4 000 MAD — si le retour est clair" },
      {
        value: "4000_7000",
        label: "4 000 à 7 000 MAD — je veux un système qui fonctionne vraiment",
      },
      {
        value: "over_7000",
        label: "Plus de 7 000 MAD — je veux les meilleurs résultats possibles",
      },
    ],
  },
];

export type Answers = {
  role?: string;
  channel?: string;
  presence?: string[];
  volume?: string;
  goal?: string;
  ads?: string;
  timeline?: string;
  budget?: string;
};

export type ContactInfo = {
  fullName: string;
  whatsapp: string; // local part only, e.g. "612345678"
  cabinetName: string;
  email: string;
};

export type Flags = {
  decision_maker: boolean;
  low_traffic: boolean;
  easy_upsell: boolean;
  urgent: boolean;
  budget_disqualified: boolean;
  onlinePresenceCount: number;
};

export function computeFlags(answers: Answers): Flags {
  const presence = answers.presence || [];
  const onlinePresenceCount = presence.includes("none") ? 0 : presence.length;

  return {
    decision_maker: !(answers.role === "assistant" || answers.role === "other"),
    low_traffic: answers.channel === "word_of_mouth" || answers.channel === "unknown",
    easy_upsell: answers.ads === "tried_failed",
    urgent: answers.timeline === "urgent",
    budget_disqualified: answers.budget === "under_2000",
    onlinePresenceCount,
  };
}

export function recommendedTrack(flags: Flags): "A" | "B" {
  // Track B = ads mandatory (Croissance/Système Complet), Track A = system fits alone (Essentiel/Système Complet)
  if (flags.onlinePresenceCount <= 1) return "B";
  if (flags.onlinePresenceCount >= 4) return "A";
  return "B";
}

const MOROCCAN_MOBILE_REGEX = /^[67]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(contact: ContactInfo) {
  const errors: Partial<Record<keyof ContactInfo, string>> = {};

  if (contact.fullName.trim().length < 2) {
    errors.fullName = "Merci d'indiquer votre prénom et nom.";
  }
  if (!MOROCCAN_MOBILE_REGEX.test(contact.whatsapp.trim())) {
    errors.whatsapp = "Numéro invalide. Format attendu : 6 ou 7 suivi de 8 chiffres.";
  }
  if (contact.cabinetName.trim().length < 2) {
    errors.cabinetName = "Merci d'indiquer le nom du cabinet.";
  }
  if (contact.email.trim().length > 0 && !EMAIL_REGEX.test(contact.email.trim())) {
    errors.email = "Adresse email invalide.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}

const STORAGE_KEY = "clinicpro_questionnaire_v1";

export type PersistedState = {
  stepIndex: number;
  answers: Answers;
  contact: ContactInfo;
};

export function saveProgress(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — fail silently, not critical
  }
}

export function loadProgress(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

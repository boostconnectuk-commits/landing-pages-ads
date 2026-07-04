"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import QuestionnaireHeader from "@/components/questionnaire/QuestionnaireHeader";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import QuestionLayout from "@/components/questionnaire/QuestionLayout";
import OptionButton from "@/components/questionnaire/OptionButton";
import {
  QUESTIONS,
  TOTAL_STEPS,
  TOTAL_QUESTIONS,
  computeFlags,
  computeRecommendedTier,
  validateContact,
  saveProgress,
  loadProgress,
  clearProgress,
  type Answers,
  type ContactInfo,
} from "@/lib/questionnaire";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || "YOUR_WEBHOOK_URL_HERE";
const EMPTY_CONTACT: ContactInfo = {
  fullName: "",
  whatsapp: "",
  cabinetName: "",
  email: "",
};

const UTM_KEYS = ["utm_source", "utm_campaign", "utm_content"] as const;

function captureUtmOnce() {
  if (typeof window === "undefined") return;
  const urlParams = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = urlParams.get(key);
    if (value) sessionStorage.setItem(key, value);
  });
}

function getUtm() {
  if (typeof window === "undefined") {
    return { source: "direct", campaign: "", content: "" };
  }
  const urlParams = new URLSearchParams(window.location.search);
  return {
    source: urlParams.get("utm_source") || sessionStorage.getItem("utm_source") || "direct",
    campaign: urlParams.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || "",
    content: urlParams.get("utm_content") || sessionStorage.getItem("utm_content") || "",
  };
}

function QuestionnaireInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlStep = parseInt(searchParams.get("s") || "0", 10);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const prevStepRef = useRef(0);
  const restoredRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // restore from localStorage once on mount
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    captureUtmOnce();
    const saved = loadProgress();
    if (saved) {
      setAnswers(saved.answers);
      setContact(saved.contact);
      if (!searchParams.get("s") && saved.stepIndex > 0) {
        router.replace(`/questionnaire?s=${saved.stepIndex}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    prevStepRef.current = stepIndex;
    setStepIndex(Number.isNaN(urlStep) ? 0 : Math.min(Math.max(urlStep, 0), TOTAL_QUESTIONS));
  }, [urlStep]);

  // debounced localStorage persistence
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveProgress({ stepIndex, answers, contact });
    }, 300);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [stepIndex, answers, contact]);

  const direction = stepIndex >= prevStepRef.current ? 1 : -1;

  const goToStep = (index: number) => {
    router.push(`/questionnaire?s=${index}`);
  };
  const goBack = () => {
    router.back();
  };

  const handleSingleSelect = (questionId: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [questionId]: value }));
    setTimeout(() => goToStep(stepIndex + 1), 400);
  };

  const handleMultiToggle = (value: string, exclusiveValue?: string) => {
    setAnswers((a) => {
      const current = a.presence || [];
      let next: string[];
      if (value === exclusiveValue) {
        next = current.includes(value) ? [] : [value];
      } else if (current.includes(value)) {
        next = current.filter((v) => v !== value);
      } else {
        next = [...current.filter((v) => v !== exclusiveValue), value];
      }
      return { ...a, presence: next };
    });
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContact((c) => ({ ...c, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const { errors: validationErrors, isValid } = validateContact(contact);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);

    const flags = computeFlags(answers);
    const qualified = !flags.budget_disqualified;
    const recommendedTier = computeRecommendedTier(answers);

    const fullNameTrimmed = contact.fullName.trim();
    const [firstName, ...rest] = fullNameTrimmed.split(" ");
    const lastName = rest.join(" ");

    const payload = {
      submission_id: `lead_${Date.now()}`,
      timestamp: new Date().toISOString(),
      contact: {
        first_name: firstName || "",
        last_name: lastName || "",
        whatsapp: `+212${contact.whatsapp.trim()}`,
        cabinet_name: contact.cabinetName.trim(),
        email: contact.email.trim(),
      },
      answers: {
        role: answers.role || "",
        acquisition_channel: answers.channel || "",
        online_presence: answers.presence || [],
        current_volume: answers.volume || "",
        target_volume: answers.goal || "",
        advertising_status: answers.ads || "",
        timeline: answers.timeline || "",
        investment: answers.budget || "",
      },
      computed: {
        qualified,
        urgent: flags.urgent,
        decision_maker: flags.decision_maker,
        recommended_tier: recommendedTier,
      },
      utm: getUtm(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Webhook failed");
    } catch (error) {
      console.error("Submission error:", error);
      // Fail open: still confirm the lead to the user rather than block on a backend hiccup.
    }

    clearProgress();
    const status = qualified ? "qualified" : "disqualified";
    router.push(
      `/questionnaire/merci?status=${status}&name=${encodeURIComponent(firstName || "")}`
    );
  };

  const isContactStep = stepIndex === TOTAL_QUESTIONS;
  const currentQuestion = !isContactStep ? QUESTIONS[stepIndex] : null;
  const progress = ((stepIndex + 1) / TOTAL_STEPS) * 100;

  const canContinueMulti =
    currentQuestion?.type === "multi" && (answers.presence?.length ?? 0) > 0;

  return (
    <main className="min-h-screen bg-off-white">
      <QuestionnaireHeader />
      <ProgressBar progress={progress} />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction === 1 ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -10 : 10 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
          >
            {!isContactStep && currentQuestion && (
              <QuestionLayout
                indicator={`QUESTION ${stepIndex + 1} SUR ${TOTAL_QUESTIONS}`}
                title={currentQuestion.title}
                subtext={currentQuestion.subtext}
              >
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((opt) => {
                    const isMulti = currentQuestion.type === "multi";
                    const selected = isMulti
                      ? (answers.presence || []).includes(opt.value)
                      : answers[currentQuestion.id] === opt.value;
                    return (
                      <OptionButton
                        key={opt.value}
                        label={opt.label}
                        selected={selected}
                        multi={isMulti}
                        onClick={() =>
                          isMulti
                            ? handleMultiToggle(opt.value, currentQuestion.exclusiveValue)
                            : handleSingleSelect(currentQuestion.id, opt.value)
                        }
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-10">
                  {stepIndex > 0 ? (
                    <button
                      onClick={goBack}
                      className="text-sm text-warm-grey hover:text-charcoal transition-colors"
                    >
                      Précédent
                    </button>
                  ) : (
                    <span />
                  )}
                  {currentQuestion.type === "multi" && (
                    <button
                      onClick={() => goToStep(stepIndex + 1)}
                      disabled={!canContinueMulti}
                      className="h-12 w-32 rounded-lg bg-primary-teal text-white font-medium transition-[opacity,background-color] duration-200 hover:bg-teal-deep disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuer →
                    </button>
                  )}
                </div>
              </QuestionLayout>
            )}

            {isContactStep && (
              <div className="max-w-2xl mx-auto w-full px-6 md:px-8 py-16 md:py-24">
                <span className="block text-center text-xs uppercase tracking-wider text-primary-teal mb-4">
                  DERNIÈRE ÉTAPE
                </span>
                <h1 className="font-serif font-normal text-3xl md:text-4xl text-charcoal leading-tight text-center max-w-xl mx-auto">
                  Parfait. Où peut-on vous joindre sur WhatsApp ?
                </h1>
                <p className="text-base text-warm-grey text-center mt-4 mb-12">
                  Réponse de notre équipe sous 2 heures (du lundi au vendredi, 9h–18h).
                </p>

                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Prénom et nom
                    </label>
                    <input
                      type="text"
                      value={contact.fullName}
                      onChange={(e) => handleContactChange("fullName", e.target.value)}
                      placeholder="Dr. Mohamed Alami"
                      className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-charcoal outline-none transition-colors focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/30 ${
                        errors.fullName ? "border-signal-coral" : "border-border-grey"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-signal-coral mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Numéro WhatsApp
                    </label>
                    <div
                      className={`flex items-center rounded-lg border bg-white overflow-hidden ${
                        errors.whatsapp ? "border-signal-coral" : "border-border-grey"
                      }`}
                    >
                      <span className="h-12 flex items-center px-3 bg-border-grey/40 text-warm-grey text-sm font-medium border-r border-border-grey">
                        +212
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={contact.whatsapp}
                        onChange={(e) =>
                          handleContactChange(
                            "whatsapp",
                            e.target.value.replace(/\D/g, "").slice(0, 9)
                          )
                        }
                        placeholder="6 12 34 56 78"
                        className="flex-1 h-12 px-4 text-base text-charcoal outline-none"
                      />
                    </div>
                    {errors.whatsapp ? (
                      <p className="text-sm text-signal-coral mt-1">{errors.whatsapp}</p>
                    ) : (
                      <p className="text-xs text-warm-grey mt-1">
                        On vous envoie un message de confirmation immédiatement.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Nom du cabinet
                    </label>
                    <input
                      type="text"
                      value={contact.cabinetName}
                      onChange={(e) => handleContactChange("cabinetName", e.target.value)}
                      placeholder="Cabinet Dr. Alami"
                      className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-charcoal outline-none transition-colors focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/30 ${
                        errors.cabinetName ? "border-signal-coral" : "border-border-grey"
                      }`}
                    />
                    {errors.cabinetName && (
                      <p className="text-sm text-signal-coral mt-1">{errors.cabinetName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warm-grey mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => handleContactChange("email", e.target.value)}
                      placeholder="contact@cabinet.ma"
                      className={`w-full h-12 px-4 rounded-lg border bg-white text-base text-charcoal outline-none transition-colors focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/30 ${
                        errors.email ? "border-signal-coral" : "border-border-grey"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-signal-coral mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="bg-soft-mint/20 border border-soft-mint rounded-lg p-4 mt-8 flex flex-col gap-2">
                  {[
                    "Réponse en moins de 2 heures (jours ouvrés)",
                    "Vos informations restent confidentielles",
                    "Aucun engagement, aucune carte bancaire demandée",
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary-teal flex-shrink-0" />
                      <span className="text-sm text-charcoal">{line}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full h-14 rounded-lg bg-primary-teal text-white font-medium text-lg mt-8 transition-colors hover:bg-teal-deep disabled:opacity-60"
                >
                  {submitting ? "Envoi en cours…" : "Envoyer ma demande →"}
                </button>

                <p className="text-xs text-warm-grey text-center mt-6">
                  En envoyant ce formulaire, vous acceptez d&apos;être recontacté par
                  ClinicPro. Vos données ne sont jamais partagées avec des tiers.
                </p>

                <button
                  onClick={goBack}
                  className="block mx-auto text-sm text-warm-grey hover:text-charcoal transition-colors mt-6"
                >
                  Précédent
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function Questionnaire() {
  return (
    <Suspense fallback={null}>
      <QuestionnaireInner />
    </Suspense>
  );
}

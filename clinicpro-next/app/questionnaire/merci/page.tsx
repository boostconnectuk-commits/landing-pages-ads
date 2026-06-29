"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function MerciInner() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") === "disqualified" ? "disqualified" : "qualified";
  const name = searchParams.get("name") || "";

  return (
    <main className="min-h-screen bg-off-white flex items-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-2xl mx-auto py-24 px-6 text-center"
      >
        <motion.span
          variants={item}
          className="w-16 h-16 rounded-full bg-soft-mint flex items-center justify-center mx-auto"
        >
          <Check className="w-8 h-8 text-primary-teal" />
        </motion.span>

        {status === "qualified" ? (
          <>
            <motion.h1 variants={item} className="font-serif font-normal text-4xl text-charcoal mt-8">
              Merci {name ? `${name}. ` : ". "}Votre demande est bien enregistrée.
            </motion.h1>
            <motion.p variants={item} className="text-lg text-warm-grey leading-relaxed mt-6 max-w-lg mx-auto">
              Notre équipe a reçu vos réponses. Vous allez recevoir un message
              WhatsApp dans les prochaines minutes, puis un appel ou un message
              personnalisé sous 2 heures pour vous présenter une proposition
              adaptée à votre cabinet.
            </motion.p>
            <motion.div variants={item} className="mt-8 p-6 bg-white border border-border-grey rounded-xl max-w-md mx-auto">
              <p className="text-sm text-warm-grey leading-relaxed">
                Du lundi au vendredi, 9h–18h. Les demandes reçues le week-end sont
                traitées le lundi matin.
              </p>
            </motion.div>
            <motion.div variants={item} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white font-medium transition-opacity hover:opacity-90"
              >
                Parler sur WhatsApp maintenant →
              </a>
              <Link
                href="/"
                className="h-12 px-6 inline-flex items-center justify-center text-primary-dark underline"
              >
                Retour au site
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <motion.h1 variants={item} className="font-serif font-normal text-4xl text-charcoal mt-8">
              Merci {name ? `${name} ` : ""}pour votre intérêt.
            </motion.h1>
            <motion.p variants={item} className="text-lg text-warm-grey leading-relaxed mt-6 max-w-lg mx-auto">
              Nous avons bien reçu vos réponses. En toute transparence, le budget
              que vous avez indiqué ne correspond pas aux formules ClinicPro
              actuelles — nos services démarrent à un investissement plus élevé
              pour garantir des résultats mesurables.
            </motion.p>
            <motion.p variants={item} className="text-lg text-warm-grey leading-relaxed mt-4 max-w-lg mx-auto">
              Si votre situation évolue dans les prochains mois, n&apos;hésitez pas
              à revenir vers nous. Nous gardons votre contact et reviendrons vers
              vous si une option plus accessible devient disponible.
            </motion.p>
            <motion.div variants={item} className="mt-12">
              <Link
                href="/"
                className="h-12 px-6 inline-flex items-center justify-center text-primary-dark underline"
              >
                Retour au site
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  );
}

export default function Merci() {
  return (
    <Suspense fallback={null}>
      <MerciInner />
    </Suspense>
  );
}

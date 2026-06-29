"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const faqs = [
  {
    q: "Faut-il changer notre logiciel ou notre système actuel ?",
    a: "Non. ClinicPro fonctionne en parallèle de ce que vous utilisez déjà. Aucun changement, aucune migration de votre côté.",
  },
  {
    q: "Combien de temps avant les premiers résultats ?",
    a: "La page est livrée en 7 jours. L'automatisation tourne dès le premier jour. Les premières demandes arrivent généralement dans les 2 premières semaines.",
  },
  {
    q: "Vous travaillez avec combien de cabinets ?",
    a: "5 nouveaux cabinets maximum par mois à Casablanca. C'est volontaire — on garde la qualité du service et on évite de saturer le marché local.",
  },
  {
    q: "Et si ça ne marche pas pour mon cabinet ?",
    a: "Le questionnaire d'éligibilité existe précisément pour éviter ça. On préfère vous dire non maintenant plutôt que vous décevoir dans 3 mois.",
  },
];

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-grey py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex justify-between items-center text-left gap-4"
      >
        <span className="font-serif text-lg text-charcoal">{q}</span>
        <Plus
          className={`w-5 h-5 text-primary-teal flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-base text-warm-grey leading-relaxed mt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQFooter() {
  return (
    <>
      <section className="bg-off-white">
        <div className="max-w-3xl mx-auto py-24 px-6">
          <FadeIn>
            <h2 className="text-center font-serif text-3xl text-charcoal mb-12">
              Les questions qu&apos;on nous pose le plus souvent.
            </h2>
          </FadeIn>
          <FadeIn>
            <div>
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <span className="font-serif text-xl text-white">ClinicPro</span>
              <p className="text-sm text-white/70 mt-3">
                Le système d&apos;acquisition patients pour les cabinets dentaires de
                Casablanca.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-primary-teal font-medium">
                LIENS
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-sm text-white/80 hover:text-white">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/#demos" className="text-sm text-white/80 hover:text-white">
                    Démos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/questionnaire"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    Questionnaire
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-primary-teal font-medium">
                CONTACT
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Casablanca, Maroc</li>
                <li>WhatsApp: +212 {WHATSAPP_NUMBER}</li>
                <li>contact@clinicpro.ma</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-primary-teal font-medium">
                LÉGAL
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-white/80 hover:text-white">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-white/80 hover:text-white">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <p className="text-xs text-white/60 text-center">
              © 2026 ClinicPro by BoostConnect. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

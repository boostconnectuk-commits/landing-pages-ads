"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import FadeIn from "@/components/FadeIn";

function FeatureItem({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-primary-teal flex-shrink-0 mt-0.5" />
      <span className={`text-sm ${dark ? "text-white" : "text-charcoal"}`}>{children}</span>
    </li>
  );
}

export default function Tiers() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center font-serif font-normal text-3xl md:text-5xl text-charcoal max-w-3xl mx-auto leading-tight">
            Trois formules. Le questionnaire vous dit laquelle correspond à votre
            cabinet.
          </h2>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-3 gap-6 items-center">
          {/* Card 1 — Essentiel */}
          <FadeIn delay={0}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-border-grey rounded-2xl p-8 md:p-10 flex flex-col h-full"
            >
              <h3 className="font-serif text-3xl text-charcoal">Essentiel</h3>
              <p className="text-base text-warm-grey leading-relaxed mt-3 min-h-[80px]">
                Pour les cabinets qui ont déjà de la visibilité (Google, Instagram,
                bouche-à-oreille) mais qui perdent les demandes qui arrivent.
              </p>
              <div className="border-t border-border-grey my-8" />
              <ul className="space-y-4">
                <FeatureItem>Page de conversion</FeatureItem>
                <FeatureItem>Réponse WhatsApp automatique</FeatureItem>
                <FeatureItem>Suivi et relances</FeatureItem>
              </ul>
              <div className="flex-grow" />
              <Link
                href="/questionnaire"
                className="w-full h-12 mt-8 flex items-center justify-center rounded-lg border border-primary-dark text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
              >
                Voir si c&apos;est pour moi →
              </Link>
            </motion.div>
          </FadeIn>

          {/* Card 2 — Croissance (recommended) */}
          <FadeIn delay={100}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative bg-primary-dark border-2 border-primary-teal rounded-2xl p-8 md:p-10 flex flex-col h-full md:-translate-y-2 md:scale-105"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-teal px-4 py-2 text-xs uppercase tracking-wider text-white">
                RECOMMANDÉ POUR LA PLUPART DES CABINETS
              </span>
              <h3 className="font-serif text-3xl text-white mt-2">Croissance</h3>
              <p className="text-base text-white/70 leading-relaxed mt-3 min-h-[80px]">
                Pour les cabinets qui veulent générer plus de demandes en plus de
                capter celles qui arrivent. Publicité Meta ciblée sur Casablanca
                incluse.
              </p>
              <div className="border-t border-white/20 my-8" />
              <ul className="space-y-4">
                <FeatureItem dark>Tout ce qui est dans Essentiel</FeatureItem>
                <FeatureItem dark>Campagnes publicitaires gérées de A à Z</FeatureItem>
                <FeatureItem dark>Créatifs et copy inclus chaque mois</FeatureItem>
              </ul>
              <div className="flex-grow" />
              <Link
                href="/questionnaire"
                className="w-full h-12 mt-8 flex items-center justify-center rounded-lg bg-primary-teal text-white font-medium transition-colors hover:bg-teal-deep"
              >
                Voir si c&apos;est pour moi →
              </Link>
            </motion.div>
          </FadeIn>

          {/* Card 3 — Système Complet */}
          <FadeIn delay={200}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-border-grey rounded-2xl p-8 md:p-10 flex flex-col h-full"
            >
              <h3 className="font-serif text-3xl text-charcoal">Système Complet</h3>
              <p className="text-base text-warm-grey leading-relaxed mt-3 min-h-[80px]">
                Pour les cabinets qui veulent tout déléguer. Le système complet
                plus l&apos;agent IA WhatsApp qui prend les rendez-vous directement,
                sans intervention humaine.
              </p>
              <div className="border-t border-border-grey my-8" />
              <ul className="space-y-4">
                <FeatureItem>Tout ce qui est dans Croissance</FeatureItem>
                <FeatureItem>Agent IA WhatsApp 24/7</FeatureItem>
                <FeatureItem>Appel stratégique mensuel</FeatureItem>
              </ul>
              <div className="flex-grow" />
              <Link
                href="/questionnaire"
                className="w-full h-12 mt-8 flex items-center justify-center rounded-lg border border-primary-dark text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
              >
                Voir si c&apos;est pour moi →
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

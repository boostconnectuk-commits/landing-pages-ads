"use client";

import { motion } from "framer-motion";
import { Zap, Inbox, BarChart3 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Placeholder from "@/components/Placeholder";

const blocks = [
  {
    icon: Zap,
    title: "Réponse en moins de 2 minutes",
    body: "À chaque demande. 24 heures sur 24. 7 jours sur 7. Automatiquement. C'est mesurable et c'est garanti.",
  },
  {
    icon: Inbox,
    title: "Toutes vos demandes au même endroit",
    body: "Site web, Instagram, Facebook, WhatsApp — tout arrive dans un seul tableau de bord. Plus jamais une demande qui se perd entre deux apps.",
  },
  {
    icon: BarChart3,
    title: "Un rapport mensuel qui ne ment pas",
    body: "Nombre de demandes reçues, taux de conversion, coût par rendez-vous. Vous savez exactement ce qui marche et ce qui ne marche pas.",
  },
];

export default function Commitments() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center font-serif font-normal text-3xl md:text-5xl text-charcoal max-w-3xl mx-auto leading-tight">
            Ce que vous obtenez. Pas ce qu&apos;on espère.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {blocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <FadeIn key={block.title} delay={i * 100}>
                <Icon className="w-8 h-8 text-primary-teal" />
                <h3 className="font-serif text-2xl text-charcoal mt-6">
                  {block.title}
                </h3>
                <p className="text-base text-warm-grey leading-relaxed mt-3">
                  {block.body}
                </p>
              </FadeIn>
            );
          })}
        </div>

        <div className="hidden md:grid grid-cols-2 gap-8 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-xs uppercase tracking-wider text-warm-grey mb-3">
              SANS CLINICPRO
            </span>
            <Placeholder
              label="images/whatsapp-without.png"
              className="w-full aspect-[9/16] rounded-xl opacity-60"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-xs uppercase tracking-wider text-primary-teal mb-3">
              AVEC CLINICPRO
            </span>
            <Placeholder
              label="images/whatsapp-with.png"
              className="w-full aspect-[9/16] rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function Reveal({
  children,
  className,
  custom = 0,
}: {
  children: React.ReactNode;
  className?: string;
  custom?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PhoneMockup({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative rounded-[36px] overflow-hidden border-[6px] border-[#1a1a1a] shadow-[0_32px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Status bar */}
        <div className="bg-[#1a1a1a] py-[10px] px-5 flex items-center justify-between">
          <div className="w-12 h-[5px] bg-white/20 rounded-full" />
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-[5px] bg-white/20 rounded-full" />
            <div className="w-[5px] h-[5px] bg-white/20 rounded-full" />
          </div>
        </div>
        <img
          src="/images/lumiere-mobile.png"
          alt="Lumière Dentaire — site mobile"
          className="w-full block"
        />
        {/* Home bar */}
        <div className="bg-[#1a1a1a] py-3 flex items-center justify-center">
          <div className="w-24 h-1 bg-white/25 rounded-full" />
        </div>
      </div>
    </div>
  );
}

const STATS = [
  {
    value: "+31",
    unit: "patients / mois",
    detail: "nouveaux patients enregistrés dès le 2ème mois",
  },
  {
    value: "187",
    unit: "MAD / patient",
    detail: "coût d'acquisition moyen sur toute la période",
  },
  {
    value: "×4.6",
    unit: "ROI",
    detail: "retour sur investissement mesuré sur 3 mois",
  },
];

export default function LumiereDentairePage() {
  return (
    <main className="min-h-screen bg-off-white">
      {/* Back nav */}
      <div className="px-6 py-4 border-b border-border-grey/50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-warm-grey hover:text-charcoal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site ClinicPro
        </Link>
      </div>

      {/* Hero — text left, phone right */}
      <section className="bg-primary-dark text-white relative overflow-hidden">
        <div className="bg-noise" />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[11px] uppercase tracking-widest text-primary-teal mb-7">
                Étude de cas · Formule Croissance
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="font-serif font-normal text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] mb-6"
            >
              +31 nouveaux patients par mois — en 8 semaines.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
              className="text-white/60 text-[17px] leading-relaxed max-w-lg"
            >
              Comment Lumière Dentaire est passé d'un cabinet sous-rempli à une
              liste d'attente, grâce à un système d'acquisition patient complet.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-10 pt-10 border-t border-white/10 text-sm text-white/40"
            >
              {[
                "Lumière Dentaire",
                "Maarif, Casablanca",
                "Dentisterie générale & esthétique",
                "Dr. Yasmine Berrada",
              ].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-4">
                  {item}
                  {i < arr.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-white/25 inline-block" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block"
          >
            <PhoneMockup className="w-[240px]" />
          </motion.div>
        </div>

        {/* Mobile phone — shown below hero text on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden px-6 pb-16 flex justify-center"
        >
          <PhoneMockup className="w-[200px]" />
        </motion.div>
      </section>

      {/* Screenshots */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary-teal">
              Aperçu du site web réalisé
            </span>
          </Reveal>

          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Desktop browser mockup */}
            <Reveal className="flex-1 min-w-0" custom={0}>
              <div className="rounded-xl overflow-hidden border border-border-grey/60 shadow-[0_20px_80px_rgba(11,31,51,0.12)]">
                <div className="bg-[#EEEDE9] px-4 py-[10px] flex items-center gap-3 border-b border-border-grey/40">
                  <div className="flex gap-[6px]">
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
                    <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
                    <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-white/70 rounded-md px-3 py-[5px] text-[11px] text-warm-grey font-mono tracking-tight">
                    lumiere-dentaire.ma
                  </div>
                </div>
                <img
                  src="https://placehold.co/1200x700/0B1F33/14B8A6?text=Site+Web+Desktop"
                  alt="Lumière Dentaire — vue desktop"
                  className="w-full block"
                />
              </div>
              <p className="text-xs text-warm-grey mt-3 text-center">Vue desktop</p>
            </Reveal>

            {/* Mobile phone mockup — real screenshot */}
            <Reveal className="mx-auto md:mx-0 flex-shrink-0" custom={1}>
              <PhoneMockup className="w-[180px]" />
              <p className="text-xs text-warm-grey mt-3 text-center">Vue mobile</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-2xl mx-auto divide-y divide-border-grey/40">
          <div className="pb-14">
            <Reveal>
              <span className="text-[11px] uppercase tracking-widest text-warm-grey block mb-4">
                Situation avant
              </span>
              <h2 className="font-serif font-normal text-2xl md:text-3xl text-charcoal leading-snug mb-5">
                Un cabinet premium. Pas assez de patients.
              </h2>
              <p className="text-warm-grey leading-[1.75] text-[15px]">
                Lumière Dentaire avait tout ce qu'il fallait : une adresse dans
                le Maarif, un intérieur soigné, et une praticienne formée à
                Paris. Ce qui manquait, c'était une visibilité qui convertit. Le
                cabinet tournait à 40 % de sa capacité. Dr. Berrada passait ses
                soirées à booster des posts Instagram sans résultats mesurables,
                et dépendait entièrement du bouche-à-oreille pour remplir son
                agenda.
              </p>
            </Reveal>
          </div>

          <div className="py-14">
            <Reveal>
              <span className="text-[11px] uppercase tracking-widest text-warm-grey block mb-4">
                Ce qu'on a mis en place
              </span>
              <h2 className="font-serif font-normal text-2xl md:text-3xl text-charcoal leading-snug mb-5">
                Un système d'acquisition complet, déployé en 8 semaines.
              </h2>
              <p className="text-warm-grey leading-[1.75] text-[15px]">
                Campagnes Google Ads ciblées sur les quartiers Maarif et
                Gauthier, optimisation de la fiche Google Maps avec gestion
                active des avis, Meta Ads avec ciblage géographique précis, et
                un workflow WhatsApp Business pour confirmer et relancer
                automatiquement les rendez-vous. Chaque dirham dépensé était
                traçable jusqu'au patient assis dans le fauteuil.
              </p>
            </Reveal>
          </div>

          <div className="pt-14">
            <Reveal>
              <span className="text-[11px] uppercase tracking-widest text-warm-grey block mb-4">
                Les résultats
              </span>
              <h2 className="font-serif font-normal text-2xl md:text-3xl text-charcoal leading-snug mb-5">
                Une liste d'attente pour la première fois depuis l'ouverture.
              </h2>
              <p className="text-warm-grey leading-[1.75] text-[15px]">
                Dès le deuxième mois, le cabinet enregistrait 31 nouveaux
                patients — contre 10 en moyenne auparavant. Le coût
                d'acquisition moyen s'est stabilisé à 187 MAD par patient, pour
                un retour sur investissement de ×4.6 sur trois mois. Dr. Berrada
                a pu recruter une assistante supplémentaire et étendre ses
                horaires d'ouverture.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-primary-dark px-6 py-20 md:py-28 relative overflow-hidden">
        <div className="bg-noise" />
        <Reveal className="max-w-3xl mx-auto text-center relative">
          <div className="font-serif text-[5rem] leading-none text-primary-teal/30 select-none mb-4">
            "
          </div>
          <blockquote className="font-serif font-normal text-2xl md:text-[2rem] text-white leading-relaxed -mt-8">
            On avait un beau cabinet mais personne ne le connaissait. En deux
            mois, on avait une liste d'attente.
          </blockquote>
          <div className="mt-8 text-white/40 text-sm">
            Dr. Yasmine Berrada — Lumière Dentaire, Casablanca
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.unit} custom={i}>
              <div className="bg-white border border-border-grey/60 rounded-xl p-8 text-center shadow-[0_4px_24px_rgba(11,31,51,0.05)] hover:shadow-[0_8px_32px_rgba(11,31,51,0.1)] transition-shadow duration-300">
                <div className="font-serif text-5xl font-normal text-charcoal leading-none">
                  {s.value}
                </div>
                <div className="text-primary-teal text-xs font-medium mt-2 uppercase tracking-widest">
                  {s.unit}
                </div>
                <div className="text-warm-grey text-sm mt-4 leading-relaxed">
                  {s.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 md:pb-32">
        <Reveal className="max-w-xl mx-auto text-center">
          <h2 className="font-serif font-normal text-3xl md:text-4xl text-charcoal mb-4 leading-snug">
            Votre cabinet peut obtenir les mêmes résultats.
          </h2>
          <p className="text-warm-grey mb-8 text-[15px] leading-relaxed">
            Répondez à 8 questions. Notre équipe évalue si ClinicPro est adapté
            à votre situation — et vous propose une stratégie personnalisée.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center h-14 px-8 rounded-lg bg-primary-teal text-white font-medium text-base transition-colors duration-200 hover:bg-teal-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2"
          >
            Vérifier mon éligibilité →
          </Link>
          <p className="text-xs text-warm-grey mt-4">
            Gratuit · Sans engagement · Réponse sous 2h
          </p>
        </Reveal>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";

export default function Hero() {
  return (
    <section className="relative bg-primary-dark overflow-hidden min-h-screen md:min-h-[90vh] flex items-center pt-16">
      <div className="bg-noise" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-[60%_40%] gap-12 items-center py-16">
        <div className="text-left">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="block text-xs uppercase tracking-wider text-primary-teal mb-4"
          >
            CABINETS DENTAIRES — CASABLANCA
          </motion.span>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif font-normal text-4xl md:text-6xl leading-tight text-white"
          >
            Vos patients vous cherchent.
            <br />
            Le système qui les confirme.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/80 leading-relaxed mt-6 max-w-md"
          >
            Page de conversion, réponse WhatsApp automatique, suivi jusqu&apos;au
            rendez-vous. Vous récupérez les patients que vous perdiez sans le
            savoir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10"
          >
            <Link
              href="/questionnaire"
              className="flex w-full md:w-80 h-14 items-center justify-center rounded-lg bg-primary-teal text-white font-medium transition-colors hover:bg-teal-deep"
            >
              Vérifier mon éligibilité →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden md:flex relative justify-center"
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative" style={{ transform: "rotate(6deg)" }}>
            <Placeholder
              label="images/hero-phone-mockup.png"
              dark
              className="w-64 h-[520px] rounded-[2rem] shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

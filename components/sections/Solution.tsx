import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Placeholder from "@/components/Placeholder";

const steps = [
  {
    num: "01",
    image: "https://assets.cdn.filesafe.space/KMWHo9RzkyGFjhh757yd/media/6a48fc0e1bf938e547b0ea8a.png",
    title: "La page qui répond à sa place",
    body: "Une page pensée pour transformer un visiteur en demande en moins de 60 secondes. Pas un site vitrine — une machine à convertir.",
  },
  {
    num: "02",
    image: "images/step-2.png",
    title: "WhatsApp qui s'enclenche tout seul",
    body: "Dès qu'une demande tombe, le patient reçoit une réponse automatique. Personnalisée, professionnelle, immédiate. Même à 23h un dimanche.",
  },
  {
    num: "03",
    image: "images/step-3.png",
    title: "Le suivi qui ne lâche rien",
    body: "Confirmation, rappel 24h avant, message après visite. Aucun patient ne passe à travers les mailles. Aucun rendez-vous oublié.",
  },
];

export default function Solution() {
  return (
    <section className="relative bg-primary-dark py-16 md:py-24 overflow-hidden">
      <div className="bg-noise" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center font-serif font-normal text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
            Voilà ce qui change quand un patient vous trouve.
          </h2>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8 relative">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 100} className="relative">
              {i > 0 && (
                <div className="hidden md:block absolute -left-7 top-1/2 -translate-y-1/2 text-primary-teal/40">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
              {/* mobile vertical connector */}
              {i > 0 && (
                <div
                  className="md:hidden absolute -top-6 left-6 w-px h-6 bg-primary-teal/30"
                  aria-hidden="true"
                />
              )}
              <div className="font-serif font-normal text-5xl text-primary-teal">
                {step.num}
              </div>
              <FadeIn delay={i * 100 + 100}>
                <Placeholder
                  label={step.image}
                  dark
                  className="w-full aspect-[4/3] rounded-xl mt-6"
                />
              </FadeIn>
              <h3 className="font-serif text-2xl text-white mt-6">{step.title}</h3>
              <p className="text-base text-white/70 leading-relaxed mt-3 max-w-xs">
                {step.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

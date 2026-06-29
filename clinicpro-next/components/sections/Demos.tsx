import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Placeholder from "@/components/Placeholder";

const demos = [
  {
    image: "images/demo-1-mockup.png",
    name: "Cabinet généraliste — Démo",
    description:
      "Page type pour cabinet avec prise de rendez-vous standard et présentation des soins.",
    url: "#", // [PLACEHOLDER - replace with actual demo URL]
  },
  {
    image: "images/demo-2-mockup.png",
    name: "Cabinet d'orthodontie — Démo",
    description:
      "Page type pour cabinet spécialisé avec mise en avant des traitements premium.",
    url: "#", // [PLACEHOLDER - replace with actual demo URL]
  },
];

export default function Demos() {
  return (
    <section className="relative bg-primary-dark py-16 md:py-24 overflow-hidden">
      <div className="bg-noise" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn>
          <span className="block text-center text-xs uppercase tracking-wider text-primary-teal">
            VOIR LE SYSTÈME EN ACTION
          </span>
          <h2 className="text-center font-serif font-normal text-3xl md:text-5xl text-white mt-4 max-w-3xl mx-auto leading-tight">
            Voilà à quoi ressemble une page ClinicPro.
          </h2>
          <p className="text-center text-base text-white/70 leading-relaxed mt-4 max-w-2xl mx-auto">
            Ces démos montrent exactement ce que nous construisons pour les
            cabinets partenaires. Pas des maquettes — des pages fonctionnelles en
            conditions réelles.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          {demos.map((demo, i) => (
            <FadeIn key={demo.name} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6">
                <Placeholder
                  label={demo.image}
                  className="w-full aspect-[9/16] rounded-xl"
                />
                <div className="mt-6">
                  <span className="text-xs uppercase tracking-wider text-primary-teal">
                    DÉMO — PAGE TYPE
                  </span>
                  <h3 className="font-serif text-xl text-charcoal mt-2">
                    {demo.name}
                  </h3>
                  <p className="text-sm text-warm-grey mt-2">{demo.description}</p>
                  <Link
                    href={demo.url}
                    className="inline-block text-primary-dark underline text-sm mt-4 transition-colors hover:text-primary-teal"
                  >
                    Voir la démo →
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

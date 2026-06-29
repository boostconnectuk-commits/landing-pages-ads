import FadeIn from "@/components/FadeIn";
import CountUpStat from "@/components/CountUpStat";

const cards = [
  {
    end: 60,
    suffix: "%",
    label: "DEMANDES SANS RÉPONSE",
    body: "Le patient remplit un formulaire en soirée. Personne ne voit. Le lendemain matin, il a déjà pris rendez-vous ailleurs.",
  },
  {
    end: 1,
    suffix: " heure",
    label: "AVANT D'APPELER AILLEURS",
    body: "Passé ce délai, votre taux de conversion s'effondre. Et vous ne savez même pas que ce patient a existé.",
  },
  {
    end: 3,
    suffix: " heures",
    label: "ET LE LEAD EST FROID",
    body: "La majorité des cabinets rappellent le lendemain. Le patient a déjà pris rendez-vous, ou n'a plus envie.",
  },
];

export default function Problem() {
  return (
    <section className="bg-off-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-center font-serif font-normal text-3xl md:text-5xl text-charcoal max-w-2xl mx-auto leading-tight">
            Chaque jour, des patients vous appellent.
            <br />
            Et appellent ailleurs quand vous ne répondez pas.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((card, i) => (
            <FadeIn key={card.label} delay={i * 100}>
              <div className="bg-white border border-border-grey rounded-2xl p-8 md:p-10 h-full">
                <div className="font-serif font-normal text-6xl text-primary-dark">
                  <CountUpStat end={card.end} suffix={card.suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider text-primary-teal mt-2">
                  {card.label}
                </div>
                <p className="text-base text-warm-grey leading-relaxed mt-4">
                  {card.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <p className="text-xs text-warm-grey italic text-center mt-12">
          Benchmarks santé digitale — Maroc 2024
        </p>
      </div>
    </section>
  );
}

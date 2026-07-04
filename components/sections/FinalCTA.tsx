import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-primary-teal to-teal-deep">
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <FadeIn>
          <h2 className="font-serif font-normal text-4xl md:text-5xl text-white">
            Votre cabinet est-il éligible ?
          </h2>
          <p className="text-lg text-white/90 mt-4">
            9 questions. 90 secondes. Une réponse claire sous 2 heures.
          </p>
          <Link
            href="/questionnaire"
            className="inline-flex mt-10 h-14 w-80 md:w-96 mx-auto items-center justify-center rounded-lg bg-white text-primary-dark font-medium text-lg transition-colors hover:bg-off-white"
          >
            Commencer le questionnaire →
          </Link>
          <p className="text-sm text-white/70 mt-6 max-w-md mx-auto italic">
            Si votre cabinet n&apos;est pas éligible, on vous le dit. Si c&apos;est le
            bon match, on vous explique comment on procède.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

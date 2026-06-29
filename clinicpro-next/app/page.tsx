import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Tiers from "@/components/sections/Tiers";
import Demos from "@/components/sections/Demos";
import Commitments from "@/components/sections/Commitments";
import FinalCTA from "@/components/sections/FinalCTA";
import FAQFooter from "@/components/sections/FAQFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Tiers />
      <div id="demos">
        <Demos />
      </div>
      <Commitments />
      <FinalCTA />
      <FAQFooter />
    </main>
  );
}

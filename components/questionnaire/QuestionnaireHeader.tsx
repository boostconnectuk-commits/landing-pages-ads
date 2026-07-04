import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

export default function QuestionnaireHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-off-white border-b border-border-grey">
      <div className="max-w-2xl mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-clinicpro.png"
            alt="ClinicPro by BoostConnect"
            width={140}
            height={50}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          aria-label="Quitter le questionnaire"
          className="w-10 h-10 flex items-center justify-center rounded-full text-warm-grey hover:bg-border-grey/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/questionnaire")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-primary-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-white">
          ClinicPro
        </Link>
        <Link
          href="/questionnaire"
          className="hidden md:inline-flex h-10 items-center rounded-lg bg-primary-teal px-5 text-sm font-medium text-white transition-colors hover:bg-teal-deep"
        >
          Vérifier mon éligibilité
        </Link>
      </div>
    </header>
  );
}

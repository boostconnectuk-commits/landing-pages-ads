"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/questionnaire")) return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary-dark shadow-2xl p-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: 64 }}
    >
      <div className="flex gap-3 h-full">
        <Link
          href="/questionnaire"
          className="flex-1 h-12 flex items-center justify-center rounded-lg bg-primary-teal text-white font-medium"
        >
          Vérifier mon éligibilité →
        </Link>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#25D366] text-white flex-shrink-0"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}

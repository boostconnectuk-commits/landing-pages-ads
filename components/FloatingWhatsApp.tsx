"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

export default function FloatingWhatsApp() {
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
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrivez-nous sur WhatsApp"
      className={`hidden md:flex fixed bottom-6 right-6 z-50 h-14 items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg overflow-hidden transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } w-14 hover:w-44 group animate-wa-pulse`}
    >
      <span className="w-14 h-14 flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-7 h-7" />
      </span>
      <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-4">
        Écrivez-nous
      </span>
    </a>
  );
}

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ClinicPro — Le système qui confirme vos patients",
  description:
    "Page de conversion, réponse WhatsApp automatique, suivi jusqu'au rendez-vous. ClinicPro est le système d'acquisition patients pour les cabinets dentaires de Casablanca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} antialiased`}>
      <body className="bg-off-white text-charcoal font-sans">
        <Header />
        {children}
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}

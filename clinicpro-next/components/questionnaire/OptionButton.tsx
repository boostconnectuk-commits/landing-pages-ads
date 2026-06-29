"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OptionButton({
  label,
  selected,
  onClick,
  multi = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{ scale: selected ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      aria-pressed={selected}
      className={`w-full min-h-14 flex items-center gap-3 text-left rounded-xl border p-5 text-base text-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal ${
        selected
          ? "border-2 border-primary-teal bg-soft-mint/30"
          : "border-border-grey bg-white hover:border-primary-teal hover:bg-soft-mint/20"
      }`}
    >
      {multi && (
        <span
          className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center ${
            selected ? "bg-primary-teal border-primary-teal" : "border-border-grey"
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5 text-white" />}
        </span>
      )}
      <span>{label}</span>
    </motion.button>
  );
}

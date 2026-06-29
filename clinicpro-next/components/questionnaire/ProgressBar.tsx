"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-16 left-0 right-0 h-1 bg-border-grey z-40">
      <motion.div
        className="h-full bg-primary-teal"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

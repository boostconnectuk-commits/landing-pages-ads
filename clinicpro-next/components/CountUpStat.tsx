"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function CountUpStat({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-80px" }}
    >
      {started ? (
        <CountUp end={end} duration={1.2} prefix={prefix} suffix={suffix} />
      ) : (
        `${prefix}0${suffix}`
      )}
    </motion.span>
  );
}

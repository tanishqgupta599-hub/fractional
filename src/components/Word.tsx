"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface WordProps {
  word: string;
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

export default function Word({ word, i, total, scrollYProgress }: WordProps) {
  const start = i / total;
  const end = start + (1 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

  return (
    <motion.span
      style={{ opacity, willChange: "opacity" }}
      className="inline-block mr-4 mb-2 text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight transition-colors duration-200"
    >
      {word}
    </motion.span>
  );
}

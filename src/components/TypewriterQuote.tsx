"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function TypewriterQuote({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView || reduced) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text, reduced]);

  return (
    <p
      ref={ref}
      className="mb-10 text-lg md:text-2xl text-white/60 font-light italic min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center text-center px-2"
    >
      &ldquo;{reduced ? text : displayedText}&rdquo;
      <span
        className="w-[3px] h-[1.2em] ml-2 animate-pulse bg-white/50"
        aria-hidden="true"
      ></span>
    </p>
  );
}

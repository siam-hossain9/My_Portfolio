"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function TypewriterQuote({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <p ref={ref} className="mb-10 text-lg md:text-2xl text-white/60 font-light italic h-8 md:h-10 flex items-center justify-center">
      "{displayedText}"
      <span className="w-[3px] h-[1.2em] ml-2 animate-pulse bg-white/50"></span>
    </p>
  );
}

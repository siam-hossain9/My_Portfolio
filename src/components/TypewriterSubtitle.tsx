"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const roles = [
  "AI/ML Engineer",
  "Frontend Dev",
  "Problem Solver",
  "Tech Enthusiast",
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};

export default function TypewriterSubtitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Respect reduced-motion: show a single role without the typing loop.
    if (reduced) return;

    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      // Fully typed → pause, then begin deleting.
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && text === "") {
      // Fully deleted → advance to the next role.
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 400);
    } else {
      const speed = isDeleting ? 40 : 90;
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, reduced]);

  return (
    <motion.div
      variants={itemVariants}
      className="text-lg md:text-xl font-semibold mb-6 h-8 flex items-center justify-center sm:justify-start"
      style={{ color: "#00C2FF" }}
      aria-label={`Role: ${reduced ? roles[roleIndex] : text}`}
    >
      {reduced ? roles[roleIndex] : text}
      <span
        className="w-[3px] h-6 ml-1 animate-pulse"
        style={{ backgroundColor: "#00C2FF" }}
        aria-hidden="true"
      ></span>
    </motion.div>
  );
}

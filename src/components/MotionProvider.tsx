"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Honors the OS "reduce motion" setting for every framer-motion animation in
// the tree (transforms degrade to opacity-only). The matching CSS rule in
// globals.css covers Tailwind's animate-* utilities.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

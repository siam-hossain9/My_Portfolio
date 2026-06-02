"use client";
import { motion, MotionValue, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";

type CircleProps = React.ComponentProps<typeof motion.div> & { idx: number };

export const Circle = ({ className, idx, ...rest }: CircleProps) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-neutral-200 pointer-events-none z-0",
        className
      )}
    />
  );
};

export const Radar = ({ className, radarAngle }: { className?: string; radarAngle: MotionValue<number> }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full pointer-events-none",
        className
      )}
    >
      {/* Rotating sweep line */}
      <motion.div
        style={{ transformOrigin: "right center", rotate: radarAngle }}
        className="absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[500px] md:w-[800px] items-end justify-center overflow-hidden bg-transparent pointer-events-none"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent" />
      </motion.div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(0, 194, 255, ${0.15 - (idx * 0.015)})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  desc,
  link,
  delay,
  iconAngle,
  radarAngle,
  r,
}: {
  icon?: React.ReactNode;
  text?: string;
  desc?: string;
  link?: string;
  delay?: number;
  iconAngle: number;
  radarAngle: MotionValue<number>;
  r: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const active = isHovered || isFocused;

  // High-performance collision detection without re-renders (±12° sweep window)
  const isActiveOpacity = useTransform(radarAngle, [iconAngle - 12, iconAngle, iconAngle + 12], [0, 1, 0]);
  const boxShadow = useTransform(
    radarAngle,
    [iconAngle - 12, iconAngle, iconAngle + 12],
    ["0px 0px 0px rgba(0,194,255,0)", "0px 0px 25px rgba(0,194,255,0.7)", "0px 0px 0px rgba(0,194,255,0)"]
  );
  const borderColor = useTransform(
    radarAngle,
    [iconAngle - 12, iconAngle, iconAngle + 12],
    ["rgba(255,255,255,0.1)", "rgba(0,194,255,1)", "rgba(255,255,255,0.1)"]
  );
  
  // y offset for the tooltip (floats up slightly when active)
  const activeYOffset = useTransform(isActiveOpacity, [0, 1], [10, 0]);

  // Calculate coordinates based on polar values
  // radarAngle 0 is left. radarAngle 180 is right.
  // We use standard trigonometric math assuming bottom-center is origin.
  // We use percentages to ensure perfect responsiveness on mobile!
  // r is 0 to 100.
  // Maximum horizontal reach is 45% of container width from center to avoid clipping.
  // Maximum vertical reach is 90% of container height.
  const thetaRad = iconAngle * (Math.PI / 180);
  const leftPercent = -Math.cos(thetaRad) * (r * 0.45);
  const bottomPercent = +(Math.sin(thetaRad) * (r * 0.90)).toFixed(4);
  const finalLeft = +(50 + leftPercent).toFixed(4);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "50%" }}
      whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "50%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay ?? 0 }}
      className="absolute flex flex-col items-center justify-center space-y-2 z-50"
      style={{
        left: `${finalLeft}%`,
        bottom: `${bottomPercent}%`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${text}${desc ? ` — ${desc}` : ""} (opens GitHub in a new tab)`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050505] transition-colors pointer-events-auto"
        style={{
          boxShadow: active ? "0px 0px 15px rgba(0,194,255,0.4)" : boxShadow,
          borderColor: active ? "rgba(0,194,255,0.6)" : borderColor,
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        {icon}
        <span className="sr-only">{text}</span>
      </motion.a>

      {/* Tooltip */}
      <motion.div
        aria-hidden="true"
        className="absolute top-16 w-56 bg-[#050505]/95 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none z-[100]"
        style={{
          opacity: active ? 1 : isActiveOpacity,
          y: active ? 0 : activeYOffset,
        }}
      >
        <div className="text-center text-sm font-bold text-white mb-2 leading-tight">
          {text}
        </div>
        <div className="text-center text-xs text-white/60 leading-relaxed">
          {desc}
        </div>
      </motion.div>
    </motion.div>
  );
};

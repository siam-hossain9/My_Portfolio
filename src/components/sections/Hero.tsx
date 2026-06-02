"use client";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import TypewriterSubtitle from "@/components/TypewriterSubtitle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const IconCloud = dynamic(() => import("@/components/IconCloud"), { ssr: false });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};

const lyricLine1 = ["work it", "make it", "do it", "makes us"];
const lyricLine2 = ["harder", "better", "faster", "stronger"];

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  const renderLyric = (word: string, i: number, baseDelay: number) =>
    reduced ? (
      <span key={i} style={{ opacity: 0.9 }}>
        {word}
        {i !== 3 ? "," : ""}
      </span>
    ) : (
      <motion.span
        key={i}
        initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
        animate={{
          opacity: [0, 1, 1, 0, 0],
          x: [-10, 0, 0, 10, -10],
          filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.1, 0.7, 0.8, 1],
          delay: baseDelay + i * 0.15,
        }}
      >
        {word}
        {i !== 3 ? "," : ""}
      </motion.span>
    );

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="min-h-screen flex items-center justify-center relative bg-dot-grid"
      style={{ paddingTop: 80 }}
    >
      {/* Concentric Rings Overlay */}
      <div className="concentric-rings" aria-hidden="true">
        <div className="ring-inner"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative" style={{ zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <audio
            ref={audioRef}
            src="/audio/stronger.mp3"
            preload="none"
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <motion.button
            type="button"
            variants={itemVariants}
            onClick={toggleAudio}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Pause background music" : "Play Daft Punk — Harder, Better, Faster, Stronger"}
            className="group flex flex-col gap-1 mb-6 mx-auto lg:mx-0 text-left rounded-lg px-2 py-1 -ml-2 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "#00C2FF" }}>
              {isPlaying ? <Volume2 size={13} aria-hidden="true" /> : <VolumeX size={13} aria-hidden="true" />}
              <span className="opacity-60 group-hover:opacity-100 transition-opacity normal-case tracking-normal">
                {isPlaying ? "Now playing" : "Play soundtrack"}
              </span>
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex flex-wrap gap-2" style={{ color: "#00C2FF" }} aria-hidden="true">
              {lyricLine1.map((w, i) => renderLyric(w, i, 0))}
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex flex-wrap gap-2" style={{ color: "#FF8A00" }} aria-hidden="true">
              {lyricLine2.map((w, i) => renderLyric(w, i, 0.6))}
            </div>
          </motion.button>

          <motion.h1
            variants={itemVariants}
            className="font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#fff" }}
          >
            Siam Hossain <br />
            <span className="text-glow-animated">Nayon</span>
          </motion.h1>

          <TypewriterSubtitle />

          <motion.p
            variants={itemVariants}
            className="max-w-xl mx-auto lg:mx-0 mb-10 text-sm md:text-base"
            style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}
          >
            Architecting intelligent systems and crafting seamless web experiences.
            Bridging the gap between cutting-edge research and production-ready applications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4"
          >
            <a href="#projects" className="btn-primary w-full sm:w-auto">
              View Projects
            </a>
            <a href="/resume" className="btn-ghost w-full sm:w-auto">
              Résumé
            </a>
            <a href="#contact" className="btn-ghost w-full sm:w-auto">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden sm:flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[600px] w-full relative pointer-events-auto"
          aria-hidden="true"
        >
          {/* Soft glow behind the sphere */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)" }}
          />
          <IconCloud />
        </motion.div>
      </div>
    </section>
  );
}

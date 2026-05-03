"use client";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import TypewriterSubtitle from "@/components/TypewriterSubtitle";

const IconCloud = dynamic(() => import("@/components/IconCloud"), { ssr: false });

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-dot-grid" style={{ paddingTop: 80 }}>
      {/* Concentric Rings Overlay */}
      <div className="concentric-rings">
        <div className="ring-inner"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative" style={{ zIndex: 2 }}>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-left"
        >
          <audio ref={audioRef} src="/audio/stronger.mp3" preload="auto" loop />

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col gap-1 mb-6 cursor-pointer"
            onClick={toggleAudio}
            title="Click to play/pause Daft Punk"
          >
            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex flex-wrap gap-2" style={{ color: "#00C2FF" }}>
              {"work it, make it, do it, makes us".split(", ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  animate={{ 
                    opacity: [0, 1, 1, 0, 0], 
                    x: [-10, 0, 0, 10, -10], 
                    filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    times: [0, 0.1, 0.7, 0.8, 1],
                    delay: i * 0.15 
                  }}
                >
                  {word}{i !== 3 ? "," : ""}
                </motion.span>
              ))}
            </div>
            <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold flex flex-wrap gap-2" style={{ color: "#FF8A00" }}>
              {"harder, better, faster, stronger".split(", ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  animate={{ 
                    opacity: [0, 1, 1, 0, 0], 
                    x: [-10, 0, 0, 10, -10], 
                    filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(4px)"] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    times: [0, 0.1, 0.7, 0.8, 1],
                    delay: 0.6 + i * 0.15 
                  }}
                >
                  {word}{i !== 3 ? "," : ""}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#fff" }}
          >
            Siam Hossain{" "}<br/>
            <span
              style={{
                background: "linear-gradient(135deg, #00C2FF, #50E3C2, #ffffff, #FF8A00)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-shift 8s ease infinite"
              }}
            >
              Nayon
            </span>
          </motion.h1>

          <TypewriterSubtitle />

          <motion.p
            variants={itemVariants}
            className="max-w-xl mb-10 text-sm md:text-base"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
          >
            Architecting intelligent systems and crafting seamless web experiences.
            Bridging the gap between cutting-edge research and production-ready applications.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[600px] w-full relative pointer-events-auto"
        >
          {/* Soft glow behind the sphere */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)" }}
          />
          <IconCloud />
        </motion.div>
      </div>
      
      {/* Keyframe injection for the gradient shift */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
}

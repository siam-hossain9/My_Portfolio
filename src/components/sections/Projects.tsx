"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  FolderGit2,
  ArrowUpRight,
  Image as ImageIcon,
  Bot,
  Activity,
  Home,
  Gamepad2,
  CloudSun,
  Box,
  Banknote,
  Headset,
  Sparkles,
  PawPrint,
} from "lucide-react";
import { Radar, IconContainer } from "@/components/ui/radar-effect";

export type Project = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  link: string;
  delay: number;
  r: number;
  iconAngle: number;
};

// Angles sweep left (0°) → right (180°); radius alternates to spread points in 2D.
const projects: Project[] = [
  { title: "Financial System", desc: "Bank management system demonstrating OOP and polymorphism in C++.", icon: <Banknote size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/Financia", delay: 0.05, r: 42, iconAngle: 12 },
  { title: "CNN Image Classifier", desc: "Intel scene classification with a custom CNN, batch norm, and data augmentation.", icon: <ImageIcon size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/Intel-Image-Classification-CNN", delay: 0.1, r: 80, iconAngle: 28 },
  { title: "Weather Prediction", desc: "ML models trained on a decade of real-world climate data for forecasting.", icon: <CloudSun size={24} className="text-[#50E3C2]" />, link: "https://github.com/siam-hossain9/weather-prediction-project", delay: 0.15, r: 34, iconAngle: 44 },
  { title: "Customer Support AI Agent", desc: "Conversational AI agent that automates customer-support workflows.", icon: <Headset size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/customer-support-ai-agent", delay: 0.2, r: 66, iconAngle: 60 },
  { title: "Siam AI Chatbot", desc: "Full-stack AI assistant with a 3D-backed conversational UI, built on Next.js.", icon: <Bot size={24} className="text-[#50E3C2]" />, link: "https://github.com/siam-hossain9/siam-ai-chatbot", delay: 0.25, r: 90, iconAngle: 76 },
  { title: "Dororo", desc: "Animated, interactive web experience — live on Vercel.", icon: <Sparkles size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/dororo", delay: 0.3, r: 48, iconAngle: 92 },
  { title: "Virtual Pet", desc: "Browser-based virtual pet game built with Next.js and TypeScript.", icon: <PawPrint size={24} className="text-[#FF5E5E]" />, link: "https://github.com/siam-hossain9/virtual-pet", delay: 0.35, r: 82, iconAngle: 108 },
  { title: "OpenGL Village", desc: "Interactive 3D village scene rendered with OpenGL/GLUT in C++.", icon: <Box size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/village-image-glut-project", delay: 0.4, r: 38, iconAngle: 124 },
  { title: "Reaction Time Game", desc: "Multiplayer Arduino game with an OLED display for reaction measurement.", icon: <Gamepad2 size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/Reaction-Time-Game_IOT_Project", delay: 0.45, r: 70, iconAngle: 140 },
  { title: "Smart Home IoT", desc: "Arduino smart home with rain detection, servo control, and sensor automation.", icon: <Home size={24} className="text-[#50E3C2]" />, link: "https://github.com/siam-hossain9/Smart_Home_IOT_Project", delay: 0.5, r: 52, iconAngle: 156 },
  { title: "DevOps Incident Response", desc: "Automated incident-response pipeline for DevOps workflows.", icon: <Activity size={24} className="text-[#FF5E5E]" />, link: "https://github.com/siam-hossain9/DevOps-Incident-Response-Automation", delay: 0.55, r: 86, iconAngle: 168 },
];

export default function Projects() {
  const radarAngle = useMotionValue(0);
  const radarRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(radarRef, { margin: "-10%" });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      radarAngle.set(90);
      return;
    }
    if (!isInView) return; // only sweep while the radar is on screen
    const controls = animate(radarAngle, 180, {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [radarAngle, isInView, reduced]);

  return (
    <section id="projects" className="py-28 md:py-36 relative bg-dot-grid overflow-hidden" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-label mb-16 flex justify-center items-center w-full"
        >
          <FolderGit2 size={24} style={{ color: "#00C2FF" }} aria-hidden="true" />
          <h2>Featured.Projects</h2>
        </motion.div>

        {/* DESKTOP: Radar UI */}
        <div
          ref={radarRef}
          className="relative hidden lg:flex min-h-[700px] w-full flex-col items-center justify-start pt-10 overflow-visible"
        >
          {/* Scatter Plot Projects */}
          <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
            {projects.map((p) => (
              <IconContainer
                key={p.title}
                text={p.title}
                desc={p.desc}
                icon={p.icon}
                link={p.link}
                delay={p.delay}
                iconAngle={p.iconAngle}
                r={p.r}
                radarAngle={radarAngle}
              />
            ))}
          </div>

          {/* Radar Background */}
          <Radar className="absolute bottom-[-40px] left-1/2 -translate-x-1/2" radarAngle={radarAngle} />

          {/* Bottom Gradient Fade */}
          <div className="absolute -bottom-10 z-[41] h-20 w-[150%] bg-gradient-to-t from-[#000] via-[#000]/80 to-transparent pointer-events-none" />
        </div>

        {/* MOBILE / TABLET: Accessible project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              className="glass group flex items-start gap-4 p-5"
            >
              <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b0b0b] border border-white/10">
                {p.icon}
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white truncate">{p.title}</span>
                  <ArrowUpRight size={16} className="shrink-0 text-white/40 group-hover:text-[#00C2FF] transition-colors" aria-hidden="true" />
                </span>
                <span className="block mt-1 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {p.desc}
                </span>
              </span>
            </motion.a>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 lg:mt-10 text-center relative z-50"
        >
          <a
            href="https://github.com/siam-hossain9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:text-white"
            style={{ color: "#00C2FF" }}
          >
            View all repositories on GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

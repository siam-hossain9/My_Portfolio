"use client";
import { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { FolderGit2, ArrowUpRight, Brain, Image as ImageIcon, Bot, Activity, Home, Gamepad2, CloudSun, Box, Banknote, Headset, Sparkles, PawPrint } from "lucide-react";
import { Radar, IconContainer } from "@/components/ui/radar-effect";

const projects = [
  // Distributed randomly in a semi-circle: 
  // angle (0 to 180, where 0 is left, 180 is right), r is distance from center (0 to 100%)
  { title: "Financial System", desc: "Bank management system demonstrating OOP and polymorphism in C++.", icon: <Banknote size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/Financia", delay: 0.1, r: 40, iconAngle: 15 },
  { title: "CNN Image Classifier", desc: "Intel Image Classification with custom CNN, batch norm, and data augmentation.", icon: <ImageIcon size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/Intel-Image-Classification-CNN", delay: 0.2, r: 70, iconAngle: 35 },
  { title: "Customer Support AI Agent", desc: "Conversational AI agent that automates customer-support workflows.", icon: <Headset size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/customer-support-ai-agent", delay: 0.25, r: 78, iconAngle: 47 },
  { title: "Weather Prediction", desc: "ML models trained on real-world datasets for forecasting.", icon: <CloudSun size={24} className="text-[#50E3C2]" />, link: "https://github.com/siam-hossain9/weather-prediction-project", delay: 0.3, r: 30, iconAngle: 55 },
  { title: "Few-Shot Classification", desc: "98.85% on CUB-200. DINOv2 + CLIP baselines.", icon: <Brain size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/few-shot-fine-grained-baselines", delay: 0.4, r: 90, iconAngle: 75 },
  { title: "Siam AI Chatbot", desc: "Full-stack AI assistant with conversational UI, built on Next.js.", icon: <Bot size={24} className="text-[#50E3C2]" />, link: "https://github.com/siam-hossain9/siam-ai-chatbot", delay: 0.5, r: 50, iconAngle: 90 },
  { title: "Dororo", desc: "Animated, interactive web experience — live on Vercel.", icon: <Sparkles size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/dororo", delay: 0.55, r: 58, iconAngle: 100 },
  { title: "OpenGL Village", desc: "Interactive 3D village scene rendered with custom GLSL shaders.", icon: <Box size={24} className="text-[#FF5E5E]" />, link: "https://github.com/siam-hossain9/village-image-glut-project", delay: 0.6, r: 85, iconAngle: 110 },
  { title: "Reaction Time Game", desc: "Multiplayer Arduino game with OLED display for reaction measurement.", icon: <Gamepad2 size={24} className="text-[#FF8A00]" />, link: "https://github.com/siam-hossain9/Reaction-Time-Game_IOT_Project", delay: 0.7, r: 35, iconAngle: 135 },
  { title: "Virtual Pet", desc: "Browser-based virtual pet game built with Next.js and TypeScript.", icon: <PawPrint size={24} className="text-[#FF5E5E]" />, link: "https://github.com/siam-hossain9/virtual-pet", delay: 0.75, r: 80, iconAngle: 147 },
  { title: "Smart Home IoT", desc: "Arduino-based smart home with sensors for intelligent environment control.", icon: <Home size={24} className="text-[#00C2FF]" />, link: "https://github.com/siam-hossain9/Smart_Home_IOT_Project", delay: 0.8, r: 65, iconAngle: 155 },
  { title: "DevOps Incident Response", desc: "Automated incident response for DevOps workflows.", icon: <Activity size={24} className="text-[#FF5E5E]" />, link: "https://github.com/siam-hossain9/DevOps-Incident-Response-Automation", delay: 0.9, r: 45, iconAngle: 170 },
];

export default function Projects() {
  const radarAngle = useMotionValue(0);

  useEffect(() => {
    // 5 seconds from 0 to 180, then reverse.
    const controls = animate(radarAngle, 180, {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
      repeatType: "mirror"
    });
    return controls.stop;
  }, [radarAngle]);

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
          <FolderGit2 size={24} style={{ color: "#00C2FF" }} />
          <h2>Featured.Projects</h2>
        </motion.div>

        {/* RADAR UI LAYOUT */}
        <div className="relative flex min-h-[600px] md:min-h-[700px] w-full flex-col items-center justify-start pt-10 overflow-hidden md:overflow-visible">
          
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

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center relative z-50"
        >
          <a
            href="https://github.com/siam-hossain9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ color: "#00C2FF" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.textShadow = "0 0 15px rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#00C2FF";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            View all repositories on GitHub
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

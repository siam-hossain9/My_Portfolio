"use client";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import TypewriterQuote from "@/components/TypewriterQuote";

const nodes = {
  embedded: {
    title: "Embedded Systems & IoT",
    color: "#00C2FF",
    desc: "I design and build real hardware projects where software meets the physical world. Using Arduino and C++, I have developed a multiplayer Reaction Time Game with OLED display feedback and a Smart Home Automation system with rain detection, servo motor control, and automated responses. I understand how to write firmware, work with sensors, and make hardware behave intelligently. Building systems that operate reliably in the real world is something I find deeply rewarding."
  },
  ml: {
    title: "Machine Learning & Artificial Intelligence",
    color: "#FF8A00",
    desc: "I build systems that learn from data and make intelligent decisions. My work includes a Weather Prediction model trained on ten years of climate data, a CNN-based image classifier using TensorFlow, and a few-shot fine-grained classification project leveraging DINOv2 and CLIP. I work confidently in Python across the full ML pipeline from data preparation to model evaluation using Jupyter and Google Colab. I also actively use AI tools in my daily workflow to work faster and deliver smarter results."
  },
  fullstack: {
    title: "Full-Stack Web Development",
    color: "#50E3C2",
    desc: "I build web experiences that are both technically solid and visually compelling. My projects include an immersive animated website with React, Vite, Three.js, and custom GLSL shaders, a Netflix-inspired streaming platform integrating multiple live APIs, and Financia — a complete financial management system with a PHP and MySQL backend. I work across the full stack with HTML, CSS, JavaScript, TypeScript, PHP, React, Next.js, and Three.js, always balancing clean code with strong user experience."
  },
  automation: {
    title: "Software, Automation & Beyond",
    color: "#FF5E5E",
    desc: "My software work spans a 3D OpenGL village scene renderer, a multiplayer Snake Game, a console-based Bank Management System, and a browser-based Virtual Pet built in Next.js and TypeScript. Beyond coding, I build automated workflows using N8N to connect apps, APIs, and services — reducing manual effort and running processes intelligently in the background. I program across C++, Java, C#, Python, and JavaScript, and I approach every problem — whether low-level or high-level — with the same standard of precision and care."
  }
};

type NodeData = { title: string; color: string; desc: string };

const NodeCard = ({ data, delay = 0 }: { data: NodeData; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="glass w-full relative p-6 md:p-8 flex flex-col h-full hover:border-white/20 transition-all duration-300"
  >
    {/* Colored top accent line */}
    <div 
      className="absolute top-0 left-0 w-full h-[3px] rounded-t-2xl opacity-70"
      style={{ background: `linear-gradient(90deg, transparent, ${data.color}, transparent)` }}
    />
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight" style={{ color: data.color }}>
      {data.title}
    </h3>
    <p className="text-xs md:text-sm text-white/60 leading-[1.8] flex-grow">
      {data.desc}
    </p>
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative bg-dot-grid" style={{ zIndex: 2 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Header & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex justify-center w-full items-center gap-3"
        >
          <Terminal size={32} style={{ color: "#00C2FF" }} />
          <h2 className="text-4xl md:text-5xl font-extrabold text-glow-animated tracking-tight m-0 border-none pb-0">About.me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-24 text-center"
        >
          <p className="mb-8 text-xl md:text-3xl font-medium leading-[1.6] text-white/90">
            I&apos;m a Computer Science &amp; Engineering student at AIUB with a deep curiosity for technology across every layer—from the <span style={{ color: "#00C2FF" }}>hardware</span> sitting on a desk to the <span style={{ color: "#FF8A00" }}>intelligent systems</span> running in the cloud.
          </p>
          <TypewriterQuote text="Do it better than anybody you ever seen do it" />
          <div className="inline-block px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(80,227,194,0.1)]">
            <p className="text-sm md:text-base text-white/80 tracking-widest uppercase font-semibold">
              My journey spans <span style={{ color: "#50E3C2" }}>four distinct worlds</span> of tech
            </p>
          </div>
        </motion.div>

        {/* --- DESKTOP MIND MAP LAYOUT --- */}
        <div className="hidden lg:flex flex-col items-center w-full relative pt-10">
          
          {/* Top Row: 3 Columns */}
          <div className="grid grid-cols-3 gap-10 w-full z-10">
            <NodeCard data={nodes.embedded} delay={0.2} />
            <div className="transform -translate-y-12">
              <NodeCard data={nodes.ml} delay={0.3} />
            </div>
            <NodeCard data={nodes.fullstack} delay={0.4} />
          </div>

          {/* SVG Connection Gap */}
          <div className="w-full h-24 relative -mt-8 -mb-4 z-0 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Base Lines */}
                <path d="M 50 100 C 50 50, 16.66 50, 16.66 0" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
                <path d="M 50 100 L 50 -50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
                <path d="M 50 100 C 50 50, 83.33 50, 83.33 0" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
                
                {/* Moving Particles (Dashes) */}
                <path d="M 50 100 C 50 50, 16.66 50, 16.66 0" stroke="#00C2FF" strokeWidth="4" vectorEffect="non-scaling-stroke" fill="none" strokeDasharray="3 100" pathLength="100" style={{ animation: 'dash-move 3s linear infinite' }} strokeLinecap="round" />
                <path d="M 50 100 L 50 -50" stroke="#FF8A00" strokeWidth="4" vectorEffect="non-scaling-stroke" fill="none" strokeDasharray="3 100" pathLength="100" style={{ animation: 'dash-move 4s linear infinite', animationDelay: '1s' }} strokeLinecap="round" />
                <path d="M 50 100 C 50 50, 83.33 50, 83.33 0" stroke="#50E3C2" strokeWidth="4" vectorEffect="non-scaling-stroke" fill="none" strokeDasharray="3 100" pathLength="100" style={{ animation: 'dash-move 3.5s linear infinite', animationDelay: '0.5s' }} strokeLinecap="round" />
             </svg>
             {/* Central Dot */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 bg-[#FF8A00] rounded-full shadow-[0_0_20px_#FF8A00] z-20 border-4 border-[#050505]" />
          </div>

          {/* Bottom Row: 1 Node */}
          <div className="w-1/3 z-10 pt-4">
            <NodeCard data={nodes.automation} delay={0.5} />
          </div>
        </div>

        {/* --- MOBILE/TABLET FALLBACK LAYOUT --- */}
        <div className="flex lg:hidden flex-col gap-6">
          <NodeCard data={nodes.ml} delay={0.2} />
          <NodeCard data={nodes.embedded} delay={0.3} />
          <NodeCard data={nodes.fullstack} delay={0.4} />
          <NodeCard data={nodes.automation} delay={0.5} />
        </div>

      </div>
    </section>
  );
}

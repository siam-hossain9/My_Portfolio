"use client";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const categories = [
  { title: "Languages", items: ["C++", "Python", "JavaScript", "TypeScript", "Java", "PHP", "C#", "HTML", "CSS", "GLSL"] },
  { title: "Libraries & Frameworks", items: ["PyTorch", "DINOv2", "CLIP", "React", "Next.js", "Three.js", "Tailwind"] },
  { title: "Tools & Hardware", items: ["Git", "Docker", "N8N", "Claude", "Open Route", "Antigravity", "Arduino", "Sensors", "Servo Motors"] },
  { title: "Graphics & Databases", items: ["OpenGL", "WebGL", "MySQL", "PostgreSQL", "Oracle"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 relative bg-dot-grid" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <Code2 size={24} style={{ color: "#FF8A00" }} />
          <h2>Tech.Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass"
              style={{ padding: "28px", cursor: "default" }}
            >
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-5 pb-3"
                style={{ color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="py-28 md:py-36 relative bg-dot-grid" style={{ zIndex: 2 }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <BookOpen size={24} style={{ color: "#FF8A00" }} />
          <h2>Research</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass relative overflow-hidden"
          style={{ padding: "40px", cursor: "default" }}
        >
          {/* Top-right glow */}
          <div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,194,255,0.1), transparent 70%)" }}
          />

          <h3 className="text-xl md:text-2xl font-bold mb-5" style={{ color: "#fff" }}>
            Few-Shot Fine-Grained Image Classification
          </h3>

          <p className="text-sm md:text-base mb-8" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
            A comprehensive study on utilizing foundational vision models
            (<span style={{ color: "#00C2FF" }}>DINOv2</span>,{" "}
            <span style={{ color: "#00C2FF" }}>CLIP</span>,{" "}
            <span style={{ color: "#00C2FF" }}>ViT</span>) as powerful feature extractors
            for few-shot learning scenarios — demonstrating that simple linear probing
            outpaces complex, specialized meta-learning frameworks.
          </p>

          <div
            className="rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "24px",
            }}
          >
            <h4 className="flex items-center gap-2 text-sm font-bold mb-4" style={{ color: "#fff" }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#FF8A00" }}
              />
              Key Results
            </h4>
            <div className="space-y-3">
              {[
                { dataset: "CUB-200-2011", acc: "98.85%" },
                { dataset: "Oxford Flowers-102", acc: "99.97%" },
              ].map((r) => (
                <div key={r.dataset} className="flex items-center justify-between text-sm">
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{r.dataset}</span>
                  <span className="font-bold" style={{ color: "#50E3C2" }}>{r.acc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

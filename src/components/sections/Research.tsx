"use client";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";

const studies = [
  {
    title: "Galaxy Morphology Classification & Open-Set Detection",
    link: "https://github.com/siam-hossain9/galaxy-morphology-classification",
    glow: "rgba(0,194,255,0.1)",
    dot: "#00C2FF",
    blurb: (
      <>
        A two-stage <span style={{ color: "#00C2FF" }}>ResNet50</span> fine-tuning
        pipeline with <span style={{ color: "#00C2FF" }}>focal loss</span>, paired with{" "}
        <span style={{ color: "#00C2FF" }}>VAE</span> and{" "}
        <span style={{ color: "#00C2FF" }}>Mahalanobis</span> detectors on the learned
        embedding to flag novel, rare galaxies the classifier has never seen.
      </>
    ),
    results: [
      { dataset: "Galaxy Zoo — Test Accuracy", acc: "92.96%" },
      { dataset: "Rare-galaxy — Far-OOD AUROC", acc: "~1.000" },
    ],
  },
  {
    title: "Few-Shot Fine-Grained Image Classification",
    link: "https://github.com/siam-hossain9/few-shot-fine-grained-baselines",
    glow: "rgba(255,138,0,0.1)",
    dot: "#FF8A00",
    blurb: (
      <>
        A comprehensive study on utilizing foundational vision models
        (<span style={{ color: "#00C2FF" }}>DINOv2</span>,{" "}
        <span style={{ color: "#00C2FF" }}>CLIP</span>,{" "}
        <span style={{ color: "#00C2FF" }}>ViT</span>) as powerful feature extractors
        for few-shot learning scenarios — demonstrating that simple linear probing
        outpaces complex, specialized meta-learning frameworks.
      </>
    ),
    results: [
      { dataset: "CUB-200-2011", acc: "98.85%" },
      { dataset: "Oxford Flowers-102", acc: "99.97%" },
    ],
  },
];

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

        <div className="space-y-6">
          {studies.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass relative overflow-hidden"
              style={{ padding: "40px", cursor: "default" }}
            >
              {/* Top-right glow */}
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${s.glow}, transparent 70%)` }}
              />

              <div className="flex items-start justify-between gap-4 mb-5">
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: "#fff" }}>
                  {s.title}
                </h3>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.title} on GitHub`}
                  className="shrink-0 mt-1 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
                  style={{ color: s.dot }}
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>

              <p className="text-sm md:text-base mb-8" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.85 }}>
                {s.blurb}
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
                  <span className="w-2 h-2 rounded-full" style={{ background: s.dot }} />
                  Key Results
                </h4>
                <div className="space-y-3">
                  {s.results.map((r) => (
                    <div key={r.dataset} className="flex items-center justify-between text-sm">
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>{r.dataset}</span>
                      <span className="font-bold" style={{ color: "#50E3C2" }}>{r.acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

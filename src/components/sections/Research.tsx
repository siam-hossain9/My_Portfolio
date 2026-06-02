"use client";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";

type Study = {
  title: string;
  blurb: React.ReactNode;
  results: { dataset: string; metric: string; acc: string }[];
  link: string;
  accent: string;
};

const studies: Study[] = [
  {
    title: "Galaxy Morphology Classification & Open-Set Detection",
    accent: "#00C2FF",
    blurb: (
      <>
        A two-stage{" "}
        <span style={{ color: "#00C2FF" }}>ResNet50</span> fine-tuning pipeline with{" "}
        <span style={{ color: "#00C2FF" }}>focal loss</span> for classifying galaxy
        morphologies, paired with{" "}
        <span style={{ color: "#00C2FF" }}>VAE</span> and{" "}
        <span style={{ color: "#00C2FF" }}>Mahalanobis</span> detectors operating on the
        learned embedding to flag novel, rare galaxies the classifier has never seen.
      </>
    ),
    results: [
      { dataset: "Galaxy Zoo", metric: "Test Accuracy", acc: "92.96%" },
      { dataset: "Rare-galaxy detection", metric: "Far-OOD AUROC", acc: "~1.000" },
    ],
    link: "https://github.com/siam-hossain9/galaxy-morphology-classification",
  },
  {
    title: "Few-Shot Fine-Grained Image Classification",
    accent: "#FF8A00",
    blurb: (
      <>
        A comprehensive study on using foundational vision models (
        <span style={{ color: "#FF8A00" }}>DINOv2</span>,{" "}
        <span style={{ color: "#FF8A00" }}>CLIP</span>,{" "}
        <span style={{ color: "#FF8A00" }}>ViT</span>) as powerful feature extractors for
        few-shot learning — demonstrating that simple linear probing outpaces complex,
        specialized meta-learning frameworks.
      </>
    ),
    results: [
      { dataset: "CUB-200-2011", metric: "Accuracy", acc: "98.85%" },
      { dataset: "Oxford Flowers-102", metric: "Accuracy", acc: "99.97%" },
    ],
    link: "https://github.com/siam-hossain9/few-shot-fine-grained-baselines",
  },
];

function StudyCard({ study, delay }: { study: Study; delay: number }) {
  return (
    <motion.a
      href={study.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      className="glass relative overflow-hidden flex flex-col group"
      style={{ padding: "32px" }}
    >
      {/* Top-right glow */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${study.accent}1a, transparent 70%)` }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-lg md:text-xl font-bold leading-snug" style={{ color: "#fff" }}>
          {study.title}
        </h3>
        <ArrowUpRight
          size={20}
          className="shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: study.accent }}
          aria-hidden="true"
        />
      </div>

      <p className="text-sm md:text-[15px] mb-7 flex-grow" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
        {study.blurb}
      </p>

      <div
        className="rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "20px",
        }}
      >
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: study.accent }} aria-hidden="true" />
          Key Results
        </h4>
        <div className="space-y-3">
          {study.results.map((r) => (
            <div key={r.dataset} className="flex items-center justify-between gap-3 text-sm">
              <span style={{ color: "rgba(255,255,255,0.6)" }}>
                {r.dataset}
                <span className="block text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{r.metric}</span>
              </span>
              <span className="font-bold text-base whitespace-nowrap" style={{ color: "#50E3C2" }}>{r.acc}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Research() {
  return (
    <section id="research" className="py-28 md:py-36 relative bg-dot-grid" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <BookOpen size={24} style={{ color: "#FF8A00" }} aria-hidden="true" />
          <h2>Research</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studies.map((s, i) => (
            <StudyCard key={s.title} study={s} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

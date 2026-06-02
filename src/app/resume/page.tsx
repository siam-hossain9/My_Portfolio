import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Siam Hossain Nayon — AI/ML Engineer and Full-Stack Web Developer. Machine Learning, Computer Vision, and production-ready web applications.",
  alternates: { canonical: "/resume" },
};

const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C++", "Python", "JavaScript", "TypeScript", "Java", "PHP", "C#", "SQL", "GLSL"] },
  { group: "ML / AI", items: ["PyTorch", "TensorFlow", "DINOv2", "CLIP", "ResNet", "CNNs", "scikit-learn"] },
  { group: "Web", items: ["React", "Next.js", "Three.js", "Tailwind CSS", "Node.js", "MySQL", "PostgreSQL"] },
  { group: "Tools & Hardware", items: ["Git", "Docker", "n8n", "Arduino", "OpenGL", "Jupyter", "Google Colab"] },
];

const research: { title: string; detail: string; metric: string; link: string }[] = [
  {
    title: "Galaxy Morphology Classification & Open-Set Detection",
    detail:
      "Two-stage ResNet50 fine-tuning with focal loss; VAE + Mahalanobis detectors on the learned embedding flag novel galaxies.",
    metric: "92.96% test accuracy (Galaxy Zoo) · Far-OOD AUROC ~1.000",
    link: "https://github.com/siam-hossain9/galaxy-morphology-classification",
  },
  {
    title: "Few-Shot Fine-Grained Image Classification",
    detail:
      "Foundational vision models (DINOv2, CLIP, ViT) as feature extractors — simple linear probing outperforms specialized meta-learning.",
    metric: "98.85% (CUB-200-2011) · 99.97% (Oxford Flowers-102)",
    link: "https://github.com/siam-hossain9/few-shot-fine-grained-baselines",
  },
];

const projects: { title: string; detail: string; tech: string; link: string }[] = [
  { title: "Customer Support AI Agent", detail: "Conversational AI agent automating customer-support workflows.", tech: "AI · Agents", link: "https://github.com/siam-hossain9/customer-support-ai-agent" },
  { title: "Siam AI Chatbot", detail: "Full-stack AI assistant with a 3D-backed conversational UI.", tech: "Next.js · TypeScript", link: "https://github.com/siam-hossain9/siam-ai-chatbot" },
  { title: "Intel Image Classification (CNN)", detail: "Custom CNN with batch norm and augmentation for scene classification.", tech: "PyTorch · CNN", link: "https://github.com/siam-hossain9/Intel-Image-Classification-CNN" },
  { title: "Financia", detail: "Financial management system with a PHP + MySQL backend.", tech: "PHP · MySQL", link: "https://github.com/siam-hossain9/Financia" },
  { title: "Smart Home IoT", detail: "Arduino smart home: rain detection, servo control, sensor automation.", tech: "Arduino · C++", link: "https://github.com/siam-hossain9/Smart_Home_IOT_Project" },
  { title: "OpenGL Village", detail: "Interactive 3D village scene rendered with OpenGL/GLUT.", tech: "C++ · OpenGL", link: "https://github.com/siam-hossain9/village-image-glut-project" },
];

const contacts = [
  { icon: Mail, label: "siamhossain1130@gmail.com", href: "mailto:siamhossain1130@gmail.com" },
  { icon: MapPin, label: "Dhaka, Bangladesh", href: null },
  { icon: GithubIcon, label: "github.com/siam-hossain9", href: "https://github.com/siam-hossain9" },
  { icon: LinkedinIcon, label: "linkedin.com/in/siam-hossain", href: "https://www.linkedin.com/in/siam-hossain-00788226b/" },
  { icon: Globe, label: "siamsportfolio.vercel.app", href: "https://siamsportfolio.vercel.app" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#00C2FF] mb-4 pb-2 border-b border-white/10 print:text-black print:border-black/20">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <main className="resume-doc min-h-screen text-white print:bg-white print:text-black" style={{ background: "#070707" }}>
      {/* Top action bar — hidden in print */}
      <div className="no-print sticky top-0 z-10 backdrop-blur-md" style={{ background: "rgba(5,5,5,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="nav-link inline-flex items-center gap-2">
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </Link>
          <PrintButton />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 sm:px-10 py-12 print:py-0 print:px-0">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
            Siam Hossain Nayon
          </h1>
          <p className="mt-1 text-base font-semibold text-[#00C2FF] print:text-black">
            AI/ML Engineer · Full-Stack Web Developer
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {contacts.map((c) => {
              const Icon = c.icon;
              const content = (
                <span className="inline-flex items-center gap-1.5 print:text-black">
                  <Icon size={13} aria-hidden="true" /> {c.label}
                </span>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {content}
                </a>
              ) : (
                <span key={c.label}>{content}</span>
              );
            })}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-sm leading-relaxed print:text-black" style={{ color: "rgba(255,255,255,0.8)" }}>
            Computer Science &amp; Engineering student at AIUB working across the full stack —
            from machine learning and computer vision to production web applications and embedded
            systems. I build systems that learn from data, ship polished interactive interfaces,
            and connect services with automation. Comfortable owning a problem end to end, from
            data and firmware to UI and deployment.
          </p>
        </section>

        {/* Education */}
        <section className="mb-8">
          <SectionTitle>Education</SectionTitle>
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white print:text-black">
                B.Sc. in Computer Science &amp; Engineering
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                American International University-Bangladesh (AIUB)
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="mb-8">
          <SectionTitle>Research</SectionTitle>
          <div className="space-y-4">
            {research.map((r) => (
              <div key={r.title}>
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#00C2FF] transition-colors print:text-black">
                  {r.title}
                </a>
                <p className="text-sm mt-0.5 print:text-black" style={{ color: "rgba(255,255,255,0.75)" }}>{r.detail}</p>
                <p className="text-xs mt-1 font-semibold text-[#50E3C2] print:text-black">{r.metric}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-8">
          <SectionTitle>Selected Projects</SectionTitle>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.title} className="flex items-baseline justify-between gap-4">
                <div className="min-w-0">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#00C2FF] transition-colors print:text-black">
                    {p.title}
                  </a>
                  <p className="text-sm print:text-black" style={{ color: "rgba(255,255,255,0.7)" }}>{p.detail}</p>
                </div>
                <span className="shrink-0 text-[11px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.5)" }}>{p.tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-4">
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s.group} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="text-sm font-bold w-40 shrink-0 text-white print:text-black">{s.group}</span>
                <span className="text-sm print:text-black" style={{ color: "rgba(255,255,255,0.75)" }}>{s.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

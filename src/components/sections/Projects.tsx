"use client";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon } from "@/components/BrandIcons";

/* ───────────────────────── Data ───────────────────────── */

type Project = {
  slug: string;
  cat: string;
  title: string;
  blurb: string;
  detail: string;
  tech: string[];
  images: number; // number of /projects/<slug>/N.webp files (0 = none)
  github?: string;
  live?: string;
};

const CATS: { id: string; name: string; tag: string; accent: string; icon: ReactNode }[] = [
  { id: "ai", name: "AI & Machine Learning", tag: "models · agents · assistants", accent: "#00C2FF", icon: <BrainIcon /> },
  { id: "auto", name: "Automation (n8n)", tag: "workflows · lead-gen · CRM", accent: "#7C5CFF", icon: <FlowIcon /> },
  { id: "web", name: "Web & Interactive", tag: "sites · apps · 3D", accent: "#50E3C2", icon: <SparkIcon /> },
  { id: "mobile", name: "Mobile & Games", tag: "flutter · android · godot", accent: "#FF8A00", icon: <GamepadIcon /> },
  { id: "systems", name: "Systems & Hardware", tag: "c++ · cli · iot", accent: "#FF5E5E", icon: <ChipIcon /> },
  { id: "research", name: "Research", tag: "computer vision · deep learning", accent: "#C08CFF", icon: <FlaskIcon /> },
];

const PROJECTS: Project[] = [
  // ── AI & Machine Learning ──
  {
    slug: "siam-ai-chatbot", cat: "ai", title: "Siam AI Chatbot", images: 0,
    blurb: "Full-stack AI assistant with a streaming chat UI and an animated 3D WebGL background.",
    detail: "A conversational AI web app on Next.js 16 and React 19 with a real streaming backend (server-sent events), multi-model fallback and retry/backoff, custom auth pages, and immersive Three.js shader backgrounds. Deployed on Vercel.",
    tech: ["Next.js 16", "TypeScript", "Three.js", "Framer Motion"], live: "https://siam-ai-chatbot-khaki.vercel.app",
  },
  {
    slug: "repomind", cat: "ai", title: "RepoMind", images: 0,
    blurb: "Paste any GitHub repo URL and get an AI-generated overview, architecture, and dependency graph.",
    detail: "A single-page app that fetches a public repository via the GitHub REST API and uses an LLM (OpenRouter) to explain it — overview, setup, and architecture — plus an interactive force-directed dependency graph and a chat panel.",
    tech: ["JavaScript", "GitHub API", "OpenRouter"], github: "https://github.com/siam-hossain9/repomind",
  },
  {
    slug: "deskpilot", cat: "ai", title: "DeskPilot", images: 0,
    blurb: "A desktop AI companion for Windows that chats, sees your screen, and controls your PC.",
    detail: "A pixel-art desktop companion (~2,400 lines of Python) with a task-routed LLM brain (NVIDIA NIM / OpenRouter / Gemini with fallback), a computer-use agent that reads the screen and plans actions, free text-to-speech voice, cross-restart memory, and 80+ animated sprite states.",
    tech: ["Python", "NVIDIA NIM", "Computer-use", "TTS"], github: "https://github.com/siam-hossain9/DeskPilot",
  },
  {
    slug: "cnn-classifier", cat: "ai", title: "CNN Image Classifier", images: 0,
    blurb: "Intel scene classification with a custom CNN — batch norm, dropout, and augmentation.",
    detail: "A convolutional neural network trained on the Intel Image Classification dataset (buildings, forest, glacier, mountain, sea, street) using batch normalization, dropout, and data augmentation for robust multi-class accuracy.",
    tech: ["Python", "TensorFlow/Keras", "CNN"], github: "https://github.com/siam-hossain9/Intel-Image-Classification-CNN",
  },

  // ── Automation (n8n) ──
  {
    slug: "customer-support", cat: "auto", title: "Customer Support AI Agent", images: 1,
    blurb: "An n8n workflow that triages support tickets with AI and drafts replies from a knowledge base.",
    detail: "Ingests tickets from email, Zendesk, Intercom, and webhooks, classifies them with OpenAI, retrieves answers from a Pinecone knowledge base (RAG), then drafts and auto-resolves or escalates — and emails a weekly report. 31 fully-wired nodes.",
    tech: ["n8n", "OpenAI", "Pinecone"], github: "https://github.com/siam-hossain9/customer-support-ai-agent",
  },
  {
    slug: "devops-incident", cat: "auto", title: "DevOps Incident Response", images: 0,
    blurb: "An AI 'SRE' that ingests alerts, diagnoses with GPT-4, pages the team, and auto-remediates.",
    detail: "A 35-node n8n workflow that receives alerts (Datadog/Grafana/cron), diagnoses incidents with GPT-4, routes via PagerDuty, and triggers automated remediation (AWS scaling, rollbacks) with Slack, Notion, and Gmail notifications.",
    tech: ["n8n", "GPT-4", "PagerDuty", "AWS"], github: "https://github.com/siam-hossain9/DevOps-Incident-Response-Automation",
  },
  {
    slug: "social-media", cat: "auto", title: "Social Media Content Engine", images: 0,
    blurb: "Autonomous content pipeline: trends in, AI calendar and posts out, scheduled via Buffer.",
    detail: "An n8n engine that monitors trends, generates a weekly content calendar and platform-specific copy with GPT-4 and DALL·E, schedules posts to Twitter/LinkedIn/Instagram via Buffer, and runs a 7-day analytics feedback loop — also ported to the typed n8n TypeScript SDK.",
    tech: ["n8n", "GPT-4", "DALL·E", "Buffer"], github: "https://github.com/siam-hossain9/N8N-Automation-social-media",
  },
  {
    slug: "cold-outreach", cat: "auto", title: "Cold-Outreach Automation", images: 0,
    blurb: "A compliance-first lead-gen platform: scraper + Convex backend + TCPA/10DLC-gated SMS.",
    detail: "An end-to-end cold-outreach system that scrapes businesses with no website, stores them in a Convex backend, and runs TCPA/10DLC-compliant SMS campaigns (with opt-out/DNC handling) through Close CRM — offering to build the prospect a site on interest. Ran in production with 800+ real messages sent.",
    tech: ["Node.js", "Convex", "Close CRM", "Python"], github: "https://github.com/siam-hossain9/cold-outreach-automation",
  },

  // ── Web & Interactive ──
  {
    slug: "animated-website", cat: "web", title: "Animated Website", images: 4,
    blurb: "An immersive scroll-driven experience with custom GLSL shaders, 3D, and audio storytelling.",
    detail: "A React + Vite site with nine bespoke scroll sections — custom GLSL shader gradients, Three.js 3D, canvas particle systems (petals, embers), a cursor petal trail, and synced audio. ~1,900 lines of hand-written feature code.",
    tech: ["React 19", "Three.js", "Vite", "GLSL"], github: "https://github.com/siam-hossain9/animated-website",
  },
  {
    slug: "dororo", cat: "web", title: "Dororo", images: 4,
    blurb: "A Netflix-style discovery app for movies, TV, and anime across four public APIs.",
    detail: "A streaming-discovery web app aggregating TMDB, OMDB, TVMaze, and Jikan for browsing movies, shows, and anime — with a serverless proxy backend, rich detail pages, and a player UI. 23 commits of sustained build-out; live on Vercel.",
    tech: ["JavaScript", "Node proxy", "Vercel"], github: "https://github.com/siam-hossain9/dororo", live: "https://dororotsuki-pi.vercel.app",
  },
  {
    slug: "git-progress-city", cat: "web", title: "Git Progress City", images: 0,
    blurb: "A 3D city where each GitHub developer is a building sized by their commits and activity.",
    detail: "An interactive Three.js visualization: query the GitHub GraphQL API and render each developer as a building whose height, width, window lighting, and color are driven by commits, repos, activity, and primary language. ~2,000 lines of TypeScript with a passing test suite.",
    tech: ["TypeScript", "Three.js", "GitHub GraphQL", "Vite"],
  },
  {
    slug: "virtual-pet", cat: "web", title: "Virtual Pet — Petverse", images: 4,
    blurb: "A browser pet-raising game — adopt, feed, play, shop, and grow a companion with live stats.",
    detail: "A Next.js + TypeScript game where you adopt a companion and manage health, hunger, happiness, energy, cleanliness, and bond through mini-games, a shop, daily rewards, and achievements. ~3,900 lines across five pages.",
    tech: ["Next.js", "TypeScript", "Zustand", "React"],
  },

  // ── Mobile & Games ──
  {
    slug: "suki", cat: "mobile", title: "Suki", images: 1,
    blurb: "A free, legal music-streaming Android app that streams full tracks over the open Audius network.",
    detail: "A Flutter app that searches and streams full songs via the decentralized Audius network — with a now-playing screen, dynamic cover-color theming, and a library. Built to a release APK.",
    tech: ["Flutter", "Dart", "just_audio", "Audius API"],
  },
  {
    slug: "pantrychef", cat: "mobile", title: "PantryChef", images: 0,
    blurb: "An ingredient-first Android recipe app — add what's in your pantry, get matching recipes.",
    detail: "A native Android app (Kotlin, Jetpack Compose, Hilt, Room, Retrofit) with onboarding, auth, pantry management, recipe search via Spoonacular, a cooking mode with timers, and favorites. 78 Kotlin files in a clean MVVM architecture; builds to an APK.",
    tech: ["Kotlin", "Jetpack Compose", "Hilt", "Room"],
  },
  {
    slug: "marigold-bay", cat: "mobile", title: "Marigold Bay Games", images: 4,
    blurb: "A story-driven spot-the-difference mobile game with hand-illustrated scenes, built in Godot.",
    detail: "'The Vanishing Album' — a narrative hidden-object game (Godot 4, GDScript) with hand-illustrated full-scene backgrounds, a chapter story, and a custom Gemini art-generation pipeline. Exported to a runnable Android APK.",
    tech: ["Godot 4", "GDScript", "Python", "Android"],
  },
  {
    slug: "snake-game", cat: "mobile", title: "Snake Game", images: 3,
    blurb: "A C++ console Snake with single- and two-player modes and persistent high scores.",
    detail: "A classic Snake built in C++ for the Windows console — single-player and head-to-head two-player modes, collision detection, a menu system, and a persistent high-score table.",
    tech: ["C++", "Win32 API"], github: "https://github.com/siam-hossain9/SnakeGame",
  },

  // ── Systems & Hardware ──
  {
    slug: "wallop", cat: "systems", title: "wallop", images: 1,
    blurb: "An HTTP load-tester you can feel — every request is a physics particle in your terminal.",
    detail: "A Python CLI load-testing tool that renders each request as a physics particle — successes spark green, errors explode red, latency is flight time — while reporting real stats (RPS, p50/p95/p99, status codes). Packaged with tests and CI; pip/pipx/uv-installable.",
    tech: ["Python", "asyncio", "aiohttp"], github: "https://github.com/siam-hossain9/wallop",
  },
  {
    slug: "glut-village", cat: "systems", title: "OpenGL Village", images: 0,
    blurb: "A cartoon village scene rendered from scratch in C++ with OpenGL and GLUT.",
    detail: "A hand-built OpenGL/GLUT scene in C++ — houses, trees, clouds, birds, and flowers composed from primitive shapes, with animated elements and day/night and weather effects.",
    tech: ["C++", "OpenGL", "GLUT"], github: "https://github.com/siam-hossain9/village-image-glut-project",
  },
  {
    slug: "smart-home", cat: "systems", title: "Smart Home IoT", images: 0,
    blurb: "An Arduino smart-home system: automated doors, rain detection, and sensor-driven controls.",
    detail: "An Arduino-based smart home that controls doors, detects rain, and manages other features using sensors and servo motors for convenience and safety.",
    tech: ["Arduino", "C++", "Sensors"], github: "https://github.com/siam-hossain9/Smart_Home_IOT_Project",
  },
  {
    slug: "reaction-game", cat: "systems", title: "Reaction-Time Game (IoT)", images: 0,
    blurb: "A multiplayer Arduino reaction game with buttons, LEDs, and an OLED scoreboard.",
    detail: "A multiplayer reflex game on Arduino UNO — players race to react when the 'GO' signal appears, with push buttons, LEDs, and an OLED display showing the winner and reaction times.",
    tech: ["Arduino UNO", "C++", "OLED"], github: "https://github.com/siam-hossain9/Reaction-Time-Game_IOT_Project",
  },

  // ── Research ──
  {
    slug: "galaxy", cat: "research", title: "Galaxy Morphology Classification", images: 4,
    blurb: "ResNet50 galaxy classifier with open-set detection — 92.96% accuracy, far-OOD AUROC ~1.000.",
    detail: "Galaxy morphology classification plus open-set rare-galaxy detection. A ResNet50 with two-stage fine-tuning and focal loss reaches 92.96% test accuracy on Galaxy Zoo; VAE and Mahalanobis detectors on the learned embedding flag novel galaxies (far-OOD AUROC ~1.000), with Grad-CAM explainability.",
    tech: ["PyTorch", "ResNet50", "VAE", "Grad-CAM"], github: "https://github.com/siam-hossain9/galaxy-morphology-classification",
  },
  {
    slug: "few-shot", cat: "research", title: "Few-Shot Fine-Grained Classification", images: 4,
    blurb: "Foundation vision models as feature extractors beat meta-learning — 98.85% on CUB-200.",
    detail: "A study showing pretrained foundation models (DINOv2, CLIP, ViT) as frozen feature extractors with simple classifiers outperform specialized few-shot meta-learning: 98.85% on CUB-200-2011 and 99.97% on Oxford Flowers-102, across 1/5/10/20-shot settings and three backbones.",
    tech: ["PyTorch", "DINOv2", "CLIP", "ViT"], github: "https://github.com/siam-hossain9/few-shot-fine-grained-baselines",
  },
];

const accentOf = (cat: string) => CATS.find((c) => c.id === cat)?.accent ?? "#00C2FF";
const img = (slug: string, n: number) => `/projects/${slug}/${n}.webp`;
const coverImg = (slug: string) => `/projects/${slug}/cover.webp`;

/* ───────────────────────── Section ───────────────────────── */

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<Project | null>(null);

  const shownCats = filter === "all" ? CATS : CATS.filter((c) => c.id === filter);

  return (
    <section id="projects" className="py-28 md:py-36 relative bg-dot-grid overflow-hidden" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="section-label mb-4 flex justify-center items-center w-full"
        >
          <FolderIcon />
          <h2>Featured.Projects</h2>
        </motion.div>
        <p className="text-center text-white/60 text-sm mb-10 max-w-xl mx-auto">
          A selection of what I&apos;ve built across AI, automation, the web, mobile, systems, and research. Tap any card for details.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <FilterChip label="All" active={filter === "all"} accent="#00C2FF" onClick={() => setFilter("all")} />
          {CATS.map((c) => (
            <FilterChip key={c.id} label={c.name} active={filter === c.id} accent={c.accent} onClick={() => setFilter(c.id)} />
          ))}
        </div>

        {/* Grouped grids */}
        <div className="space-y-14">
          {shownCats.map((c) => {
            const items = PROJECTS.filter((p) => p.cat === c.id);
            if (!items.length) return null;
            return (
              <div key={c.id}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ color: c.accent, background: `${c.accent}1a`, border: `1px solid ${c.accent}33` }}>
                    {c.icon}
                  </span>
                  <h3 className="text-white font-semibold text-lg tracking-tight">{c.name}</h3>
                  <span className="hidden sm:block text-[11px] uppercase tracking-wider text-white/55 font-mono">{c.tag}</span>
                  <span className="ml-auto text-xs text-white/55 font-mono">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <ProjectCard key={p.slug} p={p} index={i} onOpen={() => setActive(p)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/siam-hossain9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00C2FF] transition-transform duration-300 hover:scale-105 hover:text-white"
          >
            <GithubIcon size={16} />
            View all repositories on GitHub
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>{active && <ProjectModal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Card ───────────────────────── */

function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const accent = accentOf(p.cat);
  return (
    // Not role="button": that would flatten the card's content (blurb, links)
    // for assistive tech. Keyboard users open details via the real button below;
    // the whole-card onClick is a mouse convenience.
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      onClick={onOpen}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
      style={{ ["--a" as string]: accent }}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.images > 0 ? (
          <img
            src={coverImg(p.slug)}
            alt={`${p.title} preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: `radial-gradient(120% 120% at 30% 20%, ${accent}22, transparent 60%), linear-gradient(135deg, #0b0d10, #050505)` }}>
            <span style={{ color: accent, opacity: 0.85 }}>{CATS.find((c) => c.id === p.cat)?.icon}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-white font-semibold leading-tight">{p.title}</h4>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/55 line-clamp-3">{p.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/55">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 pt-3 border-t border-white/5">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${p.title} on GitHub`}
              className="rounded text-white/50 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${p.title} live demo`}
              className="rounded text-white/50 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <ArrowUpRightIcon />
            </a>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            aria-label={`View details for ${p.title}`}
            className="ml-auto inline-flex items-center gap-1 rounded text-[11px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/40"
            style={{ color: accent }}
          >
            Details
            <ChevronIcon />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ───────────────────────── Modal ───────────────────────── */

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const accent = accentOf(p.cat);
  const [sel, setSel] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog; restore it to the trigger on close.
    const prevActive = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      prevActive?.focus();
    };
  }, [onKey]);

  // Keep Tab cycling inside the dialog (aria-modal marks the rest inert to AT).
  function trapTab(e: React.KeyboardEvent) {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === root)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const catName = CATS.find((c) => c.id === p.cat)?.name ?? "";

  // Portaled to <body>: the #projects section has its own stacking context
  // (z-index: 2), which would trap the overlay beneath the navbar and chat.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", overscrollBehavior: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} details`}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        onKeyDown={trapTab}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[88dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0a0b0d] shadow-2xl outline-none"
      >
        {/* accent top rule */}
        <div className="h-1 w-full flex-none" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-lg bg-black/40 p-2 text-white/70 outline-none transition-colors hover:bg-black/60 hover:text-white focus-visible:ring-2"
        >
          <CloseIcon />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          {/* Gallery */}
          {p.images > 0 && (
            <div className="bg-black/40 p-3 sm:p-4">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                <img src={img(p.slug, sel)} alt={`${p.title} screenshot ${sel}`} className="max-h-[46vh] w-full object-contain" />
              </div>
              {p.images > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {Array.from({ length: p.images }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSel(n)}
                      aria-label={`Show image ${n}`}
                      className="h-14 w-20 flex-none overflow-hidden rounded-md border transition-all"
                      style={{ borderColor: sel === n ? accent : "rgba(255,255,255,0.12)", opacity: sel === n ? 1 : 0.55 }}
                    >
                      <img src={img(p.slug, n)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Text */}
          <div className="p-5 sm:p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: accent }}>{catName}</span>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-white/65">{p.detail}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white/70">
                  {t}
                </span>
              ))}
            </div>

            {(p.github || p.live) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105" style={{ background: accent }}>
                    <ArrowUpRightIcon /> Live demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/5">
                    <GithubIcon size={16} /> View code
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ───────────────────────── Bits ───────────────────────── */

function FilterChip({ label, active, accent, onClick }: { label: string; active: boolean; accent: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-3.5 py-1.5 text-xs font-medium outline-none transition-all focus-visible:ring-2"
      style={{
        color: active ? "#050505" : "rgba(255,255,255,0.7)",
        background: active ? accent : "rgba(255,255,255,0.03)",
        borderColor: active ? accent : "rgba(255,255,255,0.12)",
      }}
    >
      {label}
    </button>
  );
}

/* ── Inline icons (no icon-library version coupling) ── */
function svg(children: ReactNode, size = 18) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
function BrainIcon() { return svg(<><path d="M12 5a3 3 0 0 0-5.9-.8A2.5 2.5 0 0 0 4 8.5 2.5 2.5 0 0 0 5 13a3 3 0 0 0 3 3 2.5 2.5 0 0 0 4 1 2.5 2.5 0 0 0 4-1 3 3 0 0 0 3-3 2.5 2.5 0 0 0 1-4.5 2.5 2.5 0 0 0-2.1-4.3A3 3 0 0 0 12 5z" /><path d="M12 5v14" /></>); }
function FlowIcon() { return svg(<><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h5a2 2 0 0 1 2 2v7" /></>); }
function SparkIcon() { return svg(<path d="M12 3l1.9 5.8L20 10.7l-5.1 3.4L16.5 20 12 16.4 7.5 20l1.6-5.9L4 10.7l6.1-1.9L12 3z" />); }
function GamepadIcon() { return svg(<><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="11" x2="15.01" y2="11" /><line x1="18" y1="13" x2="18.01" y2="13" /><rect x="2" y="6" width="20" height="12" rx="4" /></>); }
function ChipIcon() { return svg(<><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" /></>); }
function FlaskIcon() { return svg(<><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7 14h10" /></>); }
function FolderIcon() { return <span style={{ color: "#00C2FF" }}>{svg(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 13l2 2 4-4" /></>, 22)}</span>; }
function ArrowUpRightIcon() { return svg(<><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>, 15); }
function ChevronIcon() { return svg(<path d="M9 18l6-6-6-6" />, 14); }
function CloseIcon() { return svg(<path d="M18 6 6 18M6 6l12 12" />, 18); }

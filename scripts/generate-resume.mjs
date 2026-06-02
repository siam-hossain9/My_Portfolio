// Generates a print-ready full-stack CV PDF into /public.
// Run: npm run resume:pdf
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "Siam-Hossain-Nayon-Resume.pdf");
mkdirSync(dirname(OUT), { recursive: true });

// ── Palette (print-friendly: dark ink on white, cyan accents) ──
const INK = "#15171a";
const MUTED = "#54585f";
const ACCENT = "#0a89b0"; // readable cyan on white
const RULE = "#dcdfe3";

const MARGIN = 46;
const doc = new PDFDocument({
  size: "A4",
  compress: process.env.PDF_NOCOMPRESS ? false : true,
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: "Siam Hossain Nayon — Full-Stack Developer CV",
    Author: "Siam Hossain Nayon",
    Subject: "Curriculum Vitae",
    Keywords: "Full-Stack, Web Developer, React, Next.js, Node.js, AI, Machine Learning",
  },
});
doc.pipe(createWriteStream(OUT));

const PAGE_W = doc.page.width;
const RIGHT = PAGE_W - MARGIN;
const CONTENT_W = RIGHT - MARGIN;

// ── helpers ──
function sectionHeader(title) {
  doc.moveDown(0.7);
  if (doc.y > doc.page.height - 110) doc.addPage();
  doc.fillColor(ACCENT).font("Helvetica-Bold").fontSize(10.5).text(title.toUpperCase(), MARGIN, doc.y, {
    characterSpacing: 1.6,
  });
  const y = doc.y + 2.5;
  doc.moveTo(MARGIN, y).lineTo(RIGHT, y).lineWidth(0.8).strokeColor(RULE).stroke();
  doc.moveDown(0.55);
  doc.fillColor(INK);
}

function project({ name, tech, desc, url }) {
  if (doc.y > doc.page.height - 90) doc.addPage();
  doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(name, MARGIN, doc.y, { continued: true });
  if (tech) doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(`   ${tech}`, { continued: false });
  else doc.text("");
  doc.font("Helvetica").fontSize(9.3).fillColor(MUTED).text(desc, MARGIN, doc.y + 1, {
    width: CONTENT_W,
    lineGap: 1,
  });
  doc.font("Helvetica").fontSize(8.6).fillColor(ACCENT).text(url, MARGIN, doc.y + 0.5, {
    width: CONTENT_W,
    link: url.startsWith("http") ? url : `https://${url}`,
    underline: false,
  });
  doc.moveDown(0.5);
}

// ── HEADER ──
doc.fillColor(INK).font("Helvetica-Bold").fontSize(25).text("Siam Hossain Nayon", MARGIN, MARGIN);
doc.fillColor(ACCENT).font("Helvetica-Bold").fontSize(11.5).text("Full-Stack Web Developer  ·  AI / ML Engineer", MARGIN, doc.y + 2);

// contact line (with links)
doc.moveDown(0.5);
const contacts = [
  { label: "siamhossain1130@gmail.com", url: "mailto:siamhossain1130@gmail.com" },
  { label: "Dhaka, Bangladesh", url: null },
  { label: "github.com/siam-hossain9", url: "https://github.com/siam-hossain9" },
  { label: "linkedin.com/in/siam-hossain", url: "https://www.linkedin.com/in/siam-hossain-00788226b/" },
  { label: "siamsportfolio.vercel.app", url: "https://siamsportfolio.vercel.app" },
];
doc.font("Helvetica").fontSize(9);
contacts.forEach((c, i) => {
  const last = i === contacts.length - 1;
  doc.fillColor(c.url ? ACCENT : MUTED).text(c.label, { continued: true, link: c.url || null, underline: false });
  if (!last) doc.fillColor(MUTED).text("   ·   ", { continued: true, link: null });
});
doc.text("");

// accent rule under header
const hy = doc.y + 6;
doc.moveTo(MARGIN, hy).lineTo(RIGHT, hy).lineWidth(1.4).strokeColor(ACCENT).stroke();
doc.y = hy + 8;

// ── PROFILE ──
sectionHeader("Profile");
doc.font("Helvetica").fontSize(9.6).fillColor(MUTED).text(
  "Full-stack web developer and Computer Science student who ships polished, production-ready " +
    "applications across the entire stack — from React/Next.js front-ends and Node/PHP back-ends to " +
    "databases and deployment. Equally comfortable bringing machine-learning models into real products. " +
    "I care about clean code, strong UX, and owning a feature end to end.",
  MARGIN,
  doc.y,
  { width: CONTENT_W, lineGap: 2 }
);

// ── TECHNICAL SKILLS ──
sectionHeader("Technical Skills");
const skills = [
  ["Languages", "JavaScript, TypeScript, PHP, Python, C++, Java, C#, SQL"],
  ["Frontend", "React, Next.js, Three.js, Tailwind CSS, HTML5, CSS3, Framer Motion, GLSL"],
  ["Backend", "Node.js, PHP, REST APIs, n8n automation"],
  ["Databases", "MySQL, PostgreSQL, Oracle"],
  ["AI / ML", "PyTorch, TensorFlow, DINOv2, CLIP, ResNet, CNNs"],
  ["Tools & DevOps", "Git, Docker, Vercel, Jupyter, Linux"],
];
skills.forEach(([k, v]) => {
  if (doc.y > doc.page.height - 80) doc.addPage();
  doc.font("Helvetica-Bold").fontSize(9.4).fillColor(INK).text(`${k}:  `, MARGIN, doc.y, { continued: true, width: CONTENT_W });
  doc.font("Helvetica").fontSize(9.4).fillColor(MUTED).text(v);
  doc.moveDown(0.18);
});

// ── SELECTED PROJECTS (full-stack first) ──
sectionHeader("Selected Projects");
[
  {
    name: "Siam AI Chatbot",
    tech: "Next.js · TypeScript · 3D",
    desc: "Full-stack AI assistant with a conversational UI and animated 3D background; deployed on Vercel.",
    url: "github.com/siam-hossain9/siam-ai-chatbot",
  },
  {
    name: "Customer Support AI Agent",
    tech: "AI Agents · Automation",
    desc: "Conversational AI agent that automates customer-support workflows end to end.",
    url: "github.com/siam-hossain9/customer-support-ai-agent",
  },
  {
    name: "Animated Website",
    tech: "React · Vite · Three.js · GLSL",
    desc: "Immersive scroll-driven experience with particle systems and custom shaders.",
    url: "github.com/siam-hossain9/animated-website",
  },
  {
    name: "Financia — Financial Management System",
    tech: "PHP · MySQL",
    desc: "Complete financial-management web app with a PHP + MySQL backend and full CRUD workflows.",
    url: "github.com/siam-hossain9/Financia",
  },
  {
    name: "Virtual Pet",
    tech: "Next.js · TypeScript",
    desc: "Browser-based virtual-pet game with persistent interactive state.",
    url: "github.com/siam-hossain9/virtual-pet",
  },
  {
    name: "Personal Portfolio",
    tech: "Next.js · Tailwind · Framer Motion",
    desc: "This site — custom 180° radar projects UI, canvas particle field, and synced audio hero.",
    url: "siamsportfolio.vercel.app",
  },
].forEach(project);

// ── RESEARCH ──
sectionHeader("Research");
[
  {
    name: "Galaxy Morphology Classification & Open-Set Detection",
    tech: "PyTorch · ResNet50",
    desc: "Two-stage fine-tuning with focal loss; VAE + Mahalanobis detectors flag novel galaxies. 92.96% test accuracy on Galaxy Zoo; far-OOD AUROC ~1.000.",
    url: "github.com/siam-hossain9/galaxy-morphology-classification",
  },
  {
    name: "Few-Shot Fine-Grained Image Classification",
    tech: "DINOv2 · CLIP · ViT",
    desc: "Foundational vision models as feature extractors — linear probing beats specialized meta-learning. 98.85% (CUB-200-2011), 99.97% (Oxford Flowers-102).",
    url: "github.com/siam-hossain9/few-shot-fine-grained-baselines",
  },
].forEach(project);

// ── EDUCATION ──
sectionHeader("Education");
doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text("B.Sc. in Computer Science & Engineering", MARGIN, doc.y);
doc.font("Helvetica").fontSize(9.4).fillColor(MUTED).text("American International University-Bangladesh (AIUB)", MARGIN, doc.y + 1);

console.log("final content y:", Math.round(doc.y), "/ page", Math.round(doc.page.height), "(pages:", doc.bufferedPageRange().count + ")");
doc.end();
console.log("Wrote", OUT);

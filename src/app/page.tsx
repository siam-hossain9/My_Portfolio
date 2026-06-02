import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/Marquee";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const socials = [
  { label: "GitHub", href: "https://github.com/siam-hossain9", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siam-hossain-00788226b/", icon: LinkedinIcon },
  { label: "Email", href: "mailto:siamhossain1130@gmail.com", icon: Mail },
  { label: "Résumé", href: "/resume", icon: FileText },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Infinoz ambient glow layer */}
      <div className="page-glow" />
      <Starfield />
      <Navbar />

      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Contact />

      <footer
        className="py-10 text-center text-xs"
        style={{
          zIndex: 2,
          position: "relative",
          color: "rgba(255,255,255,0.35)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          {socials.map((s) => {
            const Icon = s.icon;
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>
        &copy; {new Date().getFullYear()} Siam Hossain Nayon. Crafted with precision.
      </footer>
    </main>
  );
}

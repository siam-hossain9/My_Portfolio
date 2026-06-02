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
    <>
      {/* Infinoz ambient glow layer */}
      <div className="page-glow" aria-hidden="true" />
      <Starfield />
      <Navbar />

      <main className="relative min-h-screen">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Contact />
      </main>

      <footer
        className="relative py-10 px-6"
        style={{
          zIndex: 2,
          color: "rgba(255,255,255,0.7)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <p className="text-xs sm:text-sm order-2 sm:order-1 text-center sm:text-left" style={{ color: "rgba(255,255,255,0.55)" }}>
            &copy; {new Date().getFullYear()} Siam Hossain Nayon. Crafted with precision.
          </p>
          <nav aria-label="Social links" className="order-1 sm:order-2 flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className="footer-icon"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
      </footer>
    </>
  );
}

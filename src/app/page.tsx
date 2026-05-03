import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/Marquee";

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
        className="py-8 text-center text-xs"
        style={{
          zIndex: 2,
          position: "relative",
          color: "rgba(255,255,255,0.25)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        &copy; {new Date().getFullYear()} Siam Hossain Nayon. Crafted with precision.
      </footer>
    </main>
  );
}

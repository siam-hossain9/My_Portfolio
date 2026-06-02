"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full transition-all duration-300"
      aria-label="Primary"
      style={{
        zIndex: 100,
        background: scrolled ? "rgba(5,5,5,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: 80 }}>
        {/* Logo */}
        <a href="#home" className="text-lg font-bold tracking-tight" style={{ color: "#fff" }} aria-label="Siam — back to top">
          <span style={{ color: "#00C2FF" }}>&lt;</span>
          Siam
          <span style={{ color: "#00C2FF" }}>/&gt;</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href="/resume" className="btn-ghost" style={{ padding: "10px 22px", fontSize: 13 }}>
            Résumé
          </a>
          <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-lg"
          style={{ color: "#fff" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base py-3"
                  style={{ color: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-3 pt-5">
                <a href="/resume" onClick={() => setOpen(false)} className="btn-ghost flex-1" style={{ padding: "12px 18px", fontSize: 14 }}>
                  Résumé
                </a>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary flex-1" style={{ padding: "12px 18px", fontSize: 14 }}>
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

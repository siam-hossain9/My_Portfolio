"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, GitBranch, Send } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";

const contactItems = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "siamhossain1130@gmail.com",
    href: "mailto:siamhossain1130@gmail.com",
    accent: "#00C2FF",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Dhaka, Bangladesh",
    accent: "#FF8A00",
  },
  {
    icon: <GitBranch size={20} />,
    label: "GitHub",
    value: "github.com/siam-hossain9",
    href: "https://github.com/siam-hossain9",
    accent: "#50E3C2",
  },
  {
    icon: <LinkedinIcon size={20} />,
    label: "LinkedIn",
    value: "in/siam-hossain",
    href: "https://www.linkedin.com/in/siam-hossain-00788226b/",
    accent: "#0077b5",
  },
];

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:siamhossain1130@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative" style={{ zIndex: 2 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-[40px] font-bold mb-4" style={{ color: "#fff" }}>
            Let&apos;s Connect
          </h2>
          <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Open for opportunities, collaborations, and interesting projects. Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-4"
          >
            {contactItems.map((c) => {
              const inner = (
                <div
                  className="glass flex items-center gap-5"
                  style={{ padding: "24px", cursor: c.href ? "pointer" : "default" }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${c.accent}15`, color: c.accent }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</p>
                    <p className="text-sm font-semibold" style={{ color: "#fff" }}>{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass"
            style={{ padding: "32px" }}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,194,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,194,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,194,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,194,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Hello Siam, I'd like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,194,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0,194,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "#00C2FF",
                  color: "#000",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#33d1ff";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,194,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#00C2FF";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Send size={15} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

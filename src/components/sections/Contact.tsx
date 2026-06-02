"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, GitBranch, Send, CheckCircle2 } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";

const contactItems = [
  {
    icon: <Mail size={20} aria-hidden="true" />,
    label: "Email",
    value: "siamhossain1130@gmail.com",
    href: "mailto:siamhossain1130@gmail.com",
    accent: "#00C2FF",
  },
  {
    icon: <MapPin size={20} aria-hidden="true" />,
    label: "Location",
    value: "Dhaka, Bangladesh",
    accent: "#FF8A00",
  },
  {
    icon: <GitBranch size={20} aria-hidden="true" />,
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
    accent: "#0A66C2",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:siamhossain1130@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
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
          <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
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
                    style={{ background: `${c.accent}22`, color: c.accent }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>{c.label}</p>
                    <p className="text-sm font-semibold break-all" style={{ color: "#fff" }}>{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  aria-label={`${c.label}: ${c.value}`}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block"
                >
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
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Hello Siam, I'd like to discuss…"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="field resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full" style={{ borderRadius: 8 }}>
                <Send size={15} aria-hidden="true" />
                Send Message
              </button>

              {/* Accessible status feedback */}
              <p
                role="status"
                aria-live="polite"
                className="text-xs flex items-center gap-2 min-h-[1.25rem]"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={14} style={{ color: "#50E3C2" }} aria-hidden="true" />
                    Your email client should now be open. If it didn&apos;t open, email me directly at{" "}
                    <a href="mailto:siamhossain1130@gmail.com" className="underline" style={{ color: "#00C2FF" }}>
                      siamhossain1130@gmail.com
                    </a>
                    .
                  </>
                ) : (
                  ""
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const roles = [
  "AI/ML Engineer",
  "Frontend Dev",
  "Problem Solver",
  "Tech Enthusiast"
];

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

export default function TypewriterSubtitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentRole = roles[roleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, text === currentRole && !isDeleting ? 2000 : typeSpeed);
    
    if (text === currentRole && !isDeleting) {
       const deleteTimeout = setTimeout(() => setIsDeleting(true), 2000);
       return () => { clearTimeout(timeout); clearTimeout(deleteTimeout); }
    }
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <motion.div
      variants={itemVariants}
      className="text-lg md:text-xl font-semibold mb-6 h-8 flex items-center justify-start"
      style={{ color: "#00C2FF" }}
    >
      {text}
      <span className="w-[3px] h-6 ml-1 animate-pulse" style={{ backgroundColor: "#00C2FF" }}></span>
    </motion.div>
  );
}

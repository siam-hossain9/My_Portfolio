"use client";
import React from "react";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PyTorch", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Arduino", icon: "https://cdn.simpleicons.org/arduino/00979D" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "LangChain", icon: "https://api.iconify.design/simple-icons/langchain.svg?color=white" },
  { name: "ChatGPT", icon: "https://img.icons8.com/?size=100&id=ka3InxFU3QZa&format=png&color=ffffff" },
  { name: "Claude", icon: "https://img.icons8.com/?size=100&id=zQjzFjPpT2Ek&format=png&color=ffffff" }
];

export default function Marquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* We duplicate the items several times to ensure a smooth, continuous loop */}
        {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, idx) => (
          <div key={idx} className="marquee-item">
            <img 
              src={tech.icon} 
              alt={tech.name} 
              style={{ width: "24px", height: "24px", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(0,0,0,0.5))" }} 
            />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
}

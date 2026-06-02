"use client";
import React from "react";
import { Cloud } from "react-icon-cloud";

const icons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  // AI and Automation icons via Iconify/icons8
  "https://img.icons8.com/?size=100&id=ka3InxFU3QZa&format=png&color=ffffff",
  "https://img.icons8.com/?size=100&id=zQjzFjPpT2Ek&format=png&color=ffffff",
  "https://cdn.simpleicons.org/n8n/EA4343",
  "https://cdn.simpleicons.org/zapier/FF4A00",
];

export default function IconCloud() {
  const renderedIcons = icons.map((url) => (
    <span key={url} style={{ cursor: "grab", display: "inline-block" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        height="64"
        width="64"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </span>
  ));

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ maxWidth: "600px", margin: "0 auto" }}
      aria-hidden="true"
    >
      <Cloud
        options={{
          clickToFront: 500,
          depth: 1,
          imageScale: 2,
          initial: [0.1, -0.1],
          outlineColour: "#0000",
          reverse: true,
          tooltip: "native",
          tooltipDelay: 0,
          wheelZoom: false,
          dragControl: false,
          freezeActive: false,
          freezeDecel: false,
          activeCursor: 'default',
          maxSpeed: 0.05,
          minSpeed: 0.02,
        }}
      >
        {renderedIcons}
      </Cloud>
    </div>
  );
}

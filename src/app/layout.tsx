import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://siamsportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Siam Hossain Nayon — AI/ML Engineer & Web Developer",
    template: "%s | Siam Hossain Nayon",
  },
  description:
    "Portfolio of Siam Hossain Nayon — Computer Science student at AIUB specializing in Machine Learning, Computer Vision, Full-Stack Web Development, and Embedded Systems. Explore projects, research, and ways to connect.",
  keywords: [
    "Siam Hossain",
    "Siam Hossain Nayon",
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "PyTorch",
    "AIUB",
    "Portfolio",
  ],
  authors: [{ name: "Siam Hossain Nayon", url: SITE_URL }],
  creator: "Siam Hossain Nayon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Siam Hossain Nayon — Portfolio",
    title: "Siam Hossain Nayon — AI/ML Engineer & Web Developer",
    description:
      "AI/ML Engineer & Full-Stack Developer. Machine Learning, Computer Vision, and production-ready web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siam Hossain Nayon — AI/ML Engineer & Web Developer",
    description:
      "AI/ML Engineer & Full-Stack Developer. Machine Learning, Computer Vision, and production-ready web experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Siam Hossain Nayon",
  alternateName: "Siam Hossain",
  url: SITE_URL,
  jobTitle: "AI/ML Engineer & Full-Stack Web Developer",
  email: "mailto:siamhossain1130@gmail.com",
  description:
    "Computer Science & Engineering student at AIUB specializing in Machine Learning, Computer Vision, and Full-Stack Web Development.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American International University-Bangladesh (AIUB)",
  },
  knowsAbout: [
    "Machine Learning",
    "Computer Vision",
    "Deep Learning",
    "Full-Stack Web Development",
    "Embedded Systems",
    "Next.js",
    "React",
    "PyTorch",
  ],
  sameAs: [
    "https://github.com/siam-hossain9",
    "https://www.linkedin.com/in/siam-hossain-00788226b/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

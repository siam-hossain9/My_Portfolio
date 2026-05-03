import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siam Hossain Nayon — AI/ML Engineer & Web Developer",
  description:
    "Portfolio of Siam Hossain Nayon. Final-year CS student specializing in Machine Learning, Computer Vision, and Full-Stack Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

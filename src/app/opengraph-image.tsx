import { ImageResponse } from "next/og";

export const alt = "Siam Hossain Nayon — AI/ML Engineer & Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(900px 600px at 100% 0%, rgba(0,194,255,0.18), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(255,138,0,0.14), transparent 60%), #050505",
          fontFamily: "monospace",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#00C2FF",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#00C2FF",
              boxShadow: "0 0 24px #00C2FF",
            }}
          />
          Portfolio
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
            background: "linear-gradient(135deg, #00C2FF, #50E3C2, #ffffff, #FF8A00)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Siam Hossain Nayon
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            marginTop: 24,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          AI/ML Engineer · Computer Vision · Full-Stack Web
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 48,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          siamsportfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

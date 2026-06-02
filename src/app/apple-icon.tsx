import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 104,
          fontWeight: 800,
          color: "#00C2FF",
          background:
            "radial-gradient(120px 120px at 30% 20%, rgba(0,194,255,0.25), transparent 70%), #050505",
          borderRadius: 40,
          fontFamily: "monospace",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}

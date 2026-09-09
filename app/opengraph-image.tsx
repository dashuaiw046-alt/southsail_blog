import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#09090b",
          color: "#f4f4f5",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#a78bfa" }}>
          SOUTSAIL
        </div>
        <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700 }}>
          southsail Blog
        </div>
        <div style={{ marginTop: 20, fontSize: 28, color: "#a1a1aa" }}>
          Cybersecurity · CTF · Programming · Cryptography
        </div>
      </div>
    ),
    size,
  );
}

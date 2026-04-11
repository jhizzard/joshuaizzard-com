import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Joshua Izzard — Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0f1117",
          color: "#c8ccd8",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6b7089",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          joshuaizzard.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 600,
              letterSpacing: -3,
              color: "#c8ccd8",
              lineHeight: 1,
            }}
          >
            Joshua Izzard
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#c8ccd8",
              maxWidth: 1000,
              lineHeight: 1.3,
            }}
          >
            Builder. Developer tooling, AI systems, and the boring
            infrastructure that makes them work.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#7aa2f7",
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#9ece6a",
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#bb9af7",
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#e0af68",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6b7089",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            github.com/jhizzard
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

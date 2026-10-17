import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  return {
    // Files named *.dev.tsx / *.dev.ts (the /edit write-ups editor and its save API) are routes only under
    // `npm run dev`. Production builds don't see them, so they never ship to the deployed site.
    pageExtensions: phase === PHASE_DEVELOPMENT_SERVER ? ["dev.tsx", "dev.ts", "tsx", "ts"] : ["tsx", "ts"],
    async headers() {
      return [
        {
          source: "/:file(intro.mp4|poster.jpg)",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
      ];
    },
  };
}

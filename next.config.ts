import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Version 1 is a static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Custom domain (astibosoft.com) serves from site root — no /repo basePath.
  // Keep AGENTS.md as the owner's rules: stop `next dev` appending its own block.
  agentRules: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

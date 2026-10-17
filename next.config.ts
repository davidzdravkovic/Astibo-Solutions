import type { NextConfig } from "next";

/** GitHub project Pages URL: https://davidzdravkovic.github.io/Astibo-Solutions/ */
const repoName = "Astibo-Solutions";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Version 1 is a static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Only for GitHub Pages builds — keeps `npm run dev` on http://localhost:3000/
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
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

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Monorepo: trace server deps from repo root so Vercel bundles correctly
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;

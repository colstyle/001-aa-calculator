import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // Required for Tauri (Windows) and Capacitor (Android) packaging
  images: { unoptimized: true }, // Required for static export (next/image)
};

export default nextConfig;

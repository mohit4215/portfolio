import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All images are local/public; unoptimized for zero-config deploy
    unoptimized: false,
    localPatterns: [
      { pathname: "/assets/**" },
    ],
  },
};

export default nextConfig;

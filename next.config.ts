import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sofascore.com",
      },
      {
        protocol: "https",
        hostname: "api.sofascore.app",
      },
    ],
  },
};

export default nextConfig;

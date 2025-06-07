import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-del1-1.cdninstagram.com",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;

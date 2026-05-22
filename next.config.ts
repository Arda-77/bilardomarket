import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.deryabilardo.com",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;

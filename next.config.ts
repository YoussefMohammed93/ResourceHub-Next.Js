import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "creativeresources.net",
      "cdn.worldvectorlogo.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;

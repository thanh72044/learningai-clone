import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable edge runtime for optimal performance
    esmExternals: true,
  },
};

export default nextConfig;

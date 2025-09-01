import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // set to true if you want a 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;

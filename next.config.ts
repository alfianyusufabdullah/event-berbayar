import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CF_ACCESS_CLIENT_ID: process.env.CF_ACCESS_CLIENT_ID,
    CF_ACCESS_CLIENT_SECRET: process.env.CF_ACCESS_CLIENT_SECRET,
  },
};

export default nextConfig;

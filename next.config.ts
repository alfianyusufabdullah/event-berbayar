import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CF_ACCESS_CLIENT_ID: process.env.CF_ACCESS_CLIENT_ID,
    CF_ACCESS_CLIENT_SECRET: process.env.CF_ACCESS_CLIENT_SECRET,
    APP_URL: process.env.APP_URL,
    N8N_INSTANCE_URL: process.env.N8N_INSTANCE_URL,
  },
  output: "standalone",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "10.132.159.29",
    "192.168.77.29",
    "10.0.0.0",
  ],
};

export default nextConfig;

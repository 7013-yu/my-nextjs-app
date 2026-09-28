import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 部署時忽略 TypeScript 型別錯誤
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
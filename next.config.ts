import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./generated/prisma/**/*"],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;

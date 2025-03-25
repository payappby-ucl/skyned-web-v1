import { env } from "./src/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: [env.client.baseUrl],
  },
};

export default nextConfig;

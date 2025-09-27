/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],

  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "2mb",
  //   },
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },

      // ? For Test
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

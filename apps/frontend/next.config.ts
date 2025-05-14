/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.cibc.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.mpowerfinancing.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.passage.com",
        pathname: "**",
      },

      // ? For test
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
      // TODO: Remove when dynamic images are fetched
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

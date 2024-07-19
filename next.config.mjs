/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsgames.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

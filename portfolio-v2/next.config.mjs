/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All images are local/public; unoptimized for zero-config deploy
    unoptimized: true,
  },
};

export default nextConfig;

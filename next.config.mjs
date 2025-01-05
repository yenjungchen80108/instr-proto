/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      minify: true,
    },
  },
};

export default nextConfig;

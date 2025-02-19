/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();

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
  env: {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME, // 只在服务器端可用
    AWS_REGION: process.env.AWS_REGION, // 只在服务器端可用
    NEXT_PUBLIC_AWS_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME, // ✅ 允许前端访问
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION, // ✅ 允许前端访问
  },
};

export default nextConfig;

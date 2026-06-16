import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://m.media-amazon.com/images/**')],
  },
  distDir: './dist', // Changes the build output directory to `./dist/`
};

export default nextConfig;

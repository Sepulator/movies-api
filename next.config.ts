import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://m.media-amazon.com/images/**')],
  },
  distDir: './dist',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

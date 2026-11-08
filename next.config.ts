import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Lets a production build run next to `next dev` without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);

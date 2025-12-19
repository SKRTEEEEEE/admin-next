import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      new URL('https://utfs.io/**'),
    ]
  },
  // Exclude problematic files from bundling
  serverExternalPackages: ['thread-stream'],
  webpack: (config, { isServer }) => {
    // Exclude test files and non-JS assets from node_modules
    config.module.rules.push({
      test: /node_modules\/.*\.(test|spec)\.(js|ts|mjs)$/,
      loader: 'ignore-loader',
    });
    config.module.rules.push({
      test: /node_modules\/.*\.(md|sh|zip|LICENSE)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};
 
const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withNextIntl(nextConfig);
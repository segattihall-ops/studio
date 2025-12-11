import type {NextConfig} from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    // Keep cache in-memory to avoid PackFile cache warnings on large sourcemaps.
    config.cache = {type: 'memory'};
    return config;
  },
};

export default nextConfig;

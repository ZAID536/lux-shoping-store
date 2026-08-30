/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '**' },
    ],
    // Allow local uploads served from /uploads/
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/products/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment, set basePath to your repo name
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

module.exports = nextConfig;

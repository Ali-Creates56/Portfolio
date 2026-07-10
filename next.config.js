/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Apply basePath and assetPrefix only for GitHub Actions deployment
  basePath: isGithubActions ? '/Portfolio' : '',
  assetPrefix: isGithubActions ? '/Portfolio/' : '',
};

module.exports = nextConfig;

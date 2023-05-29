/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["caminul-tau-bucket.s3.eu-central-1.amazonaws.com"],
  },
};

module.exports = nextConfig;

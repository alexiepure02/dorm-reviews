/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["caminul-tau-bucket.s3.eu-central-1.amazonaws.com"],
  },
};

module.exports = nextConfig;

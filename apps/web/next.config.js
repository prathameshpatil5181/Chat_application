/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

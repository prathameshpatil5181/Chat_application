/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ['firebasestorage.googleapis.com', 'http://13.201.125.133/:8000'],
  },
};

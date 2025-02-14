/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'assets.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'stripe.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

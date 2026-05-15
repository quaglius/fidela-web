/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.mitiendanube.com',
      },
      {
        protocol: 'https',
        hostname: '**.mitiendanube.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'acdn-us.mitiendanube.com',
      },
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
      },
      {
        protocol: 'https',
        hostname: 'd2r9epyceweg5n.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;

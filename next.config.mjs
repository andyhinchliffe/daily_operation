/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'develop.dailyoperation.uk',
        port: '',
        pathname: '/**',
      },
    ],
    },
  };

export default nextConfig;

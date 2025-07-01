/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dailyoperation.sbs',
        port: '',
        pathname: '/audio/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;



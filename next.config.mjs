/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['your-supabase-project.supabase.co'],
  },

  async redirects() {
    return [
      {
        source: '/assessment',
        destination: '/assessment/categories',
        permanent: true,
      },
      {
        source: '/diagnostics',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },

  // ===== ⚠️ علّق هذا السطر مؤقتاً =====
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;

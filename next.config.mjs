/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===== الإعدادات الأساسية =====
  reactStrictMode: true,
  swcMinify: true,

  // ===== دعم الصور من Supabase =====
  images: {
    domains: ['your-supabase-project.supabase.co'],
    // إذا كنت تستخدم عدة مشاريع، أضفهم هنا:
    // domains: ['project1.supabase.co', 'project2.supabase.co'],
  },

  // ===== إعادة التوجيه التلقائي =====
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

  // ===== تحسين الأداء =====
  experimental: {
    optimizeCss: true,
  },

  // ===== إعدادات إضافية للـ i18n (اختياري) =====
  // i18n: {
  //   locales: ['ar'],
  //   defaultLocale: 'ar',
  // },
};

export default nextConfig;

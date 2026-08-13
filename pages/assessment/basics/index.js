// pages/assessment/basics/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BasicsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // إعادة توجيه فورية إلى صفحة الفئات الرئيسية
    router.replace('/assessment/categories');
  }, [router]);

  // عرض مؤقت أثناء التوجيه (اختياري)
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      direction: 'rtl',
      fontFamily: 'system-ui, sans-serif',
      color: '#0D1E3B'
    }}>
      <p>جاري التوجيه إلى صفحة التقييمات...</p>
    </div>
  );
}

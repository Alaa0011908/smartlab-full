// pages/assessment/basics/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function BasicsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/assessment/categories');
  }, [router]);

  return (
    <>
      <Head>
        <title>جاري التوجيه - Smart Lab</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        direction: 'rtl',
        fontFamily: 'system-ui, sans-serif',
        color: '#0D1E3B',
        backgroundColor: '#f8f9fa',
        margin: 0,
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔄</div>
          <h2 style={{ fontSize: 24 }}>جاري التوجيه إلى صفحة التقييمات...</h2>
          <p style={{ color: '#6B7280' }}>يرجى الانتظار</p>
        </div>
      </div>
    </>
  );
}

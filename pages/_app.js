// pages/_app.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CalibrationDashboard from '../components/CalibrationDashboard';

export default function MyApp({ Component, pageProps }) {
  const [showCalibration, setShowCalibration] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration.scope);
          })
          .catch((error) => {
            console.log('SW registration failed:', error);
          });
      });
    }

    // Show calibration dashboard in dev mode or with ?admin=true
    const isDev = process.env.NODE_ENV === 'development';
    const hasAdminFlag = window.location.search.includes('admin=true');
    setShowCalibration(isDev || hasAdminFlag);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
        <meta name="theme-color" content="#17919e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SmartLab" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
      {showCalibration && <CalibrationDashboard />}
    </>
  );
}

// components/LanguageToggle.js
import React, { useState, useEffect } from 'react';

const COLORS = {
  teal: "#17919e",
  navy: "#0D1E3B",
  white: "#ffffff",
  border: "#d6e0e8",
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '8px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.white,
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
  },
  option: {
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s',
  },
  active: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
  },
  inactive: {
    backgroundColor: 'transparent',
    color: COLORS.navy,
  },
};

export default function LanguageToggle() {
  const [locale, setLocale] = useState('ar');

  useEffect(() => {
    const saved = localStorage.getItem('smartlab_locale');
    if (saved) setLocale(saved);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
    localStorage.setItem('smartlab_locale', newLocale);
    // In a full implementation, this would trigger i18n change
  };

  return (
    <div style={styles.container} onClick={toggleLocale}>
      <span
        style={{
          ...styles.option,
          ...(locale === 'ar' ? styles.active : styles.inactive),
        }}
      >
        عربي
      </span>
      <span
        style={{
          ...styles.option,
          ...(locale === 'en' ? styles.active : styles.inactive),
        }}
      >
        EN
      </span>
    </div>
  );
}

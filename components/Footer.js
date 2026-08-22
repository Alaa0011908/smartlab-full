// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

const COLORS = {
  teal: "#17919e",
  orange: "#e1682e",
  navy: "#0D1E3B",
  white: "#ffffff",
};

const styles = {
  footer: {
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    padding: '40px 20px 0',
    marginTop: 'auto',
    width: '100%',
  },
  footerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    padding: '0 20px 30px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  footerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  footerLogoImage: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
  },
  footerBrand: {
    fontSize: '22px',
    fontWeight: 800,
  },
  footerBrandOrange: {
    color: COLORS.orange,
  },
  footerDesc: {
    fontSize: '14px',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.75)',
    maxWidth: '280px',
    margin: 0,
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: 700,
    margin: 0,
    color: COLORS.white,
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.25s ease',
    padding: '4px 0',
  },
  footerContactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  footerContactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
  },
  footerContactIcon: {
    fontSize: '18px',
    color: COLORS.orange,
    minWidth: '20px',
  },
  footerContactLink: {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    transition: 'color 0.25s ease',
  },
  footerBottom: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: '16px 20px',
    marginTop: 0,
    width: '100%',
    textAlign: 'center',
  },
  footerBottomInner: {
    maxWidth: 1200,
    margin: '0 auto',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    padding: '0 20px',
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerCol}>
          <div style={styles.footerLogo}>
            <img src="/logo.png" alt="Smart Lab Logo" style={styles.footerLogoImage} />
            <span style={styles.footerBrand}>
              Smart<span style={styles.footerBrandOrange}>Lab</span>
            </span>
          </div>
          <p style={styles.footerDesc}>
            منصة تعليمية متطورة تعتمد على الذكاء الاصطناعي لتقديم تجارب تعلم مخصصة، تقييمات دقيقة، ومحاكاة واقعية.
          </p>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>روابط سريعة</h4>
          <ul style={styles.footerLinks}>
            <li><Link href="/" style={styles.footerLink}>الرئيسية</Link></li>
            <li><Link href="/assessment/categories" style={styles.footerLink}>التقييمات</Link></li>
            <li><Link href="/scenarios" style={styles.footerLink}>السيناريوهات</Link></li>
            <li><Link href="/dashboard" style={styles.footerLink}>لوحة التشخيص</Link></li>
          </ul>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>تواصل معنا</h4>
          <ul style={styles.footerContactList}>
            <li style={styles.footerContactItem}>
              <FaEnvelope style={styles.footerContactIcon} />
              <a href="mailto:info@smartlab.com" style={styles.footerContactLink}>info@smartlab.com</a>
            </li>
            <li style={styles.footerContactItem}>
              <FaFacebookF style={styles.footerContactIcon} />
              <a href="https://facebook.com/smartlab" target="_blank" rel="noopener noreferrer" style={styles.footerContactLink}>Facebook</a>
            </li>
            <li style={styles.footerContactItem}>
              <FaInstagram style={styles.footerContactIcon} />
              <a href="https://instagram.com/smartlab" target="_blank" rel="noopener noreferrer" style={styles.footerContactLink}>Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={styles.footerBottom}>
        <div style={styles.footerBottomInner}>
          <span>© 2026 SmartLab. جميع الحقوق محفوظة</span>
        </div>
      </div>
    </footer>
  );
}

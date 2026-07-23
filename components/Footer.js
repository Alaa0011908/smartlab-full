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
    padding: "60px 24px 0",
    marginTop: "auto",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 40,
    paddingBottom: 40,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  footerCol: { display: "flex", flexDirection: "column", gap: 12 },
  footerLogo: { display: "flex", alignItems: "center", gap: 10 },
  footerLogoImage: {
    height: '45px',
    width: 'auto',
    objectFit: 'contain',
  },
  footerBrand: { fontSize: 24, fontWeight: 800 },
  footerBrandOrange: { color: COLORS.orange },
  footerDesc: { fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", maxWidth: 320, margin: 0 },
  footerHeading: { fontSize: 16, fontWeight: 700, margin: 0, color: COLORS.white },
  footerLinks: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 },
  footerLink: { color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, transition: "color 0.25s ease" },
  footerContactList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 },
  footerContactItem: { display: "flex", alignItems: "center", gap: 12, fontSize: 14 },
  footerContactIcon: { fontSize: 18, color: COLORS.orange, minWidth: 20 },
  footerContactLink: { color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.25s ease" },
  
  // ✅ القسم السفلي المعدل
  footerBottom: {
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: "16px 40px",
    marginTop: 0,
    width: "100%",
  },
  footerBottomInner: {
    maxWidth: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    flexWrap: "wrap",
    gap: 8,
    textAlign: "center",
  },
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={styles.footerCol}>
          <div style={styles.footerLogo}>
            <img 
              src="/logo.png" 
              alt="Smart Lab Logo" 
              style={styles.footerLogoImage} 
            />
            <span style={styles.footerBrand}>
              Smart<span style={styles.footerBrandOrange}>Lab</span>
            </span>
          </div>
          <p style={styles.footerDesc}>
            منصة تعليمية متطورة تعتمد على الذكاء الاصطناعي لتقديم تجارب تعلم مخصصة، 
            تقييمات دقيقة، ومحاكاة واقعية.
          </p>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>روابط سريعة</h4>
          <ul style={styles.footerLinks}>
            <li>
              <Link href="/" style={styles.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/assessment" style={styles.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                التقييمات
              </Link>
            </li>
            <li>
              <Link href="/scenarios" style={styles.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                السيناريوهات
              </Link>
            </li>
            <li>
              <Link href="/dashboard" style={styles.footerLink} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                لوحة التشخيص
              </Link>
            </li>
          </ul>
        </div>

        <div style={styles.footerCol}>
          <h4 style={styles.footerHeading}>تواصل معنا</h4>
          <ul style={styles.footerContactList}>
            <li style={styles.footerContactItem}>
              <FaEnvelope style={styles.footerContactIcon} />
              <a href="mailto:info@smartlab.com" style={styles.footerContactLink} onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
                info@smartlab.com
              </a>
            </li>
            <li style={styles.footerContactItem}>
              <FaFacebookF style={styles.footerContactIcon} />
              <a 
                href="https://facebook.com/smartlab" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.footerContactLink} 
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} 
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                Facebook
              </a>
            </li>
            <li style={styles.footerContactItem}>
              <FaInstagram style={styles.footerContactIcon} />
              <a 
                href="https://instagram.com/smartlab" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.footerContactLink} 
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.white} 
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ القسم السفلي المعدل */}
      <div style={styles.footerBottom}>
        <div style={styles.footerBottomInner}>
          <span>© 2026 SmartLab. جميع الحقوق محفوظة</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr !important;
            gap: 30px;
            text-align: center;
          }
          .footer-desc {
            max-width: 100% !important;
            text-align: center;
          }
          .footer-contact-item {
            justify-content: center;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

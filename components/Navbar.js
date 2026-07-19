// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  white: "#ffffff",
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2.5rem',
    backgroundColor: COLORS.white,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    direction: 'rtl',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImage: {
    height: '45px',
    width: 'auto',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#64748B',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.5rem 0',
    transition: 'color 0.25s ease, border-bottom 0.25s ease',
    borderBottom: '3px solid transparent',
  },
  navLinkActive: {
    color: COLORS.teal,
    fontWeight: '700',
    borderBottom: `3px solid ${COLORS.teal}`,
  },
  loginBtn: {
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: 'none',
    borderRadius: '30px',
    padding: '0.6rem 1.5rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.25s ease, transform 0.25s ease',
  },
  burgerBtn: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '28px',
    height: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  burgerLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#334155',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 2rem',
    gap: '0.8rem',
    zIndex: 99,
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#64748B',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  mobileNavLinkActive: {
    color: COLORS.teal,
    fontWeight: '700',
  },
};

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'محاكي العميل', href: '/scenarios' },
    { label: 'التقييم التكيفي', href: '/assessment' },
    { label: 'لوحة التشخيص', href: '/dashboard' },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <header style={styles.header}>
      {/* زر تسجيل الدخول */}
      <div style={styles.headerLeft}>
        <Link
          href="/auth/login"
          style={styles.loginBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.tealDark;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.teal;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          تسجيل الدخول
        </Link>
        {/* زر القائمة للموبايل */}
        <button
          style={styles.burgerBtn}
          className="burger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="القائمة"
        >
          <span style={{ ...styles.burgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ ...styles.burgerLine, opacity: isMenuOpen ? 0 : 1 }} />
          <span style={{ ...styles.burgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none' }} />
        </button>
      </div>

      {/* الروابط الرئيسية */}
      <nav style={styles.nav} className="desktop-nav">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              ...styles.navLink,
              ...(isActive(item.href) ? styles.navLinkActive : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* القائمة المتنقلة للموبايل */}
      {isMenuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                ...styles.mobileNavLink,
                ...(isActive(item.href) ? styles.mobileNavLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* الشعار */}
      <div style={styles.headerRight}>
        <Link href="/" style={styles.logo}>
          <img src="/logo.png" alt="Smart Lab Logo" style={styles.logoImage} />
        </Link>
      </div>

      {/* أنماط الاستجابة */}
      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .burger-btn {
            display: flex !important;
          }
        }
        @media (min-width: 901px) {
          .burger-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

// components/Navbar.js
import React, { useState, useEffect } from 'react';
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
    padding: '0.8rem 1.5rem',
    backgroundColor: COLORS.white,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    direction: 'rtl',
    flexWrap: 'wrap',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    order: 2,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    order: 1,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    order: 3,
    width: '100%',
    justifyContent: 'center',
    marginTop: '0.5rem',
    flexWrap: 'wrap',
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
    padding: '0.6rem 1.2rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background-color 0.25s ease, transform 0.25s ease',
    minHeight: '44px',
    minWidth: '44px',
    textAlign: 'center',
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
    order: 3,
  },
  burgerLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#334155',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    width: '100%',
    padding: '1rem 0',
    gap: '0.8rem',
    order: 4,
  },
  mobileMenuOpen: {
    display: 'flex',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#64748B',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '0.75rem 0',
    borderBottom: '1px solid #f0f0f0',
    textAlign: 'center',
  },
  mobileNavLinkActive: {
    color: COLORS.teal,
    fontWeight: '700',
  },
};

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'محاكي العميل', href: '/scenarios' },
    { label: 'التقييم التكيفي', href: '/assessment/categories' },
    { label: 'لوحة التشخيص', href: '/dashboard' },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    if (href === '/assessment/categories') return router.pathname.startsWith('/assessment');
    return router.pathname.startsWith(href);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header style={styles.header}>
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
        {isMobile && (
          <button
            style={styles.burgerBtn}
            onClick={toggleMenu}
            aria-label="القائمة"
          >
            <span style={{ ...styles.burgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ ...styles.burgerLine, opacity: isMenuOpen ? 0 : 1 }} />
            <span style={{ ...styles.burgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(6px, -7px)' : 'none' }} />
          </button>
        )}
      </div>

      {!isMobile && (
        <nav style={styles.nav}>
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
      )}

      <div style={styles.headerRight}>
        <Link href="/" style={styles.logo}>
          <img src="/logo.png" alt="Smart Lab Logo" style={styles.logoImage} />
        </Link>
      </div>

      {isMobile && (
        <div style={{ ...styles.mobileMenu, ...(isMenuOpen ? styles.mobileMenuOpen : {}) }}>
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
    </header>
  );
}

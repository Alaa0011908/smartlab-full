// components/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0D1E3B",
  white: "#ffffff",
  bg: "#eef4f8",
  text: "#0D1E3B",
  muted: "#5b6b7b",
};

const styles = {
  navbar: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid #e6ecf1",
    padding: "0 24px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 12px rgba(13,30,59,0.04)",
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
  },
  navbarInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "70px",
    width: "100%",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
    textDecoration: "none",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: 800,
    color: COLORS.navy,
    textDecoration: "none",
    letterSpacing: "-0.5px",
  },
  logoAccent: {
    color: COLORS.teal,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    fontSize: "15px",
    fontWeight: 600,
    color: COLORS.text,
    textDecoration: "none",
    padding: "8px 4px",
    transition: "color 0.25s ease, border-bottom 0.25s ease",
    borderBottom: "3px solid transparent",
    position: "relative",
  },
  navLinkActive: {
    color: COLORS.teal,
    borderBottom: `3px solid ${COLORS.teal}`,
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  loginButton: {
    padding: "8px 20px",
    backgroundColor: "transparent",
    color: COLORS.navy,
    border: "1.5px solid #d6e0e8",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
  },
  signupButton: {
    padding: "8px 20px",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.25s ease",
    fontFamily: "inherit",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
    padding: "8px",
    background: "none",
    border: "none",
  },
  hamburgerLine: {
    width: "28px",
    height: "3px",
    backgroundColor: COLORS.navy,
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    display: "none",
    flexDirection: "column",
    backgroundColor: COLORS.white,
    borderTop: "1px solid #e6ecf1",
    padding: "16px 24px 24px",
    gap: "8px",
  },
  mobileMenuOpen: {
    display: "flex",
  },
  mobileLink: {
    fontSize: "16px",
    fontWeight: 600,
    color: COLORS.text,
    textDecoration: "none",
    padding: "12px 8px",
    borderBottom: "1px solid #f0f0f0",
    transition: "color 0.25s ease",
  },
  mobileLinkActive: {
    color: COLORS.teal,
  },
  mobileAuth: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
  mobileLoginButton: {
    padding: "12px",
    backgroundColor: "transparent",
    color: COLORS.navy,
    border: "1.5px solid #d6e0e8",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    fontFamily: "inherit",
  },
  mobileSignupButton: {
    padding: "12px",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    fontFamily: "inherit",
  },
};

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/scenarios", label: "محاكي العميل" },
    { href: "/assessment/categories", label: "التقييم التكيفي" },
    { href: "/dashboard", label: "لوحة التشخيص" },
  ];

  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(path + "/");
  };

  if (isMobile) {
    return (
      <nav style={styles.navbar}>
        <div style={styles.navbarInner}>
          <Link href="/" style={styles.logoContainer}>
            <span style={styles.logoText}>
              Smart<span style={styles.logoAccent}>Lab</span>
            </span>
          </Link>

          <button onClick={toggleMobileMenu} style={styles.hamburger} aria-label="القائمة">
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
            <span style={styles.hamburgerLine} />
          </button>
        </div>

        <div style={{ ...styles.mobileMenu, ...(isMobileMenuOpen ? styles.mobileMenuOpen : {}) }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...styles.mobileLink,
                ...(isActive(item.href) ? styles.mobileLinkActive : {}),
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div style={styles.mobileAuth}>
            <Link href="/auth/login" style={styles.mobileLoginButton}>
              تسجيل الدخول
            </Link>
            <Link href="/auth/signup" style={styles.mobileSignupButton}>
              إنشاء حساب
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarInner}>
        <Link href="/" style={styles.logoContainer}>
          <span style={styles.logoText}>
            Smart<span style={styles.logoAccent}>Lab</span>
          </span>
        </Link>

        <ul style={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  ...styles.navLink,
                  ...(isActive(item.href) ? styles.navLinkActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = COLORS.teal;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = COLORS.text;
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={styles.authButtons}>
          <Link
            href="/auth/login"
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.teal;
              e.currentTarget.style.color = COLORS.teal;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d6e0e8";
              e.currentTarget.style.color = COLORS.navy;
            }}
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/auth/signup"
            style={styles.signupButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.tealDark;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.teal;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            إنشاء حساب
          </Link>
        </div>
      </div>
    </nav>
  );
}

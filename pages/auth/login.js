// pages/auth/login.js
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0d3d4e",
  bg: "#eef4f8",
  white: "#ffffff",
  text: "#0d1e3b",
  muted: "#8a99a8",
  border: "#bcd7db",
};

const styles = {
  page: {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    margin: 0,
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(13,30,59,0.08)",
    width: "100%",
    maxWidth: 700,
    padding: "40px 50px 48px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    margin: "0 0 30px",
  },
  field: {
    position: "relative",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    height: 62,
    borderRadius: 12,
    border: `1.5px solid ${COLORS.border}`,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    fontSize: 17,
    textAlign: "right",
    padding: "0 56px 0 56px",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  iconRight: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: "translateY(-50%)",
    color: COLORS.teal,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  eyeBtn: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: COLORS.teal,
    display: "flex",
    alignItems: "center",
    transition: "color 0.25s ease",
  },
  forgotRow: {
    textAlign: "right",
    marginBottom: 34,
  },
  forgot: {
    fontSize: 15,
    color: COLORS.navy,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.25s ease",
  },
  submit: {
    width: "100%",
    height: 62,
    borderRadius: 12,
    border: "none",
    backgroundColor: COLORS.teal,
    color: COLORS.white,
    fontSize: 19,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "background-color 0.25s ease, transform 0.25s ease",
    fontFamily: "inherit",
  },
  bottom: {
    marginTop: 48,
    fontSize: 15,
    color: COLORS.text,
  },
  bottomLink: {
    color: COLORS.navy,
    fontWeight: 800,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.25s ease",
  },
};

// ✅ اللوغو 365x210
function LogoMark() {
  return (
    <img 
      src="/logo.png" 
      alt="SmartLab Logo" 
      style={{ 
        width: '365px', 
        height: '210px', 
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" fill="currentColor" stroke="none" />
      <path d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.9 4.2A9.8 9.8 0 0 1 12 4c6.5 0 10 7 10 7a17 17 0 0 1-2.4 3.4M6.6 6.6A17 17 0 0 0 2 11s3.5 7 10 7a9.6 9.6 0 0 0 4.7-1.2" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

function LoginArrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
      <path d="M9 16l-4-4 4-4" />
      <line x1="5" y1="12" x2="15" y2="12" />
    </svg>
  );
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }

  const isMobile = windowWidth <= 640;

  const focusStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.teal;
    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(23,145,158,0.12)`;
  };
  const blurStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.border;
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('smartlab_user', JSON.stringify({ email, id: 'demo_alex_001', name: email.split('@')[0] }));
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Head>
        <title>تسجيل الدخول - Smart Lab</title>
        <meta name="description" content="سجّل دخولك إلى منصة سمارت لاب التعليمية." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            background-color: ${COLORS.bg};
          }
          * { box-sizing: border-box; }
          input::placeholder {
            color: ${COLORS.muted};
            opacity: 1;
          }
          @media (max-width: 640px) {
            .login-card { padding: 36px 24px 40px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <div style={{ ...styles.card, padding: isMobile ? "36px 24px 40px" : styles.card.padding }} className="login-card">
          <div style={styles.logoWrap}>
            <LogoMark />
          </div>

          <h1 style={styles.title}>تسجيل الدخول</h1>
          <p style={styles.subtitle}>مرحباً بك في سمارت لاب</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <span style={styles.iconRight}><MailIcon /></span>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
                aria-label="البريد الإلكتروني"
              />
            </div>

            <div style={styles.field}>
              <span style={styles.iconRight}><LockIcon /></span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
                aria-label="كلمة المرور"
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.tealDark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.teal)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div style={styles.forgotRow}>
              <Link
                href="/auth/forgot-password"
                style={styles.forgot}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.teal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.navy)}
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              style={styles.submit}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.tealDark;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.teal;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <LoginArrowIcon />
              تسجيل الدخول
            </button>
          </form>

          <p style={styles.bottom}>
            ليس لديك حساب؟{" "}
            <Link
              href="/auth/signup"
              style={styles.bottomLink}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.teal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.navy)}
            >
              إنشاء حساب جديد
            </Link>
          </p>

          {/* SfeerTech Demo Fast Track */}
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
            <button
              onClick={() => {
                localStorage.setItem('smartlab_user', JSON.stringify({ email: 'alex@sfeertech.demo', id: 'demo_alex_001', name: 'Alex' }));
                router.push('/dashboard');
              }}
              style={{
                backgroundColor: COLORS.navy, color: COLORS.white, border: 'none',
                padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8
              }}
            >
              <span>🚀</span> Load SfeerTech Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

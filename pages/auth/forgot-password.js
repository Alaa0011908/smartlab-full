// pages/auth/forgot-password.js
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";
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
  success: "#2ECC71",
  error: "#E74C3C",
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
    padding: "0 56px 0 20px",
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
    marginTop: "0.5rem",
  },
  submitDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  bottom: {
    marginTop: 32,
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
  message: {
    marginTop: 16,
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 14,
    textAlign: "center",
  },
  messageSuccess: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
  },
  messageError: {
    backgroundColor: "#FFEBEE",
    color: "#C62828",
  },
  messageInfo: {
    backgroundColor: "#E3F2FD",
    color: "#0D47A1",
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

function ArrowLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
      <path d="M9 16l-4-4 4-4" />
      <line x1="5" y1="12" x2="15" y2="12" />
    </svg>
  );
}

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const focusStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.teal;
    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(23,145,158,0.12)`;
  };
  const blurStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.border;
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "❌ يرجى إدخال البريد الإلكتروني", type: "error" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setMessage({ text: `❌ ${error.message}`, type: "error" });
    } else {
      setMessage({
        text: "✅ تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.",
        type: "success",
      });
      setEmail("");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>نسيت كلمة المرور - Smart Lab</title>
        <meta name="description" content="أدخل بريدك الإلكتروني لاستعادة كلمة المرور في منصة سمارت لاب." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          html, body { margin: 0; padding: 0; background-color: ${COLORS.bg}; }
          * { box-sizing: border-box; }
          input::placeholder { color: ${COLORS.muted}; opacity: 1; }
          @media (max-width: 640px) {
            .reset-card { padding: 36px 24px 40px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <div style={styles.card} className="reset-card">
          <div style={styles.logoWrap}>
            <LogoMark />
          </div>

          <h1 style={styles.title}>نسيت كلمة المرور</h1>
          <p style={styles.subtitle}>أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة التعيين</p>

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
                dir="ltr"
              />
            </div>

            {message.text && (
              <div
                style={{
                  ...styles.message,
                  ...(message.type === "success" ? styles.messageSuccess : styles.messageError),
                }}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              style={{
                ...styles.submit,
                ...(loading ? styles.submitDisabled : {}),
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = COLORS.tealDark;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = COLORS.teal;
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {loading ? "جاري الإرسال..." : <><ArrowLeftIcon /> إرسال رابط إعادة التعيين</>}
            </button>
          </form>

          <p style={styles.bottom}>
            تذكرت كلمة المرور؟{" "}
            <Link href="/auth/login" style={styles.bottomLink}>
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

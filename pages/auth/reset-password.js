// pages/auth/reset-password.js - صفحة تعيين كلمة مرور جديدة (بعد الضغط على الرابط)
import Head from "next/head";
import { useState, useEffect } from "react";
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
    maxWidth: 620,
    padding: "48px 60px 56px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    marginBottom: 28,
  },
  logoText: { display: "flex", gap: 5, alignItems: "baseline" },
  logoSmart: { fontSize: 17, fontWeight: 800, color: COLORS.navy },
  logoLab: { fontSize: 17, fontWeight: 800, color: COLORS.orange },
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

function LogoMark() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M46 14c-6 0-11 3-14 8-3-3-8-4-12-3-6 2-9 8-7 14-5 2-7 7-5 12 2 5 6 7 11 7 2 5 6 8 11 8 6 0 11-3 13-8 6 2 12-1 14-7 2-5 0-10-3-13 3-5 3-11-2-15-3-6-8-8-14-3z"
        fill={COLORS.teal}
        opacity="0.9"
      />
      <path d="M28 34c2-5 6-8 11-8" stroke={COLORS.orange} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="47" cy="24" r="3.4" fill={COLORS.orange} />
      <path d="M40 18l10-4-6 8z" fill={COLORS.navy} opacity="0.7" />
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

function SaveIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isValidToken, setIsValidToken] = useState(true);

  // التحقق من وجود token في الرابط (Supabase يضيفه)
  useEffect(() => {
    const { access_token, error } = router.query;
    if (error) {
      setMessage({ text: "❌ الرابط غير صالح أو منتهي الصلاحية.", type: "error" });
      setIsValidToken(false);
    }
    // إذا لم يكن هناك access_token ولكننا في الصفحة، قد يكون المستخدم مسجل الدخول بالفعل
    // لكننا نفضل التحقق منه عبر supabase
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session && !access_token) {
        setMessage({ text: "⚠️ الرابط غير صالح. يرجى طلب رابط جديد.", type: "error" });
        setIsValidToken(false);
      }
    };
    if (router.isReady) {
      checkSession();
    }
  }, [router.isReady, router.query]);

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
    if (password.length < 6) {
      setMessage({ text: "❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل.", type: "error" });
      return;
    }
    if (password !== confirm) {
      setMessage({ text: "❌ كلمة المرور غير متطابقة مع تأكيدها.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    // تحديث كلمة المرور للمستخدم المسجل حالياً (بفضل الـ token)
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage({ text: `❌ ${error.message}`, type: "error" });
    } else {
      setMessage({ text: "✅ تم تحديث كلمة المرور بنجاح! جاري التوجيه...", type: "success" });
      // تسجيل الخروج من الجلسة الحالية وتوجيهه لتسجيل الدخول
      setTimeout(() => {
        supabase.auth.signOut();
        router.push("/auth/login");
      }, 2000);
    }
    setLoading(false);
  };

  if (!isValidToken && message.text) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>⚠️ رابط غير صالح</h1>
          <p style={styles.subtitle}>{message.text}</p>
          <Link href="/auth/forgot-password" style={{ ...styles.bottomLink, fontSize: 16 }}>
            طلب رابط جديد ←
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>إعادة تعيين كلمة المرور - Smart Lab</title>
        <meta name="description" content="أدخل كلمة مرور جديدة لحسابك في منصة سمارت لاب." />
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
            <span style={styles.logoText}>
              <span style={styles.logoSmart}>Smart</span>
              <span style={styles.logoLab}>Lab</span>
            </span>
          </div>

          <h1 style={styles.title}>كلمة مرور جديدة</h1>
          <p style={styles.subtitle}>أدخل كلمة مرور قوية لحسابك</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <span style={styles.iconRight}><LockIcon /></span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور الجديدة"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
                aria-label="كلمة المرور الجديدة"
                dir="ltr"
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

            <div style={styles.field}>
              <span style={styles.iconRight}><LockIcon /></span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="تأكيد كلمة المرور"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={styles.input}
                onFocus={focusStyle}
                onBlur={blurStyle}
                aria-label="تأكيد كلمة المرور"
                dir="ltr"
              />
              <button
                type="button"
                style={styles.eyeBtn}
                onClick={() => setShowConfirm((v) => !v)}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.tealDark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.teal)}
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
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
              {loading ? "جاري الحفظ..." : <><SaveIcon /> تحديث كلمة المرور</>}
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

// pages/auth/verify-otp.js - صفحة التحقق من رمز OTP
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
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
  cream: "#f5f1e9",
  text: "#0d1e3b",
  muted: "#8a99a8",
  border: "#bcd7db",
  error: "#E74C3C",
  success: "#2ECC71",
};

const OTP_LENGTH = 6;

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
    padding: "52px 60px 56px",
    textAlign: "center",
    boxSizing: "border-box",
  },
  lockWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 26,
    color: COLORS.navy,
  },
  title: {
    fontSize: 34,
    fontWeight: 800,
    color: COLORS.navy,
    margin: "0 0 18px",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.7,
    margin: "0 auto 40px",
    maxWidth: 440,
  },
  otpRow: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  otpInput: {
    width: 68,
    height: 84,
    borderRadius: 8,
    border: `1.5px solid ${COLORS.teal}`,
    backgroundColor: COLORS.cream,
    color: COLORS.text,
    fontSize: 30,
    fontWeight: 700,
    textAlign: "center",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    fontFamily: "inherit",
  },
  otpInputError: {
    borderColor: COLORS.error,
    boxShadow: `0 0 0 3px rgba(231,76,60,0.15)`,
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
    transition: "background-color 0.25s ease, transform 0.25s ease",
    fontFamily: "inherit",
  },
  submitDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  resendRow: {
    marginTop: 26,
    fontSize: 16,
    color: COLORS.text,
  },
  resendLink: {
    color: COLORS.teal,
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.25s ease",
  },
  backLink: {
    marginTop: 14,
    fontSize: 15,
    color: COLORS.muted,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.25s ease",
    display: "inline-block",
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
};

function LockIcon() {
  return (
    <svg
      width="86"
      height="86"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
      <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      <line x1="12" y1="16.2" x2="12" y2="18" />
    </svg>
  );
}

export default function VerifyOtp() {
  const router = useRouter();
  const { email } = router.query;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputsRef = useRef([]);

  // التحقق من وجود البريد الإلكتروني
  useEffect(() => {
    if (!email && router.isReady) {
      setError("❌ البريد الإلكتروني مطلوب. يرجى العودة إلى صفحة التسجيل.");
    }
  }, [email, router.isReady]);

  const focusStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.tealDark;
    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(23,145,158,0.15)`;
  };
  const blurStyle = (e) => {
    e.currentTarget.style.borderColor = COLORS.teal;
    e.currentTarget.style.boxShadow = "none";
  };

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");
    setSuccess("");
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setOtp(next);
    setError("");
    setSuccess("");
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  // دالة إعادة إرسال الرمز
  const handleResend = async () => {
    if (!email) {
      setError("❌ البريد الإلكتروني غير موجود. يرجى العودة إلى صفحة التسجيل.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const { error: resendError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (resendError) {
      setError(`❌ ${resendError.message}`);
    } else {
      setSuccess("✅ تم إعادة إرسال الرمز إلى بريدك الإلكتروني");
    }
    setLoading(false);
  };

  // دالة التحقق من OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== OTP_LENGTH) {
      setError("❌ يرجى إدخال الرمز المكون من 6 أرقام بالكامل");
      return;
    }
    if (!email) {
      setError("❌ البريد الإلكتروني مطلوب. يرجى العودة إلى صفحة التسجيل.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "email",
    });

    if (verifyError) {
      setError(`❌ ${verifyError.message}`);
      // تحديد الحقل الأول لعرض الخطأ
      inputsRef.current[0]?.focus();
    } else {
      setSuccess("✅ تم التحقق بنجاح! جاري التوجيه...");
      // تأخير بسيط قبل التوجيه
      setTimeout(() => {
        router.push("/assessment/categories");
      }, 1500);
    }
    setLoading(false);
  };

  // العودة إلى صفحة التسجيل لتعديل البريد
  const goBackToSignup = () => {
    router.push("/auth/signup");
  };

  // إذا كان البريد الإلكتروني غير موجود
  if (!email && router.isReady) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>⚠️ خطأ</h1>
          <p style={styles.subtitle}>البريد الإلكتروني مطلوب للتحقق.</p>
          <Link href="/auth/signup" style={styles.backLink}>
            ← العودة إلى التسجيل
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>رمز التحقق - Smart Lab</title>
        <meta
          name="description"
          content="أدخل رمز التحقق المرسل إلى بريدك الإلكتروني لتأكيد حسابك في منصة سمارت لاب."
        />
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
            .otp-card { padding: 40px 20px 44px !important; }
            .otp-row { gap: 8px !important; }
            .otp-input { width: 44px !important; height: 58px !important; font-size: 22px !important; }
          }
        `}</style>
      </Head>

      <div style={styles.page} dir="rtl">
        <div style={styles.card} className="otp-card">
          <div style={styles.lockWrap}>
            <LockIcon />
          </div>

          <h1 style={styles.title}>رمز التحقق</h1>
          <p style={styles.subtitle}>
            يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى <br />
            <strong style={{ color: COLORS.teal }}>{email}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.otpRow} className="otp-row">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  style={{
                    ...styles.otpInput,
                    ...(error && !success ? styles.otpInputError : {}),
                  }}
                  className="otp-input"
                  aria-label={`الرقم ${index + 1}`}
                  disabled={loading}
                />
              ))}
            </div>

            {/* رسائل الخطأ / النجاح */}
            {error && (
              <div style={{ ...styles.message, ...styles.messageError }}>{error}</div>
            )}
            {success && (
              <div style={{ ...styles.message, ...styles.messageSuccess }}>{success}</div>
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
              {loading ? "جاري التحقق..." : "تأكيد الرمز"}
            </button>
          </form>

          <p style={styles.resendRow}>
            لم يصلك الرمز؟{" "}
            <span
              style={{
                ...styles.resendLink,
                ...(loading ? { opacity: 0.6, cursor: "not-allowed" } : {}),
              }}
              onClick={!loading ? handleResend : undefined}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.color = COLORS.tealDark;
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.color = COLORS.teal;
              }}
            >
              إعادة إرسال
            </span>
          </p>

          <span
            onClick={goBackToSignup}
            style={styles.backLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.teal)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.muted)}
          >
            ← تعديل البريد الإلكتروني
          </span>
        </div>
      </div>
    </>
  );
}

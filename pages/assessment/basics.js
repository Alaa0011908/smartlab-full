// pages/assessment/basics.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from "../../components/Navbar";

export default function BasicsAssessments() {
  const router = useRouter();
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('basicsProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedAssessments(data.completed || []);
      setTotalScore(data.totalScore || 0);
    }
  }, []);

  const assessments = [
    { id: 'concepts', title: '📘 المفاهيم العامة', description: 'تعريف الشبكة، أنواعها، نماذج Client-Server و P2P، الكابلات، أنواع الإرسال', questions: 40, time: '8-10 دقائق', icon: '📘', color: '#1E3A8A', completed: completedAssessments.includes('concepts'), type: 'topic' },
    { id: 'ipv4', title: '🌍 IPv4', description: 'تعريف IP، التصنيف (Class A, B, C)، العناوين العامة والخاصة، Gateway، Loopback', questions: 35, time: '7-9 دقائق', icon: '🌍', color: '#2ECC71', completed: completedAssessments.includes('ipv4'), type: 'topic' },
    { id: 'subnetting', title: '🔢 Subnetting', description: 'حسابات الشبكات الفرعية، CIDR، المضيفين، عنوان البث، الـ Increment', questions: 30, time: '8-10 دقائق', icon: '🔢', color: '#F39C12', completed: completedAssessments.includes('subnetting'), type: 'topic' },
    { id: 'ipv6', title: '🛜 IPv6', description: 'بنية IPv6، أنواع العناوين، الاختصار، المقارنة مع IPv4', questions: 25, time: '5-7 دقائق', icon: '🛜', color: '#9B59B6', completed: completedAssessments.includes('ipv6'), type: 'topic' },
    { id: 'osi', title: '📡 OSI Model', description: 'الطبقات السبع، وظائف كل طبقة، البروتوكولات، وحدات البيانات (PDU)', questions: 25, time: '5-7 دقائق', icon: '📡', color: '#E74C3C', completed: completedAssessments.includes('osi'), type: 'topic' },
    { id: 'devices', title: '💻 أجهزة الشبكات', description: 'سويتش، راوتر، هاب، مودم، Bridge، Gateway، Access Point، Firewall', questions: 22, time: '5-6 دقائق', icon: '💻', color: '#1ABC9C', completed: completedAssessments.includes('devices'), type: 'topic' },
    { id: 'email', title: '📧 بروتوكولات البريد الإلكتروني', description: 'SMTP، POP3، IMAP، المنافذ الافتراضية، الفرق بين البروتوكولات', questions: 15, time: '3-4 دقائق', icon: '📧', color: '#E67E22', completed: completedAssessments.includes('email'), type: 'topic' },
    { id: 'tcpip', title: '🔗 TCP/IP', description: 'طبقات TCP/IP، TCP vs UDP، HTTP، Three-Way Handshake', questions: 25, time: '5-7 دقائق', icon: '🔗', color: '#16A085', completed: completedAssessments.includes('tcpip'), type: 'topic' },
    { id: 'full', title: '📊 التقييم الشامل', description: 'جميع موضوعات الشبكات في تقييم واحد متكامل', questions: 202, time: '40-50 دقيقة', icon: '📊', color: '#2C3E50', completed: completedAssessments.includes('full'), type: 'full' },
    { id: 'quick', title: '⚡ تقييم سريع', description: '15 سؤال تشخيصي لتحديد مستواك بدقة وسرعة', questions: 15, time: '5-8 دقائق', icon: '⚡', color: '#FF9800', completed: completedAssessments.includes('quick'), type: 'quick', isQuick: true },
  ];

  const completedCount = assessments.filter(a => a.completed).length;
  const progress = Math.round((completedCount / assessments.length) * 100);

  const startAssessment = (assessment) => {
    if (assessment.isQuick) {
      router.push(`/assessment/full?mode=quick`);
    } else {
      router.push(`/assessment/${assessment.id}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* ===== Navbar ===== */}
      <Navbar />

      <main style={styles.main}>
        <div style={styles.pageHeader}>
          <h1 style={styles.title}>📂 أساسيات الشبكات</h1>
          <p style={styles.subtitle}>اختر التقييم المناسب لك، كل تقييم يركز على مجال محدد</p>
        </div>

        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>📊 تقدمك في أساسيات الشبكات</span>
            <span style={styles.progressPercentage}>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={styles.progressStats}>
            <span>✅ {completedCount} من {assessments.length} تقييمات مكتملة</span>
            <span>🏆 {totalScore} نقطة</span>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>📚 تقييمات حسب الموضوع</h3>
        <div style={styles.assessmentsGrid}>
          {assessments.filter(a => a.type === 'topic').map((assessment) => (
            <div key={assessment.id} style={{ ...styles.assessmentCard, borderColor: assessment.completed ? '#2ECC71' : '#e0e0e0', opacity: assessment.completed ? 0.85 : 1 }}>
              <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIcon, backgroundColor: assessment.color }}>{assessment.icon}</div>
                <div style={styles.cardInfo}>
                  <h3 style={styles.cardTitle}>{assessment.title}</h3>
                  <div style={styles.cardMeta}>
                    <span>📝 {assessment.questions} سؤال</span>
                    <span>⏱️ {assessment.time}</span>
                  </div>
                </div>
                {assessment.completed && <span style={styles.completedBadge}>✅ مكتمل</span>}
              </div>
              <p style={styles.cardDescription}>{assessment.description}</p>
              <button onClick={() => startAssessment(assessment)} style={{ ...styles.startButton, backgroundColor: assessment.completed ? '#2ECC71' : assessment.color }}>
                {assessment.completed ? '🔄 إعادة التقييم' : '▶️ ابدأ التقييم'}
              </button>
            </div>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>🎯 تقييمات المستوى العام</h3>
        <div style={styles.specialGrid}>
          {assessments.filter(a => a.type === 'full' || a.type === 'quick').map((assessment) => (
            <div key={assessment.icon} style={{ ...styles.specialCard, borderColor: assessment.isQuick ? '#FF9800' : '#2C3E

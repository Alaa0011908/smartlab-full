// components/SkillTree.js
import React, { useState } from 'react';

/**
 * 🌳 مكون عرض شجرة المهارات الهرمية
 * يستقبل treeData (كائن يحتوي على المهارات الفرعية مع نسبها)
 * ويعرضها بشكل هرمي مع تلوين حسب نسبة الإتقان
 */
const SkillTree = ({ treeData, level = 0 }) => {
  const [expandedNodes, setExpandedNodes] = useState({});

  if (!treeData || Object.keys(treeData).length === 0) {
    return <p style={{ color: '#999', textAlign: 'center' }}>لا توجد بيانات كافية لبناء الشجرة</p>;
  }

  // دالة لحساب اللون بناءً على النسبة المئوية
  const getColor = (percentage) => {
    if (percentage >= 70) return '#2ECC71'; // أخضر - متقن
    if (percentage >= 30) return '#F1C40F'; // أصفر - قيد التعلم
    return '#E74C3C'; // أحمر - ضعيف
  };

  // دالة للحصول على الإيموجي المناسب
  const getEmoji = (percentage) => {
    if (percentage >= 70) return '✅';
    if (percentage >= 30) return '⏳';
    return '❌';
  };

  // دالة للحصول على النص الوصفي
  const getStatusText = (percentage) => {
    if (percentage >= 70) return 'متقن';
    if (percentage >= 30) return 'قيد التعلم';
    return 'ضعيف';
  };

  const toggleNode = (nodeKey) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeKey]: !prev[nodeKey]
    }));
  };

  // تحويل الكائن إلى مصفوفة لتكرارها
  const entries = Object.entries(treeData);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Tahoma, sans-serif', padding: '8px 0' }}>
      {entries.map(([key, node]) => {
        const hasChildren = node.children && Object.keys(node.children).length > 0;
        const percentage = node.percentage || 0;
        const color = getColor(percentage);
        const emoji = getEmoji(percentage);
        const status = getStatusText(percentage);
        const isExpanded = expandedNodes[key] !== false; // افتراضياً موسع

        return (
          <div key={key} style={{ marginRight: level * 25, marginBottom: 6 }}>
            {/* العقدة الرئيسية */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 14px',
                borderRadius: '10px',
                backgroundColor: `${color}22`, // لون خفيف جداً
                borderRight: `5px solid ${color}`,
                cursor: hasChildren ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
              }}
              onClick={() => hasChildren && toggleNode(key)}
              onMouseEnter={(e) => {
                if (hasChildren) e.currentTarget.style.backgroundColor = `${color}44`;
              }}
              onMouseLeave={(e) => {
                if (hasChildren) e.currentTarget.style.backgroundColor = `${color}22`;
              }}
            >
              <span style={{ fontWeight: 'bold', color: '#0D1E3B', flex: 1, fontSize: level === 0 ? '16px' : '14px' }}>
                {node.name || key}
              </span>
              
              <span style={{
                backgroundColor: color,
                color: 'white',
                padding: '2px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {emoji} {percentage}%
              </span>

              <span style={{
                fontSize: '11px',
                color: '#555',
                backgroundColor: '#f0f0f0',
                padding: '1px 10px',
                borderRadius: '12px',
                fontWeight: '600'
              }}>
                {status}
              </span>

              {hasChildren && (
                <span style={{ fontSize: '14px', color: '#888', marginRight: '4px' }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              )}
            </div>

            {/* الأطفال (العقد الفرعية) - عرض تكراري */}
            {hasChildren && isExpanded && (
              <div style={{ marginRight: '10px', borderRight: '2px dashed #ddd', paddingRight: '15px', marginTop: '4px' }}>
                <SkillTree treeData={node.children} level={level + 1} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SkillTree;

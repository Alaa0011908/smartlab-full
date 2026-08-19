// components/SkillTree.js
// ============================================================
// 🌳 شجرة المهارات التفاعلية - Interactive Skill Tree v3.0
// تعرض المهارات بشكل هرمي مع إمكانية النقر على العقد
// ============================================================

import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// 🎨 الألوان والأنماط
// ============================================================
const COLORS = {
  teal: "#17919e",
  tealDark: "#127a86",
  orange: "#e1682e",
  navy: "#0D1E3B",
  white: "#ffffff",
  muted: "#5b6b7b",
  border: "#e6ecf1",
  success: "#2ECC71",
  successDark: "#27AE60",
  warning: "#F39C12",
  warningDark: "#E67E22",
  error: "#E74C3C",
  errorDark: "#C0392B",
  purple: "#9B59B6",
  lightGray: "#f8f9fa",
};

// ============================================================
// 🎯 المكون الرئيسي
// ============================================================

const SkillTree = ({ treeData, level = 0, onNodeClick = null, expanded = true }) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // تهيئة حالة التوسيع
  useEffect(() => {
    if (expanded) {
      const allExpanded = {};
      const expandAll = (data, prefix = '') => {
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            const nodeKey = prefix ? `${prefix}.${key}` : key;
            allExpanded[nodeKey] = true;
            if (data[key]?.children) {
              expandAll(data[key].children, nodeKey);
            }
          });
        }
      };
      expandAll(treeData);
      setExpandedNodes(allExpanded);
    }
  }, [treeData, expanded]);

  // التحقق من وجود بيانات
  if (!treeData || typeof treeData !== 'object' || Object.keys(treeData).length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <span style={styles.emptyIcon}>🌳</span>
        <p style={styles.emptyText}>لا توجد بيانات كافية لبناء الشجرة</p>
        <p style={styles.emptySubtext}>قم بإجراء تقييم أولاً للحصول على تحليل المهارات</p>
      </div>
    );
  }

  // ============================================================
  // 🔷 دوال مساعدة
  // ============================================================

  // الحصول على اللون حسب النسبة المئوية
  const getColorByPercentage = (percentage) => {
    if (percentage >= 70) return COLORS.success;
    if (percentage >= 40) return COLORS.warning;
    return COLORS.error;
  };

  // الحصول على الإيموجي حسب النسبة المئوية
  const getEmojiByPercentage = (percentage) => {
    if (percentage >= 70) return '✅';
    if (percentage >= 40) return '⏳';
    return '❌';
  };

  // الحصول على النص الوصفي حسب النسبة المئوية
  const getStatusText = (percentage) => {
    if (percentage >= 70) return 'متقن';
    if (percentage >= 40) return 'قيد التعلم';
    return 'ضعيف';
  };

  // الحصول على لون الخلفية حسب النسبة
  const getBgColor = (percentage) => {
    if (percentage >= 70) return `${COLORS.success}22`;
    if (percentage >= 40) return `${COLORS.warning}22`;
    return `${COLORS.error}22`;
  };

  // تبديل حالة التوسيع
  const toggleNode = (nodeKey) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeKey]: !prev[nodeKey]
    }));
  };

  // التعامل مع النقر على العقدة
  const handleNodeClick = (nodeKey, nodeData) => {
    setSelectedNode(nodeKey);
    if (onNodeClick) {
      onNodeClick(nodeKey, nodeData);
    }
  };

  // ============================================================
  // 🔷 دوال العرض
  // ============================================================

  // عرض تفاصيل العقدة المختارة
  const renderNodeDetails = () => {
    if (!selectedNode || !treeData) return null;

    // البحث عن العقدة المختارة
    const findNode = (data, path = '') => {
      if (!data || typeof data !== 'object') return null;
      
      for (const key of Object.keys(data)) {
        const currentPath = path ? `${path}.${key}` : key;
        if (currentPath === selectedNode) {
          return { key, data: data[key], path: currentPath };
        }
        if (data[key]?.children) {
          const result = findNode(data[key].children, currentPath);
          if (result) return result;
        }
      }
      return null;
    };

    const node = findNode(treeData);
    if (!node) return null;

    const { key, data } = node;
    const percentage = data.percentage || 0;
    const color = getColorByPercentage(percentage);
    const status = getStatusText(percentage);
    const emoji = getEmojiByPercentage(percentage);

    return (
      <div style={styles.detailsPanel}>
        <div style={styles.detailsHeader}>
          <span style={styles.detailsTitle}>
            {data.icon || '📘'} {data.name || key}
          </span>
          <button 
            onClick={() => setSelectedNode(null)}
            style={styles.detailsClose}
          >
            ✕
          </button>
        </div>
        
        <div style={styles.detailsBody}>
          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>المستوى:</span>
            <span style={{ 
              ...styles.detailsValue,
              color: color,
              fontWeight: 700,
            }}>
              {emoji} {status} ({percentage}%)
            </span>
          </div>

          {data.rootCause && (
            <div style={styles.detailsRow}>
              <span style={styles.detailsLabel}>🧩 السبب الجذري:</span>
              <span style={styles.detailsValue}>{data.rootCause}</span>
            </div>
          )}

          {data.futureImpact && (
            <div style={styles.detailsRow}>
              <span style={styles.detailsLabel}>📉 التأثير المستقبلي:</span>
              <span style={styles.detailsValue}>{data.futureImpact}</span>
            </div>
          )}

          {data.remediationQuery && (
            <div style={styles.detailsRow}>
              <span style={styles.detailsLabel}>📚 رابط مفيد:</span>
              <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.remediationQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.detailsLink}
              >
                ▶ شاهد شرحاً لهذه المهارة
              </a>
            </div>
          )}

          {/* عرض المهارات الفرعية إن وجدت */}
          {data.children && Object.keys(data.children).length > 0 && (
            <div style={styles.detailsChildren}>
              <span style={styles.detailsLabel}>📂 المهارات الفرعية:</span>
              <div style={styles.detailsChildrenList}>
                {Object.keys(data.children).map(childKey => (
                  <span key={childKey} style={styles.detailsChildTag}>
                    {data.children[childKey]?.icon || '📄'} {data.children[childKey]?.name || childKey}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // 🔷 العرض التكراري للعقد
  // ============================================================

  const renderNode = (data, prefix = '') => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, node]) => {
      const nodeKey = prefix ? `${prefix}.${key}` : key;
      const hasChildren = node.children && Object.keys(node.children).length > 0;
      const percentage = node.percentage || 0;
      const color = getColorByPercentage(percentage);
      const emoji = getEmojiByPercentage(percentage);
      const status = getStatusText(percentage);
      const isExpanded = expandedNodes[nodeKey] !== false;
      const isSelected = selectedNode === nodeKey;
      const isHovered = hoveredNode === nodeKey;

      // حساب مستوى التداخل
      const level = nodeKey.split('.').length - 1;
      const paddingRight = Math.min(level * 20, 60);

      return (
        <div key={nodeKey} style={{ ...styles.nodeWrapper, paddingRight }}>
          {/* العقدة الرئيسية */}
          <div
            style={{
              ...styles.nodeContainer,
              backgroundColor: isSelected ? `${color}33` : getBgColor(percentage),
              borderColor: isSelected ? color : (isHovered ? color : COLORS.border),
              borderWidth: isSelected ? '3px' : '2px',
              transform: isHovered ? 'translateX(-4px)' : 'none',
              boxShadow: isSelected ? `0 4px 12px ${color}44` : 'none',
            }}
            onClick={() => {
              handleNodeClick(nodeKey, node);
              if (hasChildren) toggleNode(nodeKey);
            }}
            onMouseEnter={() => setHoveredNode(nodeKey)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div style={styles.nodeContent}>
              <div style={styles.nodeMain}>
                <span style={styles.nodeIcon}>
                  {node.icon || (hasChildren ? '📁' : '📄')}
                </span>
                <span style={styles.nodeName}>
                  {node.name || key}
                </span>
              </div>

              <div style={styles.nodeStatus}>
                <span style={{
                  ...styles.nodeBadge,
                  backgroundColor: color,
                  color: COLORS.white,
                }}>
                  {emoji} {percentage}%
                </span>
                <span style={{
                  ...styles.nodeLevel,
                  color: color,
                }}>
                  {status}
                </span>
                {hasChildren && (
                  <span style={styles.nodeToggle}>
                    {isExpanded ? '▼' : '▶'}
                  </span>
                )}
              </div>
            </div>

            {/* شريط التقدم المصغر */}
            <div style={styles.miniProgress}>
              <div style={{
                ...styles.miniProgressFill,
                width: `${Math.min(100, percentage)}%`,
                backgroundColor: color,
              }} />
            </div>
          </div>

          {/* الأطفال (العقد الفرعية) */}
          {hasChildren && isExpanded && (
            <div style={styles.childrenContainer}>
              {renderNode(node.children, nodeKey)}
            </div>
          )}
        </div>
      );
    });
  };

  // ============================================================
  // 🔷 الواجهة الرئيسية
  // ============================================================

  return (
    <div style={styles.container}>
      {/* رأس الشجرة مع الإحصائيات */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerIcon}>🌳</span>
          <h3 style={styles.headerTitle}>خريطة مهاراتك</h3>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.headerBadge}>
            🟢 متقن (≥70%)
          </span>
          <span style={styles.headerBadge}>
            🟡 قيد التعلم (40-70%)
          </span>
          <span style={styles.headerBadge}>
            🔴 ضعيف (&lt;40%)
          </span>
        </div>
      </div>

      {/* محتوى الشجرة */}
      <div style={styles.treeContainer}>
        {renderNode(treeData)}
      </div>

      {/* لوحة التفاصيل (عند النقر) */}
      {selectedNode && renderNodeDetails()}

      {/* الأسطورة (للشاشات الصغيرة) */}
      {isMobile && (
        <div style={styles.mobileLegend}>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, backgroundColor: COLORS.success }} />
            متقن
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, backgroundColor: COLORS.warning }} />
            قيد التعلم
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, backgroundColor: COLORS.error }} />
            ضعيف
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 🎨 الأنماط
// ============================================================

const styles = {
  container: {
    direction: 'rtl',
    fontFamily: "'Segoe UI', Tahoma, 'Cairo', system-ui, sans-serif",
    padding: '4px 0',
    width: '100%',
  },

  // ===== الرأس =====
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '16px',
    padding: '0 4px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  headerIcon: {
    fontSize: '24px',
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: COLORS.navy,
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  headerBadge: {
    fontSize: '12px',
    fontWeight: 600,
    color: COLORS.muted,
    padding: '2px 10px',
    borderRadius: '12px',
    backgroundColor: COLORS.lightGray,
  },

  // ===== العقد =====
  nodeWrapper: {
    marginBottom: '6px',
  },
  nodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 16px',
    borderRadius: '10px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  nodeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  nodeMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  nodeIcon: {
    fontSize: '18px',
  },
  nodeName: {
    fontSize: '14px',
    fontWeight: 600,
    color: COLORS.navy,
  },
  nodeStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  nodeBadge: {
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 700,
  },
  nodeLevel: {
    fontSize: '12px',
    fontWeight: 600,
  },
  nodeToggle: {
    fontSize: '12px',
    color: COLORS.muted,
    fontWeight: 700,
    marginRight: '4px',
  },
  miniProgress: {
    height: '3px',
    backgroundColor: COLORS.border,
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '6px',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.5s ease',
  },

  // ===== الأطفال =====
  childrenContainer: {
    marginRight: '16px',
    borderRight: '2px dashed',
    borderColor: COLORS.border,
    paddingRight: '12px',
    marginTop: '4px',
  },

  // ===== لوحة التفاصيل =====
  detailsPanel: {
    marginTop: '16px',
    backgroundColor: COLORS.lightGray,
    borderRadius: '12px',
    border: `1px solid ${COLORS.border}`,
    overflow: 'hidden',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: COLORS.white,
    borderBottom: `1px solid ${COLORS.border}`,
  },
  detailsTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: COLORS.navy,
  },
  detailsClose: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: COLORS.muted,
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  },
  detailsBody: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detailsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '14px',
    lineHeight: 1.6,
  },
  detailsLabel: {
    fontWeight: 600,
    color: COLORS.muted,
    minWidth: '100px',
    flexShrink: 0,
  },
  detailsValue: {
    color: COLORS.text,
    flex: 1,
  },
  detailsLink: {
    color: COLORS.teal,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '13px',
    transition: 'color 0.2s ease',
  },
  detailsChildren: {
    marginTop: '4px',
  },
  detailsChildrenList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
  },
  detailsChildTag: {
    padding: '2px 10px',
    backgroundColor: COLORS.white,
    borderRadius: '12px',
    fontSize: '12px',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.muted,
  },

  // ===== فارغ =====
  emptyContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: COLORS.lightGray,
    borderRadius: '16px',
    border: `2px dashed ${COLORS.border}`,
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '12px',
  },
  emptyText: {
    fontSize: '16px',
    fontWeight: 600,
    color: COLORS.navy,
    margin: '0 0 4px',
  },
  emptySubtext: {
    fontSize: '14px',
    color: COLORS.muted,
    margin: 0,
  },

  // ===== الأسطورة =====
  mobileLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: `1px solid ${COLORS.border}`,
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: COLORS.muted,
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  },
};

// ============================================================
// 🔷 تصدير المكون
// ============================================================

export default SkillTree;

// ============================================================
// 🔷 دوال مساعدة للاستخدام الخارجي
// ============================================================

/**
 * تحويل بيانات المهارات المسطحة إلى هيكل شجري
 * @param {Array} flatSkills - قائمة المهارات المسطحة
 * @param {Object} hierarchy - هيكل العلاقات الهرمية
 * @returns {Object} الهيكل الشجري
 */
export const buildSkillTree = (flatSkills, hierarchy = {}) => {
  if (!flatSkills || flatSkills.length === 0) return {};

  const tree = {};

  flatSkills.forEach(skill => {
    const id = skill.id || skill.skill_id || skill.name;
    const name = skill.name || skill.skill_name || id;
    const percentage = skill.percentage || 0;
    const level = skill.level || getStatusText(percentage);
    const icon = skill.icon || getEmojiByPercentage(percentage);
    const rootCause = skill.rootCause || null;
    const futureImpact = skill.futureImpact || null;
    const remediationQuery = skill.remediationVideoQuery || skill.remediationQuery || null;

    // تحديد المجموعة (من الهيراركية أو توليد تلقائي)
    let category = skill.category || hierarchy[id] || 'أخرى';
    
    if (!tree[category]) {
      tree[category] = {
        name: category,
        icon: '📂',
        children: {},
        percentage: 0,
        level: 'غير محدد',
      };
    }

    // إضافة المهارة كطفل
    tree[category].children[id] = {
      name,
      icon,
      percentage,
      level,
      rootCause,
      futureImpact,
      remediationQuery,
      children: {},
    };
  });

  // حساب النسبة المتوسطة لكل مجموعة
  Object.keys(tree).forEach(category => {
    const children = Object.values(tree[category].children);
    if (children.length > 0) {
      const avg = children.reduce((sum, child) => sum + child.percentage, 0) / children.length;
      tree[category].percentage = Math.round(avg);
      tree[category].level = getStatusText(tree[category].percentage);
    }
  });

  return tree;
};

/**
 * الحصول على إحصائيات الشجرة
 * @param {Object} treeData - بيانات الشجرة
 * @returns {Object} الإحصائيات
 */
export const getTreeStats = (treeData) => {
  if (!treeData || typeof treeData !== 'object') {
    return { total: 0, mastered: 0, learning: 0, weak: 0 };
  }

  let total = 0;
  let mastered = 0;
  let learning = 0;
  let weak = 0;

  const traverse = (data) => {
    if (!data || typeof data !== 'object') return;
    
    Object.values(data).forEach(node => {
      if (node.percentage !== undefined) {
        total++;
        if (node.percentage >= 70) mastered++;
        else if (node.percentage >= 40) learning++;
        else weak++;
      }
      if (node.children) {
        traverse(node.children);
      }
    });
  };

  traverse(treeData);

  return { total, mastered, learning, weak };
};

/**
 * البحث عن عقدة في الشجرة
 * @param {Object} treeData - بيانات الشجرة
 * @param {string} nodeId - معرف العقدة
 * @returns {Object|null} العقدة أو null
 */
export const findNodeInTree = (treeData, nodeId) => {
  if (!treeData || typeof treeData !== 'object') return null;

  const search = (data) => {
    if (!data || typeof data !== 'object') return null;

    for (const [key, value] of Object.entries(data)) {
      if (key === nodeId || value.name === nodeId || value.id === nodeId) {
        return { key, ...value };
      }
      if (value.children) {
        const result = search(value.children);
        if (result) return result;
      }
    }
    return null;
  };

  return search(treeData);
};

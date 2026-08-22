// components/LearningMap.js
import { useState } from 'react';

export default function LearningMap({ topicAnalysis }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // تعريف خريطة التعلم (الموضوعات بالترتيب)
  const roadmap = [
    { id: 'IPv4', label: 'IPv4', icon: '🌐' },
    { id: 'Subnetting', label: 'Subnetting', icon: '🔢' },
    { id: 'IPv6', label: 'IPv6', icon: '🛜' },
    { id: 'OSI Model', label: 'OSI Model', icon: '📡' },
    { id: 'Ethernet', label: 'Ethernet', icon: '🔌' },
    { id: 'Routing', label: 'Routing', icon: '🗺️' },
  ];

  // تحديد حالة كل موضوع (مكتمل، قيد التعلم، لم يبدأ)
  const getNodeStatus = (topicId) => {
    const data = topicAnalysis?.[topicId];
    if (!data) return { status: 'locked', score: 0 };
    const score = data.percentage || 0;
    if (score >= 70) return { status: 'mastered', score };
    if (score >= 40) return { status: 'learning', score };
    return { status: 'locked', score };
  };

  // حساب التقدم الكلي
  const masteredCount = roadmap.filter(topic => {
    const { status } = getNodeStatus(topic.id);
    return status === 'mastered';
  }).length;
  const progress = Math.round((masteredCount / roadmap.length) * 100);

  return (
    <div style={styles.container}>
      {/* رأس الخريطة مع شريط التقدم */}
      <div style={styles.header}>
        <h2 style={styles.title}>🗺️ رحلتك التعليمية</h2>
        <div style={styles.progressWrapper}>
          <span style={styles.progressText}>التقدم: {progress}%</span>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* الخريطة */}
      <div style={styles.mapContainer}>
        {roadmap.map((topic, index) => {
          const node = getNodeStatus(topic.id);
          const isActive = node.status !== 'locked';

          let nodeColor = '#ccc';
          if (node.status === 'mastered') nodeColor = '#2ECC71';
          else if (node.status === 'learning') nodeColor = '#F39C12';
          else nodeColor = '#95a5a6';

          return (
            <div key={topic.id} style={styles.nodeWrapper}>
              {index < roadmap.length - 1 && (
                <div style={{
                  ...styles.connectorLine,
                  backgroundColor: isActive ? '#2ECC71' : '#ddd',
                }} />
              )}

              <div
                style={styles.nodeContainer}
                onMouseEnter={() => setHoveredNode(topic.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div style={{
                  ...styles.node,
                  borderColor: nodeColor,
                  backgroundColor: node.status === 'mastered' ? '#2ECC71' :
                                 node.status === 'learning' ? '#F39C12' : '#ecf0f1',
                  opacity: node.status === 'locked' ? 0.5 : 1,
                  transform: hoveredNode === topic.id ? 'scale(1.15)' : 'scale(1)',
                }}>
                  <span style={styles.nodeIcon}>{topic.icon}</span>
                  {node.status === 'mastered' && <span style={styles.checkmark}>✓</span>}
                </div>

                <div style={styles.nodeLabel}>{topic.label}</div>

                {hoveredNode === topic.id && (
                  <div style={styles.tooltip}>
                    <strong>{topic.label}</strong>
                    <p>النسبة: {node.score}%</p>
                    <p style={{
                      color: node.status === 'mastered' ? '#2ECC71' :
                             node.status === 'learning' ? '#F39C12' : '#95a5a6'
                    }}>
                      {node.status === 'mastered' && '✅ مكتمل'}
                      {node.status === 'learning' && '⏳ قيد التعلم'}
                      {node.status === 'locked' && '🔒 لم يبدأ'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* الأسطورة */}
      <div style={styles.legend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#2ECC71' }} />
          مكتمل
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#F39C12' }} />
          قيد التعلم
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#95a5a6' }} />
          لم يبدأ
        </span>
      </div>
    </div>
  );
}

// الأنماط
const styles = {
  container: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    marginTop: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    direction: 'rtl',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.3rem',
    color: '#0D1E3B',
    margin: 0,
  },
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  progressText: {
    fontSize: '0.9rem',
    color: '#666',
  },
  progressBar: {
    width: '120px',
    height: '8px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  mapContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    overflowX: 'auto',
    minHeight: '150px',
    position: 'relative',
  },
  nodeWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  nodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  node: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '3px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
  },
  nodeIcon: {
    fontSize: '1.5rem',
  },
  checkmark: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#2ECC71',
    color: 'white',
    borderRadius: '50%',
    fontSize: '0.7rem',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeLabel: {
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  connectorLine: {
    flex: 1,
    height: '3px',
    backgroundColor: '#ddd',
    margin: '0 5px',
    zIndex: 1,
    transition: 'background-color 0.3s',
  },
  tooltip: {
    position: 'absolute',
    top: '-60px',
    backgroundColor: '#2d3436',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ecf0f1',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#666',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  },
};

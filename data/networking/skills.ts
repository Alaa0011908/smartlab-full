// data/networking/skills.ts
// ============================================================
// Computer Networking — Competency Graph
// 35 skills with i18n names, prerequisites, difficulty levels.
// IDs are language-independent. Names are localized.
// ============================================================

import type { Skill } from '../../lib/domain/types';

export const NETWORKING_SKILLS: Skill[] = [
  // ── Layer 1-2 Fundamentals ──────────────────────────────────
  {
    id: 'net_fund',
    name: { en: 'Networking Fundamentals', ar: 'أساسيات الشبكات' },
    description: { en: 'Basic concepts: nodes, links, protocols, topologies', ar: 'المفاهيم الأساسية: العقد، الروابط، البروتوكولات، الطبولوجيا' },
    domain: 'networking', parent: undefined, prerequisites: [], difficulty: 0.15, tags: ['foundation'],
  },
  {
    id: 'osi_model',
    name: { en: 'OSI Model', ar: 'نموذج OSI' },
    description: { en: 'The 7 layers and their roles', ar: 'الطبقات السبع وأدوارها' },
    domain: 'networking', parent: 'net_fund', prerequisites: ['net_fund'], difficulty: 0.25, tags: ['model', 'foundation'],
  },
  {
    id: 'tcpip_model',
    name: { en: 'TCP/IP Model', ar: 'نموذج TCP/IP' },
    description: { en: 'Internet protocol suite architecture', ar: 'بنية مجموعة بروتوكولات الإنترنت' },
    domain: 'networking', parent: 'osi_model', prerequisites: ['osi_model'], difficulty: 0.30, tags: ['model'],
  },
  {
    id: 'ethernet',
    name: { en: 'Ethernet', ar: 'إيثرنت' },
    description: { en: 'Wired LAN technology, frames, standards', ar: 'تقنية الشبكة المحلية السلكية، الإطارات، المعايير' },
    domain: 'networking', parent: 'net_fund', prerequisites: ['net_fund'], difficulty: 0.25, tags: ['l2'],
  },
  {
    id: 'mac_addressing',
    name: { en: 'MAC Addressing', ar: 'عنونة MAC' },
    description: { en: 'Layer 2 addressing, ARP, MAC tables', ar: 'عنونة الطبقة الثانية، ARP، جداول MAC' },
    domain: 'networking', parent: 'ethernet', prerequisites: ['ethernet'], difficulty: 0.30, tags: ['l2', 'addressing'],
  },

  // ── IPv4 Cluster ─────────────────────────────────────────────
  {
    id: 'ipv4_fund',
    name: { en: 'IPv4 Fundamentals', ar: 'أساسيات IPv4' },
    description: { en: 'IP address structure, classes, notation', ar: 'بنية عنوان IP، الفئات، التدوين' },
    domain: 'networking', parent: 'net_fund', prerequisites: ['net_fund'], difficulty: 0.30, tags: ['l3', 'addressing'],
  },
  {
    id: 'binary_math',
    name: { en: 'Binary & Decimal Conversion', ar: 'التحويل بين الثنائي والعشري' },
    description: { en: 'Converting between binary and decimal for IP work', ar: 'التحويل بين الثنائي والعشري لعمل IP' },
    domain: 'networking', parent: 'ipv4_fund', prerequisites: ['ipv4_fund'], difficulty: 0.45, tags: ['math', 'addressing'],
  },
  {
    id: 'subnet_mask',
    name: { en: 'Subnet Mask', ar: 'قناع الشبكة الفرعية' },
    description: { en: 'Purpose and structure of subnet masks', ar: 'الغرض والبنية لأقنعة الشبكة الفرعية' },
    domain: 'networking', parent: 'ipv4_fund', prerequisites: ['ipv4_fund', 'binary_math'], difficulty: 0.50, tags: ['addressing', 'subnetting'],
  },
  {
    id: 'cidr',
    name: { en: 'CIDR Notation', ar: 'تدوين CIDR' },
    description: { en: 'Classless Inter-Domain Routing, prefix notation', ar: 'التوجيه بين النطاقات عديم الفئات، تدوين البادئة' },
    domain: 'networking', parent: 'subnet_mask', prerequisites: ['subnet_mask', 'binary_math'], difficulty: 0.55, tags: ['addressing', 'subnetting'],
  },
  {
    id: 'subnetting',
    name: { en: 'Subnetting', ar: 'تقسيم الشبكات' },
    description: { en: 'Dividing networks into subnets, host ranges, broadcast', ar: 'تقسيم الشبكات إلى شبكات فرعية، نطاقات المضيفين، البث' },
    domain: 'networking', parent: 'cidr', prerequisites: ['cidr', 'binary_math', 'subnet_mask'], difficulty: 0.80, tags: ['addressing', 'subnetting', 'calculation'],
  },
  {
    id: 'default_gateway',
    name: { en: 'Default Gateway', ar: 'البوابة الافتراضية' },
    description: { en: 'Role of default gateway in routing traffic', ar: 'دور البوابة الافتراضية في توجيه حركة البيانات' },
    domain: 'networking', parent: 'ipv4_fund', prerequisites: ['ipv4_fund'], difficulty: 0.35, tags: ['l3', 'routing'],
  },

  // ── Switching Cluster ────────────────────────────────────────
  {
    id: 'switching',
    name: { en: 'Switching', ar: 'التحويل' },
    description: { en: 'How switches forward frames using MAC tables', ar: 'كيف تقوم المفاتيح بإعادة توجيه الإطارات باستخدام جداول MAC' },
    domain: 'networking', parent: 'ethernet', prerequisites: ['mac_addressing'], difficulty: 0.35, tags: ['l2', 'switching'],
  },
  {
    id: 'vlan',
    name: { en: 'VLAN', ar: 'الشبكة المحلية الافتراضية VLAN' },
    description: { en: 'Virtual LANs, segmentation, 802.1Q', ar: 'الشبكات المحلية الافتراضية، التجزئة، 802.1Q' },
    domain: 'networking', parent: 'switching', prerequisites: ['switching'], difficulty: 0.55, tags: ['l2', 'switching'],
  },
  {
    id: 'trunking',
    name: { en: 'Trunking', ar: 'التجميع (Trunking)' },
    description: { en: 'VLAN trunking, 802.1Q tagging, native VLAN', ar: 'تجميع VLAN، وسم 802.1Q، VLAN الأصلي' },
    domain: 'networking', parent: 'vlan', prerequisites: ['vlan'], difficulty: 0.65, tags: ['l2', 'switching'],
  },
  {
    id: 'stp',
    name: { en: 'Spanning Tree Protocol (STP)', ar: 'بروتوكول شجرة الامتداد STP' },
    description: { en: 'Loop prevention in switched networks', ar: 'منع الحلقات في الشبكات المتحولة' },
    domain: 'networking', parent: 'switching', prerequisites: ['switching', 'vlan'], difficulty: 0.70, tags: ['l2', 'switching', 'advanced'],
  },

  // ── Routing Cluster ──────────────────────────────────────────
  {
    id: 'routing_fund',
    name: { en: 'Routing Fundamentals', ar: 'أساسيات التوجيه' },
    description: { en: 'How routers forward packets, routing table', ar: 'كيف يقوم الموجهون بإعادة توجيه الحزم، جدول التوجيه' },
    domain: 'networking', parent: 'ipv4_fund', prerequisites: ['ipv4_fund', 'default_gateway'], difficulty: 0.50, tags: ['l3', 'routing'],
  },
  {
    id: 'static_routing',
    name: { en: 'Static Routing', ar: 'التوجيه الثابت' },
    description: { en: 'Configuring static routes manually', ar: 'تكوين المسارات الثابتة يدويًا' },
    domain: 'networking', parent: 'routing_fund', prerequisites: ['routing_fund'], difficulty: 0.55, tags: ['routing'],
  },
  {
    id: 'default_route',
    name: { en: 'Default Route', ar: 'المسار الافتراضي' },
    description: { en: 'Route of last resort, 0.0.0.0/0', ar: 'مسار الملاذ الأخير، 0.0.0.0/0' },
    domain: 'networking', parent: 'static_routing', prerequisites: ['static_routing'], difficulty: 0.50, tags: ['routing'],
  },
  {
    id: 'routing_table',
    name: { en: 'Routing Table Analysis', ar: 'تحليل جدول التوجيه' },
    description: { en: 'Reading and interpreting routing tables', ar: 'قراءة وتفسير جداول التوجيه' },
    domain: 'networking', parent: 'routing_fund', prerequisites: ['routing_fund', 'static_routing'], difficulty: 0.65, tags: ['routing', 'analysis'],
  },

  // ── Services Cluster ─────────────────────────────────────────
  {
    id: 'arp',
    name: { en: 'ARP', ar: 'بروتوكول تحليل العناوين ARP' },
    description: { en: 'Address Resolution Protocol, MAC-IP mapping', ar: 'بروتوكول تحليل العناوين، تعيين MAC-IP' },
    domain: 'networking', parent: 'mac_addressing', prerequisites: ['mac_addressing', 'ipv4_fund'], difficulty: 0.45, tags: ['l2', 'l3'],
  },
  {
    id: 'dhcp',
    name: { en: 'DHCP', ar: 'بروتوكول تكوين المضيف الديناميكي DHCP' },
    description: { en: 'Dynamic host configuration, DORA process', ar: 'التكوين الديناميكي للمضيف، عملية DORA' },
    domain: 'networking', parent: 'ipv4_fund', prerequisites: ['ipv4_fund'], difficulty: 0.40, tags: ['services'],
  },
  {
    id: 'dns',
    name: { en: 'DNS', ar: 'نظام أسماء النطاقات DNS' },
    description: { en: 'Domain Name System, resolution process', ar: 'نظام أسماء النطاقات، عملية الاستبيان' },
    domain: 'networking', parent: 'net_fund', prerequisites: ['net_fund', 'ipv4_fund'], difficulty: 0.40, tags: ['services'],
  },
  {
    id: 'nat',
    name: { en: 'NAT', ar: 'ترجمة عناوين الشبكة NAT' },
    description: { en: 'Network Address Translation, PAT', ar: 'ترجمة عناوين الشبكة، PAT' },
    domain: 'networking', parent: 'routing_fund', prerequisites: ['routing_fund', 'ipv4_fund'], difficulty: 0.65, tags: ['services', 'advanced'],
  },
  {
    id: 'acl',
    name: { en: 'Access Control Lists (ACL)', ar: 'قوائم التحكم في الوصول ACL' },
    description: { en: 'Packet filtering using ACLs', ar: 'تصفية الحزم باستخدام ACLs' },
    domain: 'networking', parent: 'routing_fund', prerequisites: ['routing_fund', 'ipv4_fund'], difficulty: 0.70, tags: ['security', 'advanced'],
  },

  // ── Troubleshooting Cluster ──────────────────────────────────
  {
    id: 'troubleshoot_fund',
    name: { en: 'Troubleshooting Fundamentals', ar: 'أساسيات استكشاف الأخطاء وإصلاحها' },
    description: { en: 'Systematic troubleshooting approach and methodology', ar: 'نهج منهجي لاستكشاف الأخطاء وإصلاحها' },
    domain: 'networking', parent: 'net_fund', prerequisites: ['osi_model', 'tcpip_model'], difficulty: 0.50, tags: ['troubleshooting'],
  },
  {
    id: 'layer_diagnosis',
    name: { en: 'Layer-Based Diagnosis', ar: 'التشخيص القائم على الطبقات' },
    description: { en: 'Using OSI layers to isolate faults', ar: 'استخدام طبقات OSI لعزل الأعطال' },
    domain: 'networking', parent: 'troubleshoot_fund', prerequisites: ['troubleshoot_fund', 'osi_model'], difficulty: 0.60, tags: ['troubleshooting'],
  },
  {
    id: 'ping_traceroute',
    name: { en: 'Ping & Traceroute', ar: 'Ping و Traceroute' },
    description: { en: 'Using ping and traceroute for connectivity testing', ar: 'استخدام ping و traceroute لاختبار الاتصال' },
    domain: 'networking', parent: 'troubleshoot_fund', prerequisites: ['troubleshoot_fund', 'ipv4_fund'], difficulty: 0.35, tags: ['tools', 'troubleshooting'],
  },
  {
    id: 'verification',
    name: { en: 'Fix Verification', ar: 'التحقق من الإصلاح' },
    description: { en: 'Verifying that a fix actually resolves the problem end-to-end', ar: 'التحقق من أن الإصلاح يحل المشكلة فعليًا من البداية إلى النهاية' },
    domain: 'networking', parent: 'troubleshoot_fund', prerequisites: ['troubleshoot_fund', 'ping_traceroute'], difficulty: 0.55, tags: ['troubleshooting', 'process'],
  },
  {
    id: 'problem_decomposition',
    name: { en: 'Problem Decomposition', ar: 'تحليل المشكلات' },
    description: { en: 'Breaking a complex network problem into smaller solvable parts', ar: 'تقسيم مشكلة الشبكة المعقدة إلى أجزاء أصغر قابلة للحل' },
    domain: 'networking', parent: 'troubleshoot_fund', prerequisites: ['troubleshoot_fund'], difficulty: 0.65, tags: ['troubleshooting', 'process'],
  },
  {
    id: 'l2_troubleshoot',
    name: { en: 'Layer 2 Troubleshooting', ar: 'استكشاف أخطاء الطبقة الثانية' },
    description: { en: 'Diagnosing switching, VLAN, and MAC-level issues', ar: 'تشخيص مشكلات التحويل والـVLAN وعنونة MAC' },
    domain: 'networking', parent: 'layer_diagnosis', prerequisites: ['layer_diagnosis', 'switching', 'vlan'], difficulty: 0.70, tags: ['troubleshooting', 'l2'],
  },
  {
    id: 'l3_troubleshoot',
    name: { en: 'Layer 3 Troubleshooting', ar: 'استكشاف أخطاء الطبقة الثالثة' },
    description: { en: 'Diagnosing routing, IP addressing, and gateway issues', ar: 'تشخيص مشكلات التوجيه وعنونة IP والبوابة' },
    domain: 'networking', parent: 'layer_diagnosis', prerequisites: ['layer_diagnosis', 'routing_fund', 'routing_table'], difficulty: 0.75, tags: ['troubleshooting', 'l3'],
  },
  {
    id: 'connectivity_test',
    name: { en: 'End-to-End Connectivity Testing', ar: 'اختبار الاتصال الشامل' },
    description: { en: 'Verifying full path connectivity and eliminating false fixes', ar: 'التحقق من اتصال المسار الكامل والقضاء على الإصلاحات الزائفة' },
    domain: 'networking', parent: 'verification', prerequisites: ['verification', 'ping_traceroute', 'l3_troubleshoot'], difficulty: 0.80, tags: ['troubleshooting', 'process'],
  },
];

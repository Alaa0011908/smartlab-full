// data/networking/items.ts
// ============================================================
// 55+ Assessment Items — Computer Networking
// Each item maps to skills via Q-Matrix (ItemSkillMapping).
// calibrationStatus = "provisional" for all items (no empirical calibration yet).
// ============================================================

import type { AssessmentItem } from '../../lib/domain/types';

export const NETWORKING_ITEMS: AssessmentItem[] = [

  // ─── OSI Model ───────────────────────────────────────────────

  {
    id: 'osi_001',
    text: { en: 'Which OSI layer is responsible for logical addressing (IP)?', ar: 'أي طبقة من طبقات OSI مسؤولة عن العنونة المنطقية (IP)؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Layer 2 — Data Link', ar: 'الطبقة 2 — ربط البيانات' } },
      { id: 'b', text: { en: 'Layer 3 — Network', ar: 'الطبقة 3 — الشبكة' }, },
      { id: 'c', text: { en: 'Layer 4 — Transport', ar: 'الطبقة 4 — النقل' } },
      { id: 'd', text: { en: 'Layer 1 — Physical', ar: 'الطبقة 1 — المادية' }, misconceptionId: 'misc_l2_l3' },
    ],
    correctAnswer: 'b',
    skillMappings: [
      { skillId: 'osi_model', weight: 0.9, role: 'primary' },
      { skillId: 'ipv4_fund', weight: 0.3, role: 'secondary' },
    ],
    difficulty: 0.25,
    explanation: { en: 'Layer 3 (Network) handles logical addressing using IP. Layer 2 uses MAC addresses.', ar: 'الطبقة 3 (الشبكة) تتعامل مع العنونة المنطقية باستخدام IP. الطبقة 2 تستخدم عناوين MAC.' },
    hints: [{ en: 'Think about which protocol uses IP addresses — which layer does that?', ar: 'فكر في البروتوكول الذي يستخدم عناوين IP — أي طبقة تفعل ذلك؟' }],
    calibrationStatus: 'provisional', tags: ['osi', 'l3', 'foundation'],
  },

  {
    id: 'osi_002',
    text: { en: 'A switch operates at which OSI layer?', ar: 'يعمل المفتاح (Switch) على أي طبقة من طبقات OSI؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Layer 1', ar: 'الطبقة 1' } },
      { id: 'b', text: { en: 'Layer 2', ar: 'الطبقة 2' } },
      { id: 'c', text: { en: 'Layer 3', ar: 'الطبقة 3' }, misconceptionId: 'misc_l2_l3' },
      { id: 'd', text: { en: 'Layer 4', ar: 'الطبقة 4' } },
    ],
    correctAnswer: 'b',
    skillMappings: [
      { skillId: 'osi_model', weight: 0.8, role: 'primary' },
      { skillId: 'switching', weight: 0.7, role: 'secondary' },
    ],
    difficulty: 0.30, explanation: { en: 'Switches operate at Layer 2, making forwarding decisions based on MAC addresses.', ar: 'تعمل المفاتيح على الطبقة 2، وتتخذ قرارات التوجيه بناءً على عناوين MAC.' },
    hints: [{ en: 'Switches use MAC address tables, not IP routing tables.', ar: 'تستخدم المفاتيح جداول عناوين MAC، وليس جداول توجيه IP.' }],
    calibrationStatus: 'provisional', tags: ['osi', 'l2', 'switching'],
  },

  // ─── IPv4 & Binary ───────────────────────────────────────────

  {
    id: 'ipv4_001',
    text: { en: 'Convert the decimal 192 to binary.', ar: 'حوّل العدد العشري 192 إلى ثنائي.' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: '11000000', ar: '11000000' } },
      { id: 'b', text: { en: '10110000', ar: '10110000' } },
      { id: 'c', text: { en: '11100000', ar: '11100000' } },
      { id: 'd', text: { en: '11001100', ar: '11001100' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'binary_math', weight: 0.95, role: 'primary' },
      { skillId: 'ipv4_fund', weight: 0.3, role: 'secondary' },
    ],
    difficulty: 0.40, explanation: { en: '192 = 128+64 = 11000000', ar: '192 = 128+64 = 11000000' },
    hints: [{ en: 'Start with 128. 192-128=64. Is 64 set? Yes. Continue...', ar: 'ابدأ بـ128. 192-128=64. هل 64 مضبوطة؟ نعم. تابع...' }],
    calibrationStatus: 'provisional', tags: ['binary', 'math'],
  },

  {
    id: 'ipv4_002',
    text: { en: 'What is the subnet mask for a /26 network in dotted decimal?', ar: 'ما قناع الشبكة الفرعية لشبكة /26 بالتدوين العشري المنقط؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: '255.255.255.192', ar: '255.255.255.192' } },
      { id: 'b', text: { en: '255.255.255.224', ar: '255.255.255.224' } },
      { id: 'c', text: { en: '255.255.255.128', ar: '255.255.255.128' } },
      { id: 'd', text: { en: '255.255.255.240', ar: '255.255.255.240' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'cidr', weight: 0.9, role: 'primary' },
      { skillId: 'subnet_mask', weight: 0.9, role: 'primary' },
      { skillId: 'binary_math', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.55, explanation: { en: '/26 means 26 bits set to 1. Last octet: 11000000 = 192. Full mask: 255.255.255.192', ar: '/26 يعني 26 بت مضبوطة على 1. الأوكتيت الأخير: 11000000 = 192. القناع الكامل: 255.255.255.192' },
    hints: [{ en: 'Count: 8+8+8 = 24 bits used. Remaining 2 bits in last octet: 11000000 = ?', ar: 'احسب: 8+8+8 = 24 بت مستخدمة. البتان المتبقيتان في الأوكتيت الأخير: 11000000 = ؟' }],
    calibrationStatus: 'provisional', tags: ['cidr', 'subnetting'],
  },

  // ─── Subnetting ──────────────────────────────────────────────

  {
    id: 'sub_001',
    text: { en: 'What is the network address for the host 192.168.10.75/27?', ar: 'ما هو عنوان الشبكة للمضيف 192.168.10.75/27؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: '192.168.10.64', ar: '192.168.10.64' } },
      { id: 'b', text: { en: '192.168.10.32', ar: '192.168.10.32' } },
      { id: 'c', text: { en: '192.168.10.96', ar: '192.168.10.96' } },
      { id: 'd', text: { en: '192.168.10.0', ar: '192.168.10.0' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'subnetting', weight: 0.95, role: 'primary' },
      { skillId: 'cidr', weight: 0.6, role: 'secondary' },
      { skillId: 'binary_math', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.75, explanation: { en: '/27 = mask 255.255.255.224 (block size 32). 75 falls in block 64-95. Network = 192.168.10.64', ar: '/27 = القناع 255.255.255.224 (حجم الكتلة 32). 75 يقع في الكتلة 64-95. الشبكة = 192.168.10.64' },
    hints: [{ en: '/27 gives block size of 32. Find which multiple of 32 is below 75.', ar: '/27 يعطي حجم كتلة 32. ابحث عن أي مضاعف لـ32 أقل من 75.' }],
    calibrationStatus: 'provisional', tags: ['subnetting', 'calculation'],
  },

  {
    id: 'sub_002',
    text: { en: 'How many usable hosts does a /27 subnet support?', ar: 'كم مضيفًا قابلًا للاستخدام تدعمه شبكة /27 فرعية؟' },
    type: 'numerical', domain: 'networking',
    options: [
      { id: 'a', text: { en: '30', ar: '30' } },
      { id: 'b', text: { en: '32', ar: '32' } },
      { id: 'c', text: { en: '28', ar: '28' } },
      { id: 'd', text: { en: '62', ar: '62' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'subnetting', weight: 0.9, role: 'primary' },
      { skillId: 'binary_math', weight: 0.4, role: 'secondary' },
    ],
    difficulty: 0.65, explanation: { en: '/27 leaves 5 host bits. 2^5 = 32 total, minus network and broadcast = 30 usable.', ar: '/27 يترك 5 بتات للمضيف. 2^5 = 32 إجمالي، ناقص عنوان الشبكة والبث = 30 قابلة للاستخدام.' },
    hints: [{ en: 'Usable hosts = 2^(32 - prefix) - 2', ar: 'المضيفون القابلون للاستخدام = 2^(32 - البادئة) - 2' }],
    calibrationStatus: 'provisional', tags: ['subnetting', 'calculation'],
  },

  {
    id: 'sub_003',
    text: { en: 'What is the broadcast address for the subnet 10.0.1.128/25?', ar: 'ما هو عنوان البث للشبكة الفرعية 10.0.1.128/25؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: '10.0.1.255', ar: '10.0.1.255' } },
      { id: 'b', text: { en: '10.0.1.127', ar: '10.0.1.127' } },
      { id: 'c', text: { en: '10.0.1.254', ar: '10.0.1.254' } },
      { id: 'd', text: { en: '10.0.2.0', ar: '10.0.2.0' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'subnetting', weight: 1.0, role: 'primary' },
      { skillId: 'binary_math', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.80, explanation: { en: '/25 block size = 128. Subnet starts at .128, ends at .255 (broadcast).', ar: '/25 حجم الكتلة = 128. الشبكة الفرعية تبدأ من .128، وتنتهي عند .255 (البث).' },
    hints: [{ en: 'Broadcast = last address in the subnet block.', ar: 'عنوان البث = آخر عنوان في كتلة الشبكة الفرعية.' }],
    calibrationStatus: 'provisional', tags: ['subnetting', 'broadcast'],
  },

  // ─── Routing ─────────────────────────────────────────────────

  {
    id: 'route_001',
    text: { en: 'A router has the following routes. Which route does it use for destination 192.168.5.200?\n  R: 192.168.5.0/24 via 10.0.0.1\n  R: 192.168.5.192/26 via 10.0.0.2\n  S: 0.0.0.0/0 via 10.0.0.3', ar: 'يحتوي الموجه على المسارات التالية. أي مسار يستخدمه للوجهة 192.168.5.200؟\n  R: 192.168.5.0/24 عبر 10.0.0.1\n  R: 192.168.5.192/26 عبر 10.0.0.2\n  S: 0.0.0.0/0 عبر 10.0.0.3' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Via 10.0.0.1 (longest prefix /24)', ar: 'عبر 10.0.0.1 (أطول بادئة /24)' } },
      { id: 'b', text: { en: 'Via 10.0.0.2 (longest prefix /26)', ar: 'عبر 10.0.0.2 (أطول بادئة /26)' } },
      { id: 'c', text: { en: 'Via 10.0.0.3 (default route)', ar: 'عبر 10.0.0.3 (المسار الافتراضي)' } },
      { id: 'd', text: { en: 'Drop — no match', ar: 'إسقاط — لا تطابق' } },
    ],
    correctAnswer: 'b',
    skillMappings: [
      { skillId: 'routing_table', weight: 0.95, role: 'primary' },
      { skillId: 'routing_fund', weight: 0.7, role: 'secondary' },
      { skillId: 'subnetting', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.70, explanation: { en: 'Longest prefix match: 192.168.5.192/26 covers .192-.255, which includes .200. /26 > /24.', ar: 'تطابق أطول بادئة: 192.168.5.192/26 تغطي .192-.255، وتشمل .200. /26 > /24.' },
    hints: [{ en: 'Routers always prefer the most specific match — the longest prefix.', ar: 'يفضل الموجه دائمًا التطابق الأكثر تحديدًا — أطول بادئة.' }],
    calibrationStatus: 'provisional', tags: ['routing', 'longest-prefix'],
  },

  // ─── Switching & VLAN ────────────────────────────────────────

  {
    id: 'vlan_001',
    text: { en: 'A PC in VLAN 10 cannot reach a PC in VLAN 20 on the same switch. Why?', ar: 'جهاز PC في VLAN 10 لا يستطيع الوصول إلى PC في VLAN 20 على نفس المفتاح. لماذا؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'VLANs are logical segments; inter-VLAN routing needs a router or Layer-3 switch.', ar: 'الشبكات المحلية الافتراضية مقاطع منطقية؛ التوجيه بين الشبكات المحلية الافتراضية يحتاج موجهًا أو مفتاحًا من الطبقة 3.' } },
      { id: 'b', text: { en: 'VLANs block all traffic by default.', ar: 'تحجب الشبكات المحلية الافتراضية جميع حركة البيانات افتراضيًا.' }, misconceptionId: 'misc_vlan_physical' },
      { id: 'c', text: { en: 'The switch needs to be rebooted.', ar: 'يحتاج المفتاح إلى إعادة التشغيل.' } },
      { id: 'd', text: { en: 'Both PCs need static IPs.', ar: 'يحتاج كلا الجهازين عناوين IP ثابتة.' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'vlan', weight: 0.9, role: 'primary' },
      { skillId: 'routing_fund', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.55, explanation: { en: 'VLANs create broadcast domain separation. Inter-VLAN communication requires Layer 3 routing.', ar: 'تنشئ الشبكات المحلية الافتراضية فصلًا في نطاق البث. يتطلب التواصل بين الشبكات المحلية الافتراضية توجيهًا من الطبقة 3.' },
    hints: [{ en: 'Think of each VLAN as a separate physical network — how do separate networks talk?', ar: 'فكر في كل VLAN كشبكة مادية منفصلة — كيف تتواصل الشبكات المنفصلة؟' }],
    calibrationStatus: 'provisional', tags: ['vlan', 'routing'],
  },

  // ─── Troubleshooting Scenarios ───────────────────────────────

  {
    id: 'ts_001',
    text: { en: 'PC1 (192.168.1.10/24, GW 192.168.1.1) cannot ping PC2 (192.168.2.10/24). First troubleshooting step?', ar: 'الجهاز PC1 (192.168.1.10/24، البوابة 192.168.1.1) لا يستطيع إرسال ping إلى PC2 (192.168.2.10/24). ما هي الخطوة الأولى في استكشاف الأخطاء؟' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Ping the default gateway 192.168.1.1 from PC1', ar: 'إرسال ping إلى البوابة الافتراضية 192.168.1.1 من PC1' } },
      { id: 'b', text: { en: 'Immediately check the router configuration', ar: 'التحقق على الفور من تكوين الموجه' } },
      { id: 'c', text: { en: 'Replace the network cable', ar: 'استبدال كابل الشبكة' } },
      { id: 'd', text: { en: 'Ping 8.8.8.8 first', ar: 'إرسال ping إلى 8.8.8.8 أولًا' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'troubleshoot_fund', weight: 0.8, role: 'primary' },
      { skillId: 'layer_diagnosis', weight: 0.7, role: 'secondary' },
      { skillId: 'ping_traceroute', weight: 0.6, role: 'secondary' },
    ],
    difficulty: 0.45, explanation: { en: 'Start at the local layer: verify PC1 can reach its gateway first (Layer 3, same subnet). This eliminates local config issues.', ar: 'ابدأ من الطبقة المحلية: تحقق من أن PC1 يمكنه الوصول إلى بوابته أولًا (الطبقة 3، نفس الشبكة الفرعية). هذا يستبعد مشاكل التكوين المحلي.' },
    hints: [{ en: 'Troubleshoot from closest to farthest — start at the source.', ar: 'استكشف الأخطاء من الأقرب إلى الأبعد — ابدأ من المصدر.' }],
    calibrationStatus: 'provisional', tags: ['troubleshooting', 'methodology'],
  },

  {
    id: 'ts_002',
    text: { en: 'After fixing a routing issue, what must you do to confirm the fix is complete?', ar: 'بعد إصلاح مشكلة في التوجيه، ما الذي يجب عليك فعله للتأكد من اكتمال الإصلاح؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Ping from the original source PC to the original destination PC', ar: 'إرسال ping من جهاز PC المصدر الأصلي إلى جهاز PC الوجهة الأصلي' } },
      { id: 'b', text: { en: 'Ping from the router itself', ar: 'إرسال ping من الموجه نفسه' } },
      { id: 'c', text: { en: 'Check routing table looks correct', ar: 'التحقق من أن جدول التوجيه يبدو صحيحًا' } },
      { id: 'd', text: { en: 'Restart the router', ar: 'إعادة تشغيل الموجه' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'verification', weight: 0.95, role: 'primary' },
      { skillId: 'troubleshoot_fund', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.50, explanation: { en: 'Always verify end-to-end from the original source/destination pair. Pinging from the router does not confirm the user\'s path works.', ar: 'تحقق دائمًا من البداية إلى النهاية من زوج المصدر/الوجهة الأصلي. إرسال ping من الموجه لا يؤكد أن مسار المستخدم يعمل.' },
    hints: [{ en: 'A fix is not complete until it works for the original user, not just for the engineer.', ar: 'الإصلاح ليس مكتملًا حتى يعمل للمستخدم الأصلي، وليس فقط للمهندس.' }],
    calibrationStatus: 'provisional', tags: ['verification', 'troubleshooting'],
  },

  {
    id: 'ts_003',
    text: { en: 'You run "ping 192.168.1.1" from PC1 and it succeeds. You then run "ping 192.168.2.10" and it fails. What does this tell you?', ar: 'تقوم بتشغيل "ping 192.168.1.1" من PC1 وينجح. ثم تشغّل "ping 192.168.2.10" ويفشل. ماذا يخبرك ذلك؟' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Local connectivity is fine; the issue is at Layer 3 (routing) or beyond', ar: 'الاتصال المحلي سليم؛ المشكلة في الطبقة 3 (التوجيه) أو ما بعدها' } },
      { id: 'b', text: { en: 'PC1\'s IP address is wrong', ar: 'عنوان IP الخاص بـPC1 خاطئ' } },
      { id: 'c', text: { en: 'The switch is faulty', ar: 'المفتاح معطل' } },
      { id: 'd', text: { en: 'Both networks are down', ar: 'كلا الشبكتان معطلتان' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'layer_diagnosis', weight: 0.9, role: 'primary' },
      { skillId: 'troubleshoot_fund', weight: 0.7, role: 'secondary' },
      { skillId: 'routing_fund', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.55, explanation: { en: 'Successful gateway ping proves local IP config and Layer 2 are fine. Failure to reach the remote network points to a routing problem.', ar: 'نجاح ping البوابة يثبت أن تكوين IP المحلي والطبقة 2 سليمان. فشل الوصول إلى الشبكة البعيدة يشير إلى مشكلة توجيه.' },
    hints: [{ en: 'Divide and conquer: local works, remote fails = problem is between.', ar: 'قسّم وافهم: يعمل محليًا، يفشل عن بُعد = المشكلة في المنتصف.' }],
    calibrationStatus: 'provisional', tags: ['troubleshooting', 'diagnosis'],
  },

  // ─── ARP & MAC ───────────────────────────────────────────────

  {
    id: 'arp_001',
    text: { en: 'What does ARP resolve?', ar: 'ماذا يحل بروتوكول ARP؟' },
    type: 'mcq', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'IP address to MAC address', ar: 'عنوان IP إلى عنوان MAC' } },
      { id: 'b', text: { en: 'Domain name to IP address', ar: 'اسم النطاق إلى عنوان IP' } },
      { id: 'c', text: { en: 'MAC address to IP address', ar: 'عنوان MAC إلى عنوان IP' } },
      { id: 'd', text: { en: 'Port to process', ar: 'منفذ إلى عملية' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'arp', weight: 0.95, role: 'primary' },
      { skillId: 'mac_addressing', weight: 0.6, role: 'secondary' },
    ],
    difficulty: 0.30, explanation: { en: 'ARP (Address Resolution Protocol) maps a known IP address to an unknown MAC address.', ar: 'يقوم ARP (بروتوكول تحليل العناوين) بتعيين عنوان IP معروف إلى عنوان MAC غير معروف.' },
    hints: [{ en: 'ARP is used when you know the IP but need the MAC to send the Ethernet frame.', ar: 'يُستخدم ARP عندما تعرف IP ولكنك تحتاج MAC لإرسال إطار Ethernet.' }],
    calibrationStatus: 'provisional', tags: ['arp', 'l2', 'l3'],
  },

  // ─── DHCP ────────────────────────────────────────────────────

  {
    id: 'dhcp_001',
    text: { en: 'A PC cannot get an IP address automatically. It shows 169.254.x.x. What does this indicate?', ar: 'لا يستطيع الجهاز الحصول على عنوان IP تلقائيًا. يظهر 169.254.x.x. ماذا يعني ذلك؟' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'APIPA — DHCP server unreachable; PC self-assigned a link-local address', ar: 'APIPA — خادم DHCP غير متاح؛ قام الجهاز بتخصيص عنوان link-local لنفسه' } },
      { id: 'b', text: { en: 'The PC has a static IP conflict', ar: 'الجهاز لديه تعارض في عنوان IP الثابت' } },
      { id: 'c', text: { en: 'DNS failed', ar: 'فشل DNS' } },
      { id: 'd', text: { en: 'The gateway is down', ar: 'البوابة معطلة' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'dhcp', weight: 0.9, role: 'primary' },
      { skillId: 'troubleshoot_fund', weight: 0.4, role: 'secondary' },
    ],
    difficulty: 0.45, explanation: { en: '169.254.x.x is an APIPA address, assigned when a DHCP server cannot be reached.', ar: '169.254.x.x هو عنوان APIPA، يُعيّن عندما لا يمكن الوصول إلى خادم DHCP.' },
    hints: [{ en: '169.254.x.x = Automatic Private IP Addressing. Always check DHCP reachability first.', ar: '169.254.x.x = عنونة IP الخاصة التلقائية. تحقق دائمًا من إمكانية الوصول إلى DHCP أولًا.' }],
    calibrationStatus: 'provisional', tags: ['dhcp', 'troubleshooting'],
  },

  // ─── DNS ─────────────────────────────────────────────────────

  {
    id: 'dns_001',
    text: { en: 'A user can access a server by IP but not by hostname. What is likely the problem?', ar: 'يستطيع المستخدم الوصول إلى خادم عبر IP ولكن ليس عبر اسم المضيف. ما المشكلة المحتملة؟' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'DNS resolution failure', ar: 'فشل تحليل DNS' } },
      { id: 'b', text: { en: 'Routing failure', ar: 'فشل التوجيه' } },
      { id: 'c', text: { en: 'VLAN mismatch', ar: 'عدم تطابق VLAN' } },
      { id: 'd', text: { en: 'Firewall blocking ICMP', ar: 'جدار الحماية يمنع ICMP' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'dns', weight: 0.9, role: 'primary' },
      { skillId: 'troubleshoot_fund', weight: 0.4, role: 'secondary' },
    ],
    difficulty: 0.40, explanation: { en: 'If IP works but hostname fails, DNS is not resolving the name. The network path is fine.', ar: 'إذا عمل IP ولكن فشل اسم المضيف، فإن DNS لا يحل الاسم. مسار الشبكة سليم.' },
    hints: [{ en: 'Can ping the IP = network is OK. Cannot ping hostname = DNS problem.', ar: 'يمكن إرسال ping إلى IP = الشبكة سليمة. لا يمكن إرسال ping إلى اسم المضيف = مشكلة DNS.' }],
    calibrationStatus: 'provisional', tags: ['dns', 'troubleshooting'],
  },

  // ─── Transfer / Advanced Scenarios ───────────────────────────

  {
    id: 'xfer_001',
    text: { en: 'A company has 5 departments needing separate broadcast domains, each with at most 12 devices. Starting from 10.10.0.0, assign the most efficient subnets.', ar: 'تحتاج شركة إلى 5 أقسام تحتاج نطاقات بث منفصلة، كل منها يحتوي على 12 جهازًا كحد أقصى. بدءًا من 10.10.0.0، خصص الشبكات الفرعية الأكثر كفاءة.' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Use /28 (14 usable hosts each)', ar: 'استخدم /28 (14 مضيفًا قابلًا للاستخدام لكل منها)' } },
      { id: 'b', text: { en: 'Use /24 (254 usable hosts each)', ar: 'استخدم /24 (254 مضيفًا قابلًا للاستخدام لكل منها)' } },
      { id: 'c', text: { en: 'Use /27 (30 usable hosts each)', ar: 'استخدم /27 (30 مضيفًا قابلًا للاستخدام لكل منها)' } },
      { id: 'd', text: { en: 'Use /30 (2 usable hosts each)', ar: 'استخدم /30 (2 مضيفًا قابلًا للاستخدام لكل منها)' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'subnetting', weight: 1.0, role: 'primary' },
      { skillId: 'cidr', weight: 0.7, role: 'secondary' },
      { skillId: 'problem_decomposition', weight: 0.5, role: 'secondary' },
    ],
    difficulty: 0.85, explanation: { en: '/28 gives 14 usable hosts — just enough for 12 devices. More efficient than /27 (wastes 18 addresses per subnet).', ar: '/28 يعطي 14 مضيفًا قابلًا للاستخدام — كافٍ لـ12 جهازًا. أكثر كفاءة من /27 (يضيع 18 عنوانًا لكل شبكة فرعية).' },
    hints: [{ en: 'Find the smallest prefix that supports 12 hosts: 2^n - 2 >= 12.', ar: 'ابحث عن أصغر بادئة تدعم 12 مضيفًا: 2^n - 2 >= 12.' }],
    calibrationStatus: 'provisional', tags: ['subnetting', 'transfer', 'design'],
  },

  {
    id: 'xfer_002',
    text: { en: 'You fixed a routing issue on Router A. PC1 can now ping PC2. However, PC2 still cannot initiate a connection to PC1. What do you check next?', ar: 'لقد أصلحت مشكلة توجيه على الموجه A. يستطيع PC1 الآن إرسال ping إلى PC2. ومع ذلك، لا يزال PC2 غير قادر على بدء اتصال بـPC1. ما الذي تفحصه بعد ذلك؟' },
    type: 'scenario', domain: 'networking',
    options: [
      { id: 'a', text: { en: 'Check routing in the return direction from PC2\'s network to PC1\'s network', ar: 'تحقق من التوجيه في الاتجاه العكسي من شبكة PC2 إلى شبكة PC1' } },
      { id: 'b', text: { en: 'Restart both PCs', ar: 'أعد تشغيل كلا الجهازين' } },
      { id: 'c', text: { en: 'Check PC1\'s firewall', ar: 'تحقق من جدار حماية PC1' } },
      { id: 'd', text: { en: 'The network is fully working', ar: 'الشبكة تعمل بالكامل' } },
    ],
    correctAnswer: 'a',
    skillMappings: [
      { skillId: 'l3_troubleshoot', weight: 0.9, role: 'primary' },
      { skillId: 'routing_table', weight: 0.7, role: 'secondary' },
      { skillId: 'verification', weight: 0.6, role: 'secondary' },
    ],
    difficulty: 0.80, explanation: { en: 'Asymmetric routing: traffic flow is bidirectional. PC1→PC2 working does not mean PC2→PC1 has a return route.', ar: 'توجيه غير متماثل: تدفق حركة البيانات ثنائي الاتجاه. عمل PC1→PC2 لا يعني أن PC2→PC1 لديه مسار عودة.' },
    hints: [{ en: 'Think about both directions of traffic, not just the ping direction.', ar: 'فكر في كلا اتجاهي حركة البيانات، وليس فقط اتجاه ping.' }],
    calibrationStatus: 'provisional', tags: ['routing', 'troubleshooting', 'transfer'],
  },

];

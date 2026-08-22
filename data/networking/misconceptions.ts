// data/networking/misconceptions.ts
import type { Misconception } from '../../lib/domain/types';

export const NETWORKING_MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_l2_l3',
    name: { en: 'Layer 2 / Layer 3 Confusion', ar: 'الخلط بين الطبقة 2 والطبقة 3' },
    description: { en: 'Confusing MAC addressing (Layer 2) with IP addressing (Layer 3)', ar: 'الخلط بين عنونة MAC (الطبقة 2) وعنونة IP (الطبقة 3)' },
    associatedSkills: ['osi_model', 'mac_addressing', 'ipv4_fund'],
    evidenceThreshold: 2,
    remediation: { en: 'Review OSI model focusing on Layer 2 vs Layer 3 responsibilities and protocols.', ar: 'راجع نموذج OSI مع التركيز على مسؤوليات وبروتوكولات الطبقة 2 مقابل الطبقة 3.' },
  },
  {
    id: 'misc_cidr_boundary',
    name: { en: 'CIDR Boundary Misunderstanding', ar: 'سوء فهم حدود CIDR' },
    description: { en: 'Incorrectly calculating subnet boundaries — confusing block size with host count', ar: 'حساب حدود الشبكة الفرعية بشكل غير صحيح — الخلط بين حجم الكتلة وعدد المضيفين' },
    associatedSkills: ['subnetting', 'cidr', 'binary_math'],
    evidenceThreshold: 3,
    remediation: { en: 'Practice: block_size = 2^(32-prefix). Network = floor(IP/block)*block. Broadcast = network+block-1.', ar: 'تدرب: block_size = 2^(32-prefix). الشبكة = floor(IP/block)*block. البث = الشبكة+block-1.' },
  },
  {
    id: 'misc_ping_means_down',
    name: { en: 'Ping Failure = Network Down', ar: 'فشل Ping = الشبكة معطلة' },
    description: { en: 'Assuming that a failed ping means the network or device is completely unreachable', ar: 'افتراض أن ping الفاشل يعني أن الشبكة أو الجهاز غير متاح تمامًا' },
    associatedSkills: ['troubleshoot_fund', 'ping_traceroute'],
    evidenceThreshold: 2,
    remediation: { en: 'Ping can fail due to firewalls/ACLs while the device is up. Always test multiple protocols.', ar: 'يمكن أن يفشل ping بسبب جدران الحماية/ACLs بينما الجهاز يعمل. اختبر دائمًا بروتوكولات متعددة.' },
  },
  {
    id: 'misc_gw_dns_confusion',
    name: { en: 'Gateway / DNS Confusion', ar: 'الخلط بين البوابة و DNS' },
    description: { en: 'Confusing the default gateway with the DNS server role', ar: 'الخلط بين البوابة الافتراضية ودور خادم DNS' },
    associatedSkills: ['default_gateway', 'dns'],
    evidenceThreshold: 2,
    remediation: { en: 'Gateway = next-hop router for traffic outside subnet. DNS = name-to-IP resolver. Separate services.', ar: 'البوابة = الموجه التالي لحركة البيانات خارج الشبكة الفرعية. DNS = محلل الاسم إلى IP. خدمتان منفصلتان.' },
  },
  {
    id: 'misc_switch_routes',
    name: { en: 'Switch Routes Like a Router', ar: 'المفتاح يوجّه مثل الموجه' },
    description: { en: 'Assuming switches perform IP routing between VLANs by default', ar: 'افتراض أن المفاتيح تقوم بتوجيه IP بين الشبكات المحلية الافتراضية افتراضيًا' },
    associatedSkills: ['switching', 'vlan', 'routing_fund'],
    evidenceThreshold: 2,
    remediation: { en: 'Switches forward at Layer 2 by MAC address. Inter-VLAN routing requires a router or L3 switch.', ar: 'تقوم المفاتيح بالتوجيه على الطبقة 2 عبر عنوان MAC. التوجيه بين الشبكات المحلية الافتراضية يتطلب موجهًا أو مفتاحًا من الطبقة 3.' },
  },
  {
    id: 'misc_vlan_physical',
    name: { en: 'VLAN = Physical Network', ar: 'الشبكة المحلية الافتراضية = شبكة مادية' },
    description: { en: 'Treating a VLAN as a physical segment rather than a logical one', ar: 'التعامل مع VLAN كمقطع مادي وليس منطقيًا' },
    associatedSkills: ['vlan'],
    evidenceThreshold: 2,
    remediation: { en: 'VLANs are logical segments created by software. Multiple VLANs can exist on one physical switch.', ar: 'الشبكات المحلية الافتراضية هي مقاطع منطقية تنشئها البرمجيات. يمكن أن توجد عدة شبكات على مفتاح مادي واحد.' },
  },
  {
    id: 'misc_skip_verification',
    name: { en: 'Skipping Fix Verification', ar: 'تجاهل التحقق من الإصلاح' },
    description: { en: 'Declaring a troubleshooting fix complete without end-to-end verification', ar: 'إعلان اكتمال إصلاح استكشاف الأخطاء دون التحقق من البداية إلى النهاية' },
    associatedSkills: ['verification', 'troubleshoot_fund'],
    evidenceThreshold: 3,
    remediation: { en: 'Always verify from the original source-destination pair after any fix. Partial tests are not complete tests.', ar: 'تحقق دائمًا من زوج المصدر-الوجهة الأصلي بعد أي إصلاح. الاختبارات الجزئية ليست اختبارات كاملة.' },
  },
];

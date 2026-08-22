// pages/api/scenario.js
export default function handler(req, res) {
  // فقط POST مسموح
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'الطريقة غير مسموحة' });
  }

  try {
    const { scenarioId, message, history } = req.body;

    // التحقق من البيانات
    if (!scenarioId || !message) {
      return res.status(400).json({ error: 'بيانات ناقصة' });
    }

    // ردود ذكية حسب نوع السيناريو
    let response = '';
    
    switch(scenarioId) {
      case 'cafe':
        response = getCafeResponse(message, history);
        break;
      case 'hospital':
        response = getHospitalResponse(message, history);
        break;
      case 'office':
        response = getOfficeResponse(message, history);
        break;
      default:
        response = getDefaultResponse(message);
    }

    return res.status(200).json({ 
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scenario API Error:', error);
    return res.status(500).json({ error: 'حدث خطأ في السيرفر' });
  }
}

// دوال الردود الذكية
function getCafeResponse(message, history) {
  message = message.toLowerCase();
  
  if (message.includes('كم') && message.includes('access point')) {
    return "ممتاز سؤال! لمقهى بـ 50 زبون يومياً، تحتاج تقريباً 3-4 Access Points:\n• 2 AP للصالة الرئيسية\n• 1 AP للمكاتب الإدارية\n• 1 AP احتياطي أو للمناطق الخارجية\n\nهل تريد معرفة كيفية توزيعهم بالضبط؟";
  }
  
  if (message.includes('vlan')) {
    return "تصميم VLANs المقترح:\n• VLAN 10: شبكة الزبائن (WiFi)\n• VLAN 20: شبكة الكاشير والأجهزة\n• VLAN 30: شبكة الإدارة\n• VLAN 40: إدارة الأجهزة (Management)\n\nما رأيك بهذا التقسيم؟";
  }
  
  if (message.includes('تجهيزات') || message.includes('معدات')) {
    return "التجهيزات الأساسية:\n• راوتر (Router) للاتصال بالإنترنت\n• سويتش (Switch) 24 منفذ\n• 3-4 Access Points (نوع جيد)\n• فايروول (Firewall) للحماية\n• كابلات UTP Cat6\n\nهل تريد تفاصيل أكثر عن أي قطعة؟";
  }

  if (history.length < 2) {
    return "أهلاً بك! قبل ما نبدأ، خليني أسألك: كم عدد الزبون المتوقع في نفس الوقت؟ هل يحتاجون WiFi فقط ولا في أجهزة سلكية؟";
  }

  return getDefaultResponse(message);
}

function getHospitalResponse(message, history) {
  message = message.toLowerCase();
  
  if (message.includes('فصل') || message.includes('vlan')) {
    return "تقسيم VLANs المقترح للمستشفى:\n• VLAN 100: الاستقبال (Reception)\n• VLAN 200: العيادات (Clinics)\n• VLAN 300: المخبر (Lab) - معزول تماماً\n• VLAN 400: الإدارة (Management)\n\nلاحظ أن شبكة المخبر لازم تكون معزولة ومنفصلة.";
  }
  
  if (message.includes('أمان') || message.includes('security')) {
    return "متطلبات الأمان:\n• ACLs للتحكم بالدخول بين VLANs\n• 802.1X للمصادقة على الأجهزة\n• شبكة منفصلة للضيوف\n• تسجيل جميع الحركات (Logging)\n• تحديثات أمنية مستمرة";
  }

  return getDefaultResponse(message);
}

function getOfficeResponse(message, history) {
  message = message.toLowerCase();
  
  if (message.includes('vpn')) {
    return "لإعداد VPN:\n• استخدم بروتوكول OpenVPN أو WireGuard\n• خصص نطاق IP منفصل للموظفين عن بعد\n• فعّل المصادقة الثنائية (2FA)\n• حدد صلاحيات الوصول حسب المسمى الوظيفي";
  }
  
  if (message.includes('ip')) {
    return "توزيع IP Addressing:\n• الشبكة الداخلية: 192.168.0.0/16\n• الموظفين: 192.168.1.0/24\n• الإدارة: 192.168.100.0/24\n• VPN: 10.8.0.0/24\n• الضيوف: 192.168.200.0/24";
  }

  return getDefaultResponse(message);
}

function getDefaultResponse(message) {
  const responses = [
    "فكرة جيدة! لكن هل فكرت في متطلبات الأمان؟",
    "ممتاز، استمر. ماذا عن بقية التجهيزات؟",
    "هذا جزء من الحل. شو رأيك بالتفاصيل التقنية؟",
    "جميل. لاحظ أننا نحتاج نضمن استقرار الشبكة.",
    "صحيح. لكن هل أخذت بعين الاعتبار التوسع المستقبلي؟"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
    }

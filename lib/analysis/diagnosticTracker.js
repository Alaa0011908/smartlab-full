// Maintains competing diagnostic hypotheses for one attempt.

export class DiagnosticTracker {
  constructor() {
    this.hypotheses = new Map();
    this.log = [];
  }

  observe({ itemId, skillId, misconceptionId, isCorrect, selectedOptionId, hinted = false }) {
    const id = misconceptionId || `gap_${skillId}`;
    if (!this.hypotheses.has(id)) {
      this.hypotheses.set(id, {
        id,
        skillId,
        misconceptionId: misconceptionId || null,
        supportingAnswers: [],
        opposingAnswers: [],
        exploredAlternatives: [],
        status: 'open',
        nextProbeItemId: null,
      });
    }
    const h = this.hypotheses.get(id);
    const entry = { itemId, selectedOptionId, hinted, at: new Date().toISOString() };
    if (hinted) {
      h.exploredAlternatives.push({ ...entry, note: 'إجابة بعد تلميح — قياس بمساعدة وليست دليلاً مستقلاً' });
    } else if (!isCorrect && misconceptionId) {
      h.supportingAnswers.push(entry);
    } else if (isCorrect) {
      h.opposingAnswers.push(entry);
    } else {
      h.exploredAlternatives.push({ ...entry, note: 'خطأ لا يطابق هذه الفرضية تحديداً' });
    }
    h.status = this.deriveStatus(h);
    this.log.push({ hypothesisId: id, ...entry, isCorrect, skillId });
  }

  deriveStatus(h) {
    const support = h.supportingAnswers.length;
    const oppose = h.opposingAnswers.length;
    if (support >= 2 && support > oppose) return 'confirmed';
    if (oppose >= 2 && oppose > support) return 'weakened';
    if (support + oppose + h.exploredAlternatives.length >= 4 && Math.abs(support - oppose) <= 1) {
      return 'inconclusive';
    }
    return 'open';
  }

  competingIds() {
    return [...this.hypotheses.values()]
      .filter(h => h.status === 'open' && h.misconceptionId)
      .map(h => h.misconceptionId);
  }

  targetSkills() {
    return [...this.hypotheses.values()]
      .filter(h => h.status === 'open' || h.status === 'inconclusive')
      .map(h => h.skillId)
      .filter(Boolean);
  }

  snapshot() {
    return [...this.hypotheses.values()].map(h => ({
      ...h,
      inferenceBoundary: h.status === 'confirmed'
        ? 'الأدلة الحالية تؤيد هذه الآلية التعليمية داخل نطاق الأسئلة المعروضة.'
        : h.status === 'weakened'
          ? 'إجابات صحيحة تعارضت مع الفرضية؛ لا تُثبَّت كفجوة.'
          : h.status === 'inconclusive'
            ? 'ظهرت إشارة، لكن سببها غير محسوم.'
            : 'لم تُجمع أدلة كافية بعد.',
      nextVerificationTask: h.misconceptionId === 'misc_architecture_choice'
        ? 'حالة مؤسسة تحتاج إدارة مركزية: اختيار البنية مع تفسير السبب.'
        : h.misconceptionId === 'misc_net_bits_host_bits'
          ? 'حساب عدد المضيفين من قناع جديد لم يظهر في التقييم.'
          : `مهمة جديدة على ${h.skillId} بدون تلميح.`,
    }));
  }
}

const ATTEMPT_STORE_KEY = 'attemptAnalyses';
const ACTIVE_ATTEMPT_KEY = 'activeAttemptId';
const LEGACY_ANALYSIS_KEY = 'latestAnalysis';
const COURSE_PROGRESS_KEY = 'courseProgressByAttempt';

export function createAttemptId() {
  return `att_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function persistAttemptAnalysis(analysis) {
  if (typeof window === 'undefined' || !analysis?.attemptId) return;
  const store = JSON.parse(localStorage.getItem(ATTEMPT_STORE_KEY) || '{}');
  store[analysis.attemptId] = analysis;
  localStorage.setItem(ATTEMPT_STORE_KEY, JSON.stringify(store));
  localStorage.setItem(ACTIVE_ATTEMPT_KEY, analysis.attemptId);
  localStorage.setItem(LEGACY_ANALYSIS_KEY, JSON.stringify(analysis));
}

export function loadAttemptAnalysis(attemptId) {
  if (typeof window === 'undefined') return null;
  const requested = attemptId || localStorage.getItem(ACTIVE_ATTEMPT_KEY);
  const store = JSON.parse(localStorage.getItem(ATTEMPT_STORE_KEY) || '{}');
  if (requested && store[requested]) return store[requested];
  try {
    return JSON.parse(localStorage.getItem(LEGACY_ANALYSIS_KEY) || 'null');
  } catch {
    return null;
  }
}

export function loadCourseProgress(attemptId) {
  if (typeof window === 'undefined') return {};
  const all = JSON.parse(localStorage.getItem(COURSE_PROGRESS_KEY) || '{}');
  return all[attemptId] || {};
}

export function saveCourseProgress(attemptId, progress) {
  if (typeof window === 'undefined' || !attemptId) return;
  const all = JSON.parse(localStorage.getItem(COURSE_PROGRESS_KEY) || '{}');
  all[attemptId] = progress;
  localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(all));
}

// lib/analytics/calibrationCollector.ts
// ============================================================
// Calibration Data Collector
// Collects anonymized learning data for psychometric calibration
// All data is stored locally and can be exported for analysis
// ============================================================

export interface CalibrationEvent {
  id: string;
  timestamp: string;
  userId: string;
  sessionId: string;
  eventType: 
    | 'assessment_start'
    | 'assessment_complete'
    | 'question_answered'
    | 'lab_action'
    | 'lab_complete'
    | 'hint_requested'
    | 'time_out';
  payload: Record<string, unknown>;
}

export interface QuestionResponse {
  itemId: string;
  skillId: string;
  selectedOption: number | string;
  correctOption: number | string;
  isCorrect: boolean;
  responseTimeMs: number;
  difficulty: number;
  userConfidence?: number;
}

export interface AssessmentSession {
  sessionId: string;
  userId: string;
  assessmentId: string;
  startedAt: string;
  completedAt?: string;
  responses: QuestionResponse[];
  finalScore?: number;
}

class CalibrationCollector {
  private static instance: CalibrationCollector;
  private events: CalibrationEvent[] = [];
  private sessions: AssessmentSession[] = [];
  private readonly STORAGE_KEY = 'smartlab_calibration_data';
  private readonly MAX_LOCAL_EVENTS = 10000;

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): CalibrationCollector {
    if (!CalibrationCollector.instance) {
      CalibrationCollector.instance = new CalibrationCollector();
    }
    return CalibrationCollector.instance;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.events = parsed.events || [];
        this.sessions = parsed.sessions || [];
      }
    } catch (e) {
      console.warn('Failed to load calibration data:', e);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      // Keep only recent events if exceeding max
      if (this.events.length > this.MAX_LOCAL_EVENTS) {
        this.events = this.events.slice(-this.MAX_LOCAL_EVENTS);
      }
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({ events: this.events, sessions: this.sessions })
      );
    } catch (e) {
      console.warn('Failed to save calibration data:', e);
    }
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track a generic event
  trackEvent(
    eventType: CalibrationEvent['eventType'],
    userId: string,
    sessionId: string,
    payload: Record<string, unknown> = {}
  ): void {
    const event: CalibrationEvent = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      userId,
      sessionId,
      eventType,
      payload,
    };
    this.events.push(event);
    this.saveToStorage();
  }

  // Start tracking an assessment session
  startAssessment(userId: string, assessmentId: string): string {
    const sessionId = this.generateId();
    const session: AssessmentSession = {
      sessionId,
      userId,
      assessmentId,
      startedAt: new Date().toISOString(),
      responses: [],
    };
    this.sessions.push(session);
    this.trackEvent('assessment_start', userId, sessionId, { assessmentId });
    return sessionId;
  }

  // Record a question response
  recordResponse(
    sessionId: string,
    response: QuestionResponse
  ): void {
    const session = this.sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.responses.push(response);
    }
    this.trackEvent('question_answered', session?.userId || 'anonymous', sessionId, {
      itemId: response.itemId,
      isCorrect: response.isCorrect,
      responseTimeMs: response.responseTimeMs,
    });
    this.saveToStorage();
  }

  // Complete an assessment session
  completeAssessment(sessionId: string, finalScore: number): void {
    const session = this.sessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.completedAt = new Date().toISOString();
      session.finalScore = finalScore;
    }
    this.trackEvent('assessment_complete', session?.userId || 'anonymous', sessionId, {
      finalScore,
      responseCount: session?.responses.length,
    });
    this.saveToStorage();
  }

  // Export data for analysis
  exportData(): { events: CalibrationEvent[]; sessions: AssessmentSession[] } {
    return {
      events: [...this.events],
      sessions: [...this.sessions],
    };
  }

  // Export as CSV for psychometric analysis
  exportResponsesAsCSV(): string {
    const headers = [
      'session_id',
      'user_id',
      'assessment_id',
      'item_id',
      'skill_id',
      'selected_option',
      'correct_option',
      'is_correct',
      'response_time_ms',
      'difficulty',
      'timestamp',
    ];

    const rows: string[] = [headers.join(',')];

    for (const session of this.sessions) {
      for (const response of session.responses) {
        rows.push([
          session.sessionId,
          session.userId,
          session.assessmentId,
          response.itemId,
          response.skillId,
          response.selectedOption,
          response.correctOption,
          response.isCorrect ? 1 : 0,
          response.responseTimeMs,
          response.difficulty,
          session.startedAt,
        ].join(','));
      }
    }

    return rows.join('\n');
  }

  // Get summary statistics
  getSummary(): {
    totalEvents: number;
    totalSessions: number;
    totalResponses: number;
    averageScore: number;
    averageResponseTime: number;
  } {
    const totalResponses = this.sessions.reduce(
      (sum, s) => sum + s.responses.length,
      0
    );
    const completedSessions = this.sessions.filter(s => s.finalScore !== undefined);
    const averageScore = completedSessions.length > 0
      ? completedSessions.reduce((sum, s) => sum + (s.finalScore || 0), 0) / completedSessions.length
      : 0;

    const allResponses = this.sessions.flatMap(s => s.responses);
    const averageResponseTime = allResponses.length > 0
      ? allResponses.reduce((sum, r) => sum + r.responseTimeMs, 0) / allResponses.length
      : 0;

    return {
      totalEvents: this.events.length,
      totalSessions: this.sessions.length,
      totalResponses,
      averageScore,
      averageResponseTime,
    };
  }

  // Clear all data (for privacy compliance)
  clearData(): void {
    this.events = [];
    this.sessions = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  // Download data as JSON file
  downloadData(): void {
    if (typeof window === 'undefined') return;
    const data = this.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartlab_calibration_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const calibrationCollector = CalibrationCollector.getInstance();
export default calibrationCollector;

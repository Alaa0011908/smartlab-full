// lib/domain/models.js

/**
 * Core Domain Models for the Adaptive Educational Intelligence Engine.
 * 
 * We use Repository and Factory patterns to ensure Zero-Hardcoding
 * and Reality-First simulation for testing and future production.
 */

export class Skill {
  constructor({ id, name, description, parent = null, prerequisites = [], difficulty = 0.5, domain = 'networking' }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.parent = parent;
    this.prerequisites = prerequisites; // Array of skill IDs
    this.difficulty = difficulty; // 0.0 to 1.0 (IRT b-parameter approximation)
    this.domain = domain;
  }
}

export class Misconception {
  constructor({ id, skillId, description, evidenceThreshold = 2 }) {
    this.id = id;
    this.skillId = skillId;
    this.description = description;
    this.evidenceThreshold = evidenceThreshold;
  }
}

export class AssessmentItem {
  constructor({ id, text, type, options, correctAnswer, skillMappings, misconceptions = [] }) {
    this.id = id;
    this.text = text;
    this.type = type; // e.g., 'MCQ', 'numerical', 'troubleshooting'
    this.options = options; 
    this.correctAnswer = correctAnswer;
    this.skillMappings = skillMappings; // Array of { skillId, weight }
    this.misconceptions = misconceptions; // Array of { optionId/answer, misconceptionId }
  }
}

export class LearnerState {
  constructor({ userId, skillId, mastery = 0.1, confidence = 0.1, evidenceCount = 0, recentTrend = 'stable' }) {
    this.userId = userId;
    this.skillId = skillId;
    this.mastery = mastery; // Probability of knowing the skill (0.0 to 1.0)
    this.confidence = confidence; // System's confidence in the mastery estimate (0.0 to 1.0)
    this.evidenceCount = evidenceCount;
    this.recentTrend = recentTrend; // 'improving', 'declining', 'stable'
  }
}

export class ResponseEvidence {
  constructor({ userId, itemId, isCorrect, responseTime, userConfidence, timestamp = new Date().toISOString() }) {
    this.userId = userId;
    this.itemId = itemId;
    this.isCorrect = isCorrect;
    this.responseTime = responseTime; // in milliseconds
    this.userConfidence = userConfidence; // Self-reported confidence (0.0 to 1.0)
    this.timestamp = timestamp;
  }
}

// ============================================================
// SmartLab AI - Scenario API Endpoint v3.0
// Fully AI-powered conversation endpoint with 5-stage workflow
// Integrates with ScenarioEngine (DeepSeek LLM + Mock Fallback)
// CORS Enabled | File Upload Handling | Input Validation
// ============================================================

import { ScenarioEngine, STAGE_NAMES, MANDATORY_QUESTIONS_STAGE1, DELIVERY_QUESTIONS_STAGE3, SCENARIOS } from '../../lib/scenarioEngine';

const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_FILE_SIZE_MB = 50;
const ALLOWED_SCENARIOS = Object.keys(SCENARIOS);
const ALLOWED_USER_LEVELS = ['beginner', 'intermediate', 'advanced'];
const ALLOWED_STAGES = [1, 2, 3, 4, 5];

function sanitizeString(input, maxLen = 2000) {
  if (typeof input !== 'string') return '';
  const safe = input.trim().slice(0, maxLen);
  return safe.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

function trimHistory(history, maxLen = MAX_HISTORY_MESSAGES) {
  if (!Array.isArray(history)) return [];
  const sanitized = history
    .filter((m) => m && typeof m === 'object')
    .map((m) => ({
      role: m.role === 'user' || m.role === 'assistant' ? m.role : 'user',
      content: sanitizeString(m.content || m.text || '', 2000)
    }))
    .filter((m) => m.content.length > 0);
  return sanitized.slice(-maxLen);
}

function validateFileInfo(fileInfo) {
  if (!fileInfo || typeof fileInfo !== 'object') {
    return { valid: false, uploaded: false, fileName: null, fileSize: null, reason: null };
  }
  const uploaded = Boolean(fileInfo.uploaded);
  if (!uploaded) {
    return { valid: true, uploaded: false, fileName: null, fileSize: null, reason: null };
  }
  const rawName = typeof fileInfo.name === 'string' ? fileInfo.name.trim() : '';
  const name = sanitizeString(rawName, 200);
  const size = typeof fileInfo.size === 'number' ? fileInfo.size : (typeof fileInfo.size === 'string' ? parseInt(fileInfo.size, 10) : 0);

  if (!name) {
    return { valid: false, uploaded: true, fileName: null, fileSize: null, reason: 'اسم الملف مطلوب عند الرفع' };
  }

  const ext = (name.split('.').pop() || '').toLowerCase();
  const allowedExts = ['pkt', 'pka', 'zip', 'pdf'];
  if (!allowedExts.includes(ext)) {
    return { valid: false, uploaded: true, fileName: name, fileSize: size, reason: `الامتداد المسموح به فقط: .pkt, .pka (الملفات المسموحة: ${allowedExts.join(', ')})` };
  }

  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  if (size > maxSizeBytes) {
    return { valid: false, uploaded: true, fileName: name, fileSize: size, reason: `حجم الملف كبير جداً. الحد الأقصى المسموح به: ${MAX_FILE_SIZE_MB} ميجابايت` };
  }

  return { valid: true, uploaded: true, fileName: name, fileSize: isNaN(size) ? null : size, reason: null };
}

function buildCorsHeaders(req, res) {
  const origin = req.headers?.origin || '';
  const allowed = process.env.NODE_ENV === 'production'
    ? origin && (origin.includes('vercel.app') || origin.includes('smartlab') || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1'))
    : true;

  res.setHeader('Access-Control-Allow-Origin', allowed ? origin || '*' : '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  return { origin, allowed };
}

function buildErrorResponse(statusCode, errorKey, errorMessage, details = null) {
  return {
    ok: false,
    error: errorKey,
    message: errorMessage,
    details: details,
    reply: '',
    feedback: { score: 0, type: 'neutral', note: '', points: [] },
    score: 0,
    suggestions: [],
    stage: 1,
    stageName: STAGE_NAMES[1],
    stageChanged: false,
    stageDataSnapshot: null,
    meta: { error: true },
    timestamp: new Date().toISOString()
  };
}

function buildSuccessResponse(engineResult, extraMeta = {}) {
  return {
    ok: true,
    reply: engineResult.reply || engineResult.text || '',
    message: engineResult.reply || engineResult.text || '',
    feedback: {
      score: engineResult.feedback?.score ?? 0.5,
      type: engineResult.feedback?.type ?? 'neutral',
      note: engineResult.feedback?.note ?? '',
      points: engineResult.feedback?.points ?? []
    },
    score: engineResult.score ?? 0.5,
    suggestions: engineResult.suggestions ?? [],
    stage: engineResult.stage ?? 1,
    stageName: engineResult.stageName ?? STAGE_NAMES[engineResult.stage ?? 1],
    stageDescription: engineResult.stageDescription ?? '',
    stageChanged: Boolean(engineResult.stageChanged),
    previousStage: engineResult.previousStage ?? null,
    stageDataSnapshot: engineResult.stageDataSnapshot ?? null,
    meta: {
      aiProvider: engineResult.meta?.provider || 'Unknown',
      usedFallback: Boolean(engineResult.meta?.usedFallback),
      model: engineResult.meta?.model || null,
      tokens: engineResult.meta?.tokens || null,
      responseTimeMs: engineResult.meta?.responseTimeMs || null,
      aiMeta: engineResult.meta?.aiMeta || {},
      scenarioMeta: engineResult.meta?.scenarioMeta || null,
      stageStats: engineResult.meta?.stageStats || null,
      ...extraMeta
    },
    timestamp: new Date().toISOString()
  };
}

export default async function handler(req, res) {
  const startTime = Date.now();

  try {
    buildCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        ok: true,
        name: 'SmartLab AI Scenario API v3.0',
        status: 'online',
        availableScenarios: ALLOWED_SCENARIOS.map((id) => ({
          id,
          name: SCENARIOS[id].name,
          client: SCENARIOS[id].client,
          difficulty: SCENARIOS[id].difficulty
        })),
        stages: STAGE_NAMES,
        mandatoryStage1: MANDATORY_QUESTIONS_STAGE1.map((q) => ({ id: q.id, label: q.label })),
        mandatoryStage3: DELIVERY_QUESTIONS_STAGE3.map((q) => ({ id: q.id, label: q.label })),
        llmConfigured: Boolean(process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY),
        timestamp: new Date().toISOString()
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json(
        buildErrorResponse(405, 'METHOD_NOT_ALLOWED', 'الرجاء استخدام طريقة POST لهذا الطلب', { allowedMethods: ['POST', 'OPTIONS', 'GET'] })
      );
    }

    const rawBody = req.body || {};

    const scenarioIdRaw = rawBody.scenarioId;
    const messageRaw = rawBody.message ?? '';
    const historyRaw = rawBody.history || [];
    const userLevelRaw = rawBody.userLevel || 'beginner';
    const conversationStageRaw = rawBody.conversationStage ?? 1;
    const stageDataSnapshotRaw = rawBody.stageDataSnapshot ?? null;
    const fileInfoRaw = rawBody.fileInfo ?? null;
    const sessionIdRaw = rawBody.sessionId ?? null;
    const requestId = rawBody.requestId ?? `req_${Date.now()}`;

    const scenarioId = typeof scenarioIdRaw === 'string' ? scenarioIdRaw.trim().toLowerCase() : '';
    if (!scenarioId) {
      return res.status(400).json(
        buildErrorResponse(400, 'INVALID_SCENARIO_ID', 'معرّف السيناريو (scenarioId) مطلوب')
      );
    }
    if (!ALLOWED_SCENARIOS.includes(scenarioId)) {
      return res.status(400).json(
        buildErrorResponse(400, 'SCENARIO_NOT_FOUND', `سيناريو غير معروف: ${scenarioId}`, {
          available: ALLOWED_SCENARIOS
        })
      );
    }

    const message = sanitizeString(typeof messageRaw === 'string' ? messageRaw : '', MAX_MESSAGE_LENGTH);

    const userLevel = ALLOWED_USER_LEVELS.includes(userLevelRaw) ? userLevelRaw : 'beginner';

    const conversationStage = (() => {
      const n = Number(conversationStageRaw);
      return isNaN(n) ? 1 : Math.min(5, Math.max(1, Math.floor(n)));
    })();

    const trimmedHistory = trimHistory(historyRaw);

    const fileValidation = validateFileInfo(fileInfoRaw);
    if (fileValidation.uploaded && !fileValidation.valid) {
      return res.status(400).json(
        buildErrorResponse(400, 'INVALID_FILE', fileValidation.reason || 'ملف غير صالح', {
          fileName: fileValidation.fileName,
          fileSize: fileValidation.fileSize
        })
      );
    }

    let hydratedStageData = null;
    try {
      hydratedStageData = ScenarioEngine.hydrateStageData(stageDataSnapshotRaw);
    } catch (hydrateErr) {
      console.warn('[scenario.js] Failed to hydrate stage data, starting fresh:', hydrateErr.message);
      hydratedStageData = null;
    }

    const engine = new ScenarioEngine(
      scenarioId,
      trimmedHistory,
      userLevel,
      conversationStage,
      hydratedStageData
    );

    const engineResult = await engine.analyzeAndRespond(message, {
      fileUploaded: fileValidation.uploaded && fileValidation.valid,
      fileName: fileValidation.fileName,
      fileSize: fileValidation.fileSize
    });

    const elapsed = Date.now() - startTime;

    const response = buildSuccessResponse(engineResult, {
      totalProcessingTimeMs: elapsed,
      requestId,
      sessionId: sessionIdRaw,
      inputStats: {
        messageLength: message.length,
        historyCount: trimmedHistory.length,
        hasFile: fileValidation.uploaded && fileValidation.valid,
        fileName: fileValidation.fileName || null
      }
    });

    const cacheControl = response.meta?.usedFallback
      ? 'no-store, no-cache, must-revalidate'
      : 'public, max-age=0, s-maxage=0';
    res.setHeader('Cache-Control', cacheControl);
    res.setHeader('X-Processing-Time', String(elapsed));
    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Used-Fallback', response.meta?.usedFallback ? '1' : '0');

    return res.status(200).json(response);

  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`[scenario.js] API Error (${elapsed}ms):`, error?.stack || error?.message || error);

    const isUserError = error instanceof TypeError &&
      (error.message.includes('scenarioId') ||
       error.message.includes('stage') ||
       error.message.includes('JSON'));

    return res.status(isUserError ? 400 : 500).json(
      buildErrorResponse(
        isUserError ? 400 : 500,
        isUserError ? 'BAD_REQUEST' : 'SERVER_ERROR',
        isUserError
          ? `بيانات الطلب غير صالحة: ${error.message}`
          : 'عذراً، حدث خطأ غير متوقع في خادم المعالجة. حاول مرة أخرى بعد لحظات.',
        {
          processingTimeMs: elapsed,
          envInfo: process.env.NODE_ENV === 'production' ? null : { errorType: error?.name, errorMessage: error?.message }
        }
      )
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
    responseLimit: '8mb'
  }
};

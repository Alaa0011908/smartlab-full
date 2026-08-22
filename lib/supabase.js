// lib/supabase.js
// ============================================================
// 🔥 طبقة التواصل مع Supabase - Database Layer v3.0
// تشمل جميع الجداول الجديدة للتحليلات المتقدمة
// ============================================================

import { createClient } from '@supabase/supabase-js'

// ============================================================
// 🔷 تهيئة العميل
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// التحقق من وجود المتغيرات البيئية
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials are missing. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// ============================================================
// 🔷 دوال مساعدة للتعامل مع الأخطاء
// ============================================================

export const handleSupabaseError = (error) => {
  console.error('❌ Supabase Error:', error)
  
  const errorMessages = {
    'Invalid login credentials': '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'Email not confirmed': '❌ البريد الإلكتروني غير مؤكد. يرجى التحقق من بريدك',
    'User already registered': '❌ هذا البريد الإلكتروني مسجل بالفعل',
    'Password should be at least 6 characters': '❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    'Invalid email': '❌ البريد الإلكتروني غير صحيح',
    'Network request failed': '❌ فشل الاتصال. تأكد من اتصالك بالإنترنت',
    'Duplicate key value violates unique constraint': '❌ هذا السجل موجود بالفعل',
    'JWT expired': '❌ انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى',
  }
  
  const userMessage = errorMessages[error.message] || error.message || 'حدث خطأ غير متوقع'
  
  return {
    message: userMessage,
    originalError: error,
    status: error.status || 500,
  }
}

export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error) throw error
    return { success: true, message: '✅ الاتصال بقاعدة البيانات يعمل بشكل جيد' }
  } catch (error) {
    return { success: false, message: '❌ فشل الاتصال بقاعدة البيانات: ' + error.message }
  }
}

// ============================================================
// 🔷 جدول: users (المستخدمين)
// ============================================================

export const users = {
  /**
   * إنشاء مستخدم جديد
   */
  create: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على بيانات مستخدم
   */
  get: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * تحديث بيانات مستخدم
   */
  update: async (userId, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * تحديث إعدادات المستخدم
   */
  updateSettings: async (userId, settings) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        settings: settings,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: assessments (التقييمات)
// ============================================================

export const assessments = {
  /**
   * حفظ نتائج تقييم
   */
  save: async (assessmentData) => {
    const { data, error } = await supabase
      .from('assessments')
      .insert([{
        user_id: assessmentData.user_id,
        assessment_id: assessmentData.assessment_id,
        assessment_name: assessmentData.assessment_name,
        mode: assessmentData.mode || 'full',
        score: assessmentData.score,
        total_questions: assessmentData.total_questions,
        correct_answers: assessmentData.correct_answers,
        wrong_answers: assessmentData.wrong_answers,
        time_spent: assessmentData.time_spent,
        answers: assessmentData.answers,
        question_details: assessmentData.question_details,
        completed_at: assessmentData.completed_at || new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على جميع تقييمات مستخدم
   */
  getAll: async (userId, limit = 50) => {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على آخر تقييم لمستخدم
   */
  getLatest: async (userId) => {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على تقييم حسب المعرف
   */
  getById: async (assessmentId) => {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('id', assessmentId)
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: behavioral_logs (سجل السلوك)
// ============================================================

export const behavioralLogs = {
  /**
   * تسجيل حدث سلوكي
   */
  log: async (logData) => {
    const { data, error } = await supabase
      .from('behavioral_logs')
      .insert([{
        user_id: logData.user_id,
        session_id: logData.session_id,
        assessment_id: logData.assessment_id,
        question_id: logData.question_id,
        event_type: logData.event_type,
        event_data: logData.event_data,
        timestamp: logData.timestamp || new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * تسجيل أحداث متعددة (دفعة واحدة)
   */
  logBatch: async (logs) => {
    const formattedLogs = logs.map(log => ({
      user_id: log.user_id,
      session_id: log.session_id,
      assessment_id: log.assessment_id,
      question_id: log.question_id,
      event_type: log.event_type,
      event_data: log.event_data,
      timestamp: log.timestamp || new Date().toISOString(),
    }))

    const { data, error } = await supabase
      .from('behavioral_logs')
      .insert(formattedLogs)
      .select()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على سجل سلوكي لجلسة
   */
  getBySession: async (sessionId) => {
    const { data, error } = await supabase
      .from('behavioral_logs')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true })
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على سجل سلوكي لمستخدم
   */
  getByUser: async (userId, limit = 100) => {
    const { data, error } = await supabase
      .from('behavioral_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: cognitive_patterns (الأنماط المعرفية)
// ============================================================

export const cognitivePatterns = {
  /**
   * حفظ نمط معرفي
   */
  save: async (patternData) => {
    const { data, error } = await supabase
      .from('cognitive_patterns')
      .insert([{
        user_id: patternData.user_id,
        assessment_id: patternData.assessment_id,
        pattern_type: patternData.pattern_type,
        pattern_value: patternData.pattern_value,
        calculated_at: patternData.calculated_at || new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على الأنماط المعرفية لمستخدم
   */
  getByUser: async (userId) => {
    const { data, error } = await supabase
      .from('cognitive_patterns')
      .select('*')
      .eq('user_id', userId)
      .order('calculated_at', { ascending: false })
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على أحدث نمط معرفي
   */
  getLatest: async (userId) => {
    const { data, error } = await supabase
      .from('cognitive_patterns')
      .select('*')
      .eq('user_id', userId)
      .order('calculated_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: predictions (التنبؤات)
// ============================================================

export const predictions = {
  /**
   * حفظ تنبؤ
   */
  save: async (predictionData) => {
    const { data, error } = await supabase
      .from('predictions')
      .insert([{
        user_id: predictionData.user_id,
        assessment_id: predictionData.assessment_id,
        prediction_type: predictionData.prediction_type,
        prediction_value: predictionData.prediction_value,
        accuracy: predictionData.accuracy || null,
        created_at: predictionData.created_at || new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على التنبؤات لمستخدم
   */
  getByUser: async (userId) => {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * تحديث دقة التنبؤ
   */
  updateAccuracy: async (predictionId, accuracy) => {
    const { data, error } = await supabase
      .from('predictions')
      .update({ accuracy })
      .eq('id', predictionId)
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: learning_sessions (جلسات التعلم)
// ============================================================

export const learningSessions = {
  /**
   * بدء جلسة تعلم جديدة
   */
  start: async (sessionData) => {
    const { data, error } = await supabase
      .from('learning_sessions')
      .insert([{
        user_id: sessionData.user_id,
        session_type: sessionData.session_type || 'assessment',
        start_time: sessionData.start_time || new Date().toISOString(),
        metadata: sessionData.metadata || {},
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * إنهاء جلسة تعلم
   */
  end: async (sessionId, endData) => {
    const { data, error } = await supabase
      .from('learning_sessions')
      .update({
        end_time: endData.end_time || new Date().toISOString(),
        duration_minutes: endData.duration_minutes,
        total_questions: endData.total_questions,
        correct_answers: endData.correct_answers,
        wrong_answers: endData.wrong_answers,
        score: endData.score,
        summary: endData.summary || {},
      })
      .eq('id', sessionId)
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على جلسات مستخدم
   */
  getByUser: async (userId, limit = 20) => {
    const { data, error } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على جلسة حالية (غير منتهية)
   */
  getActive: async (userId) => {
    const { data, error } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('user_id', userId)
      .is('end_time', null)
      .order('start_time', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      return { error: handleSupabaseError(error) }
    }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: skill_mastery (إتقان المهارات)
// ============================================================

export const skillMastery = {
  /**
   * حفظ أو تحديث إتقان مهارة
   */
  upsert: async (skillData) => {
    const { data, error } = await supabase
      .from('skill_mastery')
      .upsert([{
        user_id: skillData.user_id,
        skill_id: skillData.skill_id,
        skill_name: skillData.skill_name,
        percentage: skillData.percentage,
        level: skillData.level,
        last_assessment_id: skillData.last_assessment_id,
        updated_at: new Date().toISOString(),
      }], {
        onConflict: 'user_id,skill_id',
      })
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * حفظ مجموعة مهارات (دفعة واحدة)
   */
  upsertBatch: async (skills) => {
    const formattedSkills = skills.map(s => ({
      user_id: s.user_id,
      skill_id: s.skill_id,
      skill_name: s.skill_name,
      percentage: s.percentage,
      level: s.level,
      last_assessment_id: s.last_assessment_id,
      updated_at: new Date().toISOString(),
    }))

    const { data, error } = await supabase
      .from('skill_mastery')
      .upsert(formattedSkills, {
        onConflict: 'user_id,skill_id',
      })
      .select()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على مهارات مستخدم
   */
  getByUser: async (userId) => {
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .order('percentage', { ascending: false })
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على أضعف المهارات
   */
  getWeakest: async (userId, limit = 5) => {
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .lt('percentage', 50)
      .order('percentage', { ascending: true })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على أقوى المهارات
   */
  getStrongest: async (userId, limit = 5) => {
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .gte('percentage', 70)
      .order('percentage', { ascending: false })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 جدول: recommendations (التوصيات)
// ============================================================

export const recommendations = {
  /**
   * حفظ توصية
   */
  save: async (recommendationData) => {
    const { data, error } = await supabase
      .from('recommendations')
      .insert([{
        user_id: recommendationData.user_id,
        assessment_id: recommendationData.assessment_id,
        recommendation_type: recommendationData.recommendation_type,
        recommendation_text: recommendationData.recommendation_text,
        priority: recommendationData.priority || 'medium',
        resource_links: recommendationData.resource_links || [],
        is_completed: false,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * حفظ مجموعة توصيات
   */
  saveBatch: async (recommendationsList) => {
    const formatted = recommendationsList.map(r => ({
      user_id: r.user_id,
      assessment_id: r.assessment_id,
      recommendation_type: r.recommendation_type,
      recommendation_text: r.recommendation_text,
      priority: r.priority || 'medium',
      resource_links: r.resource_links || [],
      is_completed: false,
      created_at: new Date().toISOString(),
    }))

    const { data, error } = await supabase
      .from('recommendations')
      .insert(formatted)
      .select()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على توصيات مستخدم
   */
  getByUser: async (userId, limit = 20) => {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * الحصول على توصيات نشطة (غير مكتملة)
   */
  getActive: async (userId) => {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('is_completed', false)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },

  /**
   * تحديث حالة توصية
   */
  complete: async (recommendationId) => {
    const { data, error } = await supabase
      .from('recommendations')
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', recommendationId)
      .select()
      .single()
    
    if (error) return { error: handleSupabaseError(error) }
    return { data, error: null }
  },
}

// ============================================================
// 🔷 دوال تحليلية متقدمة (استعلامات مخصصة)
// ============================================================

export const analytics = {
  /**
   * الحصول على إحصائيات عامة لمستخدم
   */
  getStats: async (userId) => {
    const { data: assessments, error: aError } = await supabase
      .from('assessments')
      .select('score, completed_at, mode')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (aError) return { error: handleSupabaseError(aError) }

    const { data: skills, error: sError } = await supabase
      .from('skill_mastery')
      .select('percentage, level')
      .eq('user_id', userId)

    if (sError) return { error: handleSupabaseError(sError) }

    // حساب الإحصائيات
    const totalAssessments = assessments?.length || 0
    const averageScore = totalAssessments > 0
      ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / totalAssessments)
      : 0

    const latestScore = assessments?.[0]?.score || 0
    const quickCount = assessments?.filter(a => a.mode === 'quick').length || 0
    const fullCount = assessments?.filter(a => a.mode === 'full').length || 0

    const mastered = skills?.filter(s => s.percentage >= 70).length || 0
    const learning = skills?.filter(s => s.percentage >= 40 && s.percentage < 70).length || 0
    const weak = skills?.filter(s => s.percentage < 40).length || 0

    return {
      data: {
        totalAssessments,
        averageScore,
        latestScore,
        quickCount,
        fullCount,
        skillStats: { mastered, learning, weak, total: skills?.length || 0 },
        improvement: assessments?.length >= 2 
          ? assessments[0].score - assessments[assessments.length - 1].score
          : 0,
      },
      error: null,
    }
  },

  /**
   * الحصول على تطور المستخدم عبر الزمن
   */
  getProgress: async (userId) => {
    const { data, error } = await supabase
      .from('assessments')
      .select('score, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true })

    if (error) return { error: handleSupabaseError(error) }

    return {
      data: data?.map(a => ({
        date: a.completed_at,
        score: a.score,
      })) || [],
      error: null,
    }
  },

  /**
   * الحصول على تحليل المهارات مع التطور
   */
  getSkillsEvolution: async (userId) => {
    const { data, error } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) return { error: handleSupabaseError(error) }

    // تجميع حسب skill_id
    const skillMap = {}
    data?.forEach(s => {
      if (!skillMap[s.skill_id]) {
        skillMap[s.skill_id] = []
      }
      skillMap[s.skill_id].push({
        percentage: s.percentage,
        updated_at: s.updated_at,
      })
    })

    return { data: skillMap, error: null }
  },

  /**
   * الحصول على توصيات ذكية مخصصة
   */
  getSmartRecommendations: async (userId) => {
    // جلب أضعف المهارات
    const { data: weakSkills, error: wError } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .lt('percentage', 50)
      .order('percentage', { ascending: true })
      .limit(3)

    if (wError) return { error: handleSupabaseError(wError) }

    // جلب التوصيات الحالية
    const { data: existingRecs, error: eError } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('is_completed', false)

    if (eError) return { error: handleSupabaseError(eError) }

    // توليد توصيات جديدة إذا لزم الأمر
    const recommendations = []
    const existingTopics = existingRecs?.map(r => r.recommendation_type) || []

    weakSkills?.forEach(skill => {
      if (!existingTopics.includes(skill.skill_id)) {
        recommendations.push({
          user_id: userId,
          assessment_id: skill.last_assessment_id,
          recommendation_type: skill.skill_id,
          recommendation_text: `ركز على تحسين ${skill.skill_name} (${skill.percentage}%)`,
          priority: skill.percentage < 30 ? 'high' : 'medium',
          resource_links: [
            `https://www.youtube.com/results?search_query=شرح+${encodeURIComponent(skill.skill_name)}`,
          ],
        })
      }
    })

    // حفظ التوصيات الجديدة
    if (recommendations.length > 0) {
      const { error: rError } = await supabase
        .from('recommendations')
        .insert(recommendations)

      if (rError) return { error: handleSupabaseError(rError) }
    }

    return { data: recommendations, error: null }
  },
}

// ============================================================
// 🔷 تصدير جميع الدوال
// ============================================================

export default {
  supabase,
  handleSupabaseError,
  checkSupabaseConnection,
  users,
  assessments,
  behavioralLogs,
  cognitivePatterns,
  predictions,
  learningSessions,
  skillMastery,
  recommendations,
  analytics,
}

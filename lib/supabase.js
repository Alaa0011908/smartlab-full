// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

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

// دالة مساعدة للتعامل مع أخطاء Supabase
export const handleSupabaseError = (error) => {
  console.error('❌ Supabase Error:', error)
  
  // رسائل خطأ مفهومة للمستخدم
  const errorMessages = {
    'Invalid login credentials': '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة',
    'Email not confirmed': '❌ البريد الإلكتروني غير مؤكد. يرجى التحقق من بريدك',
    'User already registered': '❌ هذا البريد الإلكتروني مسجل بالفعل',
    'Password should be at least 6 characters': '❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    'Invalid email': '❌ البريد الإلكتروني غير صحيح',
    'Network request failed': '❌ فشل الاتصال. تأكد من اتصالك بالإنترنت',
  }
  
  const userMessage = errorMessages[error.message] || error.message || 'حدث خطأ غير متوقع'
  
  return {
    message: userMessage,
    originalError: error,
    status: error.status || 500,
  }
}

// دالة للتحقق من الاتصال بـ Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error) throw error
    return { success: true, message: '✅ الاتصال بقاعدة البيانات يعمل بشكل جيد' }
  } catch (error) {
    return { success: false, message: '❌ فشل الاتصال بقاعدة البيانات: ' + error.message }
  }
}

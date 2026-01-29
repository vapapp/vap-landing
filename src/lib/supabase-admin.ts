import { createClient } from '@supabase/supabase-js';

// Cliente Supabase com Service Role Key para operações administrativas
// IMPORTANTE: Este cliente só deve ser usado em Server Components ou API Routes
// NUNCA exponha o SUPABASE_SERVICE_ROLE_KEY no frontend

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

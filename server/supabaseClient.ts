import { createClient } from '@supabase/supabase-js';

// Use the exact names from your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// This check is what's triggering your error. 
// If it still fails after a restart, the variables aren't being loaded.
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase Environment Variables. Check if .env.local exists at the root and variables start with NEXT_PUBLIC_'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };
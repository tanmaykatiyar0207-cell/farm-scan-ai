import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// HACKATHON-SAFE: If Supabase keys are missing or placeholders, provide a mock client.
// This prevents the entire app from crashing (500) during initialization.
export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project"))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => ({
                single: async () => ({ data: null, error: null }),
              }),
            }),
          }),
        }),
      }),
    } as any;

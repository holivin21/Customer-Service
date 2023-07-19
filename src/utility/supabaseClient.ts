import { createClient } from "@refinedev/supabase";

// const SUPABASE_URL = "https://ddwpsiwoxbljmqcsuiju.supabase.co";
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkd3BzaXdveGJsam1xY3N1aWp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzYwMjA4NiwiZXhwIjoyMDAzMTc4MDg2fQ.uvsHnPEED5ePn9o1UKuzJ_Pd__-g_IBViJVXV5MaLQc"
const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.SUPABASE_KEY ?? "";
export const supabaseClientPublic = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {

    persistSession: true,
  },
});
export const supabaseClientAuth = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "auth",
  },
  auth: {
    persistSession: true,
  },
});

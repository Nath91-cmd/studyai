import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dptrwscbnwvbdmfeyrae.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdHJ3c2Nibnd2YmRtZmV5cmFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMTY0MTksImV4cCI6MjEwMTY5MjQxOX0.q1n6GGcIE75jpDly-kFsPq7tOFP8qn_cDPjLUg0WteY";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
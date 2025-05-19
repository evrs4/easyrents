import { createClient } from "@supabase/supabase-js";

const supaUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supaKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY

export const supabase = createClient(supaUrl, supaKey);

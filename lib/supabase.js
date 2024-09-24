import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmkacltiplgjppjoanoh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxta2FjbHRpcGxnanBwam9hbm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODE5NTIsImV4cCI6MjA0Mjc1Nzk1Mn0.YUKAOStImQ3ukSNAfNf8DIOL9HGi2oZo-PcUY79JzPY";

 export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

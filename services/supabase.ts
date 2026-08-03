import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// Ganti string di bawah dengan URL dan Anon Key dari dashboard Supabase lu
const supabaseUrl = "https://uurpiyiloiwxhorhyxav.supabase.co";
const supabaseAnonKey = "sb_publishable_owI75le7inxc8iNFITDaxQ_QyHCDMwE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

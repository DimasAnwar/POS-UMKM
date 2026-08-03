import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { supabase } from "../services/supabase"; // <-- Pastikan path ini sesuai
import Login from "./(auth)/Login";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek session saat aplikasi pertama kali dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Pantau perubahan status (misal user tiba-tiba logout / token expired)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Tampilkan loading spinner selagi ngecek status login di background
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#1e3a8a" />
      </View>
    );
  }

  // Kalau ada session (user udah login), langsung tendang ke Dashboard
  if (session) {
    return <Redirect href="/tabs/dashboard" />;
  }

  // Kalau nggak ada session, biarkan di halaman Login
  return <Login />;
}

import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router"; // <-- 1. Import useRouter di sini
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Bikin komponen Custom Header secara global
const CustomHeader = ({ title }: { title: string }) => {
  const router = useRouter(); // <-- 2. Inisialisasi router

  return (
    <View className="flex-row justify-between items-center px-4 pb-4 pt-12 bg-white border-b border-slate-100">
      <Text className="text-xl font-bold text-blue-900">{title}</Text>

      {/* 3. Tambahin onPress untuk pindah ke halaman profile */}
      <TouchableOpacity onPress={() => router.push("./profile")}>
        <Feather name="user" size={24} color="#1e293b" />
      </TouchableOpacity>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 5,
          shadowOpacity: 0.1,
        },
        // Nyalain header secara default buat semua tab
        headerShown: true,
        // Pasang CustomHeader dengan pengecekan typeof TypeScript
        header: ({ options }) => (
          <CustomHeader
            title={
              typeof options.headerTitle === "string"
                ? options.headerTitle
                : "MSME Manager"
            }
          />
        ),
      }}
    >
      {/* 1. Dashboard Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: "MSME Manager", // Judul yang dikirim ke Custom Header
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 2. History / Riwayat Tab */}
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          headerTitle: "Transaction History", // Judul untuk tab history
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Inventory / Stok Tab */}
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Stok",
          headerTitle: "MSME Manager",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 4. POS / CASHIER Tab */}
      <Tabs.Screen
        name="pos"
        options={{
          title: "CASHIER",
          headerShown: false, // <-- Ini yang bikin header di file pos.tsx mati
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 5. Profile Tab (Hidden) */}
      <Tabs.Screen
        name="profile"
        options={{
          href: null, // <-- INI KUNCINYA BIAR NGGAK MUNCUL DI NAVBAR BAWAH
          headerTitle: "Profil Akun", // Kalau lu mau halamannya tetap punya Custom Header
          // headerShown: false, // <-- Nyalain ini kalau profile juga nggak mau pakai header
        }}
      />
    </Tabs>
  );
}

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { supabase } from "../../services/supabase"; // <-- Sesuaikan path file supabase lu

export default function Login() {
  // Tambahkan state untuk form dan loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi untuk hit Supabase Auth
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password tidak boleh kosong!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Login Gagal", error.message);
    } else {
      // Jika berhasil, arahkan ke dashboard
      router.replace("/tabs/dashboard");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 justify-center px-5 bg-tertier">
        <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* Header Section */}
          <View className="items-center mb-8 mt-2">
            <View className="bg-blue-50 p-3 rounded-2xl mb-4">
              <MaterialCommunityIcons
                name="shield-account"
                size={36}
                color="#1e3a8a"
              />
            </View>
            <Text className="text-3xl font-inter-bold text-neutral mb-1">
              POS UMKM
            </Text>
            <Text className="text-secondary font-inter-regular text-sm">
              Akses Layanan Toko Anda
            </Text>
          </View>

          {/* Hubungkan value dan onChangeText ke state */}
          <Input
            label="Email"
            placeholder="posumkm@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity className="items-end mb-6 mt-1">
            <Text className="text-primari font-inter-medium text-sm">
              Lupa Password?
            </Text>
          </TouchableOpacity>

          {/* Hubungkan onPress ke handleLogin dan tampilkan state loading */}
          <Button
            title={loading ? "Memproses..." : "Login"}
            className="mb-6"
            onPress={handleLogin}
            disabled={loading}
            rightIcon={
              !loading ? (
                <Feather name="arrow-right" size={20} color="white" />
              ) : undefined
            }
          />

          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-secondary font-inter-regular text-sm">
              Belum Punya Akun?
            </Text>
            <TouchableOpacity onPress={() => router.push("./register")}>
              <Text className="text-primari font-inter-bold text-sm ml-1">
                Daftar
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-1px w-full bg-gray-200 mb-6" />

          {/* Footer: Switch to PIN */}
          <TouchableOpacity className="flex-row items-center justify-center mb-2 active:opacity-60">
            <MaterialCommunityIcons name="dialpad" size={18} color="#4b5563" />
            <Text className="text-secondary font-inter-medium text-sm ml-2">
              Switch to PIN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

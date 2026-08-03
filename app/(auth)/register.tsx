import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { supabase } from "../../services/supabase"; // <-- Sesuaikan path file supabase lu

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // State Step 1 (Business Info)
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState(""); // Bisa dibikin modal/dropdown nanti
  const [address, setAddress] = useState("");

  // State Step 2 (Admin Info)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNextStep = () => {
    if (!storeName || !category || !address) {
      Alert.alert(
        "Perhatian",
        "Harap lengkapi semua data bisnis terlebih dahulu.",
      );
      return;
    }
    setStep(2);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Perhatian", "Harap lengkapi data admin akun.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Perhatian", "Password harus minimal 8 karakter.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Simpan data tambahan di metadata user
        data: {
          full_name: fullName,
          store_name: storeName,
          business_category: category,
          business_address: address,
        },
      },
    });
    setLoading(false);

    if (error) {
      Alert.alert("Gagal Daftar", error.message);
    } else {
      Alert.alert(
        "Pendaftaran Berhasil",
        "Silakan periksa email Anda untuk verifikasi, atau langsung login jika email konfirmasi dimatikan.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-tertier"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {/* Header Section */}
            <View className="items-center mb-6 mt-2">
              <View className="bg-blue-50 p-3 rounded-2xl mb-4">
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={32}
                  color="#1e3a8a"
                />
              </View>
              <Text className="text-2xl font-inter-bold text-neutral mb-1">
                Setup Your Business
              </Text>
              <Text className="text-secondary font-inter-regular text-sm text-center px-4">
                Create your administrative account to manage inventory and
                sales.
              </Text>
            </View>

            {/* Progress Indicator */}
            <View className="mb-6">
              <View className="flex-row justify-between mb-2">
                <Text className="text-secondary font-inter-bold text-xs tracking-wider">
                  STEP {step} OF 2
                </Text>
                <Text className="text-primari font-inter-bold text-xs">
                  {step === 1 ? "Business Details" : "Admin Details"}
                </Text>
              </View>
              {/* Progress Bar Line */}
              <View className="flex-row h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <View className="h-full bg-primari w-1/2" />
                <View
                  className={`h-full bg-primari w-1/2 ${step === 1 ? "opacity-0" : "opacity-100"}`}
                />
              </View>
            </View>

            {step === 1 && (
              <View>
                <View className="flex-row items-center mb-4">
                  <MaterialCommunityIcons
                    name="domain"
                    size={20}
                    color="#1e3a8a"
                  />
                  <Text className="text-neutral font-inter-bold text-base ml-2">
                    Business Information
                  </Text>
                </View>

                <Input
                  label="Store Name"
                  placeholder="e.g. Acme Supplies"
                  value={storeName}
                  onChangeText={setStoreName}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="store"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />

                {/* 
                  NOTE: Untuk category lu set editable={false} di UI asli. 
                  Untuk sekarang, gua biarin bisa diketik biasa biar fungsinya jalan.
                  Nanti lu bisa ganti pakai modal/picker buatan lu sendiri.
                */}
                <Input
                  label="Business Category"
                  placeholder="Retail, F&B, etc."
                  value={category}
                  onChangeText={setCategory}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="shape-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />
                <Input
                  label="Business Address"
                  placeholder="Street address, city, state"
                  value={address}
                  onChangeText={setAddress}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />

                <Button
                  title="Next Step"
                  className="mt-4 mb-6"
                  onPress={handleNextStep}
                  rightIcon={
                    <Feather name="arrow-right" size={20} color="white" />
                  }
                />
              </View>
            )}

            {step === 2 && (
              <View>
                <View className="flex-row items-center mb-4">
                  <MaterialCommunityIcons
                    name="shield-account-outline"
                    size={20}
                    color="#1e3a8a"
                  />
                  <Text className="text-neutral font-inter-bold text-base ml-2">
                    Admin Account Setup
                  </Text>
                </View>

                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={fullName}
                  onChangeText={setFullName}
                  leftIcon={<Feather name="user" size={20} color="#9ca3af" />}
                />
                <Input
                  label="Email Address"
                  placeholder="admin@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  leftIcon={<Feather name="mail" size={20} color="#9ca3af" />}
                />
                <View className="mb-2">
                  <Input
                    label="Create Password"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    leftIcon={<Feather name="lock" size={20} color="#9ca3af" />}
                    rightIcon={
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#9ca3af"
                      />
                    }
                    onRightIconPress={() => setShowPassword(!showPassword)}
                  />
                  <Text className="text-xs text-secondary font-inter-regular -mt-2">
                    Must be at least 8 characters long.
                  </Text>
                </View>

                <View className="flex-row gap-3 mt-4 mb-6">
                  {/* Tombol Back ke Step 1 */}
                  <TouchableOpacity
                    onPress={() => setStep(1)}
                    disabled={loading}
                    className="bg-gray-100 p-3.5 rounded-lg justify-center items-center"
                  >
                    <Feather name="arrow-left" size={20} color="#4b5563" />
                  </TouchableOpacity>

                  {/* Tombol Submit Akhir */}
                  <Button
                    title={loading ? "Loading..." : "Create Account"}
                    className="flex-1"
                    disabled={loading}
                    onPress={handleRegister}
                  />
                </View>
              </View>
            )}

            <View className="h-1px w-full bg-gray-200 mb-6" />

            <View className="flex-row justify-center items-center mb-2">
              <Text className="text-secondary font-inter-regular text-sm">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-primari font-inter-bold text-sm ml-1">
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

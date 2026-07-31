import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
export default function Login() {
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

          <Input
            label="Email"
            placeholder="posumkm@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry={true}
          />

          <TouchableOpacity className="items-end mb-6 mt-1">
            <Text className="text-primari font-inter-medium text-sm">
              Lupa Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Login"
            className="mb-6"
            onPress={() => console.log("Login diklik")}
            rightIcon={<Feather name="arrow-right" size={20} color="white" />}
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

          {/* Divider Line (Typo h-1px diperbaiki jadi h-[1px]) */}
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

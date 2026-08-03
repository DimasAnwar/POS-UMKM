// app/(auth)/regist.tsx
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

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
                  leftIcon={
                    <MaterialCommunityIcons
                      name="store"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />
                <Input
                  label="Business Category"
                  placeholder="Select a category"
                  leftIcon={
                    <MaterialCommunityIcons
                      name="shape-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                  rightIcon={
                    <Feather name="chevron-down" size={20} color="#9ca3af" />
                  }
                  editable={false}
                />
                <Input
                  label="Business Address"
                  placeholder="Street address, city, state"
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
                  onPress={() => setStep(2)}
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
                  leftIcon={<Feather name="user" size={20} color="#9ca3af" />}
                />
                <Input
                  label="Email Address"
                  placeholder="admin@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Feather name="mail" size={20} color="#9ca3af" />}
                />
                <View className="mb-2">
                  <Input
                    label="Create Password"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
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
                    className="bg-gray-100 p-3.5 rounded-lg justify-center items-center"
                  >
                    <Feather name="arrow-left" size={20} color="#4b5563" />
                  </TouchableOpacity>

                  {/* Tombol Submit Akhir */}
                  <Button
                    title="Create Account"
                    className="flex-1"
                    onPress={() => console.log("Register diklik")}
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

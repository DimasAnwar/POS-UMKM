import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      {/* PROFILE AVATAR SECTION */}
      <View className="items-center mt-6">
        <View className="relative">
          {/* Ganti source URI ini dengan foto profil asli user nantinya */}
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=47" }}
            className="w-24 h-24 rounded-2xl border-2 border-blue-900"
          />
          {/* Edit Button Badge */}
          <TouchableOpacity className="absolute -bottom-2 -right-2 bg-blue-900 w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
            <MaterialIcons name="edit" size={14} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-bold text-blue-900 mt-4">
          Sarah Jenkins
        </Text>
        <Text className="text-sm text-slate-500 mt-1">Store Owner</Text>
      </View>

      {/* PERSONAL INFORMATION CARD */}
      <View className="bg-white mx-4 mt-8 rounded-2xl p-4 border border-slate-200 shadow-sm">
        <View className="flex-row items-center mb-4">
          <Feather name="user" size={18} color="#1e3a8a" />
          <Text className="ml-2 font-bold text-blue-900 text-base">
            Personal Information
          </Text>
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Full Name</Text>
          <Text className="text-sm font-medium text-slate-800 mb-3">
            Sarah Jenkins
          </Text>
          <View className="h-[1px] bg-slate-100 w-full mb-3" />
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Email Address</Text>
          <Text className="text-sm font-medium text-slate-800 mb-3">
            sarah.jenkins@example.com
          </Text>
          <View className="h-[1px] bg-slate-100 w-full mb-3" />
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Phone Number</Text>
          <Text className="text-sm font-medium text-slate-800">
            +1 (555) 123-4567
          </Text>
        </View>
      </View>

      {/* BUSINESS INFORMATION CARD */}
      <View className="bg-white mx-4 mt-4 rounded-2xl p-4 border border-slate-200 shadow-sm">
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="storefront" size={18} color="#1e3a8a" />
          <Text className="ml-2 font-bold text-blue-900 text-base">
            Business Information
          </Text>
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Business Name</Text>
          <Text className="text-sm font-medium text-slate-800 mb-3">
            Jenkins Coffee & Co.
          </Text>
          <View className="h-[1px] bg-slate-100 w-full mb-3" />
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Business Category</Text>
          <Text className="text-sm font-medium text-slate-800 mb-3">
            Cafe & Retail
          </Text>
          <View className="h-[1px] bg-slate-100 w-full mb-3" />
        </View>

        <View>
          <Text className="text-xs text-slate-400 mb-1">Business Address</Text>
          <Text className="text-sm font-medium text-slate-800">
            123 Market St, Suite 4B, Cityville, ST 12345
          </Text>
        </View>
      </View>

      {/* SETTINGS MENU */}
      <View className="bg-white mx-4 mt-4 rounded-2xl border border-slate-200 shadow-sm">
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
          <View className="flex-row items-center">
            <Feather name="lock" size={18} color="#1e3a8a" />
            <Text className="ml-3 font-bold text-slate-800 text-sm">
              Change PIN
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
          <View className="flex-row items-center">
            <Feather name="bell" size={18} color="#1e3a8a" />
            <Text className="ml-3 font-bold text-slate-800 text-sm">
              Notification Settings
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
          <View className="flex-row items-center">
            <Feather name="globe" size={18} color="#1e3a8a" />
            <Text className="ml-3 font-bold text-slate-800 text-sm">
              Language Preferences
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs text-slate-400 mr-2 text-center w-12">
              English (US)
            </Text>
            <Feather name="chevron-right" size={20} color="#94a3b8" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Feather name="help-circle" size={18} color="#1e3a8a" />
            <Text className="ml-3 font-bold text-slate-800 text-sm">
              Help & Support
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* LOGOUT BUTTON */}
      <TouchableOpacity className="mx-4 mt-6 mb-10 bg-transparent border border-red-500 rounded-xl py-3.5 flex-row items-center justify-center">
        <Feather name="log-out" size={18} color="#ef4444" />
        <Text className="ml-2 font-bold text-red-600 text-sm">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

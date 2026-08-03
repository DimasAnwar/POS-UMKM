import {
    Feather,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      {/* FILTER TABS (Horizontal Scroll) */}
      <View className="bg-white pb-4 border-b border-slate-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <TouchableOpacity className="bg-blue-900 px-5 py-2 rounded-full mr-2 shadow-sm">
            <Text className="text-white font-semibold text-sm">Today</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-5 py-2 rounded-full mr-2 shadow-sm">
            <Text className="text-slate-600 font-medium text-sm">
              Yesterday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-5 py-2 rounded-full mr-2 shadow-sm">
            <Text className="text-slate-600 font-medium text-sm">
              Last 7 Days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-4 py-2 rounded-full mr-2 shadow-sm flex-row items-center">
            <Feather name="calendar" size={14} color="#475569" />
            <Text className="text-slate-600 font-medium text-sm ml-2">
              Custom
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* SUMMARY (Berdasarkan potongan gambar yang kelihatan sedikit di atas list) */}
        <View className="flex-row justify-between mb-4">
          <View className="bg-white flex-1 mr-2 p-4 rounded-xl border border-slate-200 shadow-sm">
            <Text className="text-blue-900 font-bold text-lg">
              Rp 1.450.000
            </Text>
          </View>
          <View className="bg-white w-24 p-4 rounded-xl border border-slate-200 shadow-sm items-center">
            <Text className="text-blue-900 font-bold text-lg">24</Text>
          </View>
        </View>

        {/* TRANSACTION LIST */}

        {/* Item 1: QRIS / Completed */}
        <View className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-800 text-base">
              #TRX-98234
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-600 text-[10px] font-bold tracking-wider">
                COMPLETED
              </Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 mb-3">24 Oct, 14:32</Text>

          <View className="h-1px bg-slate-100 w-full mb-3" />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={16}
                color="#64748b"
              />
              <Text className="text-slate-600 text-sm ml-2">QRIS</Text>
            </View>
            <Text className="font-bold text-blue-900 text-base">
              Rp 150.000
            </Text>
          </View>
        </View>

        {/* Item 2: Cash / Completed */}
        <View className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-800 text-base">
              #TRX-98233
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-600 text-[10px] font-bold tracking-wider">
                COMPLETED
              </Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 mb-3">24 Oct, 13:15</Text>

          <View className="h-1px bg-slate-100 w-full mb-3" />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <FontAwesome5 name="money-bill-wave" size={14} color="#64748b" />
              <Text className="text-slate-600 text-sm ml-2">Cash</Text>
            </View>
            <Text className="font-bold text-blue-900 text-base">Rp 45.000</Text>
          </View>
        </View>

        {/* Item 3: Card / Refunded (Dengan coretan harga) */}
        <View className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-800 text-base">
              #TRX-98232
            </Text>
            <View className="bg-red-100 px-2 py-1 rounded-md">
              <Text className="text-red-600 text-[10px] font-bold tracking-wider">
                REFUNDED
              </Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 mb-3">24 Oct, 11:45</Text>

          <View className="h-1px bg-slate-100 w-full mb-3" />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Feather name="credit-card" size={16} color="#64748b" />
              <Text className="text-slate-600 text-sm ml-2">Card</Text>
            </View>
            {/* Teks dicoret karena direfund */}
            <Text className="font-bold text-slate-500 text-base line-through">
              Rp 250.000
            </Text>
          </View>
        </View>

        {/* Item 4: Cash / Completed */}
        <View className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-sm">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-800 text-base">
              #TRX-98231
            </Text>
            <View className="bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-600 text-[10px] font-bold tracking-wider">
                COMPLETED
              </Text>
            </View>
          </View>
          <Text className="text-xs text-slate-500 mb-3">24 Oct, 09:20</Text>

          <View className="h-1px bg-slate-100 w-full mb-3" />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <FontAwesome5 name="money-bill-wave" size={14} color="#64748b" />
              <Text className="text-slate-600 text-sm ml-2">Cash</Text>
            </View>
            <Text className="font-bold text-blue-900 text-base">Rp 12.000</Text>
          </View>
        </View>

        {/* LOAD MORE BUTTON */}
        <TouchableOpacity className="bg-transparent border border-blue-200 rounded-xl py-3.5 items-center justify-center mb-10">
          <Text className="text-blue-900 font-bold text-sm">
            Load More Transactions
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

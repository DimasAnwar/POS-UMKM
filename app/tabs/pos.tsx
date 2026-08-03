import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function POSScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* SEARCH BAR AREA */}
      <View className="flex-row items-center px-4 py-4 mt-8">
        <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mr-3">
          <Feather name="search" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search products..."
            className="flex-1 ml-2 text-slate-800"
            placeholderTextColor="#94a3b8"
          />
        </View>
        {/* Tombol barcode yang diganti jadi search sesuai permintaan */}
        <TouchableOpacity className="bg-slate-100 p-3 rounded-lg border border-slate-200">
          <Feather name="search" size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* CATEGORIES (Horizontal Scroll) */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <TouchableOpacity className="bg-blue-900 px-5 py-2 rounded-full mr-3">
            <Text className="text-white font-bold text-sm">All Items</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-slate-600 font-medium text-sm">
              Beverages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-slate-600 font-medium text-sm">Snacks</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border border-slate-200 px-5 py-2 rounded-full mr-3">
            <Text className="text-slate-600 font-medium text-sm">
              Dry Goods
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* PRODUCT GRID */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between pb-4">
          {/* Product 1 */}
          <TouchableOpacity className="w-[48%] bg-white rounded-xl border border-slate-200 mb-4 overflow-hidden shadow-sm relative">
            <View className="h-32 bg-slate-50 items-center justify-center p-2">
              {/* Placeholder image icon */}
              <Feather name="image" size={40} color="#cbd5e1" />
            </View>
            <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="text-xs font-bold text-slate-600">45</Text>
            </View>
            <View className="p-3">
              <Text
                className="font-semibold text-slate-800 text-sm"
                numberOfLines={2}
              >
                Sparkling Mineral Water 500ml
              </Text>
              <Text className="text-[10px] text-slate-400 mt-1 mb-2">
                SKU: BEV-001
              </Text>
              <Text className="font-bold text-blue-900 text-base">
                Rp 12.000
              </Text>
            </View>
          </TouchableOpacity>

          {/* Product 2 */}
          <TouchableOpacity className="w-[48%] bg-white rounded-xl border border-slate-200 mb-4 overflow-hidden shadow-sm relative">
            <View className="h-32 bg-slate-50 items-center justify-center p-2">
              <Feather name="image" size={40} color="#cbd5e1" />
            </View>
            <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-yellow-400 mr-1" />
              <Text className="text-xs font-bold text-slate-600">8</Text>
            </View>
            <View className="p-3">
              <Text
                className="font-semibold text-slate-800 text-sm"
                numberOfLines={2}
              >
                Classic Potato Chips Large
              </Text>
              <Text className="text-[10px] text-slate-400 mt-1 mb-2">
                SKU: SNK-102
              </Text>
              <Text className="font-bold text-blue-900 text-base">
                Rp 24.500
              </Text>
            </View>
          </TouchableOpacity>

          {/* Product 3 (Selected State) */}
          <TouchableOpacity className="w-[48%] bg-white rounded-xl border-2 border-blue-900 mb-4 overflow-hidden shadow-sm relative">
            <View className="h-32 bg-slate-50 items-center justify-center p-2">
              <Feather name="image" size={40} color="#cbd5e1" />
            </View>
            {/* Badge Kuantitas Terpilih */}
            <View className="absolute top-2 left-2 bg-blue-900 w-6 h-6 rounded-full items-center justify-center border border-white z-10">
              <Text className="text-white text-xs font-bold">2</Text>
            </View>
            <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="text-xs font-bold text-slate-600">112</Text>
            </View>
            <View className="p-3">
              <Text
                className="font-semibold text-slate-800 text-sm"
                numberOfLines={2}
              >
                Instant Noodles
              </Text>
              <Text className="text-[10px] text-slate-400 mt-1 mb-2">
                SKU: FOD-045
              </Text>
              <Text className="font-bold text-blue-900 text-base">
                Rp 6.500
              </Text>
            </View>
          </TouchableOpacity>

          {/* Product 4 (Out of Stock) */}
          <TouchableOpacity className="w-[48%] bg-slate-50 rounded-xl border border-slate-200 mb-4 overflow-hidden shadow-sm relative opacity-60">
            <View className="h-32 bg-slate-100 items-center justify-center p-2">
              <Feather name="image" size={40} color="#94a3b8" />
            </View>
            <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-1" />
              <Text className="text-xs font-bold text-slate-600">0</Text>
            </View>
            <View className="p-3">
              <Text
                className="font-semibold text-slate-800 text-sm"
                numberOfLines={2}
              >
                Premium Coffee
              </Text>
              <Text className="text-[10px] text-slate-400 mt-1 mb-2">
                SKU: BEV-099
              </Text>
              <Text className="font-bold text-slate-500 text-base">
                Rp 45.000
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM CART SUMMARY */}
      <View className="bg-white border-t border-slate-200 px-4 py-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <View className="flex-row justify-between items-end mb-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">
              Current Order
            </Text>
            <Text className="text-slate-500 text-sm mt-1">2 Items</Text>
          </View>
          <View className="items-end">
            <Text className="text-slate-400 text-xs font-medium">
              Total Due
            </Text>
            <Text className="font-bold text-blue-900 text-2xl">Rp 15.500</Text>
          </View>
        </View>

        <TouchableOpacity className="bg-blue-900 rounded-xl py-4 flex-row justify-center items-center">
          <Text className="text-white font-bold text-lg mr-2">Charge</Text>
          <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

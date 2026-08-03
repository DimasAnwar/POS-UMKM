import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function InventoryScreen() {
  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* PAGE TITLE */}
        <Text className="text-lg font-bold text-slate-800 mt-5 mb-4">
          Inventory Management
        </Text>

        {/* ACTION BAR (Search & Add Item) */}
        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-1 flex-row items-center bg-white border border-slate-200 rounded-lg px-3 py-2.5 mr-3 shadow-sm">
            <Feather name="search" size={18} color="#94a3b8" />
            <TextInput
              placeholder="Search SKU or Name"
              className="flex-1 ml-2 text-slate-800 text-sm"
              placeholderTextColor="#94a3b8"
            />
          </View>
          <TouchableOpacity className="bg-blue-900 px-4 py-3 rounded-lg flex-row items-center shadow-sm">
            <Feather name="plus" size={16} color="white" />
            <Text className="text-white font-semibold text-[13px] ml-1">
              Add Item
            </Text>
          </TouchableOpacity>
        </View>

        {/* INVENTORY LIST (UKURAN DISESUAIKAN DENGAN image_478962.png) */}

        {/* Item 1: Eco Bottle */}
        <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-3.5 shadow-sm">
          <View className="w-14 h-14 bg-slate-50 rounded-lg items-center justify-center border border-slate-100">
            <Feather name="image" size={24} color="#94a3b8" />
          </View>
          <View className="flex-1 ml-3 justify-center">
            <Text className="font-bold text-slate-800 text-[15px]">
              Eco Bottle 500ml
            </Text>
            <Text className="text-xs text-slate-500 mt-0.5 mb-1.5">
              SKU: ECO-BTL-01
            </Text>
            <View className="self-start bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-700 text-[10px] font-bold">
                45 In Stock
              </Text>
            </View>
          </View>
          <View className="items-end justify-between py-0.5">
            <MaterialCommunityIcons
              name="cloud-check"
              size={18}
              color="#10b981"
            />
            <Text className="font-bold text-slate-800 text-base mt-auto">
              $12.50
            </Text>
          </View>
        </View>

        {/* Item 2: Organic Tote */}
        <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-3.5 shadow-sm">
          <View className="w-14 h-14 bg-slate-50 rounded-lg items-center justify-center border border-slate-100">
            <Feather name="image" size={24} color="#94a3b8" />
          </View>
          <View className="flex-1 ml-3 justify-center">
            <Text className="font-bold text-slate-800 text-[15px]">
              Organic Tote
            </Text>
            <Text className="text-xs text-slate-500 mt-0.5 mb-1.5">
              SKU: ORG-TOT-03
            </Text>
            <View className="self-start bg-orange-100 px-2 py-1 rounded-md">
              <Text className="text-orange-700 text-[10px] font-bold">
                4 Low Stock
              </Text>
            </View>
          </View>
          <View className="items-end justify-between py-0.5">
            <MaterialCommunityIcons
              name="cloud-check"
              size={18}
              color="#10b981"
            />
            <Text className="font-bold text-slate-800 text-base mt-auto">
              $8.00
            </Text>
          </View>
        </View>

        {/* Item 3: Ceramic Mug */}
        <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-3.5 shadow-sm">
          <View className="w-14 h-14 bg-slate-50 rounded-lg items-center justify-center border border-slate-100">
            <Feather name="image" size={24} color="#94a3b8" />
          </View>
          <View className="flex-1 ml-3 justify-center">
            <Text className="font-bold text-slate-800 text-[15px]">
              Ceramic Mug
            </Text>
            <Text className="text-xs text-slate-500 mt-0.5 mb-1.5">
              SKU: CER-MUG-02
            </Text>
            <View className="self-start bg-red-100 px-2 py-1 rounded-md">
              <Text className="text-red-700 text-[10px] font-bold">
                0 Out of Stock
              </Text>
            </View>
          </View>
          <View className="items-end justify-between py-0.5">
            <MaterialCommunityIcons
              name="cloud-off-outline"
              size={18}
              color="#94a3b8"
            />
            <Text className="font-bold text-slate-800 text-base mt-auto">
              $14.00
            </Text>
          </View>
        </View>

        {/* Item 4: Notebook Set */}
        <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-24 shadow-sm">
          <View className="w-14 h-14 bg-blue-50 rounded-lg items-center justify-center border border-blue-100">
            <Feather name="image" size={24} color="#cbd5e1" />
          </View>
          <View className="flex-1 ml-3 justify-center">
            <Text className="font-bold text-slate-800 text-[15px]">
              Notebook Set
            </Text>
            <Text className="text-xs text-slate-500 mt-0.5 mb-1.5">
              SKU: NOTE-SET-05
            </Text>
            <View className="self-start bg-green-100 px-2 py-1 rounded-md">
              <Text className="text-green-700 text-[10px] font-bold">
                120 In Stock
              </Text>
            </View>
          </View>
          <View className="items-end justify-between py-0.5">
            <MaterialCommunityIcons
              name="cloud-check"
              size={18}
              color="#10b981"
            />
            <Text className="font-bold text-slate-800 text-base mt-auto">
              $22.00
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <TouchableOpacity
        className="absolute bottom-6 right-4 bg-blue-900 w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
        style={{
          elevation: 5,
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

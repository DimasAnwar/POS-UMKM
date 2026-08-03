import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* OVERVIEW SECTION */}
      <View className="flex-row justify-between items-center bg-slate-50 p-4 rounded-2xl mx-4 mt-2 border border-slate-200">
        <View>
          <Text className="font-bold text-lg text-slate-800">Overview</Text>
          <Text className="text-slate-500 text-sm mt-1">Today, Oct 24</Text>
        </View>
        <TouchableOpacity className="flex-row items-center border border-slate-300 px-4 py-2 rounded-xl bg-white shadow-sm">
          <Feather name="calendar" size={16} color="#2563eb" />
          <Text className="ml-2 text-blue-700 font-semibold text-sm">
            Change Date
          </Text>
        </TouchableOpacity>
      </View>

      {/* STATS GRID */}
      <View className="px-4 mt-4 flex-row flex-wrap justify-between">
        {/* Card 1: Total Transactions */}
        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons name="receipt" size={18} color="#64748b" />
            <Text className="ml-2 text-slate-500 text-xs font-medium">
              Total Transactions
            </Text>
          </View>
          <Text className="text-3xl font-bold text-slate-800">48</Text>
        </View>

        {/* Card 2: Gross Revenue */}
        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="cash-multiple"
              size={18}
              color="#64748b"
            />
            <Text className="ml-2 text-slate-500 text-xs font-medium">
              Gross Revenue
            </Text>
          </View>
          <Text className="text-lg font-bold text-blue-800">Rp 1.250.000</Text>
        </View>

        {/* Card 3: Gross Profit */}
        <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Feather name="trending-up" size={18} color="#64748b" />
            <Text className="ml-2 text-slate-500 text-xs font-medium">
              Gross Profit
            </Text>
          </View>
          <Text className="text-lg font-bold text-blue-800">Rp 450.000</Text>
        </View>

        {/* Card 4: Low Stock (Red Alert) */}
        <View className="w-[48%] bg-red-50 p-4 rounded-2xl border border-red-300 shadow-sm">
          <View className="flex-row items-center mb-3">
            <Feather name="alert-triangle" size={18} color="#b91c1c" />
            <Text className="ml-2 text-red-700 text-xs font-bold">
              Low Stock
            </Text>
          </View>
          <Text className="text-2xl font-bold text-red-700">5 Items</Text>
        </View>
      </View>

      {/* DAILY REVENUE MOCK CHART */}
      <View className="mx-4 mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold text-lg text-slate-800">
            Daily Revenue
          </Text>
          <Text className="text-xs text-slate-400 font-medium">
            Last 7 Days
          </Text>
        </View>

        {/* Mock Chart Area */}
        <View className="h-40 flex-row justify-between items-end border-b border-slate-100 pb-2 relative">
          {/* Y-Axis labels (Mock) */}
          <View className="absolute left-0 h-full justify-between pb-2">
            <Text className="text-[10px] text-slate-300">1.4M</Text>
            <Text className="text-[10px] text-slate-300">1M</Text>
            <Text className="text-[10px] text-slate-300">600k</Text>
            <Text className="text-[10px] text-slate-300">200k</Text>
            <Text className="text-[10px] text-slate-300">0</Text>
          </View>

          {/* Bar Columns (marginLeft to give space for Y-axis) */}
          <View className="w-6 bg-blue-900 rounded-t-sm h-[55%] ml-8" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-[65%]" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-[75%]" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-[70%]" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-[85%]" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-full" />
          <View className="w-6 bg-blue-900 rounded-t-sm h-[90%]" />
        </View>

        {/* X-Axis labels */}
        <View className="flex-row justify-between mt-2 ml-8 pr-1">
          <Text className="text-[10px] text-slate-400">Mon</Text>
          <Text className="text-[10px] text-slate-400">Tue</Text>
          <Text className="text-[10px] text-slate-400">Wed</Text>
          <Text className="text-[10px] text-slate-400">Thu</Text>
          <Text className="text-[10px] text-slate-400">Fri</Text>
          <Text className="text-[10px] text-slate-400">Sat</Text>
          <Text className="text-[10px] text-slate-400">Sun</Text>
        </View>
      </View>

      {/* RECENT TRANSACTIONS */}
      <View className="mx-4 mt-6 mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-bold text-lg text-slate-800">
            Recent Transactions
          </Text>
          <TouchableOpacity>
            <Text className="text-sm text-blue-700 font-semibold">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Item 1 */}
        <View className="flex-row justify-between items-center bg-white p-3 rounded-2xl mb-3 border border-slate-200 shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-blue-900 p-3 rounded-xl">
              <Feather name="shopping-bag" size={20} color="white" />
            </View>
            <View className="ml-3">
              <Text className="font-bold text-slate-800">Order #1042</Text>
              <Text className="text-xs text-slate-500 mt-1">
                10:45 AM • 3 Items
              </Text>
            </View>
          </View>
          <Text className="font-bold text-slate-800">Rp 125.000</Text>
        </View>

        {/* Transaction Item 2 */}
        <View className="flex-row justify-between items-center bg-white p-3 rounded-2xl mb-3 border border-slate-200 shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-blue-900 p-3 rounded-xl">
              <Feather name="shopping-bag" size={20} color="white" />
            </View>
            <View className="ml-3">
              <Text className="font-bold text-slate-800">Order #1041</Text>
              <Text className="text-xs text-slate-500 mt-1">
                09:12 AM • 1 Item
              </Text>
            </View>
          </View>
          <Text className="font-bold text-slate-800">Rp 50.000</Text>
        </View>

        {/* Transaction Item 3 */}
        <View className="flex-row justify-between items-center bg-white p-3 rounded-2xl mb-3 border border-slate-200 shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-blue-900 p-3 rounded-xl">
              <Feather name="shopping-bag" size={20} color="white" />
            </View>
            <View className="ml-3">
              <Text className="font-bold text-slate-800">Order #1040</Text>
              <Text className="text-xs text-slate-500 mt-1">
                Yesterday • 5 Items
              </Text>
            </View>
          </View>
          <Text className="font-bold text-slate-800">Rp 275.000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

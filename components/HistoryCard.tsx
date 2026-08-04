import {
    Feather,
    FontAwesome5,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HistoryCardProps {
  orderId: string;
  status: string; // "COMPLETED" | "PENDING" | "FAILED"
  date: string;
  paymentMethod: string;
  amount: number;
  onPress: () => void; // Fungsi saat card diklik untuk lihat detail
}

export default function HistoryCard({
  orderId,
  status,
  date,
  paymentMethod,
  amount,
  onPress,
}: HistoryCardProps) {
  const isCompleted = status === "COMPLETED";
  const isFailed = status === "FAILED" || status === "REFUNDED";

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white border border-slate-200 rounded-xl p-4 mb-3 shadow-sm"
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-bold text-slate-800 text-base">{orderId}</Text>

        {/* Label Status */}
        <View
          className={`px-2 py-1 rounded-md ${
            isCompleted
              ? "bg-green-100"
              : isFailed
                ? "bg-red-100"
                : "bg-orange-100"
          }`}
        >
          <Text
            className={`text-[10px] font-bold tracking-wider ${
              isCompleted
                ? "text-green-600"
                : isFailed
                  ? "text-red-600"
                  : "text-orange-600"
            }`}
          >
            {status}
          </Text>
        </View>
      </View>

      <Text className="text-xs text-slate-500 mb-3">{date}</Text>
      <View className="h-1px bg-slate-100 w-full mb-3" />

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          {paymentMethod.toUpperCase() === "CASH" ? (
            <FontAwesome5 name="money-bill-wave" size={14} color="#64748b" />
          ) : paymentMethod.toUpperCase() === "QRIS" ? (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={16}
              color="#64748b"
            />
          ) : (
            <Feather name="credit-card" size={16} color="#64748b" />
          )}
          <Text className="text-slate-600 text-sm ml-2 capitalize">
            {paymentMethod}
          </Text>
        </View>

        <Text
          className={`font-bold text-base ${
            isFailed ? "text-slate-500 line-through" : "text-blue-900"
          }`}
        >
          Rp {(amount || 0).toLocaleString("id-ID")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface InventoryCardProps {
  name: string;
  sku: string;
  stock: number;
  price: number;
  imageUrl?: string;
  onEdit?: () => void;
}

export default function InventoryCard({
  name,
  sku,
  stock,
  price,
  imageUrl,
  onEdit,
}: InventoryCardProps) {
  // 1. PENGAMAN STOK
  const safeStock = stock ? Number(stock) : 0;
  const isOutOfStock = safeStock === 0;
  const isLowStock = safeStock > 0 && safeStock <= 10;

  // 2. PENGAMAN HARGA (Ini yang bikin error lu hilang selamanya)
  const safePrice = price ? Number(price) : 0;
  const formattedPrice = safePrice.toLocaleString("id-ID");

  const [imageError, setImageError] = useState(false);

  return (
    <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-3.5 shadow-sm relative">
      <TouchableOpacity
        onPress={onEdit}
        className="absolute top-3 right-3 z-10 p-1.5 bg-slate-50 rounded-md border border-slate-200"
      >
        <Feather name="edit-2" size={14} color="#64748b" />
      </TouchableOpacity>

      <View className="w-16 h-16 bg-slate-50 rounded-lg items-center justify-center border border-slate-100 overflow-hidden">
        {imageUrl && !imageError ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <Feather
            name="image"
            size={24}
            color={isOutOfStock ? "#94a3b8" : "#cbd5e1"}
          />
        )}
      </View>

      <View className="flex-1 ml-3 justify-center pr-8">
        <Text
          className="font-bold text-slate-800 text-[15px]"
          numberOfLines={1}
        >
          {name || "Tanpa Nama"}
        </Text>
        <Text className="text-xs text-slate-500 mt-0.5 mb-1.5">
          SKU: {sku || "-"}
        </Text>

        {isOutOfStock ? (
          <View className="self-start bg-red-100 px-2 py-1 rounded-md">
            <Text className="text-red-700 text-[10px] font-bold">
              0 Out of Stock
            </Text>
          </View>
        ) : isLowStock ? (
          <View className="self-start bg-orange-100 px-2 py-1 rounded-md">
            <Text className="text-orange-700 text-[10px] font-bold">
              {safeStock} Low Stock
            </Text>
          </View>
        ) : (
          <View className="self-start bg-green-100 px-2 py-1 rounded-md">
            <Text className="text-green-700 text-[10px] font-bold">
              {safeStock} In Stock
            </Text>
          </View>
        )}
      </View>

      <View className="items-end justify-end py-0.5 mt-auto">
        <Text className="font-bold text-slate-800 text-base">
          {/* 3. TINGGAL PANGGIL VARIABEL YANG UDAH AMAN */}
          Rp {formattedPrice}
        </Text>
      </View>
    </View>
  );
}

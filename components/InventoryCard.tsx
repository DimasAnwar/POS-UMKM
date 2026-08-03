import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface InventoryCardProps {
  name: string;
  sku: string;
  stock: number;
  price: number;
  imageUrl?: string; // <-- Tambahin prop imageUrl (opsional)
}

export default function InventoryCard({
  name,
  sku,
  stock,
  price,
  imageUrl,
}: InventoryCardProps) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  return (
    <View className="flex-row bg-white border border-slate-200 rounded-xl p-3.5 mb-3.5 shadow-sm">
      {/* BAGIAN GAMBAR */}
      <View className="w-14 h-14 bg-slate-50 rounded-lg items-center justify-center border border-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Feather name="image" size={24} color="#94a3b8" />
        )}
      </View>

      <View className="flex-1 ml-3 justify-center">
        <Text
          className="font-bold text-slate-800 text-[15px]"
          numberOfLines={1}
        >
          {name}
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
              {stock} Low Stock
            </Text>
          </View>
        ) : (
          <View className="self-start bg-green-100 px-2 py-1 rounded-md">
            <Text className="text-green-700 text-[10px] font-bold">
              {stock} In Stock
            </Text>
          </View>
        )}
      </View>

      <View className="items-end justify-between py-0.5">
        <MaterialCommunityIcons
          name={isOutOfStock ? "cloud-off-outline" : "cloud-check"}
          size={18}
          color={isOutOfStock ? "#94a3b8" : "#10b981"}
        />
        <Text className="font-bold text-slate-800 text-base mt-auto">
          Rp {price.toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
}

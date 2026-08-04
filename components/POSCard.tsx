import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface POSCardProps {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  imageUrl?: string;
  quantityInCart: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function POSCard({
  name,
  sku,
  price,
  stock,
  imageUrl,
  quantityInCart,
  onAdd,
  onRemove,
}: POSCardProps) {
  const isOutOfStock = stock === 0;
  const isMaxStockReached = quantityInCart >= stock;

  return (
    <View
      className={`w-[48%] bg-white rounded-xl mb-4 overflow-hidden shadow-sm relative ${
        isOutOfStock
          ? "opacity-60 border border-slate-200"
          : quantityInCart > 0
            ? "border-2 border-blue-900"
            : "border border-slate-200"
      }`}
    >
      {/* AREA GAMBAR */}
      <View className="h-32 bg-slate-50 items-center justify-center border-b border-slate-100 relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Feather
            name="image"
            size={40}
            color={isOutOfStock ? "#94a3b8" : "#cbd5e1"}
          />
        )}

        {/* Badge Kuantitas di Keranjang (Kiri Atas) */}
        {quantityInCart > 0 && (
          <View className="absolute top-2 left-2 bg-blue-900 w-7 h-7 rounded-full items-center justify-center border border-white z-10 shadow-sm">
            <Text className="text-white text-xs font-bold">
              {quantityInCart}
            </Text>
          </View>
        )}

        {/* Badge Sisa Stok (Kanan Atas) */}
        <View className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm flex-row items-center border border-slate-200">
          <View
            className={`w-2 h-2 rounded-full mr-1 ${isOutOfStock ? "bg-red-500" : "bg-green-500"}`}
          />
          <Text className="text-[10px] font-bold text-slate-600">{stock}</Text>
        </View>
      </View>

      {/* AREA TEKS INFO BARANG */}
      <View className="p-3">
        <Text
          className="font-semibold text-slate-800 text-sm"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text className="text-[10px] text-slate-400 mt-1 mb-2">
          SKU: {sku || "-"}
        </Text>
        <Text className="font-bold text-blue-900 text-base mb-3">
          Rp {price.toLocaleString("id-ID")}
        </Text>

        {/* AREA KONTROL + DAN - */}
        {!isOutOfStock ? (
          <View className="flex-row items-center justify-between mt-auto">
            <TouchableOpacity
              onPress={onRemove}
              disabled={quantityInCart === 0}
              className={`w-8 h-8 rounded-lg items-center justify-center border ${
                quantityInCart === 0
                  ? "border-slate-200 bg-slate-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <Feather
                name="minus"
                size={16}
                color={quantityInCart === 0 ? "#cbd5e1" : "#ef4444"}
              />
            </TouchableOpacity>

            <Text className="font-bold text-slate-800">{quantityInCart}</Text>

            <TouchableOpacity
              onPress={onAdd}
              disabled={isMaxStockReached}
              className={`w-8 h-8 rounded-lg items-center justify-center border ${
                isMaxStockReached
                  ? "border-slate-200 bg-slate-50"
                  : "border-blue-200 bg-blue-50"
              }`}
            >
              <Feather
                name="plus"
                size={16}
                color={isMaxStockReached ? "#cbd5e1" : "#1e3a8a"}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-slate-100 py-1.5 rounded-lg items-center justify-center mt-auto border border-slate-200">
            <Text className="text-xs font-bold text-slate-400">Stok Habis</Text>
          </View>
        )}
      </View>
    </View>
  );
}

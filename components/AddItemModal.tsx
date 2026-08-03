import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../services/supabase";
import Button from "./Button";
import Input from "./Input";

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = [
  { label: "Makanan", prefix: "FOOD" },
  { label: "Minuman", prefix: "BEV" },
  { label: "Elektronik", prefix: "ELC" },
  { label: "Mainan", prefix: "TOY" },
  { label: "Alat Tulis", prefix: "STA" },
  { label: "Lainnya", prefix: "ETC" },
];

export default function AddItemModal({
  visible,
  onClose,
  onSuccess,
}: AddItemModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [itemSKU, setItemSKU] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Generate SKU berurutan berdasarkan database
  useEffect(() => {
    if (visible) {
      fetchNextSKU(selectedCategory.prefix);
    }
  }, [selectedCategory, visible]);

  const fetchNextSKU = async (prefix: string) => {
    try {
      // Ambil user yang sedang login agar pengecekan SKU spesifik untuk toko user tersebut
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Cari produk milik user dengan kategori/prefix yang sama, diurutkan dari yang terbaru
      const { data, error } = await supabase
        .from("products")
        .select("sku")
        .eq("user_id", user.id)
        .ilike("sku", `${prefix}-%`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      let nextNumber = 1;

      if (data && data.length > 0) {
        // Ambil SKU teratas (misal: "FOOD-003")
        const latestSKU = data[0].sku;
        // Ambil bagian angka di belakang dash (misal: "003" -> 3)
        const parts = latestSKU.split("-");
        if (parts.length > 1) {
          const lastNum = parseInt(parts[1], 10);
          if (!isNaN(lastNum)) {
            nextNumber = lastNum + 1;
          }
        }
      }

      // Format angka menjadi 3 digit (contoh: 1 jadi "001", 12 jadi "012")
      const formattedNum = String(nextNumber).padStart(3, "0");
      setItemSKU(`${prefix}-${formattedNum}`);
    } catch (error) {
      console.log("Gagal generate SKU:", error);
      // Fallback jika error
      setItemSKU(`${prefix}-001`);
    }
  };

  const resetForm = () => {
    setItemName("");
    setItemPrice("");
    setItemStock("");
    setImageUri(null);
    setSelectedCategory(CATEGORIES[0]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePriceChange = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, "");
    if (numericOnly) {
      const formatted = numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setItemPrice(formatted);
    } else {
      setItemPrice("");
    }
  };

  const handleAddItem = async () => {
    const rawPrice = itemPrice.replace(/\./g, "");

    if (!itemName || !rawPrice || !itemStock) {
      Alert.alert(
        "Data Tidak Lengkap",
        "Nama barang, Harga, dan Stok wajib diisi.",
      );
      return;
    }

    Alert.alert(
      "Konfirmasi",
      "Apakah Anda yakin ingin menambahkan barang ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Tambahkan",
          onPress: async () => {
            try {
              setIsSubmitting(true);
              const {
                data: { user },
              } = await supabase.auth.getUser();
              if (!user) throw new Error("User tidak ditemukan.");

              let finalImageUrl = null;

              if (imageUri) {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const fileExt = imageUri.split(".").pop() || "jpg";
                const fileName = `${user.id}/${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                  .from("product-images")
                  .upload(fileName, blob, { contentType: `image/${fileExt}` });

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                  .from("product-images")
                  .getPublicUrl(fileName);

                finalImageUrl = publicUrlData.publicUrl;
              }

              const { error } = await supabase.from("products").insert({
                user_id: user.id,
                name: itemName,
                sku: itemSKU,
                category: selectedCategory.label,
                price: Number(rawPrice),
                stock: Number(itemStock),
                image_url: finalImageUrl,
              });

              if (error) throw error;

              Alert.alert("Sukses", "Barang berhasil ditambahkan!");
              handleClose();
              onSuccess();
            } catch (error: any) {
              Alert.alert("Gagal", error.message);
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end bg-black/50"
      >
        <View className="bg-white rounded-t-3xl p-6 h-[90%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-slate-800">
              Tambah Barang Baru
            </Text>
            <TouchableOpacity onPress={handleClose} className="p-1">
              <Feather name="x" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* 1. UPLOAD GAMBAR */}
            <TouchableOpacity
              onPress={pickImage}
              className="self-center w-28 h-28 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 items-center justify-center mb-5 overflow-hidden"
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} className="w-full h-full" />
              ) : (
                <>
                  <Feather name="camera" size={28} color="#94a3b8" />
                  <Text className="text-[10px] text-slate-400 mt-2 font-medium">
                    Add Photo
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* 2. PILIHAN KATEGORI */}
            <Text className="text-sm font-semibold text-slate-600 mb-2 ml-1">
              Kategori Barang
            </Text>
            <View className="mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="py-1"
              >
                {CATEGORIES.map((cat, index) => {
                  const isSelected = selectedCategory.label === cat.label;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full mr-2 border ${
                        isSelected
                          ? "bg-blue-900 border-blue-900"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isSelected ? "text-white" : "text-slate-600"
                        }`}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* 3. SKU OTOMATIS */}
            <Input label="SKU (Otomatis)" value={itemSKU} editable={false} />

            <Input
              label="Nama Barang *"
              placeholder="Mis: Kopi Susu Aren"
              value={itemName}
              onChangeText={setItemName}
            />

            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Input
                  label="Harga (Rp) *"
                  placeholder="15.000"
                  keyboardType="numeric"
                  value={itemPrice}
                  onChangeText={handlePriceChange}
                />
              </View>
              <View className="w-[48%]">
                <Input
                  label="Stok Awal *"
                  placeholder="50"
                  keyboardType="numeric"
                  value={itemStock}
                  onChangeText={setItemStock}
                />
              </View>
            </View>

            <Text className="text-xs text-slate-500 mb-6 mt-2">
              * Sistem otomatis memberikan peringatan 'Low Stock' jika stok
              kurang dari 10.
            </Text>

            <Button
              title={isSubmitting ? "Menyimpan..." : "Simpan Barang"}
              onPress={handleAddItem}
              disabled={isSubmitting}
            />

            <View className="h-10" />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

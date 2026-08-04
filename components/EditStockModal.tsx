import { Feather } from "@expo/vector-icons";
import { decode } from "base64-arraybuffer";
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
import { supabase } from "../services/supabase"; // Sesuaikan path
import Button from "./Button";
import Input from "./Input";

interface EditStockModalProps {
  visible: boolean;
  onClose: () => void;
  product: any | null;
}

export default function EditStockModal({
  visible,
  onClose,
  product,
}: EditStockModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk data barang
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // State untuk gambar
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Set nilai awal form ketika modal dibuka
  useEffect(() => {
    if (product && visible) {
      setName(product.name || "");

      // Format harga dari angka database (misal: 15000) jadi format titik (15.000)
      const formattedPrice = product.price
        ? String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : "0";
      setPrice(formattedPrice);

      setStock(String(product.stock || 0));
      setExistingImageUrl(product.image_url || null);

      // Reset state gambar baru jika sebelumnya ada bekas file
      setImageUri(null);
      setImageBase64(null);
    }
  }, [product, visible]);

  const handleClose = () => {
    onClose();
  };

  const adjustStock = (amount: number) => {
    const current = parseInt(stock) || 0;
    const newStock = current + amount;
    setStock(String(newStock >= 0 ? newStock : 0));
  };

  const handlePriceChange = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, "");
    if (numericOnly) {
      const formatted = numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setPrice(formatted);
    } else {
      setPrice("");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || null);
    }
  };

  const handleSave = async () => {
    const rawPrice = price.replace(/\./g, "");

    if (!name || !rawPrice || stock === "") {
      Alert.alert("Data Tidak Valid", "Nama, Harga, dan Stok wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User tidak ditemukan.");

      let finalImageUrl = existingImageUrl;

      // JIKA USER MEMILIH GAMBAR BARU, UPLOAD KE SUPABASE
      if (imageBase64 && imageUri) {
        const fileExt = imageUri.split(".").pop() || "jpg";
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, decode(imageBase64), {
            contentType: `image/${fileExt}`,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        finalImageUrl = publicUrlData.publicUrl;
      }

      // UPDATE DATA KE DATABASE
      const { error } = await supabase
        .from("products")
        .update({
          name: name,
          price: Number(rawPrice),
          stock: Number(stock),
          image_url: finalImageUrl,
        })
        .eq("id", product.id);

      if (error) throw error;

      // Tutup modal, Realtime akan update UI otomatis
      handleClose();
    } catch (error: any) {
      Alert.alert("Gagal Menyimpan", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // FITUR HAPUS BARANG
  const handleDelete = () => {
    Alert.alert(
      "Hapus Barang",
      `Apakah Anda yakin ingin menghapus "${product.name}"? Data yang dihapus tidak bisa dikembalikan.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              setIsSubmitting(true);
              const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id);

              if (error) throw error;
              handleClose();
            } catch (error: any) {
              Alert.alert("Gagal Menghapus", error.message);
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
    );
  };

  if (!product) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 bg-black/50"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingVertical: 40, // Kasih jarak atas bawah biar bisa discroll mentok
            paddingHorizontal: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm self-center shadow-xl">
            {/* HEADER DENGAN TOMBOL HAPUS DAN CLOSE */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-slate-800">
                Edit Barang
              </Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={handleDelete}
                  className="p-2 mr-2 bg-red-50 rounded-full border border-red-100"
                >
                  <Feather name="trash-2" size={16} color="#ef4444" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClose}
                  className="p-2 bg-slate-100 rounded-full border border-slate-200"
                >
                  <Feather name="x" size={16} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>

            {/* UPLOAD GAMBAR */}
            <TouchableOpacity
              onPress={pickImage}
              className="self-center w-24 h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 items-center justify-center mb-5 overflow-hidden"
            >
              {imageUri ? (
                <Image source={{ uri: imageUri }} className="w-full h-full" />
              ) : existingImageUrl ? (
                <Image
                  source={{ uri: existingImageUrl }}
                  className="w-full h-full"
                />
              ) : (
                <>
                  <Feather name="camera" size={24} color="#94a3b8" />
                  <Text className="text-[10px] text-slate-400 mt-1 font-medium">
                    Ganti Foto
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View className="mb-2">
              <Text className="text-xs text-slate-500 mb-1 text-center">
                SKU: {product.sku || "-"}
              </Text>
            </View>

            {/* FORM INPUT */}
            <Input
              label="Nama Barang"
              placeholder="Masukkan nama barang"
              value={name}
              onChangeText={setName}
            />

            <Input
              label="Harga (Rp)"
              placeholder="0"
              keyboardType="numeric"
              value={price}
              onChangeText={handlePriceChange}
            />

            {/* BAGIAN EDIT STOK (DENGAN TOMBOL + DAN -) */}
            <Text className="text-sm font-semibold text-slate-600 mb-2 ml-1 mt-1">
              Jumlah Stok
            </Text>
            <View className="flex-row items-center justify-between mb-8">
              <TouchableOpacity
                onPress={() => adjustStock(-1)}
                className="w-12 h-12 bg-red-50 rounded-xl items-center justify-center border border-red-100"
              >
                <Feather name="minus" size={24} color="#ef4444" />
              </TouchableOpacity>

              <View className="flex-1 px-4">
                <Input
                  label="" // Kosongkan label karena sudah ada di atas
                  placeholder="0"
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                  style={{
                    marginBottom: 0,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => adjustStock(1)}
                className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center border border-blue-100"
              >
                <Feather name="plus" size={24} color="#1e3a8a" />
              </TouchableOpacity>
            </View>

            <Button
              title={isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              onPress={handleSave}
              disabled={isSubmitting}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

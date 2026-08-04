import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
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
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product && visible) {
      setStock(String(product.stock));
    }
  }, [product, visible]);

  const handleClose = () => {
    setStock("");
    onClose();
  };

  const adjustStock = (amount: number) => {
    const current = parseInt(stock) || 0;
    const newStock = current + amount;
    setStock(String(newStock >= 0 ? newStock : 0));
  };

  const handleSave = async () => {
    if (stock === "") {
      Alert.alert("Data Tidak Valid", "Jumlah stok tidak boleh kosong.");
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from("products")
        .update({ stock: Number(stock) })
        .eq("id", product.id);

      if (error) throw error;
      handleClose();
    } catch (error: any) {
      Alert.alert("Gagal Update Stok", error.message);
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

              // Tutup modal, Realtime akan otomatis menghilangkan card dari layar!
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
        {/* SCROLLVIEW INI KUNCI BIAR CARD GAK KEGESER/RUSAK PAS KEYBOARD MUNCUL */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm self-center shadow-xl">
            {/* HEADER DENGAN TOMBOL HAPUS DAN CLOSE */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-slate-800">
                Edit Stok
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

            <View className="bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
              <Text className="font-semibold text-slate-800" numberOfLines={1}>
                {product.name}
              </Text>
              <Text className="text-xs text-slate-500 mt-1">
                SKU: {product.sku || "-"}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={() => adjustStock(-1)}
                className="w-12 h-12 bg-red-50 rounded-xl items-center justify-center border border-red-100"
              >
                <Feather name="minus" size={24} color="#ef4444" />
              </TouchableOpacity>

              <View className="flex-1 px-4">
                <Input
                  label="Jumlah Stok"
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

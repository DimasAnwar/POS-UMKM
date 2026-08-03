import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddItemModal from "../../components/AddItemModal"; // <-- Import komponen baru
import InventoryCard from "../../components/InventoryCard";
import { supabase } from "../../services/supabase";

export default function InventoryScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State untuk buka tutup modal

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error: any) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    const matchName = item.name.toLowerCase().includes(searchLower);
    const matchSKU = item.sku
      ? item.sku.toLowerCase().includes(searchLower)
      : false;
    return matchName || matchSKU;
  });

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-1 flex-row items-center bg-white border border-slate-200 rounded-lg px-3 py-2.5 mr-3 shadow-sm">
            <Feather name="search" size={18} color="#94a3b8" />
            <TextInput
              placeholder="Search SKU or Name"
              className="flex-1 ml-2 text-slate-800 text-sm"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-blue-900 px-4 py-3 rounded-lg flex-row items-center shadow-sm"
          >
            <Feather name="plus" size={16} color="white" />
            <Text className="text-white font-semibold text-[13px] ml-1">
              Add Item
            </Text>
          </TouchableOpacity>
        </View>

        <View className="pb-24">
          {loading ? (
            <View className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#1e3a8a" />
              <Text className="text-slate-500 mt-4">Memuat data barang...</Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View className="py-16 items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed mt-4">
              <Feather name="box" size={32} color="#94a3b8" className="mb-4" />
              <Text className="text-slate-800 font-bold text-base mb-1">
                {searchQuery ? "Barang Tidak Ditemukan" : "Belum Ada Barang"}
              </Text>
              <Text className="text-slate-500 text-sm text-center px-6">
                Klik tombol Add Item atau ikon plus di bawah untuk menambahkan
                stok.
              </Text>
            </View>
          ) : (
            filteredProducts.map((item) => (
              <InventoryCard
                key={item.id}
                name={item.name}
                sku={item.sku}
                stock={item.stock}
                price={item.price}
                imageUrl={item.image_url}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-4 bg-blue-900 w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* MODAL COMPONENT */}
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={fetchProducts} // Refresh otomatis pas modal ditutup habis nambah barang
      />
    </View>
  );
}

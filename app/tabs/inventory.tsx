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
import AddItemModal from "../../components/AddItemModal";
import EditStockModal from "../../components/EditStockModal";
import InventoryCard from "../../components/InventoryCard";
import { supabase } from "../../services/supabase";

export default function InventoryScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    let productSubscription: any;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      fetchProducts();

      // Channel realtime tanpa filter ketat di parameter agar event DELETE tidak terblokir
      productSubscription = supabase
        .channel(`public:products:inventory_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "products",
          },
          (payload) => {
            console.log("Realtime Inventory Event:", payload);

            const currentUserId = user.id;

            // JIKA ADA BARANG DIHAPUS (DELETE)
            if (payload.eventType === "DELETE") {
              setProducts((prev) =>
                prev.filter((item) => item.id !== payload.old.id),
              );
              return;
            }

            // Validasi user_id untuk INSERT dan UPDATE
            const rowUser = payload.new?.user_id;
            if (rowUser && rowUser !== currentUserId) return;

            // JIKA ADA BARANG BARU (INSERT)
            if (payload.eventType === "INSERT") {
              setProducts((prev) => {
                const isExist = prev.find((item) => item.id === payload.new.id);
                if (isExist) return prev;
                return [payload.new, ...prev];
              });
            }

            // JIKA ADA BARANG DI-UPDATE (UPDATE)
            if (payload.eventType === "UPDATE") {
              setProducts((prev) =>
                prev.map((item) =>
                  item.id === payload.new.id ? payload.new : item,
                ),
              );
            }
          },
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (productSubscription) {
        supabase.removeChannel(productSubscription);
      }
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error: any) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
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
        <View className="flex-row items-center justify-between mb-5 mt-5">
          <View className="flex-1 flex-row items-center bg-white border border-slate-200 rounded-lg px-3 py-2.5 shadow-sm">
            <Feather name="search" size={18} color="#94a3b8" />
            <TextInput
              placeholder="Search SKU or Name"
              className="flex-1 ml-2 text-slate-800 text-sm"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View className="pb-24">
          {loading ? (
            <View key="loading" className="py-10 items-center justify-center">
              <ActivityIndicator size="large" color="#1e3a8a" />
              <Text className="text-slate-500 mt-4">Memuat data barang...</Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View
              key="empty"
              className="py-16 items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed mt-4"
            >
              <Feather name="box" size={32} color="#94a3b8" className="mb-4" />
              <Text className="text-slate-800 font-bold text-base mb-1">
                {searchQuery ? "Barang Tidak Ditemukan" : "Belum Ada Barang"}
              </Text>
              <Text className="text-slate-500 text-sm text-center px-6">
                Klik ikon plus (+) di bawah untuk menambahkan stok.
              </Text>
            </View>
          ) : (
            <View key="list">
              {filteredProducts.map((item) => (
                <InventoryCard
                  key={item.id}
                  name={item.name}
                  sku={item.sku}
                  stock={item.stock}
                  price={item.price}
                  imageUrl={item.image_url}
                  onEdit={() => openEditModal(item)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* FAB (Tombol Plus di bawah) */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-4 bg-blue-900 w-14 h-14 rounded-2xl items-center justify-center shadow-lg"
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* MODAL TAMBAH BARANG */}
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={fetchProducts}
      />

      {/* MODAL EDIT STOK */}
      <EditStockModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        product={selectedProduct}
      />
    </View>
  );
}

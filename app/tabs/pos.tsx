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
import POSCard from "../../components/POSCard";
import { supabase } from "../../services/supabase";

const CATEGORIES = [
  "All Items",
  "Makanan",
  "Minuman",
  "Elektronik",
  "Mainan",
  "Alat Tulis",
  "Lainnya",
];

type CartItem = {
  product: any;
  quantity: number;
};

export default function POSScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  const [cart, setCart] = useState<Record<string, CartItem>>({});

  useEffect(() => {
    let productSubscription: any;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      fetchProducts();

      // CHANNEL REALTIME TANPA FILTER BAWAAN AGAR EVENT DELETE TIDAK TERBLOKIR
      productSubscription = supabase
        .channel(`public:products:pos_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "products",
          },
          (payload) => {
            console.log("Realtime POS Event:", payload);

            const currentUserId = user.id;

            // 1. JIKA ADA BARANG DIHAPUS (DELETE): Langsung eksekusi tanpa filter user_id
            if (payload.eventType === "DELETE") {
              setProducts((prev) =>
                prev.filter((item) => item.id !== payload.old.id),
              );

              // Hapus juga dari keranjang (cart) kalau barang tersebut sedang dipilih
              setCart((prevCart) => {
                if (prevCart[payload.old.id]) {
                  const newCart = { ...prevCart };
                  delete newCart[payload.old.id];
                  return newCart;
                }
                return prevCart;
              });
              return;
            }

            // 2. VALIDASI USER UNTUK INSERT & UPDATE
            const rowUser = payload.new?.user_id;
            if (rowUser && rowUser !== currentUserId) return;

            // 3. JIKA ADA BARANG BARU (INSERT)
            if (payload.eventType === "INSERT") {
              setProducts((prev) => {
                const isExist = prev.find((item) => item.id === payload.new.id);
                if (isExist) return prev;
                return [payload.new, ...prev];
              });
            }

            // 4. JIKA ADA BARANG DI-UPDATE (UPDATE - misal stok berubah/edit)
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
      console.log("Error fetch POS:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    setCart((prev) => {
      const currentQty = prev[product.id]?.quantity || 0;
      if (currentQty >= product.stock) return prev;

      return {
        ...prev,
        [product.id]: { product, quantity: currentQty + 1 },
      };
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      if (!prev[productId]) return prev;

      const currentQty = prev[productId].quantity;
      if (currentQty <= 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...prev,
        [productId]: { ...prev[productId], quantity: currentQty - 1 },
      };
    });
  };

  const filteredProducts = products.filter((item) => {
    const matchCategory =
      selectedCategory === "All Items" || item.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(searchLower) ||
      (item.sku && item.sku.toLowerCase().includes(searchLower));

    return matchCategory && matchSearch;
  });

  const cartItemsArray = Object.values(cart);
  const totalItems = cartItemsArray.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const totalDue = cartItemsArray.reduce(
    (sum, item) => sum + item.quantity * (item.product.price || 0),
    0,
  );

  return (
    <View className="flex-1 bg-white">
      {/* SEARCH BAR AREA */}
      <View className="flex-row items-center px-4 py-4 mt-8">
        <View className="flex-1 flex-row items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mr-3">
          <Feather name="search" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search products or SKU..."
            className="flex-1 ml-2 text-slate-800"
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity className="bg-slate-100 p-3 rounded-lg border border-slate-200">
          <Feather name="filter" size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* CATEGORIES */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full mr-3 border ${
                  isSelected
                    ? "bg-blue-900 border-blue-900"
                    : "bg-white border-slate-200"
                }`}
              >
                <Text
                  className={`font-medium text-sm ${isSelected ? "text-white font-bold" : "text-slate-600"}`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* PRODUCT GRID */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View key="loading" className="py-10 items-center justify-center">
            <ActivityIndicator size="large" color="#1e3a8a" />
          </View>
        ) : filteredProducts.length === 0 ? (
          <View
            key="empty"
            className="py-16 items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed"
          >
            <Feather
              name="shopping-bag"
              size={32}
              color="#94a3b8"
              className="mb-4"
            />
            <Text className="text-slate-800 font-bold text-base mb-1">
              Produk Tidak Ditemukan
            </Text>
            <Text className="text-slate-500 text-sm text-center px-6">
              Tidak ada produk yang sesuai dengan kategori atau pencarian Anda.
            </Text>
          </View>
        ) : (
          <View key="list" className="flex-row flex-wrap justify-between pb-4">
            {filteredProducts.map((item) => (
              <POSCard
                key={item.id}
                id={item.id}
                name={item.name}
                sku={item.sku}
                price={item.price}
                stock={item.stock}
                imageUrl={item.image_url}
                quantityInCart={cart[item.id]?.quantity || 0}
                onAdd={() => handleAddToCart(item)}
                onRemove={() => handleRemoveFromCart(item.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* FIXED BOTTOM CART SUMMARY */}
      <View className="bg-white border-t border-slate-200 px-4 py-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
        <View className="flex-row justify-between items-end mb-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">
              Current Order
            </Text>
            <Text className="text-slate-500 text-sm mt-1">
              {totalItems} Items
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-slate-400 text-xs font-medium">
              Total Due
            </Text>
            <Text className="font-bold text-blue-900 text-2xl">
              Rp {(totalDue || 0).toLocaleString("id-ID")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={totalItems === 0}
          className={`rounded-xl py-4 flex-row justify-center items-center ${
            totalItems === 0 ? "bg-slate-300" : "bg-blue-900"
          }`}
        >
          <Text className="text-white font-bold text-lg mr-2">Charge</Text>
          <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

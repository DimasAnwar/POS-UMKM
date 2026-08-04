import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HistoryCard from "../../components/HistoryCard";
import TransactionDetailModal from "../../components/TransactionDetailModal";
import { supabase } from "../../services/supabase";

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk Modal Struk
  const [selectedTrx, setSelectedTrx] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let trxSubscription: any;

    const setupRealtime = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      fetchTransactions(user.id);

      trxSubscription = supabase
        .channel(`public:transactions:${user.id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "transactions" },
          (payload: any) => {
            // <-- Tambahkan ': any' di sini biar TypeScript nggak rewel

            // 1. Tangani DELETE dulu (karena Supabase tidak mengirim user_id di payload.old)
            if (payload.eventType === "DELETE") {
              setTransactions((prev) =>
                prev.filter((item) => item.id !== payload.old.id),
              );
              return;
            }

            // 2. Validasi user_id untuk INSERT dan UPDATE
            const rowUser = payload.new?.user_id;
            if (rowUser && rowUser !== user.id) return;

            // 3. Eksekusi INSERT
            if (payload.eventType === "INSERT") {
              setTransactions((prev) => {
                // Cek apakah data ini udah ada di layar biar nggak muncul ganda
                const isExist = prev.find((item) => item.id === payload.new.id);
                if (isExist) return prev;

                return [payload.new, ...prev];
              });
            }

            // 4. Eksekusi UPDATE
            if (payload.eventType === "UPDATE") {
              setTransactions((prev) =>
                prev.map((item) =>
                  // GABUNGIN data lama (...item) dengan data yang baru di-update (...payload.new)
                  item.id === payload.new.id
                    ? { ...item, ...payload.new }
                    : item,
                ),
              );
            }
          },
        )
        .subscribe();
    };

    setupRealtime();
    return () => {
      if (trxSubscription) supabase.removeChannel(trxSubscription);
    };
  }, []);

  const fetchTransactions = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setTransactions(data);
    } catch (error: any) {
      console.log("Gagal fetch history:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${d.getDate()} ${months[d.getMonth()]}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const totalCompletedAmount = transactions
    .filter((trx) => trx.status === "COMPLETED")
    .reduce((sum, trx) => sum + Number(trx.total_amount), 0);

  const totalCompletedCount = transactions.filter(
    (trx) => trx.status === "COMPLETED",
  ).length;

  const handlePressDetail = (trx: any) => {
    setSelectedTrx(trx);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="bg-white pb-4 border-b border-slate-100 mt-5">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <TouchableOpacity className="bg-[#2B4492] px-5 py-2 rounded-full mr-2 shadow-sm">
            <Text className="text-white font-semibold text-sm">All Time</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between mb-4">
          <View className="bg-white flex-1 mr-2 p-4 rounded-xl border border-slate-200 shadow-sm">
            <Text className="text-slate-500 text-xs mb-1">
              Total Pendapatan
            </Text>
            <Text className="text-[#2B4492] font-black text-lg">
              Rp {(totalCompletedAmount || 0).toLocaleString("id-ID")}
            </Text>
          </View>
          <View className="bg-white w-24 p-4 rounded-xl border border-slate-200 shadow-sm items-center justify-center">
            <Text className="text-slate-500 text-xs mb-1">Sales</Text>
            <Text className="text-[#2B4492] font-black text-lg">
              {totalCompletedCount}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2B4492" className="mt-10" />
        ) : transactions.length === 0 ? (
          <View className="py-10 items-center">
            <Feather name="inbox" size={32} color="#94a3b8" className="mb-2" />
            <Text className="text-slate-500">Belum ada transaksi.</Text>
          </View>
        ) : (
          <View className="pb-24">
            {transactions.map((trx) => (
              <HistoryCard
                key={trx.id}
                orderId={trx.order_id}
                status={trx.status}
                date={formatDate(trx.created_at)}
                paymentMethod={trx.payment_method}
                amount={trx.total_amount}
                onPress={() => handlePressDetail(trx)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* MODAL STRUK */}
      <TransactionDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        transaction={selectedTrx}
      />
    </View>
  );
}

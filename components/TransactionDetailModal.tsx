import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface TransactionDetailModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: any;
}

export default function TransactionDetailModal({
  visible,
  onClose,
  transaction,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const d = new Date(transaction.created_at || Date.now());
  const dateStr = `${d.getDate()} ${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
  const timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  const items = transaction.items || [];
  const amount = transaction.total_amount || 0;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Background Hitam - Bisa diklik untuk nutup modal */}
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center p-4"
        onPress={onClose}
      >
        {/* Kontainer Putih - Inner Pressable agar klik di struk tidak nutup modal */}
        <Pressable className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">
          <View className="flex-row justify-between items-center p-4 border-b border-slate-100">
            <TouchableOpacity onPress={onClose} className="p-1">
              <Feather name="x" size={20} color="#64748b" />
            </TouchableOpacity>
            <Text className="font-bold text-slate-800 text-base">
              MSME Manager
            </Text>
            <View className="w-6" />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
          >
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-[#2B4492] rounded-2xl items-center justify-center mb-3 shadow-sm">
                <Feather name="check" size={32} color="white" />
              </View>
              <Text className="font-bold text-slate-800 text-lg mb-1">
                Payment Successful
              </Text>
              <Text className="text-slate-500 text-xs">
                Transaction #{transaction.order_id}
              </Text>
            </View>

            <View className="bg-indigo-50 rounded-xl p-4 items-center mb-6 border border-indigo-100">
              <Text className="text-indigo-900 text-xs font-bold mb-1 uppercase tracking-wider">
                Amount Paid
              </Text>
              <Text className="text-[#2B4492] font-black text-3xl">
                Rp {amount.toLocaleString("id-ID")}
              </Text>
            </View>

            <View className="bg-white border border-slate-200 p-5 rounded-lg border-dashed">
              <View className="items-center mb-4">
                <Text className="font-bold text-slate-800 text-sm">
                  STORE NAME
                </Text>
                <Text className="text-slate-500 text-[10px] text-center mt-1">
                  123 Commerce St.{"\n"}Jakarta, Indonesia{"\n"}Tel:
                  021-555-0199
                </Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-slate-600 text-[10px] font-bold">
                  Date: {dateStr}
                </Text>
                <Text className="text-slate-600 text-[10px] font-bold">
                  {timeStr}
                </Text>
              </View>
              <Text className="text-slate-600 text-[10px] font-bold mb-1">
                Cashier: Admin User
              </Text>
              <Text className="text-slate-600 text-[10px] font-bold mb-4 uppercase">
                Receipt: #{transaction.order_id}
              </Text>

              <View className="border-t border-slate-200 border-dashed w-full my-2" />

              {items.map((item: any, idx: number) => (
                <View key={idx} className="flex-row justify-between my-2">
                  <View className="flex-1 pr-2">
                    <Text className="text-slate-800 text-xs font-bold">
                      {item.name}
                    </Text>
                    <Text className="text-slate-500 text-[10px] mt-0.5">
                      {item.quantity} x Rp{" "}
                      {Number(item.price).toLocaleString("id-ID")}
                    </Text>
                  </View>
                  <Text className="text-slate-800 text-xs font-bold">
                    Rp {(item.quantity * item.price).toLocaleString("id-ID")}
                  </Text>
                </View>
              ))}

              <View className="border-t border-slate-200 border-dashed w-full my-2" />

              <View className="flex-row justify-between mt-2">
                <Text className="text-slate-800 text-xs font-bold">
                  Subtotal
                </Text>
                <Text className="text-slate-800 text-xs font-bold">
                  Rp {amount.toLocaleString("id-ID")}
                </Text>
              </View>
              <View className="flex-row justify-between mt-1 mb-2">
                <Text className="text-slate-500 text-xs">Tax (0%)</Text>
                <Text className="text-slate-500 text-xs">Rp 0</Text>
              </View>

              <View className="border-t border-slate-200 border-dashed w-full my-2" />

              <View className="flex-row justify-between mt-2 mb-1">
                <Text className="text-slate-900 text-sm font-black">TOTAL</Text>
                <Text className="text-slate-900 text-sm font-black">
                  Rp {amount.toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View className="p-4 border-t border-slate-100 bg-slate-50">
            <TouchableOpacity className="bg-[#2B4492] py-3.5 rounded-lg items-center mb-2 flex-row justify-center shadow-sm">
              <Feather name="printer" size={16} color="white" />
              <Text className="text-white font-bold text-sm ml-2">
                Print Receipt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} className="py-3 items-center">
              <Text className="text-[#2B4492] font-bold text-sm">
                New Order (Close)
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

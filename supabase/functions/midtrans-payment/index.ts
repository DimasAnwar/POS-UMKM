// Import library dari Deno
import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Wajib ada CORS biar aplikasi React Native bisa nembak API ini tanpa diblokir
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle preflight request dari browser/aplikasi
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Tangkap data keranjang yang dikirim dari pos.tsx
    const payload = await req.json();
    const { order_id, gross_amount, items, customer_details } = payload;

    // 2. Ambil Server Key Midtrans dari Secret Manager Supabase
    const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY");
    if (!MIDTRANS_SERVER_KEY) {
      throw new Error("Midtrans Server Key belum di-setting di Supabase!");
    }

    // 3. Midtrans mewajibkan Server Key di-encode ke Base64 dengan tambahan ":" di belakangnya
    const authString = encode(`${MIDTRANS_SERVER_KEY}:`);

    // 4. Susun format data sesuai aturan Midtrans Snap API
    const midtransPayload = {
      transaction_details: {
        order_id: order_id,
        gross_amount: Math.round(gross_amount), // Pastikan angka bulat
      },
      item_details: items,
      customer_details: customer_details,
    };

    // 5. Tembak API Midtrans (Ini URL Sandbox/Testing. Kalau mau live, hapus tulisan 'sandbox.')
    const midtransRes = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${authString}`,
        },
        body: JSON.stringify(midtransPayload),
      }
    );

    const data = await midtransRes.json();

    // 6. Kembalikan URL pembayaran (redirect_url) ke aplikasi React Native
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
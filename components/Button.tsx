// components/Button.tsx
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
  textClassName?: string;
  rightIcon?: React.ReactNode; // Tambahan properti untuk ikon
}

export default function Button({
  title,
  className = "",
  textClassName = "",
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      // Tambahkan flex-row agar ikon dan teks bisa sejajar menyamping
      className={`bg-primari py-3.5 px-6 rounded-lg flex-row items-center justify-center active:opacity-80 ${className}`}
      {...props}
    >
      <Text
        // Beri margin kanan (mr-2) JIKA ada rightIcon agar tidak terlalu mepet
        className={`text-white font-inter-bold text-base ${rightIcon ? "mr-2" : ""} ${textClassName}`}
      >
        {title}
      </Text>

      {/* Tampilkan ikon jika disisipkan */}
      {rightIcon}
    </TouchableOpacity>
  );
}

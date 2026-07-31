// components/Input.tsx
import React from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void; // Berguna untuk tombol "Show/Hide" password
}

export default function Input({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}: InputProps) {
  return (
    <View className="mb-4">
      {/* Label Text */}
      <Text className="text-secondary font-inter-regular text-xs mb-2">
        {label}
      </Text>

      {/* Input Container */}
      <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-3 bg-white focus:border-primari">
        {/* Left Icon */}
        {leftIcon && <View className="mr-3">{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          className="flex-1 font-inter-regular text-neutral text-sm"
          placeholderTextColor="#9ca3af"
          {...props}
        />

        {/* Right Icon (Bisa diklik jika ada onRightIconPress) */}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress} // Matikan klik jika tidak ada fungsi
            className="ml-2"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

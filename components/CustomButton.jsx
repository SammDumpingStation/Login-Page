import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React from "react";
import { Link } from "expo-router";
import icons from "@/constants/icons";

const CustomButton = ({
  label,
  otherStyles,
  buttonCustomBg,
  textStyle,
  withIcon,
  onPress,
  disabled = false,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`${
        disabled || isLoading ? "bg-[#E4E7EB]" : "bg-[#5CB88F]"
      } h-[57px] rounded-lg relative justify-center items-center flex-row space-x-4 ${otherStyles}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      {withIcon ? (
        <Image source={withIcon} className="h-6 w-6" resizeMode="contain" />
      ) : (
        ""
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#5CB88F" />
      ) : (
        <Text
          className={`text-base font-bold text-center justify-center items-center ${
            textStyle || isLoading ? "text-[#9b9b9b]" : "text-white"
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

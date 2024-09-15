import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import icons from "@/constants/icons";

const CustomButton = ({
  label,
  otherStyles,
  textStyle,
  withIcon,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      className={`bg-black h-[57px] rounded-lg relative justify-center items-center flex-row space-x-4 ${otherStyles}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      {withIcon ? (
        <Image source={withIcon} className="h-6 w-6" resizeMode="contain" />
      ) : (
        ""
      )}
      <Text
        className={`text-white text-base font-bold text-center ${textStyle}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

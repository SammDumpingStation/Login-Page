import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import DarkModeCard from "./DarkModeCard";
import { router } from "expo-router";

const SettingsCard = ({
  icon,
  iconTint,
  iconBg,
  label,
  route = "/profile",
  borderTop = true,
  customStyles
}) => {
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(route)}
      className={`flex-row  border-[#E8E8E8] items-center space-x-4 py-3 ${
        borderTop ? "border-y" : "border-b"
      } ${customStyles}`}
    >
      <View className={`${iconBg} h-10 w-10 rounded-full`}>
        <Image
          source={icon}
          tintColor={iconTint}
          className="h-4 w-4 m-auto"
          resizeMode="contain"
        />
      </View>
      <View className="flex-row items-center justify-between flex-1">
        <Text className="text-lg">{label}</Text>
        <Image
          source={icons.arrow}
          className="h-4 w-4 scale-x-[-1]"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsCard;

import {  Text, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const BackButtonHeader = ({ title }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center mt-2"
      activeOpacity={0.7}
      onPress={() => router.back()}
    >
      <Image
        source={icons.arrow}
        className="w-6 h-6"
        tintColor="#101820"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold flex-1 text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default BackButtonHeader;

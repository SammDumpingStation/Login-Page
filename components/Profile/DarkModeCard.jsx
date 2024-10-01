import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";

const DarkModeCard = () => {
  const [dark, setDark] = useState(false);
  return (
    <View className="flex-row  items-center space-x-4 pb-3">
      <View className="bg-[#B8B8B8] h-10 w-10 rounded-full">
        <Image
          source={icons.darkMode}
          className="h-4 w-4 m-auto"
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setDark(!dark)}
        className="flex-row items-center justify-between flex-1"
      >
        <Text className="text-lg">Dark Mode</Text>
        <View
          className={`w-14 rounded-full p-[2px] ${
            dark ? "bg-[#5CB88F] items-end" : "bg-[#e8e8e8] items-start"
          }`}
        >
          <View className="w-6 h-6 rounded-full bg-white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DarkModeCard;

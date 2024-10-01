import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

const LogOutCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={async () => {
        await supabase.auth.signOut();
        router.replace("/sign-in");
      }}
      className="flex-row border-[#E8E8E8] items-center space-x-4 py-3"
    >
      <View className={`bg-[#E9F5E9] h-10 w-10 rounded-full`}>
        <Image
          source={icons.logout}
          tintColor="#439F48"
          className="h-4 w-4 m-auto"
          resizeMode="contain"
        />
      </View>
      <View className="flex-row items-center justify-between flex-1">
        <Text className="text-lg">Log-Out</Text>
        <Image
          source={icons.arrow}
          className="h-4 w-4 scale-x-[-1]"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default LogOutCard;

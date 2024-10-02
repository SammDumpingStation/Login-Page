import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { Shadow } from "react-native-shadow-2";

const CustomToast = ({ text1, text2 }) => {
  return (
    <View
      className={`h-[75px]  w-[90%] self-stretch rounded-lg border-l-[12px] absolute mx-[5%] top-4 bg-white flex-row items-center ${
        text1 === "Success" ? "border-[#49D663]" : "border-[#FD355A]"
      }`}
    >
      <Image
        source={text1 === "Success" ? icons.check : icons.error}
        className="h-7 w-7 mx-4"
        resizeMode="contain"
      />
      <View className="max-w-[70%]">
        <Text className="text-base font-black">{text1}</Text>
        <Text className="text-[12px] text-[#9b9b9b]">{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default CustomToast;

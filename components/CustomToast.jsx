import { View, Text, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";



const CustomToast = ({ text1, text2 }) => {
  return (
    <View
      className={`h-[75px] w-[90%] mt-3 rounded-lg border-l-[12px] bg-white flex-row items-center ${
        text1 === "Success" ? "border-[#49D663]" : "border-[#FD355A]"
      }`}
    >
      <Image
        source={text1 === "Success" ? icons.check : icons.error}
        className="h-7 w-7 mx-4"
        resizeMode="contain"
      />
      <View>
        <Text className="text-base font-black">{text1}</Text>
        <Text className="text-[12px] text-[#9b9b9b]">{text2}</Text>
      </View>
    </View>
  );
};

export default CustomToast;

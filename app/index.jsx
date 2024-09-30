import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import CustomContainer from "@/components/CustomContainer";
import icons from "@/constants/icons";

const index = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/sign-in");
    }, 3000);
  }, []);

  return (
    <CustomContainer otherStyles="bg-[#5CB88F]">
      <View className=" h-full justify-center items-center flex-row gap-2">
        <Image
          source={icons.logo}
          className="h-24 w-24"
          resizeMode="contain"
          tintColor="#ffffff"
        />
        <View className="items-center">
          <Text className="font-black text-5xl text-white py-1 tracking-[7px]">
            KOSHI
          </Text>
          <Text className="text-white text-[13px] -mt-3 ">
            Helping you pick the right ride
          </Text>
        </View>
      </View>
    </CustomContainer>
  );
};

export default index;


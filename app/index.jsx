import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomContainer from "@/components/CustomContainer";
import CustomButton from "@/components/CustomButton";

const index = () => {
  return (
    <CustomContainer>
      <View className="justify-between h-full pb-[24px]">
        <View className="space-y-4">
          <Text className="font-bold text-[40px] text-center">
            Car Buying,{" "}
            <Text className="text-yellow-500 underline">Simplified</Text>
          </Text>
          <Text className="text-center text-xl">
            Compare prices on new & used cars from official dealers across the
            Philippines
          </Text>
        </View>
        <View>
          <Text className="text-[#9b9b9b] text-[14px] text-center mb-4">
            Explore, compare and find the perfect car.
          </Text>
          <CustomButton
            label="Get Started"
            otherStyles="bg-black"
            onPress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
      </View>
    </CustomContainer>
  );
};

export default index;

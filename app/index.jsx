import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, router } from "expo-router";
import CustomContainer from "@/components/CustomContainer";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomLoadingSpinner from "@/components/CustomLoadingSpinner";
import CustomModal from "@/components/CustomModal";

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      setModalVisible(true);
      const timer = setTimeout(() => {
        setModalVisible(false);
        router.replace("/home");
      }, 3500);

      // Cleanup function
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoggedIn]);
  return (
    <CustomContainer>
      <CustomLoadingSpinner
        isLoading={isLoading}
        customText="Checking if you have logged in before."
      />
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
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            status={!isLoading}
            customRoute="/home"
            label="Log-in"
          />
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

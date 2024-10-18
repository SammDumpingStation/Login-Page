import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SkypeIndicator } from "react-native-indicators";
import Modal from "react-native-modal";
import icons from "../../constants/icons";

const LoadingModal = ({
  label = "Saving Your Changes...",
  loadingModal,
}) => {
  return (
    <Modal
      isVisible={loadingModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.3}
      hideModalContentWhileAnimating={true}
      className="m-0"
      useNativeDriver={true}
    >
      <View className="flex-1 relative">
        <View className="bg-white m-auto items-center justify-center p-8 rounded-3xl">
          <Image
            source={icons.logo}
            className="h-16 w-16 mb-8 -mt-2"
            resizeMode="contain"
            tintColor="#5CB88F"
          />
          <SkypeIndicator size={35} color="#5CB88F" />
          <Text className="text-lg font-bold mt-12 ">{label}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

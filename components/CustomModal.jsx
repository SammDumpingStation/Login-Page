import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../constants/icons";
import { router } from "expo-router";

const CustomModal = ({
  modalVisible,
  setModalVisible,
  label,
  status,
  customMessage = "",
  customRoute,
}) => {
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View className="bg-[#00000040] flex-1">
        <View className="bg-white m-auto w-64 h-64 justify-between p-4 pt-8 rounded-xl">
          <View className="items-center space-y-4">
            <Image
              source={status ? icons.check : icons.error}
              className="w-12 h-12"
              resizeMode="contain"
            />

            <Text className="text-2xl font-black text-center">
              {customMessage
                ? customMessage
                : status
                ? `${label} \n Successful!`
                : "Something went wrong."}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-[#5CB88F] py-2 rounded-lg"
            onPress={() => {
              if (customRoute) {
                router.replace(customRoute);
              }
              setModalVisible(!modalVisible);
            }}
          >
            <Text className="text-center text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

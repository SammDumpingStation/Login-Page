import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../constants/icons";
import { router } from "expo-router";

const CustomModal = ({
  modalVisible,
  setModalVisible,
  status,
  customRoute,
  title
}) => {
  
  return (
    
    <Modal visible={modalVisible} transparent animationType="fade">
      <View className="bg-[#00000040] flex-1">
        <View className="bg-white m-auto w-72 justify-between p-4 pt-8 rounded-xl space-y-12">
          <View className="items-center space-y-2">
            <Image
              source={status ? icons.check : icons.error}
              className="w-12 h-12"
              resizeMode="contain"
            />

            <Text className="text-2xl font-black text-center">
              {title}
            </Text>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#5CB88F] py-2 rounded-lg flex-1"
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
      </View>
    </Modal>
  );
};

export default CustomModal;

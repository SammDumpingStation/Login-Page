import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../constants/icons";
import Spinner from "react-native-loading-spinner-overlay";


const CustomModal = ({ modalVisible, setModalVisible, label, status }) => {
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
            
            <Text className="text-2xl font-black">{status ? `${label} Successful!` : 'Something went wrong.'}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-[#5CB88F] py-2 rounded-lg"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-center text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

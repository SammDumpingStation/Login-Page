import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { logOut } from "../../lib/supabase";
import Modal from "react-native-modal";

const LogOutModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      isVisible={modalVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.3}
      hideModalContentWhileAnimating={true}
      onBackdropPress={() => setModalVisible(!modalVisible)}
      className="m-0"
      useNativeDriver={true}
    >
      <View className="flex-1">
        <View className="bg-white m-auto w-72 justify-between p-4 pt-8 rounded-xl space-y-12">
          <View className="items-center space-y-2">
            <Image
              source={icons.logout}
              tintColor="#439F48"
              className="w-12 h-12"
              resizeMode="contain"
            />

            <Text className="text-2xl font-black text-center">
              Are you sure you want to Log-out?
            </Text>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className=" py-2 rounded-lg flex-1 border border-[#F34336]"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#5CB88F] py-2 rounded-lg flex-1"
              onPress={async () => {
                await logOut();
                router.replace("/sign-in");
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

export default LogOutModal;

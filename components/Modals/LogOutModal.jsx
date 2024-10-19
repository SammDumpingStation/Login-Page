import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import { router } from "expo-router";
import { logOut } from "../../lib/supabase";
import Modal from "react-native-modal";
import LoadingModal from "./LoadingModal";

const LogOutModal = ({ modalVisible, setModalVisible }) => {
  const [databaseError, setDatabaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const onLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await logOut();
      if (error) {
        // Properly check if there's an error from Supabase
        setDatabaseError(
          error.message || "Failed to log out. Please try again."
        );
      } else {
        // No error, proceed with the router and modal
        router.replace("/sign-in");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setDatabaseError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
      <LoadingModal loadingModal={isLoading} label="Logging you out..." />
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

          <View className="flex-row border-t border-[#E5E4E2]">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 pt-4"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-center text-[#F34336]">Cancel</Text>
            </TouchableOpacity>
            <View className="border-r border-[#E5E4E2] mt-2 -mb-2" />

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 pt-4"
              onPress={onLogout}
            >
              <Text className="text-center text-[#5CB88F]">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogOutModal;

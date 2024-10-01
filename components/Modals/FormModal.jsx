import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import icons from "../../constants/icons";
import FormInput from '../FormInput'
const FormModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="bg-[#00000040] flex-1">
        <View className="bg-white m-auto w-[90%] p-4 rounded-xl">
          <View className="items-center space-x-2 flex-row">
            <Image
              source={icons.logo}
              tintColor="#000"
              className="w-10 h-10"
              resizeMode="contain"
            />

            <Text className="text-lg text-center">
              Complete your details below
            </Text>
          </View>

          <View className="mb-12">
            <FormInput placeholder="Username" />
            <FormInput placeholder="Email"/>
            <FormInput placeholder="Phone Number" />
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

export default FormModal;

import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import FormInput from "../FormInput";
import { checkInput } from "../../utils/check-form-input";
import toast from "@/utils/toast-message";

const FormModal = ({ modalVisible, setModalVisible, user }) => {
  const [error, setError] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: 0,
    avatar: "",
  });
  const setData = (key, value) => {
    setError((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="bg-[#00000040] flex-1">
        <View className="bg-white m-auto w-[90%] p-4 rounded-xl">
          <View className="items-center space-x-2 flex-row">
            <Image
              source={icons.logo}
              tintColor="#5CB88F"
              className="w-10 h-10"
              resizeMode="contain"
            />

            <Text className="text-lg text-center">
              Complete your details below
            </Text>
          </View>

          <View className="mb-12">
            <FormInput
              placeholder="Username"
              value={formData.name}
              errorMessage={error.name}
              onBlur={() =>
                checkInput(formData.name, "default", error.name, setError)
              }
              onChangeValue={(text) => setData("name", text)}
              onError={(text) => setData(error.name, text)}
            />
            <FormInput
              placeholder="Email"
              value={formData.email}
              errorMessage={error.email}
              onBlur={() =>
                checkInput(formData.email, "default", error.email, setError)
              }
              onChangeValue={(text) => setData("email", text)}
              onError={(text) => setData(error.email, text)}
            />
            <FormInput
              placeholder="Phone Number"
              value={formData.phoneNumber}
              errorMessage={error.phoneNumber}
              onBlur={() =>
                checkInput(
                  formData.phoneNumber,
                  "default",
                  error.phoneNumber,
                  setError
                )
              }
              onChangeValue={(text) => setData("phoneNumber", text)}
              onError={(text) => setData(error.phoneNumber, text)}
            />
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
              onPress={() => {
                checkInput(formData.name, "default", error.name, setError);
                checkInput(formData.email, "default", error.email, setError);
                checkInput(
                  formData.phoneNumber,
                  "default",
                  error.phoneNumber,
                  setError
                );
                const hasErrors =
                  error.name || error.email || error.phoneNumber;
                // this if statement checks if any of our input fields are empty, if they are, this will return true and will show a toast and an error message
                const isEmpty =
                  !formData.name || !formData.email || !formData.phoneNumber;

                if (hasErrors || isEmpty) {
                  toast.showToast({ success: false });
                  return;
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

export default FormModal;

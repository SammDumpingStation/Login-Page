import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import FormInput from "../FormInput";
import { updateUser } from "../../lib/supabase";

const FormModal = ({ modalVisible, setModalVisible, user }) => {
  const [error, setError] = useState({
    name: "",
    email: "",
    phone_number: "",
    avatar: "",
  });

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
    avatar: "",
  });
  const setData = (key, value, setter) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="bg-[#00000040] flex-1 relative">
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
              placeholder="Full Name"
              value={formData.name}
              errorMessage={error.name}
              onBlur={() =>
                checkInput(formData.name, "default", "name", setError)
              }
              onChangeValue={(text) => setData("name", text, setFormData)}
              onError={(text) => setData("name", text, setError)}
              sampleMessage="ex. John Doe"
            />
            <FormInput
              label="email"
              placeholder="Email"
              value={formData.email}
              errorMessage={error.email}
              onBlur={() =>
                checkInput(formData.email, "email", "email", setError)
              }
              onChangeValue={(text) => setData("email", text, setFormData)}
              onError={(text) => setData("email", text, setError)}
              sampleMessage="ex. example@email.com"
            />
            <FormInput
              label="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              errorMessage={error.phone_number}
              onBlur={() =>
                checkInput(
                  formData.phone_number,
                  "phone_number",
                  "phone_number",
                  setError
                )
              }
              onChangeValue={(text) =>
                setData("phone_number", text, setFormData)
              }
              onError={(text) => setData("phone_number", text, setError)}
              sampleMessage="ex. 09123456789"
            />
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className=" py-2 rounded-lg flex-1 border border-[#F34336]"
              onPress={() => {
                setFormData({
                  name: user.name,
                  email: user.email,
                  phone_number: 0,
                  avatar: "",
                });
                setError({
                  name: "",
                  email: "",
                  phone_number: "",
                  avatar: "",
                });
                setModalVisible(!modalVisible);
              }}
            >
              <Text className="text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#5CB88F] py-2 rounded-lg flex-1"
              onPress={() => {
                checkInput(formData.name, "default", "name", setError);
                checkInput(formData.email, "email", "email", setError);
                checkInput(
                  formData.phone_number,
                  "phone_number",
                  "phone_number",
                  setError
                );
                const hasErrors =
                  error.name || error.email || error.phone_number;
                // this if statement checks if any of our input fields are empty, if they are, this will return true and will show a toast and an error message
                const isEmpty =
                  !formData.name || !formData.email || !formData.phone_number;

                if (hasErrors || isEmpty) {
                  return;
                }
                updateUser(user.id, formData);
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

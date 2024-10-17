import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import FormInput from "../FormInput";
import { updateUser } from "../../lib/supabase";
import { Controller, useForm } from "react-hook-form";
import { updateUserSchema } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "../../context/UserContext";
import ErrorMessage from "../ErrorMessage";

const FormModal = ({ modalVisible, setModalVisible }) => {
  const { user } = useUserContext();
  const [databaseError, setDatabaseError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
    mode: "all",
    defaultValues: {
      fullName: user.name,
      email: user.email,
      phoneNumber: user.phone_number,
    },
  });

  const onCancel = () => {
    setModalVisible(!modalVisible);
    reset({
      fullName: user.name,
      email: user.email,
      phoneNumber: user.phone_number,
    });
  };

  const onSubmit = async (data) => {
    const { data: user, error } = await updateUser(user.id, data);

    if (error) {
      setDatabaseError(error.message); // Set the error message to display
    } else {
      setModalVisible(!modalVisible); // Close modal on success
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View className="bg-[#00000040] flex-1 relative">
        <View className="bg-white m-auto w-[90%] p-4 rounded-xl">
          <View className="items-center space-x-2 flex-row ">
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
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder="Full Name"
                  value={value}
                  errorMessage={errors.fullName ? errors.fullName.message : ""} // Use formState's errors
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="email"
                  placeholder="Email"
                  value={value}
                  errorMessage={errors.email ? errors.email.message : ""} // Use formState's errors
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="phone_number"
                  placeholder="Phone Number"
                  value={value}
                  errorMessage={
                    errors.phoneNumber ? errors.phoneNumber.message : ""
                  } // Use formState's errors
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
            <ErrorMessage value={databaseError} />
          </View>

          <View className="flex-row border-t pt-4 border-[#ececec]">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 "
              onPress={onCancel}
            >
              <Text className="text-center text-[#F34336]">Cancel</Text>
            </TouchableOpacity>
            <View className="border-r border-[#ececec]" />
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 "
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-center text-[#5CB88F]">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;

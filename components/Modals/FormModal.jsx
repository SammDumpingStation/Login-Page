import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icons";
import FormInput from "../FormInput";
import { updateUser } from "../../lib/supabase";
import { Controller, useForm } from "react-hook-form";
import { updateUserSchema } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "../../context/UserContext";
import ErrorMessage from "../ErrorMessage";
import LoadingModal from "./LoadingModal";
import Modal from "react-native-modal";

const FormModal = ({ modalVisible, setModalVisible }) => {
  const { user, setUser } = useUserContext();
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
      phoneNumber: user.phone_number,
    },
  });

  const onCancel = () => {
    setModalVisible(!modalVisible);
    setDatabaseError("");
    reset({
      fullName: user.name,
      phoneNumber: user.phone_number,
    });
  };

  const onSubmit = async (data) => {
    const { data: userData, error } = await updateUser(user.id, data);

    if (error) {
      setDatabaseError(error.message); // Set the error message to display
    } else {
      setUser(userData); // Debug the returned data
      setModalVisible(!modalVisible); // Close modal on success
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
      <LoadingModal loadingModal={isSubmitting} />
      <View className="relative">
        <View className="bg-white m-auto w-[90%] p-4 rounded-xl">
          <View className="items-center space-x-2 flex-row">
            <View className="items-center flex-1">
              <Text className="text-2xl font-black text-center">
                Update Details
              </Text>
            </View>
          </View>

          <View className="mb-12">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeholder="Full Name"
                  value={value}
                  errorMessage={errors.fullName ? errors.fullName.message : ""}
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
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
            <ErrorMessage value={databaseError} />
          </View>

          <View className="flex-row border-t border-[#E5E4E2]">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 pt-4"
              onPress={onCancel}
            >
              <Text className="text-center text-[#F34336]">Cancel</Text>
            </TouchableOpacity>
            <View className="border-r border-[#E5E4E2] mt-2 -mb-2" />

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1 pt-4"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-center text-[#5CB88F]">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;

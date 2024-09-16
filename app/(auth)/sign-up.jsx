import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FormValidation from "@/components/FormValidation";
import validationLogic from "@/utils/validation-logic";
import resetInput from "@/utils/reset-input";

const SignUp = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPwd: "",
  });
  const [formValidation, setFormValidation] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (formData.name.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        name: "",
      }));
    }
    if (formData.username.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        username: "",
      }));
    }
    if (formData.email.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        email: "",
      }));
    }
    if (formData.password.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [formData.name, formData.email, formData.username, formData.password]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CustomContainer scroll={true} otherStyles="bg-[#5CB88F] px-0">
      <Text className="mt-2 mb-14 text-[40px] text-white font-black px-4">
        Sign Up
      </Text>

      <View className="pb-4 px-4 pt-8 space-y-2 rounded-tl-3xl rounded-tr-3xl bg-white">
        <Text className="text-2xl font-black">Create an Account</Text>
        <Text className="text-base text-[#9b9b9b]">
          Please provide your details
        </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white px-4  flex-1 "
      >
        <FormInput
          placeholder="Full Name"
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
          validation={formValidation.name}
          value={formData.name}
        />
        <FormValidation value={formValidation.name} />
        <FormInput
          placeholder="Username"
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, username: text }))
          }
          validation={formValidation.username}
          value={formData.username}
        />
        <FormValidation value={formValidation.username} />
        <FormInput
          placeholder="Email"
          email={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          validation={formValidation.email}
          value={formData.email}
        />
        <FormValidation value={formValidation.email} />
        <FormInput
          placeholder="Password"
          password={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          validation={formValidation.password}
          value={formData.password}
        />
        <FormValidation value={formValidation.password} />
        <FormInput
          placeholder="Confirm Password"
          password={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, confirmPwd: text }))
          }
          value={formData.confirmPwd}
        />

        <View className="bg-white flex-1 px-4">
          <View className="flex-row mb-8 mt-4">
            <BouncyCheckbox
              isChecked={isCheck}
              onPress={() => setIsCheck(!isCheck)}
              innerIconStyle={{
                borderRadius: 0,
              }}
              iconStyle={{
                borderRadius: 0,
              }}
              size={16}
              className="-ml-4"
              fillColor={isCheck ? "#5CB88F" : "#9b9b9b"}
            />
            <TouchableOpacity
              className="text-[#9b9b9b]"
              activeOpacity={0.7}
              onPress={() => setIsCheck(!isCheck)}
            >
              <Text
                className={`text-base ${
                  isCheck ? "text-[#5CB88F]" : "text-[#9b9b9b]"
                }`}
              >
                Agree to terms & conditions
              </Text>
            </TouchableOpacity>
          </View>

          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <CustomButton
            label="Create Account"
            otherStyles="mb-6"
            onPress={() => {
              Keyboard.dismiss();
              const name = validationLogic.validate(formData.name);
              const username = validationLogic.validate(formData.username);
              const email = validationLogic.validate(formData.email, {
                email: true,
              });
              const password = validationLogic.validate(formData.password, {
                password: true,
              });

              if (name || username || email || password) {
                setFormValidation((prev) => ({
                  ...prev,
                  name: name,
                  username: username,
                  email: email,
                  password: password,
                }));

                return;
              }

              setModalVisible(!modalVisible);
              setTimeout(() => {
                setModalVisible(false);
                router.push("/sign-in");
              }, 3500);
              setFormData(resetInput("register"));
              setFormValidation(resetInput("register"));
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomContainer>
  );
};

export default SignUp;

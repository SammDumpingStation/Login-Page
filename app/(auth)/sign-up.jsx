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
import validationLogic from "@/utils/validation-logic";
import resetInput from "@/utils/reset-input";
import toast from "@/utils/toast-message";

const SignUp = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [isMatchedPwd, setIsMatchedPwd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
  });
  const [formValidation, setFormValidation] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
  });

  useEffect(() => {
    formData.password === formData.confirmPwd
      ? setIsMatchedPwd(true)
      : setIsMatchedPwd(false);
  }, [formData.password, formData.confirmPwd]);

  const setData = (key, value, setState) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

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
          validation={formValidation.name}
          value={formData.name}
          onChangeValue={(text) => setData("name", text, setFormData)}
          onChangeValidation={(text) =>
            setData("name", text, setFormValidation)
          }
        />
        <FormInput
          placeholder="Email"
          label="email"
          validation={formValidation.email}
          value={formData.email}
          onChangeValue={(text) => setData("email", text, setFormData)}
          onChangeValidation={(text) =>
            setData("email", text, setFormValidation)
          }
        />
        <FormInput
          placeholder="Password"
          label="password"
          validation={formValidation.password}
          value={formData.password}
          onChangeValue={(text) => setData("password", text, setFormData)}
          onChangeValidation={(text) =>
            setData("password", text, setFormValidation)
          }
        />
        <FormInput
          placeholder="Confirm Password"
          label="password"
          value={formData.confirmPwd}
          validation={formValidation.confirmPwd}
          onChangeValue={(text) => setData("confirmPwd", text, setFormData)}
          onChangeValidation={(text) =>
            setData("confirmPwd", text, setFormValidation)
          }
        />

        <View className="bg-white flex-1">
          <View className="flex-row mb-8 mt-3 ml-1">
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
              className=""
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
            label="Registration"
          />

          <CustomButton
            label="Create Account"
            otherStyles={`mb-6 ${!isCheck ? "bg-[#E4E7EB]" : ""}`}
            textStyle={!isCheck ? "text-[#9b9b9b]" : ""}
            disabled={!isCheck ? true : false}
            onPress={() => {
              toast.hide();
              Keyboard.dismiss();
              const name = validationLogic.validate(formData.name);
              const email = validationLogic.validate(formData.email, {
                email: true,
              });
              const password = validationLogic.validate(formData.password, {
                password: true,
              });

              if (name || email || password) {
                setFormValidation((prev) => ({
                  ...prev,
                  name: name,
                  email: email,
                  password: password,
                }));
                toast.showToast({ success: false });
                return;
              }
              if (!isMatchedPwd) {
                toast.showToast({
                  success: false,
                  customMessage: "Please match your passwords",
                });
                return setFormValidation((prev) => ({
                  ...prev,
                  confirmPwd: "Please match your passwords",
                }));
              }

              setModalVisible(!modalVisible);
              setTimeout(() => {
                setModalVisible(false);
                router.push("/sign-in");
              }, 3500);
              setFormData(resetInput("register"));
              setFormValidation(resetInput("register"));
              toast.showToast({ type: "login" });
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomContainer>
  );
};

export default SignUp;

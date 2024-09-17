import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import { useState } from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";
import validationLogic from "../../utils/validation-logic";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import resetInput from "@/utils/reset-input";
import Toast from "react-native-toast-message";
import toast from "@/utils/toast-message";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    emailValidation: "",
    password: "",
    passwordValidation: "",
  });

  const setData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const checkInput = (data, type) => {
    const value = validationLogic.validate(data, type);
    let inputType = "";
    type === "email"
      ? (inputType = "emailValidation")
      : (inputType = "passwordValidation");
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [inputType]: value,
      }));
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CustomContainer scroll={true} otherStyles="bg-[#5CB88F] px-0">
      <Text className="mt-2 mb-14 text-[40px] text-white font-black px-4">
        Sign In
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white px-4 pt-8 rounded-tl-3xl rounded-tr-3xl flex-1"
      >
        <View className="mb-4 space-y-2">
          <Text className="text-2xl font-black">Welcome Back!</Text>
          <Text className="text-base text-[#9b9b9b]">
            Please Log-in your credentials
          </Text>
        </View>
        <FormInput
          label="email"
          onBlur={() => checkInput(formData.email, "email")}
          placeholder="Email"
          validation={formData.emailValidation}
          value={formData.email}
          onChangeValue={(text) => setData("email", text)}
          onChangeValidation={(text) => setData("emailValidation", text)}
        />

        <FormInput
          label="password"
          onBlur={() => checkInput(formData.password, "password")}
          placeholder="Password"
          validation={formData.passwordValidation}
          value={formData.password}
          onChangeValue={(text) => setData("password", text)}
          onChangeValidation={(text) => setData("passwordValidation", text)}
        />
        <View className="pb-8 pt-4">
          <Text className="text-[#9b9b9b] text-right">Forgot Password?</Text>
        </View>
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          label="Log-in"
        />

        <CustomButton
          label="Log-in"
          onPress={() => {
            Keyboard.dismiss();
            checkInput(formData.email, "email");
            checkInput(formData.email, "password");
            if (
              formData.emailValidation ||
              formData.passwordValidation ||
              formData.email.length === 0 ||
              formData.password.length === 0
            ) {
              toast.showToast({ success: false });
              return;
            }
            setModalVisible(!modalVisible);
            setTimeout(() => {
              setModalVisible(false);
            }, 3500);
            setFormData(resetInput("login"));
            toast.showToast({ type: "login" });
          }}
        />
      </KeyboardAvoidingView>

      <View className="bg-white px-4 flex-1">
        <View className="flex-row space-x-2  items-center my-8">
          <View className="w-full flex-1 border-t border-[#EBECEE] max-h-[1px]"></View>
          <Text className="text-[#9b9b9b] text-center">OR CONTINUE WITH</Text>
          <View className="w-full flex-1 border-t border-[#EBECEE] max-h-[1px] "></View>
        </View>
        <View className=" justify-between mb-6">
          <CustomButton
            label="Continue with Google"
            otherStyles="bg-[#E4E7EB]"
            textStyle="text-[#9b9b9b]"
            withIcon={icons.googleIcon}
            disabled={true}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Toast.hide();
              router.push("/sign-up");
            }}
          >
            <Text className="text-center mt-8 text-base text-[#5CB88F] font-bold">
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomContainer>
  );
};

export default SignIn;

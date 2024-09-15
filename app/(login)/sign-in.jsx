import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
  Keyboard,
} from "react-native";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import validationLogic from "../../utils/validation-logic";
import CustomButton from "@/components/CustomButton";
import FormValidation from "@/components/FormValidation";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formValidation, setFormValidation] = useState({
    username: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (formData.username.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        username: "",
      }));
    }
    if (formData.password.length === 0) {
      setFormValidation((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [formData.username, formData.password]);

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
          placeholder="Username or Email"
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, username: text }))
          }
          email={true}
          validation={
            formData.username === ""
              ? false
              : formValidation.username
              ? true
              : false
          }
          value={formData.username}
        />
        <FormValidation value={formValidation.username} />

        <FormInput
          placeholder="Password"
          password={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          validation={
            formData.password === ""
              ? false
              : formValidation.password
              ? true
              : false
          }
          value={formData.password}
        />
        <FormValidation value={formValidation.password} />
        <View className="pb-8 pt-4">
          <Text className="text-[#9b9b9b] text-right">Forgot Password?</Text>
        </View>
        <Modal visible={modalVisible} transparent animationType="fade">
          <View className="bg-[#9b9b9b]/50 flex-1">
            <View className="bg-white m-auto w-64 h-64 justify-between p-4 pt-8 rounded-xl">
              <View className="items-center space-y-4">
                <Image
                  source={icons.check}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="text-2xl font-black">Login Successful!</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-[#5CB88F] py-2 rounded-lg"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-center text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <CustomButton
          label="Log-in"
          onPress={() => {
            Keyboard.dismiss();
            const username = validationLogic.validate(formData.username, {
              email: true,
            });
            const password = validationLogic.validate(formData.password, {
              password: true,
            });
            if (username || password) {
              setFormValidation((prev) => ({
                ...prev,
                username: username,
                password: password,
              }));
              return;
            }
            setModalVisible(!modalVisible);
            setTimeout(() => {
              setModalVisible(false);
            }, 3500);
            setFormData({ 
              username: "", 
              password: "" });
            setFormValidation({
              username: "",
              password: "",
            });
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
            onPress={() => router.push("/sign-up")}
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

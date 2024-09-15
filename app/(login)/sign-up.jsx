import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FormValidation from "@/components/FormValidation";

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

  return (
    <CustomContainer scroll={true} otherStyles="bg-[#5CB88F] px-0">
      <Text className="mt-2 mb-14 text-[40px] text-white font-black px-4">
        Sign Up
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-white px-4 pt-8 rounded-tl-3xl flex-1 rounded-tr-3xl"
      >
        <View className="mb-4 space-y-2">
          <Text className="text-2xl font-black">Create an Account</Text>
          <Text className="text-base text-[#9b9b9b]">
            Please provide your details
          </Text>
        </View>
        <FormInput
          placeholder="Full Name"
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, name: text }))
          }
        />
        <FormValidation value={formValidation.name} />
        <FormInput
          placeholder="Username"
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, username: text }))
          }
        />
        <FormValidation value="" />
        <FormInput
          placeholder="Email"
          email={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />
        <FormValidation value={formValidation.email} />
        <FormInput
          placeholder="Password"
          password={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
        />
        <FormValidation value={formValidation.password} />
        <FormInput
          placeholder="Confirm Password"
          password={true}
          onChangeValue={(text) =>
            setFormData((prev) => ({ ...prev, confirmPwd: text }))
          }
        />

        <View className="flex-row my-8">
          <BouncyCheckbox
            isChecked={isCheck}
            innerIconStyle={{
              borderRadius: 0,
            }}
            iconStyle={{
              borderRadius: 0,
            }}
            size={20}
            fillColor="#5CB88F"
          />
          <TouchableOpacity
            className="text-[#9b9b9b] h-full "
            activeOpacity={0.7}
            onPress={() => setIsCheck(!isCheck)}
          >
            <Text>Agree to terms & conditions</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          label="Create Account"
          otherStyles="mb-6"
          onPress={() => router.push("/sign-in")}
        />
      </KeyboardAvoidingView>
    </CustomContainer>
  );
};

export default SignUp;

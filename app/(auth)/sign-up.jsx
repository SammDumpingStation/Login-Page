import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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
import CustomLoadingSpinner from "@/components/CustomLoadingSpinner";
import { createUser } from "../../lib/supabase";
import { useUserContext } from "../../context/UserContext";

const SignUp = () => {
  const { setAuthId } = useUserContext();
  const [isCheck, setIsCheck] = useState(false);
  const [isMatchedPwd, setIsMatchedPwd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPwdError: "",
  });

  //constantly checks the password and confirm password if they matched each other if not, it will display an error message
  useEffect(() => {
    formData.password === formData.confirmPwd
      ? setIsMatchedPwd(true)
      : setIsMatchedPwd(false);
  }, [formData.password, formData.confirmPwd]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalVisible) {
        setModalVisible(false);
        router.replace("/home");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [modalVisible]);

  //since we are setting data constantly (more often in the validation part), we have simplified the process and this expects a value of key (ex. email) and value (ex. the input value text)
  const setData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  //Checks the input of our form if it qualifies the simple validation we made located in "@/utils/validation-logic" and then updates the validation text depending on what is returned from the validation-logic file
  const checkInput = (data, { type = "default", errorType }) => {
    const value = validationLogic.validate(data, type);
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [errorType]: value,
      }));
    }
  };

  //this function runs if all the things are successful or not and it will show us a green modal if successful, a red modal if not and a toast too
  const isSuccess = (success) => {
    if (success) {
      setIsSuccessful(true);
      setFormData(resetInput("register"));
    } else {
      toast.showToast({
        success: false,
        customMessage: "Something Went Wrong, Please try again!",
      });
    }
    setModalVisible(!modalVisible);
  };

  //this is the overall logic of the sign in user
  const signUpUser = async () => {
    //check input if the said input passes our basic validation
    checkInput(formData.name, { errorType: "nameError" });
    checkInput(formData.email, {
      type: "email",
      errorType: "emailError",
    });
    checkInput(formData.password, {
      type: "password",
      errorType: "passwordError",
    });
    checkInput(formData.confirmPwd, {
      errorType: "confirmPwdError",
    });
    //checks if there is errors in our input (the red text in our app) if there is, then it will prompt that we have to double check
    const hasErrors =
      formData.nameError ||
      formData.emailError ||
      formData.passwordError ||
      formData.confirmPwdError;
    // this if statement checks if any of our input fields are empty, if they are, this will return true and will show a toast and an error message
    const isEmpty =
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPwd;

    if (hasErrors || isEmpty) {
      toast.showToast({ success: false });
      return;
    }
    //if there is no error, it will proceed to signing in the user
    try {
      setIsLoading(true);
      const session = await createUser(
        formData.email,
        formData.password,
        formData.name
      );
      //set global state
      if (session && session.user) {
        const authUserId = session.user.id; // Get the Auth ID from the session
        setAuthId(authUserId); // Set the Auth ID in the context
        isSuccess(true);
      } else {
        // Handle the case where sign-in was successful but no user data is returned
        console.error("No user data returned after sign-in");
        isSuccess(false);
      }
    } catch (error) {
      console.log(error);
      isSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomContainer
      scroll={true}
      otherStyles="bg-[#5CB88F] px-0"
      pb={false}
      ph={false}
    >
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        status={isSuccessful}
        title="Registered Successfully!"
        customRoute={"/home"}
      />
      <CustomLoadingSpinner isLoading={isLoading} label="register" />
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
          value={formData.name}
          errorMessage={formData.nameError}
          onBlur={() => checkInput(formData.name, { errorType: "nameError" })}
          onChangeValue={(text) => setData("name", text)}
          onError={(text) => setData("nameError", text)}
        />
        <FormInput
          label="email"
          placeholder="Email"
          value={formData.email}
          errorMessage={formData.emailError}
          onBlur={() =>
            checkInput(formData.email, {
              type: "email",
              errorType: "emailError",
            })
          }
          onChangeValue={(text) => setData("email", text)}
          onError={(text) => setData("emailError", text)}
        />
        <FormInput
          label="password"
          placeholder="Password"
          value={formData.password}
          errorMessage={formData.passwordError}
          onBlur={() =>
            checkInput(formData.password, {
              type: "password",
              errorType: "passwordError",
            })
          }
          onChangeValue={(text) => setData("password", text)}
          onError={(text) => setData("passwordError", text)}
        />

        <FormInput
          label="password"
          placeholder="Confirm Password"
          value={formData.confirmPwd}
          errorMessage={formData.confirmPwdError}
          onBlur={() => {
            checkInput(formData.confirmPwd, {
              errorType: "confirmPwdError",
            });
            if (!isMatchedPwd) {
              return setFormData((prev) => ({
                ...prev,
                confirmPwdError: "Passwords do not match. Please try again.",
              }));
            }
          }}
          onChangeValue={(text) => setData("confirmPwd", text)}
          onError={(text) => setData("confirmPwdError", text)}
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

          <CustomButton
            label="Create Account"
            otherStyles={`mb-6`}
            buttonCustomBg={!isCheck}
            textStyle={!isCheck}
            disabled={!isCheck ? true : false}
            onPress={signUpUser}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomContainer>
  );
};

export default SignUp;

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
import { useEffect, useState } from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";
import validationLogic from "../../utils/validation-logic";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import resetInput from "@/utils/reset-input";
import toast from "@/utils/toast-message";
import CustomLoadingSpinner from "@/components/CustomLoadingSpinner";
import Toast from "react-native-toast-message";
import { signInUser } from "@/lib/supabase";
import { useUserContext } from "../../context/UserContext";

const SignIn = () => {
  const { authId, setAuthId } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const setData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const isSuccess = (success) => {
    if (success) {
      setIsSuccessful(true);
      setFormData(resetInput("login"));
    } else {
      toast.showToast({
        success: false,
        customMessage: "Something Went Wrong, Please try again!",
      });
    }
    setModalVisible(!modalVisible);
  };

  const checkInput = (data, type) => {
    const value = validationLogic.validate(data, type);
    let errorType = "";
    type === "email"
      ? (errorType = "emailError")
      : (errorType = "passwordError");
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [errorType]: value,
      }));
    }
  };

  const signInWithEmail = async () => {
    Keyboard.dismiss();
    checkInput(formData.email, "email");
    checkInput(formData.password, "password");
    const hasErrors = formData.emailError || formData.passwordError;
    const isEmpty = !formData.email || !formData.password;

    if (hasErrors || isEmpty) {
      toast.showToast({ success: false });
      return;
    }
    try {
      setIsLoading(true);
      const session = await signInUser(formData.email, formData.password);

      //set the context we made
      if (session && session.user) {
        const authUserId = session.user.id; // Get the Auth ID from the session
        setAuthId(authUserId); // Set the Auth ID in the context
        if (authId && authId != null) {
          isSuccess(true);
        }
      } else {
        // Handle the case where sign-in was successful but no user data is returned
        console.error("No user data returned after sign-in");
        isSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setData(
        "emailError",
        "Email or Password is incorrect, Please Try Again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomContainer
      scroll={true}
      otherStyles="bg-[#5CB88F]"
      pb={false}
      ph={false}
    >
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        status={isSuccessful}
        title="Log-in Successfully!"
        customRoute={"/home"}
      />
      <CustomLoadingSpinner isLoading={isLoading} label="register" />
      <Text className="mt-2 px-4 mb-14 text-[40px] text-white font-black">
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
          placeholder="Email"
          value={formData.email}
          errorMessage={formData.emailError}
          onBlur={() => checkInput(formData.email, "email")}
          onChangeValue={(text) => setData("email", text)}
          onError={(text) => setData("emailError", text)}
        />

        <FormInput
          label="password"
          placeholder="Password"
          value={formData.password}
          errorMessage={formData.passwordError}
          onBlur={() => checkInput(formData.password, "password")}
          onChangeValue={(text) => setData("password", text)}
          onError={(text) => setData("passwordError", text)}
        />
        <View className="pb-8 pt-4">
          <Text className="text-[#9b9b9b] text-right">Forgot Password?</Text>
        </View>

        <CustomButton label="Log-in" onPress={signInWithEmail} />
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

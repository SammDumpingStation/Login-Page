import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from "react-native";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import icons from "@/constants/icons";
import validate from "../../utils/validation-logic";
import validationLogic from "../../utils/validation-logic";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (username.length === 0) {
      setUsernameValidation('');
    }
    if (password.length === 0) {
      setPasswordValidation('');
    }
  }, [username, password]);

  return (
    <CustomContainer scroll={true} otherStyles="bg-[#5CB88F] px-0 flex-1">
      <Text className="mt-2 mb-14 text-[40px] text-white font-black px-4">
        Sign In
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        className="bg-white flex-1 px-4 pt-8 rounded-tl-3xl rounded-tr-3xl"
      >
        <View className="mb-4 space-y-2">
          <Text className="text-2xl font-black">Welcome Back!</Text>
          <Text className="text-base">Please Log-in your credentials</Text>
        </View>
        <FormInput
          placeholder="Username or Email"
          onChangeValue={(text) => setUsername(text)}
          email={true}
          validation={
            username === "" ? false : usernameValidation ? true : false
          }
          value={username}
        />
        {usernameValidation === "" ? (
          ""
        ) : (
          <Text className="text-red-500 ml-2 mt-2">{usernameValidation}</Text>
        )}

        <FormInput
          placeholder="Password"
          password={true}
          onChangeValue={(text) => setPassword(text)}
          validation={
            password === "" ? false : passwordValidation ? true : false
          }
          value={password}
        />
        {passwordValidation === "" ? (
          ""
        ) : (
          <Text className="text-red-500 ml-2 mt-2">{passwordValidation}</Text>
        )}
        <View className="pb-8 pt-4">
          <Link href="/sign-up" className="text-[#9b9b9b] text-right">
            Forgot Password?
          </Link>
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

        <TouchableOpacity
          className="bg-black py-[18px] rounded-lg"
          activeOpacity={0.7}
          onPress={() => {
            const validUsername = validationLogic.validate(username, {
              email: true,
            });
            const validPwd = validationLogic.validate(password, {
              password: true,
            });
            if (validUsername || validPwd) {
              setUsernameValidation(validUsername);
              setPasswordValidation(validPwd);
              return;
            }
            setModalVisible(!modalVisible);
            setTimeout(() => {
              setModalVisible(false);
            }, 3500);
            setUsername("");
            setPassword("");
          }}
        >
          <Text className="text-white text-base font-bold text-center">
            Log-in
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </CustomContainer>
  );
};

export default SignIn;

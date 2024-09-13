import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomContainer from "@/components/CustomContainer";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";

const SignIn = () => {
  return (
    <CustomContainer otherStyles="bg-[#5CB88F] px-0">
      <Text className="mt-2 mb-14 text-[40px] text-white font-black px-4">
        Sign In
      </Text>
      <View className="bg-white h-full px-4 pt-8 rounded-tl-3xl rounded-tr-3xl">
        <View className="mb-4 space-y-2">
          <Text className="text-2xl font-black">Welcome Back!</Text>
          <Text className="text-base">Please Log-in your credentials</Text>
        </View>
        <FormInput placeholder="Username or Email" />
        <FormInput placeholder="Password" />
        <View className="pb-8 pt-4">
          <Text className="text-[#9b9b9b] text-right">Forgot Password?</Text>
        </View>

        <TouchableOpacity
          className="bg-black py-[18px] rounded-lg"
          activeOpacity={0.7}
          onPress={() => Alert.alert('Submitted Value', 'Bruh')}
        >
          <Text className="text-white text-base font-bold text-center">
            Log-in
          </Text>
        </TouchableOpacity>
      </View>
    </CustomContainer>
  );
};

export default SignIn;

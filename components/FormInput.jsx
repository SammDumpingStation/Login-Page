import { View, TextInput, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { useState } from "react";

const FormInput = ({
  placeholder,
  password = false,
  email = false,
  phoneNumber = false,
  onChangeValue,
  value,
  validation = "",
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View className="mt-6">
      <TextInput
        cursorColor="#9b9b9b"
        className={`text-base p-4 rounded-lg bg-[#F1F4F5] relative  caret-white  ${
          validation ? "border border-red-500" : ""
        }`}
        placeholderTextColor="#9b9b9b"
        placeholder={placeholder}
        onChangeText={(text) => onChangeValue(text)}
        autoCapitalize={email || password ? "none" : "sentences"}
        autoCorrect={false}
        inputMode={
          email ? "email-address" : phoneNumber ? "phone-pad" : "default"
        }
        secureTextEntry={password ? hidePassword : false}
        value={value}
      />
      {password ? (
        <TouchableOpacity
          className="absolute right-0 px-4 items-center h-full justify-center"
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Image
            className="h-7 w-7"
            resizeMode="contain"
            source={hidePassword ? icons.eyeHide : icons.eye}
          />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default FormInput;

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const FormInput = ({
  label = "default",
  placeholder,
  value = "",
  errorMessage,
  onBlur,
  onChangeText,
  otherStyles,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View className={`${otherStyles} ${value ? "mt-12" : "mt-6"}`}>
      <View className="relative">
        {value && (
          <View className=" z-10 absolute -top-6 left-2 flex-row justify-between right-2">
            <Text className="text-[#9b9b9b]">{placeholder}</Text>
            <Image
              source={errorMessage ? icons.x : icons.check}
              tintColor={errorMessage ? "#F34336" : "#5CB88F"}
              className={errorMessage ? "h-5 w-5" : "h-4 w-4"}
            />
          </View>
        )}
        <TextInput
          onBlur={onBlur}
          cursorColor="#9b9b9b"
          className={`text-base p-4 rounded-lg border ${
            errorMessage
              ? "border border-red-500 bg-[#FFF9F9]"
              : value.length === 0
              ? "border-[#E5E4E2]"
              : "border-[#5CB88F] bg-[#F8FFFD]"
          }`}
          placeholderTextColor="#9b9b9b"
          placeholder={placeholder}
          onChangeText={(text) => onChangeText(text)}
          autoCapitalize={
            label === "email" || label === "password" ? "none" : "sentences"
          }
          autoCorrect={false}
          inputMode={
            label === "email"
              ? "email-address"
              : label === "phone_number"
              ? "decimal"
              : "default"
          }
          secureTextEntry={label === "password" ? hidePassword : false}
          value={value}
        />
        {label === "password" && (
          <TouchableOpacity
            className="absolute right-0 px-4 items-center h-full top-0 justify-center"
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Image
              className="h-7 w-7"
              resizeMode="contain"
              source={hidePassword ? icons.eyeHide : icons.eye}
              tintColor="#E5E4E2"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && <ErrorMessage value={errorMessage} />}
    </View>
  );
};

export default FormInput;

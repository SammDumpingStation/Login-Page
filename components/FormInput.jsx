import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

const FormInput = ({
  label = "default",
  placeholder,
  value = '',
  errorMessage,
  onBlur,
  onChangeValue,
  onError,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    value.length === 0 || value.length > 0 ? onError("") : "";
  }, [value]);

  return (
    <View className="mt-6">
      <View className="relative">
        <TextInput
          onBlur={onBlur}
          cursorColor="#9b9b9b"
          className={`text-base p-4 rounded-lg bg-[#F1F4F5]   ${
            errorMessage
              ? "border border-red-500"
              : value.length === 0
              ? "border-0"
              : ""
          }`}
          placeholderTextColor="#9b9b9b"
          placeholder={placeholder}
          onChangeText={(text) => onChangeValue(text)}
          autoCapitalize={
            label === "email" || label === "password" ? "none" : "sentences"
          }
          autoCorrect={false}
          inputMode={
            label === "email"
              ? "email-address"
              : label === "phone-number"
              ? "phone-pad"
              : "default"
          }
          secureTextEntry={label === "password" ? hidePassword : false}
          value={value}
        />
        {label === "password" ? (
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

      {errorMessage ? <ErrorMessage value={errorMessage} /> : null}
    </View>
  );
};

export default FormInput;

import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import icons from "../constants/icons";
import { useEffect, useState } from "react";
import FormValidation from "./FormValidation";

const FormInput = ({
  placeholder,
  label = "default",
  onBlur,
  value,
  validation,
  onChangeValue,
  onChangeValidation,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    value.length === 0 || value.length > 0 ? onChangeValidation("") : "";
  }, [value]);

  return (
    <View className="mt-6">
      <View className="relative">
        <TextInput
        onBlur={onBlur}
          cursorColor="#9b9b9b"
          className={`text-base p-4 rounded-lg bg-[#F1F4F5]   ${
            validation
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

      <FormValidation value={validation} />
    </View>
  );
};

export default FormInput;

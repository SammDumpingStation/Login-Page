import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import FormValidation from "./FormValidation";

const FormInput = ({ placeholder, password = false, onChangeValue, value }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <View className="mt-6">
      <TextInput
        className="text-base p-4 rounded-lg bg-[#F1F4F5]"
        placeholder={placeholder}
        onChangeText={(text) => onChangeValue(text)}
        secureTextEntry={password ? true : false}
        value={value}
      />
      {inputValue ? <FormValidation value={inputValue} /> : ""}
    </View>
  );
};

export default FormInput;

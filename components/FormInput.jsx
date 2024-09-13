import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import FormValidation from "./FormValidation";

const FormInput = ({ placeholder, password }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <View className="mt-6">
      <TextInput
        className="text-base p-4 rounded-lg bg-[#F1F4F5]"
        placeholder={placeholder}
        onChangeText={(text) => setInputValue(text)}
      />
      {inputValue ? <FormValidation value={inputValue} /> : ""}
    </View>
  );
};

export default FormInput;

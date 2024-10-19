import { View, Text } from "react-native";
import React from "react";

const ErrorMessage = ({ value }) => {
  return (
    <>{value && <Text className="text-red-500 ml-2 mt-2">{value}</Text>}</>
  );
};

export default ErrorMessage;

import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import React from "react";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

const CustomButton = ({
  label,
  otherStyles,
  textStyle,
  withIcon,
  onPress,
  disabled = false,
  isLoading,
}) => {

  return (
    <TouchableOpacity
      className={`${
        disabled ? "bg-[#E4E7EB]" : "bg-[#5CB88F]"
      } h-[57px] rounded-lg relative justify-center items-center flex-row space-x-4 ${otherStyles}`}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
    >
      {withIcon ? (
        <Image source={withIcon} className="h-6 w-6" resizeMode="contain" />
      ) : (
        ""
      )}
      {isLoading ? (
        <BarIndicator color="#5CB88F" count={5} size={25} />
      ) : (
        <Text
          className={`text-base font-bold text-center justify-center items-center ${
            textStyle || isLoading ? "text-[#9b9b9b]" : "text-white"
          }`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

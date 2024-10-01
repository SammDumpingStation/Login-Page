import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const CustomContainer = ({ children, scroll = null, otherStyles = null }) => {
  return (
    <SafeAreaView className={`bg-[#f7f7f7] px-[14px] pt-6  flex-1 h-full ${otherStyles}`}>
      <StatusBar style="dark" />
      {scroll ? (
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

export default CustomContainer;

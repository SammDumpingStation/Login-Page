import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const CustomContainer = ({
  children,
  scroll = null,
  otherStyles = null,
  pb = true,
  ph = true,
}) => {
  return (
    <SafeAreaView className={`bg-[#f7f7f7] pt-6  flex-1 h-full ${otherStyles}`}>
      <StatusBar style="dark" />
      {scroll ? (
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            paddingHorizontal: ph ? 14 : 0,
            position: "relative",
            paddingBottom: pb ? 85 : 0,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="min-h-[100%] px-[14px] relative pb-[85px]">
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomContainer;

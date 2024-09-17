import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toast from "@/utils/toast-message";

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toast.toastConfig} />
    </>
  );
};

export default TabsLayout;

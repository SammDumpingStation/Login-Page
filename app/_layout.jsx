import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toast from "@/utils/toast-message";
import UserContext from "@/context/UserContext";

const RootLayout = () => {
  return (
    <UserContext>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toast.toastConfig} />
    </UserContext>
  );
};

export default RootLayout;

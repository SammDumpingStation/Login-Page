import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toast from '@/utils/toast-message'

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toast.toastConfig} />
    </>
  );
};

export default RootLayout;

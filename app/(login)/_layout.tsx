import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='sign-in' />
      <Stack.Screen name='sign-up' />
    </Stack>
  )
}

export default LoginLayout
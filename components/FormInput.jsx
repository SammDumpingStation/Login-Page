import { View, Text, TextInput } from 'react-native'
import React from 'react'

const FormInput = ({placeholder, password}) => {
  return (
    <View className="mt-6">
      <TextInput className="text-base p-4 rounded-lg bg-[#F1F4F5]" placeholder={placeholder} />
    </View>
  );
}

export default FormInput
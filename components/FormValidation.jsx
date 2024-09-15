import { View, Text } from 'react-native'
import React from 'react'

const FormValidation = ({response = 'yay'}) => {
  return (
    <View>
      <Text className="text-red-500 ml-2 mt-2">{response}</Text>
    </View>
  )
}

export default FormValidation
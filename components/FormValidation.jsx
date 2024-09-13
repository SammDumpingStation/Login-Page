import { View, Text } from 'react-native'
import React from 'react'

const FormValidation = ({value}) => {
  return (
    <View>
      <Text className="text-red-500 ml-2 mt-2">{value}</Text>
    </View>
  )
}

export default FormValidation
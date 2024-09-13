import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const CustomButton = ({label, link = "something"}) => {
  return (
    <TouchableOpacity className="bg-black py-[18px] rounded-lg" activeOpacity={0.7}>
      <Link href={link} className="text-white text-base font-bold text-center">{label}</Link>
    </TouchableOpacity>
  )
}

export default CustomButton
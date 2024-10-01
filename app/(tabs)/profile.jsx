import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomContainer from '../../components/CustomContainer'
import BackButtonHeader from '../../components/BackButtonHeader'
import icons from '../../constants/icons'



const Profile = () => {
  return (
    <CustomContainer scroll={true}>
      <BackButtonHeader title="My Profile" />
      <View className="w-full bg-white h-[200px] rounded-lg mt-8 justify-center items-center relative">
        <View className="top-4 right-4 absolute flex-row gap-2 items-center">
          <Image
            className=" h-4 w-4"
            tintColor="#9b9b9b"
            source={icons.edit}
          />
          <Text className="text-[#9b9b9b]">Edit</Text>
        </View>
        <Image
          source={icons.profile}
          className="h-16 w-16 mb-2"
          tintColor="#9b9b9b"
          resizeMode="contain"
        />
        <Text className="text-lg mb-1">Samm Caagbay</Text>
        <Text className="text-[#9b9b9b] text-xs">sammcaag@gmail.com</Text>
        <Text className="text-[#9b9b9b] text-xs">No phone number added yet</Text>
      </View>

      <View className="w-full h-full bg-white mt-6 rounded-lg">

      </View>
    </CustomContainer>
  );
}

export default Profile
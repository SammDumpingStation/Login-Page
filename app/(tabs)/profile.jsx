import { View, Text, Image } from "react-native";
import React from "react";
import { useUserContext } from "../../context/UserContext";
import CustomContainer from "../../components/CustomContainer";
import BackButtonHeader from "../../components/BackButtonHeader";
import icons from "../../constants/icons";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <CustomContainer scroll={true}>
      <BackButtonHeader title="My Profile" />
      <View className="w-full bg-white h-[200px] rounded-lg mt-8 justify-center items-center relative">
        <View className="top-4 right-4 absolute flex-row gap-2 items-center">
          <Image className=" h-4 w-4" tintColor="#9b9b9b" source={icons.edit} />
          <Text className="text-[#9b9b9b]">Edit</Text>
        </View>
        <View className="h-16 w-16 bg-[#f7f7f7] mb-2 rounded-full">
          <Image
            source={icons.user}
            className="h-10 w-10 m-auto"
            tintColor="#9b9b9b"
            resizeMode="contain"
          />
        </View>

        <Text className="text-lg mb-1">{user.name}</Text>
        <Text className="text-[#9b9b9b] text-xs">{user.email}</Text>
        <Text className="text-[#9b9b9b] text-xs">
          {user.phone_number ? user.phone_number : "No phone number added yet"}
        </Text>
      </View>

      <View className="w-full h-[500px] bg-white mt-6 rounded-lg p-4">
        <View className="flex-row  items-center space-x-4 pb-3">
          <View className="bg-[#B8B8B8] h-12 w-12 rounded-full">
            <Image
              source={icons.darkMode}
              className="h-6 w-6 m-auto"
              resizeMode="contain"
            />
          </View>
          <Text className="text-lg">Dark Mode</Text>
        </View>

        <View className="flex-row border-y border-[#E8E8E8] items-center space-x-4 py-3">
          <View className="bg-[#EAEBFF] h-12 w-12 rounded-full">
            <Image
              source={icons.user}
              tintColor="#304FFF"
              className="h-6 w-6 m-auto"
              resizeMode="contain"
            />
          </View>
          <View className="flex-row items-center justify-between flex-1">
            <Text className="text-lg">Personal Info</Text>
            <Image
              source={icons.arrow}
              className="h-6 w-6 scale-x-[-1]"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </CustomContainer>
  );
};

export default Profile;

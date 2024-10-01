import { View, Text, Image } from "react-native";
import React from "react";
import { useUserContext } from "../../context/UserContext";
import CustomContainer from "../../components/CustomContainer";
import BackButtonHeader from "../../components/BackButtonHeader";
import icons from "../../constants/icons";
import SettingsCard from "../../components/Profile/SettingsCard";
import DarkModeCard from "../../components/Profile/DarkModeCard";
import LogOutCard from "../../components/Profile/LogOutCard";

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
        <View className="h-20 w-20 bg-[#f7f7f7] mb-2 rounded-full">
          <Image
            source={icons.user}
            className="h-12 w-12 m-auto"
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

      <View className="w-full bg-white mt-6 rounded-lg p-4">
        <DarkModeCard />
        <SettingsCard
          label="Personal Info"
          icon={icons.user}
          iconBg="#EAEBFF"
          iconTint="#304FFF"
        />
        <SettingsCard
          label="Become A Seller"
          icon={icons.seller}
          iconBg="#FFF9C5"
          iconTint="#F57E16"
        />
        <SettingsCard
          label="Change Password"
          icon={icons.changepwd}
          iconBg="#EAEBFF"
          iconTint="#304FFF"
        />
      </View>
      <View className="w-full bg-white mt-6 rounded-lg p-4">
        <SettingsCard
          label="Delete Account"
          icon={icons.deleteIcon}
          iconBg="#FFEBED"
          iconTint="#F34336"
          borderTop={false}
        />
        <LogOutCard />
      </View>
    </CustomContainer>
  );
};

export default Profile;

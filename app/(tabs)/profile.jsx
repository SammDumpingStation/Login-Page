import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import CustomContainer from "../../components/CustomContainer";
import BackButtonHeader from "../../components/BackButtonHeader";
import icons from "../../constants/icons";
import SettingsCard from "../../components/Profile/SettingsCard";
import DarkModeCard from "../../components/Profile/DarkModeCard";
import LogOutCard from "../../components/Profile/LogOutCard";
import FormModal from "../../components/Modals/FormModal";

const Profile = () => {
  const { user } = useUserContext();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CustomContainer scroll={true}>
      <FormModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        user={user}
      />
      <BackButtonHeader title="My Profile" />
      <View className="w-full bg-white h-[200px] rounded-lg mt-4 justify-center items-center relative">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(!modalVisible)}
          className="top-4 right-4 absolute flex-row gap-2 items-center"
        >
          <Image className=" h-4 w-4" tintColor="#9b9b9b" source={icons.edit} />
          <Text className="text-[#9b9b9b]">Edit</Text>
        </TouchableOpacity>
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

      <View className="w-full bg-white mt-4 rounded-lg p-4">
        <DarkModeCard />
        <SettingsCard
          label="Personal Info"
          icon={icons.user}
          iconBg="bg-[#EAEBFF]"
          iconTint="#304FFF"
        />
        <SettingsCard
          label="Become A Seller"
          icon={icons.seller}
          iconBg="bg-[#FFF9C5]"
          iconTint="#F57E16"
        />
        <SettingsCard
          label="Change Password"
          icon={icons.changepwd}
          iconBg="bg-[#EAEBFF]"
          iconTint="#304FFF"
        />
      </View>
      <View className="w-full bg-white mt-4 rounded-lg p-4">
        <SettingsCard
          label="Delete Account"
          icon={icons.deleteIcon}
          iconBg="bg-[#FFEBED]"
          iconTint="#F34336"
          borderTop={false}
        />
        <LogOutCard />
      </View>
    </CustomContainer>
  );
};

export default Profile;

import { View, Text, Image } from "react-native";
import React from "react";
import CustomContainer from "../../components/CustomContainer";
import { router } from "expo-router";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase";

const Home = () => {
  return (
    <CustomContainer>
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-4">
          <Image
            source={icons.location}
            className="w-6 h-[34px]"
            resizeMode="contain"
          />
          <View>
            <Text className="text-[12px] text-[#9B9B9B]">
              Your Current Location
            </Text>
            <Text className="text-[14px]">Location not set</Text>
          </View>
        </View>

        <TouchableOpacity
          className="border px-4 py-2 border-[#9b9b9b] rounded-lg "
          activeOpacity={0.7}
          onPress={async () => {
            await supabase.auth.signOut();
            router.replace("/sign-in");
          }}
        >
          <Text className="">Log-out</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-[135px] rounded-xl mt-6">
        <Image
          source={images.header}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </CustomContainer>
  );
};

export default Home;

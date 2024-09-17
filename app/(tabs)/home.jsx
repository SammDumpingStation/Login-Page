import { View, Text } from "react-native";
import React from "react";
import CustomContainer from "../../components/CustomContainer";
import { TouchableOpacity } from "react-native";
import { logOut } from "../../lib/appwrite";
import { router } from "expo-router";

const Home = () => {
  return (
    <CustomContainer>
      <View>
        <Text>Home</Text>
        <TouchableOpacity
          className="border py-2"
          onPress={() => {
            logOut();
            router.replace("/sign-in");
          }}
        >
          <Text>Log-out</Text>
        </TouchableOpacity>
      </View>
    </CustomContainer>
  );
};

export default Home;

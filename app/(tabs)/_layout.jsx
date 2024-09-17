import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";

const TabsLayout = () => {
  const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          className="h-6 w-6"
          resizeMode="contain"
          tintColor={color}
        />
        <Text
          className={`${
            focused ? "font-semibold text-[#ECAE36]" : "font-normal text-[#9b9b9b]"
          } text-xs`}
        >
          {name}
        </Text>
      </View>
    );
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ECAE36",
          tabBarInactiveTintColor: "#9B9B9B",
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="compare"
          options={{
            headerShown: false,
            title: "Compare",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.compare}
                color={color}
                name="Compare "
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

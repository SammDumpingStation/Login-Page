import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";

const TabsLayout = () => {
  const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View
        className={`items-center justify-center relative ${
          name === "Search" && focused
            ? "bg-[#5CB88F] w-full h-full rounded-lg absolute bottom-4"
            : ""
        }`}
      >
        <Image
          source={icon}
          className="h-6 w-6"
          resizeMode="contain"
          tintColor={name === "Search" && focused ? "#ffffff" : color}
        />
        {name != "Search" ? (
          <Text
            className={`font-semibold text-4xl absolute -m-5 bottom-0  ${
              focused ? "text-[#5CB88F]" : "text-white"
            }`}
          >
            .
          </Text>
        ) : null}
      </View>
    );
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#5CB88F",
          tabBarInactiveTintColor: "#9B9B9B",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60,
            width: 320,
            marginHorizontal: "auto",
            marginBottom: 12,
            borderRadius: 8,
            shadowColor: "transparent", // iOS: Remove shadow color
            shadowOpacity: 0, // iOS: Make shadow invisible
            shadowOffset: { width: 0, height: 0 }, // iOS: Reset shadow offset
            shadowRadius: 0, // iOS: Remove shadow radius
            elevation: 0, // Android: Remove elevation (shadow)
          },
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
          name="bestbuy"
          options={{
            headerShown: false,
            title: "Best Buy",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.cart}
                color={color}
                name="Best Buy"
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

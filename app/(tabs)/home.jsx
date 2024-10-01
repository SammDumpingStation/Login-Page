import { View, Text, Image } from "react-native";
import CustomContainer from "../../components/CustomContainer";
import icons from "../../constants/icons";
import images from "../../constants/images";

const Home = () => {

  return (
    <CustomContainer scroll={true}>
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

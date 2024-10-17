import { View, Text, Image, FlatList } from "react-native";
import CustomContainer from "../../components/CustomContainer";
import icons from "../../constants/icons";
import FormInput from "../../components/FormInput";

const Home = () => {
  return (
    <CustomContainer scroll={true}>
      <View className="">
        <Text className="text-2xl font-black">To-do App</Text>
        <View className="flex-row space-x-4">
          <FormInput otherStyles="flex-1" placeholder="Add a Todo" />
          <View className="justify-center items-center bg-[#F1F4F5] rounded-lg w-12 mt-6">
            <Image
              source={icons.plus}
              className="h-8 w-8"
              resizeMode="contain"
              tintColor="#5CB88F"
            />
          </View>
        </View>
        <FlatList
          scrollEnabled={false}
          data={[
            { id: 1, text: 1 },
            { id: 2, text: 2 },
            { id: 3, text: 3 },
            { id: 4, text: 4 },
            { id: 5, text: 5 },
          ]}
          renderItem={({ item }) => <Text>{item.text}</Text>}
          keyExtractor={(item) => item.id}
        />

        {/*       <FlatList
        data={ford}
        contentContainerStyle={{
          paddingTop: 24,
        }}
        renderItem={({ item }) => (
          <ModelCarCard
            model={item}
            setIsClicked={setIsClicked}
            isSelected={isClicked === item.name}
            value={isClicked}
            clickable={true}
          />
        )}
        keyExtractor={(item) => item.name}
      /> */}
      </View>
    </CustomContainer>
  );
};

export default Home;

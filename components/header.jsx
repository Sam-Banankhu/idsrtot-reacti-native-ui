import { View, Text, Image, TouchableOpacity } from "react-native";
import images from "../constants/images";
import { router } from "expo-router";

const Header = ({ showHeader }) => {
  return (
    <View className="w-full h-14 border-b border-b-gray-200 bg-transparent flex-row items-center justify-around px-2">
      <View className="flex-row items-center gap-1 h-full w-[50%]">
        <View className="h-8 w-8 mb-2">
          <Image
            source={images.logo}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>
        <Text className="text-4xl font-psemibold">IDSRTutor</Text>
      </View>
      <View className="flex-row h-full w-[45%] items-center justify-end">
        {showHeader && (
          <TouchableOpacity
            className="w-[40%] h-[65%] rounded-lg bg-blue-600 items-center justify-center"
            style={{ elevation: 10 }}
            onPress={() => router.push('/createAccount')}
          >
            <Text
              className="text-base text-white font-pregular"
              numberOfLines={1}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

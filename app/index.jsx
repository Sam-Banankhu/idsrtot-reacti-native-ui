import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import MaxWidthWrapper from "../components/maxWidthWrapper";
import Header from "../components/header";
import images from "../constants/images";

const Index = () => {
  const logos = [images.mohLogo, images.whoLogo, images.ictLogo];
  return (
    <SafeAreaView className="h-full bg-white">
      <Header showHeader={true} />
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-center text-6xl font-bold mt-10">
            <Text className="text-blue-600" numberOfLines={1}>
              IDSRTUTOR
            </Text>{" "}
            An AI Powered HSA Tutor
          </Text>
          <Text className="mt-8 text-center text-xl font-pregular">
            IDRStutor helps you improve your field work and knowledge
            acquisation with the help on an AI tutor
          </Text>
          <View className="w-full h-12 mt-8 items-center justify-center">
            <TouchableOpacity
              className="h-full w-[40%] bg-blue-600 rounded-lg items-center justify-center"
              onPress={() => router.push("/createAccount")}
            >
              <Text className="text-lg text-white font-psemibold">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-80 items-center justify-center">
            <View className="w-[90%] mt-6 rounded-lg" style={{ elevation: 2 }}>
              <Image
                source={images.chatBg}
                resizeMode="cover"
                className="w-full h-full"
              />
            </View>
          </View>
          <View className="px-8">
            <Text className="text-5xl font-bold mt-24">
              Start your first conversation in seconds
            </Text>
            <Text className="text-2xl mt-4 font-pregular">
              Referencing the Technical Guidellines has never been easier than
              with{" "}
              <Link href={""} className="text-blue-600">
                IDSRTutor.
              </Link>
            </Text>
          </View>
          <View className="mt-10 border-l-4 border-l-gray-400 w-full h-16 px-4 py-2 justify-between">
            <Text className="text-sm text-blue-600">Step 1</Text>
            <Text className="text-2xl font-psemibold" numberOfLines={1}>
              Sign up for a{" "}
              <Link href={"/createAccount"} className="text-blue-600">
                New Account
              </Link>
            </Text>
          </View>
          <View className="mt-5 border-l-4 border-l-gray-400 w-full h-16 px-4 py-2 justify-between">
            <Text className="text-sm text-blue-600">Step 2</Text>
            <Text className="text-2xl font-psemibold" numberOfLines={1}>
              Choose a <Text className="text-blue-600">Module</Text> &{" "}
              <Text className="text-blue-600">Topic</Text>
            </Text>
          </View>
          <View className="mt-5 border-l-4 border-l-gray-400 w-full h-16 px-4 py-2 justify-between">
            <Text className="text-sm text-blue-600">Step 3</Text>
            <Text className="text-2xl font-psemibold" numberOfLines={1}>
              Start Your Conversation
            </Text>
          </View>
          <View className="px-8 mt-24 w-full">
            <Text className="text-5xl font-bold">
              Practice in Real Life Scenarios
            </Text>
            <Text className="text-xl font-pregular mt-4">
              Get help if you make a mistake and need guidance from technical
              guidelines.
            </Text>
            <Text className="text-center text-xl mt-4 font-pregular">
              And many more...
            </Text>
            <Text className="text-5xl mt-24 font-bold">Partners</Text>
            <Text className="mt-4 text-xl font-pregular">
              The IDSTutor has been developed with partenership from the
              following
            </Text>
          </View>
          <View className="items-center justify-center mt-5">
            {logos.map((item, index) => (
              <View
                key={index.toString()}
                className="h-44 w-[50%] mt-6 rounded-lg items-center justify-center border-4 border-gray-200"
              >
                <Image
                  source={item}
                  className="h-[80%] w-[80%]"
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
          <View className="w-full mt-28">
            <Text className="text-4xl font-bold">IDSRTutor</Text>
            <View className="h-1 w-full border-b mt-2 border-b-gray-300" />
            <Text className="text-base text-gray-500 font-pregular mt-2 text-center">
              © 2024 IDSRTutor. All rights Reserved.
            </Text>
          </View>
        </ScrollView>
      </MaxWidthWrapper>
      <StatusBar backgroundColor="white" style="dark" />
    </SafeAreaView>
  );
};

export default Index;

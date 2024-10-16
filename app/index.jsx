import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  Modal,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Link, Redirect, router, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import MaxWidthWrapper from "../components/maxWidthWrapper";
import Header from "../components/header";
import images from "../constants/images";
import { useLoggedInCheck } from "../context/useLoggedInCheck";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomWideButton from "../components/customWideButton";

const Index = () => {
  const logos = [images.mohLogo, images.whoLogo, images.ictLogo];
  const router = useRouter();
  const segments = useSegments();

  const { isLoggedIn, isLoading, networkError } = useLoggedInCheck();

  useEffect(() => {
    if (
      !segments[segments.length - 1] ||
      segments[segments.length - 1] === "chat"
    ) {
      const backAction = () => {
        Alert.alert("Exit app?", "Are you sure you want to exit app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, [segments]);

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/chat" />;
  }

  if (isLoading) {
    return (
      <Modal animationType="fade" visible={isLoading} transparent>
        <ImageBackground
          source={images?.splash}
          className="h-full w-full"
          resizeMode="cover"
        >
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <ActivityIndicator color={"#0B7423"} size="large" />
          </View>
        </ImageBackground>
        <StatusBar backgroundColor="white" style="dark" />
      </Modal>
    );
  }

  if (networkError) {
    return (
      <Modal animationType="fade" visible={networkError} transparent>
        <ImageBackground
          source={images?.splash}
          className="h-full w-full"
          resizeMode="cover"
        >
          <View
            className="flex-1 items-center justify-center px-8"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="w-[80%] p-4 bg-gray-300 rounded-lg items-center justify-center">
              <Text className="text-lg font-psemibold">Network Error!!</Text>
              <MaterialCommunityIcons
                name="network-strength-3-alert"
                size={50}
                color={"red"}
              />
              <Text className="text-base font-pregular">
                Plesae switch to a stable network!!
              </Text>
              <CustomWideButton
                styles={"mt-4"}
                title={"Exit"}
                handlePress={() => BackHandler.exitApp()}
              />
            </View>
          </View>
        </ImageBackground>
        <StatusBar style="dark" backgroundColor="white" />
      </Modal>
    );
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <Header showHeader={true} />
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-center text-6xl font-bold mt-10 text-blue-600">
            IDSRTUTOR
          </Text>
          <Text className="text-center text-base text-gray-500 font-pregular">
            An AI Powered HSA Tutor
          </Text>
          <View className="w-full h-80 items-center justify-center mt-10">
            <View className="w-[90%] mt-6 rounded-lg" style={{ elevation: 2 }}>
              <Image
                source={images.chatBg}
                resizeMode="cover"
                className="w-full h-full"
              />
            </View>
          </View>
          <View className="w-full h-12 mt-8 items-center justify-end flex-row px-4">
            <TouchableOpacity
              className="h-full w-[100%] bg-blue-600 rounded-lg items-center justify-center"
              onPress={() => router.push("/verifyAccount")}
            >
              <Text className="text-lg text-white font-psemibold">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
          <View className="px-8">
            <Text className="text-4xl font-bold mt-12">
              Start a conversation in seconds
            </Text>
            <Text className="text-2xl mt-4 font-pregular">
              Referencing the Technical Guidellines has never been easier than
              with{" "}
              <Link href={""} className="text-blue-600">
                IDSRTutor.
              </Link>
            </Text>
          </View>
          <View className="px-8 mt-24 w-full">
            <Text className="text-4xl font-bold">
              Practice in Real Life Scenarios
            </Text>
            <Text className="text-xl font-pregular mt-4">
              Get help if you make a mistake and need guidance from technical
              guidelines.
            </Text>
            <Text className="text-4xl mt-24 font-bold">Partners</Text>
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

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import images from "../../constants/images";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import LoadingAnimation from "../../components/loadingAnimation";

const ViewDetails = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fectUserData = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("idsrtoken");
      await axios
        .get(`${baseUrl}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => 
          setUserData([
            { title: "Full Name", value: res?.data?.fullname },
            { title: "E-mail", value: res?.data?.email },
            { title: "Role", value: res?.data?.role },
            { title: "Facility", value: res?.data?.facility_name },
            { title: "Facility Type", value: res?.data?.facility_type },
            { title: "Distric", value: res?.data?.district_name },
            { title: "Managing Authority", value: res?.data?.managing_authority },
            { title: "Geographical Setting", value: res?.data?.urban_rural }
          ])
        )
        .catch(() => Alert.alert("Something went wrong", "Please try again"))
        .finally(() => setIsLoading(false));
    };
    fectUserData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("idsrtoken");
    router.replace("/logIn");
  };

  return (
    <SafeAreaView className="h-full bg-white relative">
      <View className="w-full h-10 flex-row justify-between items-center px-2 mt-2">
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => router.push("/chat")}
        >
          <Ionicons name="chevron-back-circle" size={40} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-black rounded-lg px-2 py-1 flex-row gap-1 items-center"
          onPress={() =>
            router.push({
              pathname: "/editDetails",
              params: {
                name: userData?.fullname,
                phone: userData?.phone,
                email: userData?.email,
              },
            })
          }
        >
          <AntDesign name="edit" size={20} color="white" />
          <Text className="text-gray-300 font-pregular">Edit Details</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full rounded-t-3xl bg-white">
        <MaxWidthWrapper>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            className="w-full p-2"
          >
            <View className="relative items-center justify-center mt-2">
              <Image
                source={images.profile}
                resizeMode="cover"
                className="w-36 h-36 rounded-full"
              />
            </View>
            <View className="w-full mt-10">
              {userData?.map((item, index) => (
                <View
                  className="border border-blue-600 rounded-lg  border-b-4 border-r-4 p-2 w-full mt-2"
                  key={index?.toString()}
                >
                  <Text className="text-base text-blue-600 font-pregular">
                    {item?.title}:
                  </Text>
                  <Text className="text-xl font-psemibold">{item?.value}</Text>
                </View>
              ))}
              <CustomWideButton
                title="Log Out"
                styles="mt-8"
                handlePress={logout}
              />
            </View>
          </ScrollView>
        </MaxWidthWrapper>
      </View>
      {isLoading && <LoadingAnimation isLoading={isLoading} />}
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

export default ViewDetails;

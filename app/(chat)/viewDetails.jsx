import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import images from "../../constants/images";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FormField from "../../components/formField";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

const ViewDetails = () => {
  const { height } = Dimensions.get("window");

  const [userData, setUserData] = useState({});
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
        .then((res) => setUserData(res.data))
        .catch(() => Alert.alert("Something went wrong", "Please try again"))
        .finally(() => setIsLoading(false));
    };
    fectUserData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("idsrtoken");
    router.replace("/");
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
            <View className="relative items-center justify-center mt-10">
              <Image
                source={images.profile}
                resizeMode="cover"
                className="w-36 h-36 rounded-full"
              />
            </View>
            <View className="w-full p-2">
              <FormField
                title="Full Name"
                editable={false}
                placeholder="enter your name..."
                value={userData?.fullname}
              />
              <FormField
                title="Phone"
                placeholder="enter phone number..."
                editable={false}
                value={userData?.phone}
              />
              <FormField
                title="E-mail"
                placeholder="enter email..."
                editable={false}
                value={userData?.email}
              />
              <FormField
                title="Role"
                placeholder="role..."
                value={userData?.role}
                editable={false}
              />
              <FormField
                title="Facility"
                placeholder="facility..."
                editable={false}
                value={userData?.facility_name}
              />
              <FormField
                title="Facility Type"
                placeholder="facility..."
                editable={false}
                value={userData?.facility_type}
              />
              <FormField
                title="Managing Authority"
                placeholder="managing authority..."
                editable={false}
                value={userData?.managing_authority}
              />
              <FormField
                title="District"
                placeholder="district..."
                editable={false}
                value={userData?.district_name}
              />
              <FormField
                title="Geographical Setting"
                placeholder="geographical setting..."
                editable={false}
                value={userData?.urban_rural}
              />
              <CustomWideButton
                title="Log Out"
                styles="mt-8"
                handlePress={logout}
              />
            </View>
          </ScrollView>
        </MaxWidthWrapper>
      </View>
      {isLoading && (
        <Modal animationType="fade" visible={isLoading} transparent>
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Text className="text-blue-600 text-lg tex-center font-psemibold">
              Loading...
            </Text>
            <ActivityIndicator color={"#3B82F6"} size="large" />
          </View>
        </Modal>
      )}
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

export default ViewDetails;

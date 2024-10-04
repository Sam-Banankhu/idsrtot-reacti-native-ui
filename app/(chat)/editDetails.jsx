import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FormField from "../../components/formField";
import { router, useLocalSearchParams } from "expo-router";
import CustomWideButton from "../../components/customWideButton";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditDetails = () => {
  const { name, phone, email } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({
    fullName: name ? name : "",
    phoneNumber: phone ? phone : "",
    email: email ? email : "",
  });

  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const updateUserData = async () => {
    setIsLoading(true);
    let sufficientInfo = true;
    for (const key in formValues) {
      if (!formValues[key]) {
        setErrorMessage(`${key} can not be empty`);
        sufficientInfo = false;
        setIsLoading(false);
        break;
      }
    }
    if (sufficientInfo) {
      const token = await AsyncStorage.getItem("idsrtoken");
      await axios
        .put(
          `${baseUrl}/user/me/update`,
          {
            fullname: formValues?.fullName,
            email: formValues?.email,
            phone: formValues?.phoneNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          router.push("/viewDetails");
        })
        .finally(() => setIsLoading(false))
        .catch((error) => {
          Alert.alert("Something went wrong", "please try again");
        });
    }
  };

  const updatePassword = async () => {
    setIsLoading(true);
    let sufficientInfo = true;
    for (const key in passwordValues) {
      if (!formValues[key]) {
        setErrorMessage(`${key} can not be empty`);
        sufficientInfo = false;
        setIsLoading(false);
        break;
      }
    }

    if (sufficientInfo) {
      const token = await AsyncStorage.getItem("idsrtoken");
      await axios
        .put(
          `${baseUrl}/user/me/password`,
          {
            old_password: passwordValues?.oldPassword,
            new_password: passwordValues?.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          router.push("/viewDetails");
        })
        .finally(() => setIsLoading(false))
        .catch((error) => {
          Alert.alert("Something went wrong", "please try again");
        });
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <MaxWidthWrapper>
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => router.push("/viewDetails")}
        >
          <Ionicons name="chevron-back-circle" size={40} color="#3B82F6" />
          <Text className="text-lg font-psemibold">Edit Details</Text>
        </TouchableOpacity>
        {errorMessage && (
          <View className="bg-red-100 text-red-700 p-2 rounded my-2 text-center">
            <Text className="text-base font-pregular">{errorMessage}</Text>
          </View>
        )}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-2">
            <FormField
              title="Full Name"
              editable={true}
              placeholder="enter your name..."
              value={formValues?.fullName}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, fullName: text })
              }
            />
            <FormField
              title="Phone"
              placeholder="enter phone number..."
              editable={true}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, phone: text })
              }
              value={formValues?.phoneNumber}
            />
            <FormField
              title="E-Mail"
              placeholder="enter email..."
              editable={true}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, email: text })
              }
              value={formValues?.email}
            />
            <CustomWideButton
              title="Save Changes"
              styles="mt-10"
              handlePress={updateUserData}
              inactive={
                !(
                  formValues.email &&
                  formValues.fullName &&
                  formValues.phoneNumber
                )
              }
            />
            <TouchableOpacity
              className="mt-10 w-full h-10 bg-blue-500  rounded-xl items-center justify-between px-4 flex-row"
              onPress={() => setChangePasswordVisible(!changePasswordVisible)}
            >
              <Text className="text-base font-psemibold text-white">
                Change Password
              </Text>
              <AntDesign
                name={changePasswordVisible ? "caretup" : "caretdown"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
            {changePasswordVisible && (
              <>
                <FormField
                  title="Old Password"
                  placeholder="enter your old password..."
                  editable={true}
                  handleOnChangeText={(text) =>
                    setPasswordValues({ ...passwordValues, oldPassword: text })
                  }
                  value={passwordValues.oldPassword}
                />
                <FormField
                  title="New Password"
                  placeholder="new password"
                  editable={true}
                  handleOnChangeText={(text) =>
                    setPasswordValues({ ...passwordValues, newPassword: text })
                  }
                  value={passwordValues.newPassword}
                />
                <CustomWideButton
                  title="Save Changes"
                  styles="mt-10"
                  handlePress={updatePassword}
                  inactive={
                    !(passwordValues.newPassword && passwordValues.oldPassword)
                  }
                />
              </>
            )}
          </View>
        </ScrollView>
      </MaxWidthWrapper>
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
    </SafeAreaView>
  );
};

export default EditDetails;

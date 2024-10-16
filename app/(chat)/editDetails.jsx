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
import LoadingAnimation from "../../components/loadingAnimation";

const EditDetails = () => {
  // const { name, phone, email } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formFieldErrorMessage, setFormFieldErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // const [formValues, setFormValues] = useState({
  //   fullName: name ? name : "",
  //   phoneNumber: phone ? phone : "",
  //   email: email ? email : "",
  // });

  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    comfirmPassword: "",
  });

  const [hidePassword, setHidePassword] = useState({
    oldPassword: true,
    newPassword: true,
    comfirmPassword: true,
  });

  const placeHolderText = {
    oldPassword: "Old Password",
    newPassword: "New Password",
    comfirmPassword: "Comfirm Password",
  };

  // const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  // const updateUserData = async () => {
  //   setIsLoading(true);
  //   let sufficientInfo = true;
  //   for (const key in formValues) {
  //     if (!formValues[key]) {
  //       setErrorMessage(`${key} can not be empty`);
  //       sufficientInfo = false;
  //       setIsLoading(false);
  //       break;
  //     }
  //   }
  //   if (sufficientInfo) {
  //     const token = await AsyncStorage.getItem("idsrtoken");
  //     await axios
  //       .put(
  //         `${baseUrl}/user/me/update`,
  //         {
  //           fullname: formValues?.fullName,
  //           email: formValues?.email,
  //           phone: formValues?.phoneNumber,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         router.push("/viewDetails");
  //       })
  //       .finally(() => setIsLoading(false))
  //       .catch((error) => {
  //         Alert.alert("Something went wrong", "please try again");
  //       });
  //   }
  // };

  const updatePassword = async () => {
    setIsLoading(true);
    try {
      let sufficientInfo = true;
      for (const key in passwordValues) {
        if (!passwordValues[key]) {
          // setErrorMessage(`${key} can not be empty`);
          setFormFieldErrorMessage({
            title: key,
            message: `${placeHolderText[key]} can not be empty`,
          });
          sufficientInfo = false;
          setIsLoading(false);
          break;
        }
      }

      if (sufficientInfo) {
        if (passwordValues?.newPassword?.length >= 6) {
          if (passwordValues.newPassword === passwordValues.comfirmPassword) {
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
                setSuccessMessage('Password changed successfully!!');
                setTimeout(() => {
                  router.push("/viewDetails");
                }, 1000)
              })
              .finally(() => setIsLoading(false))
              .catch((error) => {
                Alert.alert("Something went wrong", "please try again");
              });
          } else {
            setErrorMessage("Passwords does match");
          }
        } else {
          setErrorMessage("Password has to be 6 characters or more");
        }
      }
    } catch (error) {
      Alert.alert("Something went wrong!!! please try again");
    } finally {
      setIsLoading(false);
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
        {successMessage && (
          <View className="bg-green-100 text-green-700 p-2 rounded my-2 text-center">
            <Text className="text-base font-pregular">{successMessage}</Text>
          </View>
        )}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-2">
            {/* <FormField
              title="Full Name"
              editable={true}
              placeholder="enter your name..."
              value={formValues?.fullName}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, fullName: text })
              }
            /> */}
            {/* <FormField
              title="Phone"
              placeholder="enter phone number..."
              editable={true}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, phone: text })
              }
              value={formValues?.phoneNumber}
            /> */}
            {/* <FormField
              title="E-Mail"
              placeholder="enter email..."
              editable={true}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, email: text })
              }
              value={formValues?.email}
            /> */}
            {/* <CustomWideButton
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
            /> */}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            {/* {changePasswordVisible && (
              <> */}
            <FormField
              title="Old Password"
              placeholder="password"
              HandleHidePassword={() =>
                setHidePassword({
                  ...hidePassword,
                  oldPassword: !hidePassword.oldPassword,
                })
              }
              hidePassword={hidePassword.oldPassword}
              editable={true}
              handleOnChangeText={(text) =>
                setPasswordValues({ ...passwordValues, oldPassword: text })
              }
              value={passwordValues.oldPassword}
            />
            {formFieldErrorMessage?.title === "oldPassword" &&
              !passwordValues.oldPassword && (
                <Text className="font-pregular text-sm text-red-600">
                  {formFieldErrorMessage?.message}
                </Text>
              )}
            <FormField
              title="New Password"
              placeholder="password"
              HandleHidePassword={() =>
                setHidePassword({
                  ...hidePassword,
                  newPassword: !hidePassword.newPassword,
                })
              }
              hidePassword={hidePassword.newPassword}
              editable={true}
              handleOnChangeText={(text) =>
                setPasswordValues({ ...passwordValues, newPassword: text })
              }
              value={passwordValues.newPassword}
            />
            {formFieldErrorMessage?.title === "newPassword" &&
              !passwordValues.newPassword && (
                <Text className="font-pregular text-sm text-red-600">
                  {formFieldErrorMessage?.message}
                </Text>
              )}
            <FormField
              title="Comfirm Password"
              placeholder="password"
              editable={true}
              HandleHidePassword={() =>
                setHidePassword({
                  ...hidePassword,
                  comfirmPassword: !hidePassword.comfirmPassword,
                })
              }
              hidePassword={hidePassword.comfirmPassword}
              handleOnChangeText={(text) =>
                setPasswordValues({ ...passwordValues, comfirmPassword: text })
              }
              value={passwordValues.comfirmPassword}
            />
            {formFieldErrorMessage?.title === "comfirmPassword" &&
              !passwordValues.comfirmPassword && (
                <Text className="font-pregular text-sm text-red-600">
                  {formFieldErrorMessage?.message}
                </Text>
              )}
            <CustomWideButton
              title="Save Changes"
              styles="mt-10"
              handlePress={updatePassword}
              inactive={
                !(passwordValues.newPassword && passwordValues.oldPassword)
              }
            />
            {/* </>
            )} */}
          </View>
        </ScrollView>
      </MaxWidthWrapper>
      {isLoading && <LoadingAnimation isLoading={isLoading} />}
    </SafeAreaView>
  );
};

export default EditDetails;

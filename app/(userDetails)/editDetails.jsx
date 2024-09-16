import { View, Text, TouchableOpacity } from "react-native";
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
      .then((res) =>
        // console.log(res.data)
        setFormValues({
          ...formValues,
          fullName: res?.data?.fullname,
          phoneNumber: res?.data?.phone,
          email: res?.data?.email,
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <MaxWidthWrapper>
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => router.push("/viewDetails")}
        >
          <Ionicons name="chevron-back-circle" size={40} color="blue" />
          <Text className="text-lg font-psemibold">Edit Details</Text>
        </TouchableOpacity>
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
        />
        <TouchableOpacity
          className="mt-10 w-full h-10 bg-blue-600  rounded-xl items-center justify-between px-4 flex-row"
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
              editable={false}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, oldPassword: text })
              }
              value={formValues?.phone}
            />
            <FormField
              title="New Password"
              placeholder="passw"
              editable={false}
              handleOnChangeText={(text) =>
                setFormValues({ ...formValues, newPassword: text })
              }
              value={formValues?.phone}
            />
            <CustomWideButton title="Save Changes" styles="mt-10" />
          </>
        )}
      </MaxWidthWrapper>
    </SafeAreaView>
  );
};

export default EditDetails;

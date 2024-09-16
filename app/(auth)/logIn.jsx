import { View, Text, ScrollView, Alert, Modal, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import Header from "../../components/header";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import FormField from "../../components/formField";
import { baseUrl } from "../../constants/baseUrl";

const LogIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggingIn, setIsLogging] = useState(false);

  const lognIn = async () => {
    setIsLogging(true);
    try {
      let suffientInfo = true;
      for (const key in formValues) {
        if (!formValues[key]) {
          setErrorMessage(`${key} can not be empty`);
          suffientInfo = false;
          break;
        }
      }

      if (suffientInfo) {
        await axios
          .post(`${baseUrl}/auth/login/`, formValues)
          .then(async (res) => {
            if (res.status === 200) {
              const { access_token, role } = res.data; // Expecting role and token from backend

              // Save the token in local storage
              await AsyncStorage.setItem("idsrtoken", access_token);

              setIsLogging(false);
              // Set success message
              setSuccessMessage("Login successful! Redirecting...");

              // Redirect based on user role
              setTimeout(() => {
                router.replace("/chat"); // Customize your HSA dashboard route
              }, 2000); // Redirect after 2 seconds
            }
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              const errorResponse = error.response?.data;

              // Handle error response and display messages
              if (
                typeof errorResponse === "object" &&
                (errorResponse?.detail || errorResponse?.detail[0]?.msg)
              ) {
                setErrorMessage(
                  (errorResponse?.detail && errorResponse?.detail[0]?.msg) ||
                    errorResponse?.detail ||
                    "Signup failed. Please try again."
                );
              } else {
                setErrorMessage("Signup failed. Please try again.");
              }
            } else {
              setErrorMessage("An unexpected error occurred.");
            }
          }).finally(() => setIsLogging(false))
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong", "please try again");
    } finally {
      setIsLogging(false)
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <Header showHeader={false} />
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center justify-center mt-[50%]">
            <View className="w-full p-4 rounded-xl border-4 border-gray-200">
              <Text
                className="text-xl font-psemibold text-center mb-4 text-blue-600"
                numberOfLines={1}
              >
                Log In
              </Text>
              {successMessage && (
                <View className="bg-green-100 text-green-700 p-2 rounded my-2 text-center">
                  <Text className="text-base font-pregular">
                    {successMessage}
                  </Text>
                </View>
              )}

              {errorMessage && (
                <View className="bg-red-100 text-red-700 p-2 rounded my-2 text-center">
                  <Text className="text-base font-pregular">
                    {errorMessage}
                  </Text>
                </View>
              )}
              <FormField
                title="E-mail"
                placeholder="enter email.."
                editable={true}
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, email: text })
                }
                value={formValues.fullName}
              />
              <FormField
                title="Password"
                placeholder="password"
                editable={true}
                hidePassword={hidePassword}
                HandleHidePassword={() => setHidePassword(!hidePassword)}
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, password: text })
                }
                value={formValues.password}
              />
              <CustomWideButton
                title="Log In"
                styles="mt-4"
                handlePress={lognIn}
                disabled={isLoggingIn}
                inactive={!(formValues.email && formValues.password)}
              />
              <Text className="text-center text-lg mt-4 mb-4 font-pregular">
                Don't have an account?{" "}
                <Link className="text-blue-600" href="/createAccount">
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </MaxWidthWrapper>
      {isLoggingIn && (
        <Modal animationType="fade" visible={isLoggingIn} transparent>
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Text className="text-primary text-xl tex-center font-psemibold">
              Logging In...
            </Text>
            <ActivityIndicator color={"green"} size="large" />
          </View>
        </Modal>
      )}
      <StatusBar backgroundColor="white" style="dark" />
    </SafeAreaView>
  );
};

export default LogIn;

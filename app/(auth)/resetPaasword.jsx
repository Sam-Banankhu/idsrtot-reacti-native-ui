import {
  View,
  Text,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import FormField from "../../components/formField";
import Header from "../../components/header";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import { baseUrl } from "../../constants/baseUrl";
import CustomWideButton from "../../components/customWideButton";
import LoadingAnimation from "../../components/loadingAnimation";

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    comfirmPassword: "",
  });

  const { otp, email } = useLocalSearchParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isResetingPassword, setisResetingPassword] = useState(false);
  const [formFieldErrorMessage, setFormFieldErrorMessage] = useState({});
  const [hidePassword, setHidePassword] = useState({
    newPassword: true,
    comfirmPassword: true,
  });
  const placeHolderText = {
    newPassword: "New Password",
    comfirmPassword: "Comfirm Password",
  };

  const resetPassword = async () => {
    setisResetingPassword(true);
    try {
      let suffientInfo = true;
      for (const key in formValues) {
        if (!formValues[key]) {
          //   Alert.alert("Insufficient Info", `${key} can not be empty`);
          setFormFieldErrorMessage({
            title: key,
            message: `${placeHolderText[key]} can not be empty`,
          });
          suffientInfo = false;
          break;
        }
      }

      if (suffientInfo) {
        if (formValues?.newPassword?.length > 6) {
          if (formValues.comfirmPassword === formValues.newPassword) {
            const payload = {
              email: email,
              otp: otp,
              new_password: formValues.newPassword,
              confirm_password: formValues.comfirmPassword,
            };

            await axios
              .post(`${baseUrl}/auth/claim-account/`, payload)
              .then(async (res) => {
                if (res.status === 200) {
                  setSuccessMessage(
                    "Account Successfuly claimed!! Redirecting to login..."
                  );
                  setTimeout(() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    router.push("/logIn");
                  }, 500);
                }
              })
              .catch((error) => {
                console.log(error);
                if (axios.isAxiosError(error)) {
                  const errorResponse = error.response?.data;

                  // Handle error response and display messages
                  if (
                    typeof errorResponse === "object" &&
                    (errorResponse?.detail || errorResponse?.detail[0]?.msg)
                  ) {
                    setErrorMessage(
                      (errorResponse?.detail &&
                        errorResponse?.detail[0]?.msg) ||
                        errorResponse?.detail ||
                        "Account claim failed!!. Please try again."
                    );
                  } else {
                    setErrorMessage(
                      "Account claim failed!!. Please try again."
                    );
                  }
                } else {
                  setErrorMessage("An unexpected error occurred.");
                }
              })
              .finally(() => setisResetingPassword(false));
          } else {
            setErrorMessage("Passwords does not match!!");
          }
        } else {
          setErrorMessage("Password has to be 6 characters or more");
        }
      }
    } catch (error) {
      Alert.alert("Something went wrong", "please try again");
    } finally {
      setisResetingPassword(false);
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
          <View className="w-full items-center justify-center mt-[30%]">
            <View className="w-full p-4 rounded-xl border-4 border-gray-200">
              <Text
                className="text-xl font-psemibold text-center mb-4 text-blue-600"
                numberOfLines={1}
              >
                Reset Password
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
                title="New Password"
                placeholder="password"
                editable={true}
                hidePassword={hidePassword.newPassword}
                HandleHidePassword={() =>
                  setHidePassword({
                    ...hidePassword,
                    newPassword: !hidePassword.newPassword,
                  })
                }
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, newPassword: text })
                }
                value={formValues.newPassword}
              />
              {formFieldErrorMessage.title === "newPassword" &&
                !formValues.newPassword && (
                  <Text className="font-pregular text-sm text-red-600">
                    {formFieldErrorMessage?.message}
                  </Text>
                )}
              <FormField
                title="Comfirm Password"
                placeholder="password"
                editable={true}
                hidePassword={hidePassword.comfirmPassword}
                HandleHidePassword={() =>
                  setHidePassword({
                    ...hidePassword,
                    comfirmPassword: !hidePassword.comfirmPassword,
                  })
                }
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, comfirmPassword: text })
                }
                value={formValues.comfirmPassword}
              />
              {formFieldErrorMessage.title === "comfirmPassword" &&
                !formValues.comfirmPassword && (
                  <Text className="font-pregular text-sm text-red-600">
                    {formFieldErrorMessage?.message}
                  </Text>
                )}
              <CustomWideButton
                title="Reset Password"
                styles="mt-4"
                handlePress={resetPassword}
                disabled={isResetingPassword}
                inactive={
                  !(formValues.newPassword && formValues.comfirmPassword)
                }
              />
            </View>
          </View>
        </ScrollView>
      </MaxWidthWrapper>
      <StatusBar backgroundColor="white" style="dark" />
      {isResetingPassword && (
        <LoadingAnimation isLoading={isResetingPassword}/>
      )}
    </SafeAreaView>
  );
};

export default ResetPassword;

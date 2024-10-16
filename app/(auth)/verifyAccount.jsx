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
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import FormField from "../../components/formField";
import Header from "../../components/header";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import { baseUrl } from "../../constants/baseUrl";
import CustomWideButton from "../../components/customWideButton";
import LoadingAnimation from "../../components/loadingAnimation";

const CreateAccount = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    otp: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isVerifyingAccount, setisVerifyingAccount] = useState(false);
  const [formFieldErrorMessage, setFormFieldErrorMessage] = useState({});

  const verifyAccount = async () => {
    setisVerifyingAccount(true);
    try {
      let suffientInfo = true;
      for (const key in formValues) {
        console.log(key);
        if (!formValues[key]) {
          // Alert.alert("Insufficient Info", `${key} can not be empty`);
          setFormFieldErrorMessage({
            title: key,
            message: `${key} can not be empty`,
          });
          suffientInfo = false;
          break;
        }
      }
      console.log(formValues?.otp?.trim()?.length)
      if (formValues?.otp?.trim()?.length === 6) {
        if (suffientInfo) {
          const payload = {
            email: formValues.email,
            otp: formValues?.otp?.trim(),
          };
          await axios
            .post(`${baseUrl}/auth/verify-otp/`, payload)
            .then(async (res) => {
              console.log(res.data);
              if (res.status === 200) {
                setErrorMessage("");
                setSuccessMessage("Verification successful!!");
                setTimeout(() => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  router.push({
                    pathname: "/resetPaasword",
                    params: { email: formValues.email, otp: formValues.otp?.trim() },
                  });
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
                    (errorResponse?.detail && errorResponse?.detail[0]?.msg) ||
                      errorResponse?.detail ||
                      "Verification failed!!! Please try again."
                  );
                } else {
                  setErrorMessage("Verification failed!!! Please try again.");
                }
              } else {
                setErrorMessage("An unexpected error occurred.");
              }
            })
            .finally(() => setisVerifyingAccount(false));
        }
      } else {
        setErrorMessage("OTP has to be 6 characters");
      }
    } catch (error) {
      Alert.alert("Something went wrong", "please try again");
    } finally {
      setisVerifyingAccount(false);
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
                Verify Account
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
                title="Email"
                placeholder="enter email..."
                editable={true}
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, email: text })
                }
                value={formValues.email}
              />
              {formFieldErrorMessage.title === "email" && !formValues.email && (
                <Text className="font-pregular text-base text-red-600">
                  {formFieldErrorMessage?.message}
                </Text>
              )}
              <FormField
                title="OTP"
                placeholder="enter otp..."
                editable={true}
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, otp: text })
                }
                value={formValues.otp}
              />
              {formFieldErrorMessage.title === "otp" && !formValues.otp && (
                <Text className="font-pregular text-base text-red-600">
                  {formFieldErrorMessage?.message}
                </Text>
              )}
              <CustomWideButton
                title="Verify account"
                styles="mt-4"
                // handlePress={() => router.push('/resetPaasword')}
                handlePress={verifyAccount}
                disabled={isVerifyingAccount}
                inactive={!(formValues.email && formValues.otp)}
              />
              <Text className="text-center text-lg mt-4 mb-4 font-pregular">
                Already have an account?{" "}
                <Link className="text-blue-600" href="/logIn">
                  Log In
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </MaxWidthWrapper>
      <StatusBar backgroundColor="white" style="dark" />
      {isVerifyingAccount && (
        <LoadingAnimation isLoading={isVerifyingAccount}/>
      )}
    </SafeAreaView>
  );
};

export default CreateAccount;

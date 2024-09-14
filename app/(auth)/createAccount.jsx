import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, router } from "expo-router";

import FormField from "../../components/formField";
import Header from "../../components/header";
import MaxWidthWrapper from "../../components/maxWidthWrapper";
import PickerComponent from "../../components/pickerComponent";
import { baseUrl } from "../../constants/baseUrl";
import CustomWideButton from "../../components/customWideButton";

const CreateAccount = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "hsa",
    district: "",
    facility: "",
  });

  const [formIds, setFormIds] = useState({
    discrictId: "",
    facilityId: "",
  });

  const [districtData, setDistrictData] = useState([]);
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchDistricts = async () => {
    try {
      await axios
        .get(`${baseUrl}/location/districts/`)
        .then((res) => {
          let discricts = res?.data;
          discricts?.unshift({ id: "", name: "" });
          setDistrictData(discricts);
        })
        .catch((error) => setDistrictData([]));
    } catch (error) {
      setDistrictData([]);
    }
  };

  const fetchFacilities = async (districtId) => {
    try {
      await axios
        .post(`${baseUrl}/location/facilities/by_district`, {
          district_id: formValues.district,
        })
        .then((res) => {
          let facilities = res?.data;
          facilities?.unshift({ id: "", name: "" });
          setFacilitiesData(facilities);
        })
        .catch((error) => setFacilitiesData([]));
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    fetchFacilities();
  }, [formValues.district]);

  const createAccount = async () => {
    try {
      let suffientInfo = true;
      for (const key in formValues) {
        if (!formValues[key]) {
          Alert.alert("Insufficient Info", `${key} can not be empty`);
          suffientInfo = false;
          break;
        }
      }

      if (suffientInfo) {
        const payload = {
          fullname: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
          role: formValues.role,
          facility_id: formValues.facility,
        };
        await axios
          .post(`${baseUrl}/auth/signup/`, payload)
          .then((res) => {
            if (res.status === 201) {
              setSuccessMessage("Signup successful! Redirecting to login...");
              setTimeout(() => {
                router.push("/logIn");
              }, 2000);
            }
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              const errorResponse = error.response?.data;

              // Handle error response and display messages
              if (typeof errorResponse === "object" && ( errorResponse?.detail || errorResponse?.detail[0]?.msg)) {
                setErrorMessage(
                  errorResponse?.detail && errorResponse?.detail[0]?.msg || errorResponse?.detail || "Signup failed. Please try again."
                );
              } else {
                setErrorMessage("Signup failed. Please try again.");
              }
            } else {
              setErrorMessage("An unexpected error occurred.");
            }
          });
      }
    } catch (error) {
      Alert.alert("Something went wrong", "please try again");
    }
  };

  const [hidePassword, setHidePassword] = useState(true);
  return (
    <SafeAreaView className="h-full bg-white">
      <Header showHeader={false} />
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center justify-center mt-20">
            <View className="w-full p-4 rounded-xl" style={{ elevation: 2 }}>
              <Text
                className="text-xl font-psemibold text-center mb-4"
                numberOfLines={1}
              >
                Create an Account
              </Text>
              {successMessage && (
                <View className="bg-green-100 text-green-700 p-2 rounded my-2 text-center">
                  <Text className='text-base font-pregular'>{successMessage}</Text>
                </View>
              )}

              {errorMessage && (
                <View className="bg-red-100 text-red-700 p-2 rounded my-2 text-center">
                  <Text className='text-base font-pregular'>{errorMessage}</Text>
                </View>
              )}
              <FormField
                title="Full Name"
                placeholder="enter full name.."
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, fullName: text })
                }
                value={formValues.fullName}
              />
              <FormField
                title="Email"
                placeholder="enter email..."
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, email: text })
                }
                value={formValues.email}
              />
              <FormField
                title="Phone"
                placeholder="enter phone number..."
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, phone: text })
                }
                value={formValues.phone}
              />
              <PickerComponent
                data={districtData}
                prompt="Select Discrict"
                selectedValue={formValues.district}
                title={"Select District"}
                handleSelectValue={(value) => {
                  setFormValues({ ...formValues, district: value });
                }}
              />
              {formValues.district && (
                <PickerComponent
                  data={facilitiesData}
                  prompt="Select Facility"
                  selectedValue={formValues.facility}
                  title={"Select Facility"}
                  handleSelectValue={(value) => {
                    setFormValues({ ...formValues, facility: value });
                  }}
                />
              )}
              <FormField
                title="Password"
                placeholder="password"
                hidePassword={hidePassword}
                HandleHidePassword={() => setHidePassword(!hidePassword)}
                handleOnChangeText={(text) =>
                  setFormValues({ ...formValues, password: text })
                }
                value={formValues.password}
              />
              <CustomWideButton
                title="Sign Up"
                styles="mt-4"
                handlePress={createAccount}
                disabled={
                  !(
                    formValues.district &&
                    formValues.email &&
                    formValues.facility &&
                    formValues.fullName &&
                    formValues.password &&
                    formValues.phone &&
                    formValues.role
                  )
                }
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
    </SafeAreaView>
  );
};

export default CreateAccount;

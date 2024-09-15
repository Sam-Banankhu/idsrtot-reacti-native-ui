import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Touchable,
  Pressable,
} from "react-native";
import React from "react";
import images from "../constants/images";
import FormField from "./formField";
import CustomWideButton from "./customWideButton";

const ProfileComponent = ({
  handleClose,
  displayModal,
  formValues,
  setFormValues,
  handleLogOut,
}) => {
  const { height } = Dimensions.get("window");
  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      visible={displayModal}
      transparent
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={handleClose}
      >
        <View
          className="w-[90%] bg-white p-4 rounded-3xl items-center"
          style={{ maxHeight: height / 1.5 }}
        >
          <Image
            source={images.profile}
            resizeMode="contain"
            className="h-20 w-20 rounded-full"
          />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
            className="w-full p-2"
          >
            <View className="w-full p-2">
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
                value={formValues?.phone}
              />
              <Pressable>
                <FormField
                  title="Role"
                  placeholder="role..."
                  value={formValues?.role}
                  editable={false}
                />
              </Pressable>
              <Pressable>
                <FormField
                  title="District"
                  placeholder="district..."
                  editable={false}
                  value={formValues?.district}
                />
              </Pressable>
              <Pressable>
                <FormField
                  title="Facility"
                  placeholder="facility..."
                  editable={false}
                  value={formValues?.facility}
                />
              </Pressable>
              <CustomWideButton
                title="Log Out"
                styles="mt-8"
                handlePress={handleLogOut}
              />
            </View>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ProfileComponent;

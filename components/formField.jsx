import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default FormField = ({
  title,
  placeholder,
  hidePassword,
  HandleHidePassword,
  value,
  handleOnChangeText,
}) => {
  return (
    <View className="mt-4">
      <Text className="text-gray-600 text-base font-psemibold">
        {title || placeholder}
      </Text>
      <View
        className="w-full h-12 bg-white rounded-xl mt-1 px-4 flex-row"
        style={{ elevation: 10 }}
      >
        <TextInput
          className="text-lg h-full w-[85%] text-black"
          cursorColor="gray"
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={value}
          keyboardType={
            placeholder === "enter phone number..."
              ? "phone-pad"
              : placeholder === "enter phone number..."
              ? "email-address"
              : "default"
          }
          onChangeText={handleOnChangeText}
          secureTextEntry={
            placeholder === "password" && hidePassword ? true : false
          }
        />
        {placeholder === "password" && (
          <TouchableOpacity
            className="h-full items-center justify-center w-[15%]"
            onPress={HandleHidePassword}
          >
            <MaterialCommunityIcons
              name={hidePassword ? "eye-off" : "eye"}
              size={32}
              color={"gray"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

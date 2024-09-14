import { Text, TouchableOpacity } from "react-native";

export default CustomWideButton = ({
  styles,
  title,
  handlePress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={` ${
        disabled ? "bg-gray-500" : "bg-blue-600"
      }  w-full h-10 rounded-xl justify-center items-center ${styles}`}
      onPress={handlePress}
    >
      <Text className="font-psemibold text-base text-gray-200">{title}</Text>
    </TouchableOpacity>
  );
};

import { Text, TouchableOpacity } from "react-native";

export default CustomWideButton = ({
  styles,
  title,
  handlePress,
  inactive,
  disabled
}) => {
  return (
    <TouchableOpacity
      className={` ${
        inactive ? "bg-blue-300" : "bg-blue-500"
      }  w-full h-10 rounded-xl justify-center items-center ${styles}`}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text className="font-psemibold text-base text-gray-200">{title}</Text>
    </TouchableOpacity>
  );
};

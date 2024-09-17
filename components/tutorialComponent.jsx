import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const TurtorialComponent = ({ displayTurtorial, handlePress  }) => {
  return (
    <Modal animationType="fade" visible={displayTurtorial} transparent>
      <View
        className="flex-1 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <View className="w-full h-14 bg-transparent flex-row items-center justify-around">
          <TouchableOpacity
            className="flex-row gap-2 items-center w-[65%]"
              onPress={handlePress}
          >
            <View className="bg-blue-500 rounded-lg px-2 py-1">
              <AntDesign name="edit" size={20} color="white" />
            </View>
            <Text
              className="text-xl font-psemibold text-white"
              numberOfLines={1}
            >
              {"Select a Topic"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="account-circle"
              size={30}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View className="w-[50%] px-4 items-center justify-center">
          <MaterialCommunityIcons
            name="arrow-up-bold"
            size={30}
            color="green"
          />
          <Text className="text-center text-lg text-white font-pregular">
            To get started select a topic first
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default TurtorialComponent;

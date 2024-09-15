import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const SelectTopics = ({
  handleClose,
  data,
  displayModal,
  currentTopic,
  title,
  handleSelectTopic,
}) => {
  const { height } = Dimensions.get("window");
  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      visible={displayModal}
      transparent
    >
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onPress={handleClose}
      >
        <View
          className="w-[90%] bg-white p-4 rounded-3xl"
          style={{ maxHeight: height / 1.5 }}
        >
          <Text
            className="mt-4 text-2xl font-psemibold text-blue"
            numberOfLines={1}
          >
            {title}
          </Text>
          <View className="w-full border-b border-b-gray-700 mt-2" />
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="mt-4">
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  className="px-2 py-4 w-full mt-2 border-l-2 border-l-blue-600 flex-row items-center justify-around"
                  onPress={() => {
                    handleSelectTopic(item);   
                    handleClose();
                  }}
                  style={{ elevation: 2 }}
                >
                  <Text className="text-base font-pregular w-[85%]">
                    {item?.name}
                  </Text>
                  {currentTopic?.name === item?.name && (
                    <View className="w-[10%]">
                      <AntDesign name="checkcircle" size={32} color="#3B82F6" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SelectTopics;

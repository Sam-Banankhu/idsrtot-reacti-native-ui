import { View, Modal, ActivityIndicator } from "react-native";

const LoadingAnimation = ({ isLoading }) => {
  return (
    <Modal animationType="fade" visible={isLoading} transparent>
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <ActivityIndicator color={"#3B82F6"} size="large" />
      </View>
    </Modal>
  );
};

export default LoadingAnimation;

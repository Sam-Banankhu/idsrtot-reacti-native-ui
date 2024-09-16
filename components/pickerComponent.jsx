import { Picker } from "@react-native-picker/picker";

import { View, Text, Alert } from "react-native";

const PickerComponent = ({
  prompt,
  selectedValue,
  handleSelectValue,
  data,
  title,
}) => {
  return (
    <>
      {title && (
        <Text className="text-gray-600 text-base font-psemibold mt-4">
          {title}
        </Text>
      )}
      <View className="bg-white rounded-2xl" style={{ elevation: 10 }}>
        <Picker
          prompt={prompt}
          dropdownIconColor={"blue"}
          selectedValue={selectedValue}
          style={{
            color: "black",
          }}
          onValueChange={handleSelectValue}
        >
          {data?.map((item) => (
            <Picker.Item label={item?.name} value={item?.id} key={item?.name} />
          ))}
        </Picker>
      </View>
    </>
  );
};

export default PickerComponent;

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";

import MaxWidthWrapper from "../../components/maxWidthWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";

const Chat = () => {
  const scrollViewRef = useRef(null);

  const [prompt, setPrompt] = useState("");

  return (
    <SafeAreaView className="h-full bg-white relative">
      <View className="w-full h-14 border-b border-b-gray-200 bg-transparent flex-row items-center justify-around">
        <Text className="text-2xl font-psemibold w-[60%]">Topic</Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg"
          style={{ elevation: 10 }}
        >
          <Text className="px-3 py-1 text-white font-psemibold">
            Change Topic
          </Text>
        </TouchableOpacity>
      </View>
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: false })
          }
        ></ScrollView>
      </MaxWidthWrapper>
      <View className="absolute bottom-6 w-full px-2">
        <View
          className="w-full flex-row p-2 justify-around items-center rounded-lg"
          style={{ elevation: 2 }}
        >
          <TextInput
            className="w-[80%] p-2 max-h-24 text-lg font-pregular"
            multiline
            placeholder="Send a message"
            autoFocus
            cursorColor={"blue"}
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
          />
          <TouchableOpacity
            className="w-[12%] h-10 bg-blue-600 rounded-lg items-center justify-center"
            style={{ elevation: 2 }}
          >
            <MaterialCommunityIcons name="send" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-center text-gray-500 mt-4 text-base">
          © 2024 IDSRTutor. All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

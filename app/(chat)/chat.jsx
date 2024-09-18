import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import MaxWidthWrapper from "../../components/maxWidthWrapper";
import SelectTopics from "../../components/selectTopics";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import TurtorialComponent from "../../components/tutorialComponent";
import { useTopicContext } from "../../context/topicContext";

const Chat = () => {
  const scrollViewRef = useRef(null);

  const { currentTopic, setCurrentTopic } = useTopicContext();

  const [prompt, setPrompt] = useState("");
  // const [selectedTopic, setSelectedTopic] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const [formValues, setFormValues] = useState({
    fullName: "Moth",
    phone: "08878778",
    role: "hsa",
    district: "Zomba",
    facility: "Zomba Central Hospital",
  });

  useEffect(() => {
    const fetchSections = async () => {
      setIsLoading(true);
      axios
        .get(`${baseUrl}/hsa/sections/`)
        .then((res) => setSections(res.data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    };
    fetchSections();
  }, []);

  return (
    <SafeAreaView className="h-full bg-white relative">
      <View className="w-full h-14 border-b border-b-gray-200 bg-transparent flex-row items-center justify-around">
        <TouchableOpacity
          className="flex-row gap-2 items-center w-[65%]"
          onPress={() => setDisplayModal(true)}
        >
          <View className="bg-blue-500 rounded-lg px-2 py-1">
            <AntDesign name="edit" size={20} color="white" />
          </View>
          <Text className="text-xl font-psemibold" numberOfLines={1}>
            {currentTopic?.name || "Select a Topic"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/viewDetails")}>
          <MaterialCommunityIcons
            name="account-circle"
            size={30}
            color="gray"
          />
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
        <View className="w-full flex-row p-2 justify-around items-center rounded-lg border-2 border-gray-200">
          <TextInput
            className="w-[80%] p-2 max-h-24 text-lg font-pregular"
            multiline
            placeholder="Send a message"
            cursorColor="#3B82F6"
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
          />
          <TouchableOpacity
            className="w-[12%] h-10 rounded-lg items-center justify-center"
            disabled={!prompt}
            onPress={() => console.log(prompt)}
          >
            <MaterialCommunityIcons name="send" size={30} color={prompt ? "#3B82F6": "#93C5FD"} />
          </TouchableOpacity>
        </View>
        <Text className="text-center text-gray-500 mt-4 text-base">
          © 2024 IDSRTutor. All Rights Reserved
        </Text>
      </View>
      <StatusBar backgroundColor="white" style="dark" />
      {displayModal && (
        <SelectTopics
          title="Select Topic"
          handleClose={() => setDisplayModal(false)}
          data={sections}
          currentTopic={currentTopic}
          handleSelectTopic={(item) => setCurrentTopic(item)}
        />
      )}
      {!currentTopic?.name && !isLoading && (
        <TurtorialComponent
          displayTurtorial={!currentTopic?.name}
          handlePress={() => {
            setDisplayModal(true);
          }}
        />
      )}

      {isLoading && (
        <Modal animationType="fade" visible={isLoading} transparent>
          <View
            className="flex-1 items-center justify-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <Text className="text-blue-600 text-lg tex-center font-psemibold">
              Loading...
            </Text>
            <ActivityIndicator color={"#3B82F6"} size="large" />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Chat;

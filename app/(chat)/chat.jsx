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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import MaxWidthWrapper from "../../components/maxWidthWrapper";
import SelectTopics from "../../components/selectTopics";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

const Chat = () => {
  const scrollViewRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [selectedTopic, setSelectedTopic] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

// Fetch sections on component mount
useEffect(() => {
  const fetchSections = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("idsrtoken");
      const response = await axios.get(`${baseUrl}/sections/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSections(response.data);
    } catch (error) {
      console.log("Error fetching sections", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchSections();
}, []);

  // Handle sending the query
  const handleSendQuery = async () => {
    if (!selectedTopic.id) {
      alert("Please select a section/topic first");
      return;
    }
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("idsrtoken");
      const res = await axios.post(
        `${baseUrl}/hsa/ask`,
        {
          section_id: selectedTopic.id,
          question: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChatHistory([
        ...chatHistory,
        { question: prompt, response: res.data.answer, timestamp: new Date() },
      ]);

      // Set recent chats
      setChatHistory((prev) => [
        ...prev,
        ...res.data.recent_chats.map((chat) => ({
          question: chat.question,
          response: chat.response,
          timestamp: chat.timestamp,
        })),
      ]);
    } catch (error) {
      console.log(error);
      alert("Failed to send the query. Please try again.");
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("idsrtoken");
    router.replace("/logIn");
  };

  return (
    <SafeAreaView className="h-full bg-white relative">
      {/* Header */}
      <View className="w-full h-14 border-b border-b-gray-200 bg-transparent flex-row items-center justify-around">
        <TouchableOpacity
          className="flex-row gap-2 items-center w-[65%]"
          onPress={() => setDisplayModal(true)}
        >
          <View className="bg-gray-500 rounded-lg px-2 py-1">
            <AntDesign name="edit" size={20} color="white" />
          </View>
          <Text className="text-xl font-psemibold" numberOfLines={1}>
            {selectedTopic?.name || "Select a Topic"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons name="account-circle" size={30} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Chat History */}
      <MaxWidthWrapper>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: false })
          }
        >
          {chatHistory.map((chat, index) => (
            <View key={index} className="mb-4">
              <Text className="font-semibold">You: {chat.question}</Text>
              <Text className="italic">AI: {chat.response}</Text>
            </View>
          ))}
        </ScrollView>
      </MaxWidthWrapper>

      {/* Input Area */}
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
            className="w-[12%] h-10 bg-blue-500 rounded-lg items-center justify-center"
            style={{ elevation: 2 }}
            onPress={handleSendQuery}
          >
            <MaterialCommunityIcons name="send" size={30} color="white" />
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
          currentTopic={selectedTopic}
          handleSelectTopic={(item) => setSelectedTopic(item)}
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

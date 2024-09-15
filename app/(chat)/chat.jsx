import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import MaxWidthWrapper from "../../components/maxWidthWrapper";
import SelectTopics from "../../components/selectTopics";
import ProfileComponent from "../../components/profileComponent";

const Chat = () => {
  const scrollViewRef = useRef(null);

  const [prompt, setPrompt] = useState("");
  const [selectedTopic, setSelectedTopic] = useState({
    id: "1",
    name: "Introduction",
  });
  const [displayModal, setDisplayModal] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: "Moth",
    phone: "08878778",
    role: "hsa",
    district: "Zomba",
    facility: "Zomba Central Hospital",
  });

  const logout = async () => {
    await AsyncStorage.removeItem("idsrtoken");
    router.replace("/logIn");
  };

  return (
    <SafeAreaView className="h-full bg-white relative">
      <View className="w-full h-14 border-b border-b-gray-200 bg-transparent flex-row items-center justify-around">
        <TouchableOpacity className="flex-row gap-2 items-center w-[65%]" onPress={() => setDisplayModal(true)}>
          <View
            className="bg-black rounded-lg px-2 py-1"
            style={{ elevation: 10 }}
          >
            <AntDesign name="edit" size={20} color="white" />
          </View>
          <Text className="text-xl font-psemibold" numberOfLines={1}>
            {selectedTopic?.name || "Select a Topic"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setViewProfile(true)}>
          <MaterialCommunityIcons
            name="account-circle"
            size={30}
            color="#3B82F6"
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
        <View
          className="w-full flex-row p-2 justify-around items-center rounded-lg"
          style={{ elevation: 2 }}
        >
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
          data={[
            { id: "1", name: "Introduction" },
            { id: "2", name: "Section 1" },
            { id: "3", name: "Section 2" },
            { id: "4", name: "Section 3" },
            { id: "2", name: "Section 4" },
            { id: "3", name: "Section 5" },
            { id: "4", name: "Section 6" },
            { id: "2", name: "Section 7" },
            { id: "3", name: "Section 8" },
            { id: "4", name: "Section 9" },
            { id: "2", name: "Section 10" },
          ]}
          currentTopic={selectedTopic}
          handleSelectTopic={(item) => setSelectedTopic(item)}
        />
      )}
      {viewProfile && (
        <ProfileComponent
          displayModal={viewProfile}
          formValues={formValues}
          setFormValues={setFormValues}
          handleClose={() => setViewProfile(false)}
          handleLogOut={logout}
        />
      )}
    </SafeAreaView>
  );
};

export default Chat;

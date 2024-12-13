import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Markdown from "react-native-markdown-display";

import MaxWidthWrapper from "../../components/maxWidthWrapper";
import SelectTopics from "../../components/selectTopics";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { useTopicContext } from "../../context/topicContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from "../../constants/images";
import LoadingAnimation from "../../components/loadingAnimation";

const Chat = () => {
  const scrollViewRef = useRef(null);

  const { currentTopic, setCurrentTopic, setSections, sections } =
    useTopicContext();
  const [prompt, setPrompt] = useState("");
  const [displayModal, setDisplayModal] = useState(
    !currentTopic?.name && !isLoading
  );
  const [isLoading, setIsLoading] = useState([]);
  const [isprompting, setIsPrompting] = useState(false);
  const [response, setResponse] = useState([]);
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [focused, setFocued] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      if (!sections?.length) {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("idsrtoken");
        await axios
          .get(`${baseUrl}/sections/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setSections(res.data);
          })
          .catch((error) => {
            Alert.alert("Something went wrong", "please try again");
          })
          .finally(() => setIsLoading(false));
      }
    };
    fetchSections();
  }, []);

  const promptQuery = async (prompt) => {
    setIsPrompting(true);
    setPrompt("");
    const token = await AsyncStorage.getItem("idsrtoken");
    await axios
      .post(
        `${baseUrl}/hsa/ask`,
        {
          section_id: currentTopic?.id,
          question: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((error) => {
        Alert.alert("Something went wrong", "please try again");
      })
      .finally(() => setIsPrompting(false));
  };

  useEffect(() => {
    const fetchRecentChat = async () => {
      const token = await AsyncStorage.getItem("idsrtoken");
      if (token && currentTopic?.id) {
        await axios
          .post(
            `${baseUrl}/hsa/recent-chats`,
            {
              section_id: currentTopic?.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (res) => {
            if (res.data?.recent_chats) {
              setResponse(res.data);
            } else {
              await axios
                .post(
                  `${baseUrl}/hsa/sample-questions`,
                  {
                    section_id: currentTopic?.id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  setSampleQuestions(res.data?.sample_questions);
                })
                .catch((error) => {
                  Alert.alert("Something went wrong", "please try again");
                });
            }
          })
          .catch((error) => {
            Alert.alert("Something went wrong", "please try again");
          });
      }
    };
    fetchRecentChat();
  }, [currentTopic]);

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
          contentContainerStyle={{ paddingBottom: 200 }}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: true })
          }
        >
          {sampleQuestions && (
            <View className="w-full">
              {sampleQuestions?.map((item, index) => (
                <TouchableOpacity
                  className="w-full p-8 bg-gray-100 rounded-lg mt-4"
                  key={index}
                  onPress={async () => await promptQuery(item.question)}
                >
                  <Text className="text-lg font-pregular">
                    {item?.question}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {response?.recent_chats?.map((item, index) => (
            <View className="w-full mb-8 mt-4" key={index}>
              <View className="w-full flex-row justify-end">
                <View className="w-[90%]">
                  <View className="w-full flex-row justify-end px-4">
                    <MaterialCommunityIcons name="account-circle" size={30} />
                  </View>
                  <View className="justify-end flex-row px-4">
                    <Markdown style={{ body: { fontSize: 20 } }}>
                      {item.question}
                    </Markdown>
                  </View>
                </View>
              </View>
              <View className="bg-gray-100 p-4 rounded-lg mt-2 w-[90%]">
                <View className="h-10 w-10 bg-gray-200 rounded-full">
                  <Image
                    source={images.logo}
                    className="h-full w-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-lg font-pregular">{item.response}</Text>
                <View className="w-full justify-end flex-row text-sm font-pregular mt-2">
                  <View>
                    <Text className='text-sm text-right font-pregular'>
                      {new Date(item?.timestamp?.split("T")[0]).toDateString()}
                    </Text>
                    <Text className='text-sm text-right font-pregular'>
                      {item?.timestamp
                        ?.split("T")[1]
                        ?.split(".")[0]
                        .slice(0, 5)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </MaxWidthWrapper>
      <View className="absolute bottom-0 w-full px-2 bg-white">
        <View
          className={`w-full flex-row p-2 justify-around items-center rounded-lg border-2 border-gray-200 bg-white ${
            focused && "mb-8"
          }`}
        >
          <TextInput
            className="w-[80%] p-2 max-h-24 text-lg font-pregular"
            multiline
            placeholder="Send a message"
            cursorColor="#3B82F6"
            onBlur={() => setFocued(false)}
            onFocus={() => {
              setFocued(true);
              scrollViewRef?.current?.scrollToEnd({ animated: false });
            }}
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
          />
          {isprompting ? (
            <ActivityIndicator size={"large"} color={"blue"} />
          ) : (
            <TouchableOpacity
              className={`w-[12%] h-10 rounded-lg items-center justify-center`}
              disabled={!prompt || isprompting}
              onPress={async () => await promptQuery(prompt)}
            >
              <MaterialCommunityIcons
                name="send"
                size={30}
                color={prompt ? "#3B82F6" : "#93C5FD"}
              />
            </TouchableOpacity>
          )}
        </View>
        {!focused && (
          <Text className="text-center text-gray-500 mt-2 text-base mb-2">
            © 2024 IDSRTutor. All Rights Reserved
          </Text>
        )}
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

      {isLoading && (
        <LoadingAnimation isLoading={isLoading}/>
      )}
    </SafeAreaView>
  );
};

export default Chat;

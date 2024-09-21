import { useState, createContext, useEffect, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { baseUrl } from "../constants/baseUrl";
import { useTopicContext } from "./topicContext";

const GlobalContext = createContext();

export const useLoggedInCheck = () => {
  return useContext(GlobalContext);
};

export default GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setSections } = useTopicContext();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("idsrtoken");
        if (token) {
          await axios
            .get(`${baseUrl}/sections/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setSections(res.data);
              setIsLoggedIn(true);
              setIsLoading(false);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        Alert.alert("Somehing went wrong!!", "Please try again");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

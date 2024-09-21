import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import TopicContextProvider from "../context/topicContext";
import GlobalContextProvider from "../context/useLoggedInCheck";

SplashScreen.preventAutoHideAsync();

export default RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "italic-style": require("../assets/fonts/ShinyCrystal-Yq3z4.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <TopicContextProvider>
      <GlobalContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(chat)" options={{ headerShown: false }} />
          <Stack.Screen name="(userDetails)" options={{ headerShown: false }} />
        </Stack>
      </GlobalContextProvider>
    </TopicContextProvider>
  );
};

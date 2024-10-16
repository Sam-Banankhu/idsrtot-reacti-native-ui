import { Stack } from "expo-router";

export default Chat = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="editDetails" options={{ headerShown: false }} />
      <Stack.Screen name="viewDetails" options={{ headerShown: false }} />
    </Stack>
  );
};

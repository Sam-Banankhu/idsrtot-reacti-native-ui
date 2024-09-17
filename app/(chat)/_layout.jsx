import { Stack } from "expo-router";

export default Chat = () => {
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  );
};

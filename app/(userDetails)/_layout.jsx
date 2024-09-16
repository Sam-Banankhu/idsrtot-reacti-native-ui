import { Stack } from "expo-router";

export default UserDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="editDetails" options={{ headerShown: false }} />
      <Stack.Screen name="viewDetails" options={{ headerShown: false }} />
    </Stack>
  );
};

import { Stack } from "expo-router";

export default AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="verifyAccount" options={{ headerShown: false }} />
      <Stack.Screen name="logIn" options={{ headerShown: false }} />
      <Stack.Screen name="resetPaasword" options={{ headerShown: false }} />
    </Stack>
  );
};

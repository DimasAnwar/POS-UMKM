import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "inter-regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "inter-medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "inter-bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "inter-light": require("../assets/fonts/Inter_18pt-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

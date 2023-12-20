import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import FirebaseInitializer from "../utils/FirebaseInitializer";
import { convertTheme, customTheme } from "../utils/customTheme";

//Pushes the Landing page onto the navigation stack.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function MainLayout() {
  // Identifies Dark vs. Light mode and builds a combined theme for both
  // Expo-Router and Paper
  const scheme = useColorScheme();
  const theme =
    scheme === "light"
      ? convertTheme(customTheme.light)
      : convertTheme(customTheme.dark);
  return (
    <ThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <FirebaseInitializer />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </PaperProvider>
    </ThemeProvider>
  );
}

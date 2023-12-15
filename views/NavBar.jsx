import { router } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";

import { customTheme } from "../utils/customTheme";

export default function NavBar() {
  // Converts the Appbar theme to use the same scheme as Expo-Router Tabs.
  const scheme = useColorScheme();
  let theme;
  if (scheme === "light") {
    theme = { ...customTheme.light };
    theme.colors.surface = customTheme.light.colors.elevation.level2;
  } else {
    theme = { ...customTheme.dark };
    theme.colors.surface = customTheme.dark.colors.elevation.level2;
  }
  return (
    <Appbar.Header theme={theme}>
      <Appbar.Content title="Trail Pack" />
      <Appbar.Action
        icon="account"
        onPress={() => {
          router.push("/profile");
        }}
      />
    </Appbar.Header>
  );
}

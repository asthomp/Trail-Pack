import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";

import { TPTheme } from "../utils/theme";

export default function NavBar() {
  // Converts the Appbar theme to use the same scheme as Expo-Router Tabs.
  const scheme = useColorScheme();
  let theme;
  if (scheme === "light") {
    theme = { ...TPTheme.light };
    theme.colors.surface = TPTheme.light.colors.elevation.level2;
  } else {
    theme = { ...TPTheme.dark };
    theme.colors.surface = TPTheme.dark.colors.elevation.level2;
  }
  return (
    <Appbar.Header theme={theme}>
      {router.canGoBack() ? (
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
        />
      ) : null}
      <Appbar.Content title="Trail Pack" />
      <Appbar.Action
        icon={({ size, color }) => (
          <FontAwesome
            name="user"
            size={size}
            color={color}
            style={{ textAlign: "center" }}
          />
        )}
        onPress={() => router.push("/profile")}
      />
    </Appbar.Header>
  );
}

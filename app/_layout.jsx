import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";

import NavBar from "../components/NavBar";

export const unstable_settings = {
  initialRouteName: "index",
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

export default function MainLayout() {
  const scheme = useColorScheme();

  const theme = scheme === "light" ? CombinedLightTheme : CombinedDarkTheme;
  return (
    <ThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <Tabs
          screenOptions={{
            header: () => {
              return <NavBar />;
            },
          }}
        >
          {/* Visible Routes */}
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-home" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="pack/index"
            options={{
              title: "My Pack",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="backpack" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="locker/index"
            options={{
              title: "My Gear",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="compass" size={size} color={color} />
              ),
            }}
          />
          {/* Hidden Routes */}
          <Tabs.Screen
            name="profile"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </PaperProvider>
    </ThemeProvider>
  );
}

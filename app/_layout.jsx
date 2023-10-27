import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import NavBar from "../components/NavBar";
import Firebase from "../utils/firebase";

// Converts between Paper theming and Expo-Router theming; navigation components are Expo-Router and
// aesthetic components are Paper.
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

//Pushes the Landing page onto the navigation stack.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function MainLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "light" ? CombinedLightTheme : CombinedDarkTheme;
  const x = useSafeAreaInsets();
  const app = new Firebase();
  return (
    <ThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <Tabs
          safeAreaInsets={Platform.select({
            android: { bottom: x.bottom + 10 },
            default: {},
          })}
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
                <MaterialCommunityIcons
                  name="bag-personal-outline"
                  size={size}
                  color={color}
                />
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

          <Tabs.Screen
            name="login"
            options={{
              href: null,
            }}
          />

          <Tabs.Screen
            name="signup"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </PaperProvider>
    </ThemeProvider>
  );
}

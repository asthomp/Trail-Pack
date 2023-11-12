import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import NavBar from "../../views/NavBar";

//Pushes the Landing page onto the navigation stack.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabsLayout() {
  const x = useSafeAreaInsets();
  return (
    <Tabs
      safeAreaInsets={Platform.select({
        android: { bottom: x.bottom + 10 },
        default: {},
      })}
      screenOptions={{
        header: (props) => {
          return <NavBar props={props} />;
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
        name="locker/add"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

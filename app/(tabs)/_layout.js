import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DataContextProvider from "../../utils/DataProvider";
import NavBar from "../../views/NavBar";

//Pushes the Landing page onto the navigation stack.
export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabsLayout() {
  const x = useSafeAreaInsets();
  return (
    <DataContextProvider>
      <Tabs
        safeAreaInsets={Platform.select({
          android: { bottom: x.bottom + 10 },
          default: {},
          web: { bottom: x.bottom + 10 },
        })}
        screenOptions={{
          header: (props) => {
            return <NavBar props={props} />;
          },
        }}
      >
        {/* Visible Routes */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="pack/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bag-personal-outline"
                size={size}
                color={color}
              />
            ),
            title: "My Pack",
          }}
        />
        <Tabs.Screen
          name="locker/index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="compass" size={size} color={color} />
            ),
            title: "My Gear",
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
        <Tabs.Screen
          name="locker/edit"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="locker/[itemID]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </DataContextProvider>
  );
}

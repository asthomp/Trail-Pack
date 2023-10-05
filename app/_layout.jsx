import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import NavBar from "../components/NavBar";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function MainLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          header: (props) => <NavBar {...props} />,
        }}
      />
    </PaperProvider>
  );
}

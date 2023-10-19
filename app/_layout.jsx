import { Drawer } from "expo-router/drawer";
import { PaperProvider } from "react-native-paper";

import NavBar from "../components/NavBar";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function MainDrawer() {
  return (
    <PaperProvider>
      <Drawer
        screenOptions={{
          header: () => {
            return <NavBar />;
          },
        }}
      />
    </PaperProvider>
  );
}

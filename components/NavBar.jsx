import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

import strings from "../assets/strings.json";

export default function NavBar() {
  return (
    <Appbar.Header>
      {router.canGoBack() ? (
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
        />
      ) : null}
      <Appbar.Content title={strings.title} />
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

import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

export default function NavBar() {
  const title = "Trail Pack";
  return (
    <Appbar.Header>
      {router.canGoBack() ? (
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
        />
      ) : null}
      <Appbar.Content title={title} />
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

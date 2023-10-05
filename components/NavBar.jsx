import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

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
      <Appbar.Content title="Trail Trek" />
      <Appbar.Action icon="menu" />
    </Appbar.Header>
  );
}

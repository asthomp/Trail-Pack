// Description: A Material Design button component that matches the width of its contents.
// Please note, if react-native-paper button is used without an encapsulating View, its default
// behavior is to expand to the width of the *parent* container. This button fits its children.
// Requirements: text: a String title, link: a String route, mode (optional) "dark"||"light"||"outlined"
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function LinkButton({
  text,
  link,
  icon = null,
  mode = "contained-tonal",
}) {
  // Error handling for button color theming.
  if (mode === "dark") {
    mode = "contained";
  } else if (mode === "light") {
    mode = "contained-tonal";
  } else if (mode === "outlined") {
    mode = "outlined";
  } else {
    mode = "contained-tonal";
  }

  return (
    <View style={style.button}>
      <Button mode={mode} icon={icon} onPress={(_) => router.push(link)}>
        {text}
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

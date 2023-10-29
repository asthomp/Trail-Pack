// Description: A Material Design button component that matches the width of its contents.
// Please note, if react-native-paper button is used without an encapsulating View, its default
// behavior is to expand to the width of the *parent* container. This button fits its children.
// Requirements: text: a String title, link: a String route, icon: string name of a Paper icon.
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { FAB } from "react-native-paper";

export default function AddFAB({ text }) {
  const scheme = useColorScheme();
  const mode = scheme === "light" ? "contained-tonal" : "contained";

  return (
    <View style={style.addFAB}>
      <FAB
        icon="plus"
        size={20}
        accessibilityLabel={text}
        onPress={() => {
          console.log(text);
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  addFAB: {
    position: "absolute",
    margin: 40,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
  },
});

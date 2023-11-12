// This component returns a form control that allows a user to toggle a category.
// It receives a boolean (and a setState). It returns the form control.
// It can be used to create new items or edit existing items.

import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

export default function ToggleRow({ title = "", toggle, setToggle }) {
  return (
    <View style={style.formToggleRow}>
      <Text variant="titleMedium">{title}</Text>
      <Switch
        value={toggle}
        onValueChange={() => {
          toggle ? setToggle(false) : setToggle(true);
        }}
      />
    </View>
  );
}
const style = StyleSheet.create({
  formToggleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

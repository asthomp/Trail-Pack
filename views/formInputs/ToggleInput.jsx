// A generic input row containing text and a toggle.
import React from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

export default function ToggleInput({
  title = "",
  toggle = false,
  onChangeToggle,
  style,
}) {
  return (
    <View style={[defaultStyle.formToggleRow, style]}>
      <Text variant="titleMedium">{title}</Text>
      <Switch value={toggle} onValueChange={onChangeToggle} />
    </View>
  );
}
const defaultStyle = StyleSheet.create({
  formToggleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

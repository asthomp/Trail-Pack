import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Loading({ color }) {
  return (
    <View style={style.loadingContainer}>
      <ActivityIndicator animating color={color} />
    </View>
  );
}
const style = StyleSheet.create({
  loadingContainer: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});

import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function Spacer({ size }) {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        margin: size,
        borderWidth: 2,
        borderColor: "blue",
      }}
    >
      <Divider />
    </View>
  );
}

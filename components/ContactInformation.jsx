import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ContactInformation() {
  return (
    <View style={style.contactContainer}>
      <Text>Hi</Text>
    </View>
  );
}

const style = StyleSheet.create({
  contactContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "20%",
  },
});

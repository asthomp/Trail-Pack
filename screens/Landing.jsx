import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import Map from "../assets/images/map.jpg";
import strings from "../assets/strings.json";
export default function Landing() {
  return (
    <View style={style.frontContainer}>
      <Card style={style.frontCard}>
        <Card.Cover source={Map} />
        <Card.Title title="Welcome" />
        <Card.Content>
          <Text style={style.frontText}>{strings.loremIpsum}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  frontContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  frontCard: {
    display: "flex",
    marginLeft: 15,
    marginRight: 15,
    maxWidth: "90%",
  },
  frontText: {
    marginBottom: 20,
  },
});

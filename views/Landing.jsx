import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import strings from "./strings.json";
import Map from "../assets/images/map.jpg";

export default function Landing() {
  return (
    <View style={style.frontContainer}>
      <Card style={style.frontCard}>
        <Card.Cover source={Map} resizeMode="cover" />
        <Card.Title title={strings.landingTitle} />
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
    maxWidth: 700,
  },
  frontText: {
    marginBottom: 20,
  },
});

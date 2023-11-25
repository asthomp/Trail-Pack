import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import Tent from "../assets/images/tent.jpg";
import strings from "../assets/strings.json";
import LinkButton from "../views/LinkButton";

export default function Pack() {
  return (
    <View style={style.packContainer}>
      <Card style={style.packCard}>
        <Card.Title title="My Pack" />
        <Card.Content>
          <Text style={style.packText}>{strings.loremIpsum}</Text>
          <LinkButton text="Return Home" link="/home" />
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  packContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  packCard: {
    marginLeft: 15,
    marginRight: 15,
    maxWidth: "90%",
  },
  packText: {
    marginBottom: 20,
  },
});

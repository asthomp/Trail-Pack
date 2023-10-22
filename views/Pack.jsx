import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import strings from "./strings.json";
import Tent from "../assets/images/tent.jpg";
import LinkButton from "../components/LinkButton";

export default function Pack() {
  return (
    <View style={style.packContainer}>
      <Card style={style.packCard}>
        <Card.Cover source={Tent} resizeMode="cover" />
        <Card.Title title="My Pack" />
        <Card.Content>
          <Text style={style.packText}>
            This will be the user's pack. This demonstrates a view with an
            image.
          </Text>
          <Text style={style.packText}>{strings.loremIpsum}</Text>
          <LinkButton text="Return Home" link="/" />
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

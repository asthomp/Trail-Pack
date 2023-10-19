import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import LinkButton from "../components/LinkButton";

export default function Front() {
  return (
    <View style={style.frontContainer}>
      <Card style={style.frontCard}>
        <Card.Cover
          source={require("../assets/images/map.jpg")}
          resizeMode="cover"
        />
        <Card.Title title="Welcome" />
        <Card.Content>
          <Text style={style.frontText}>
            This is Peacock and Sunshine's really great app. Wow! You can click
            the button to learn more.
          </Text>
          <LinkButton text="About Us" link="/about" />
          <LinkButton text="Contact" link="/contact" />
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
  },
  frontText: {
    marginBottom: 20,
  },
});

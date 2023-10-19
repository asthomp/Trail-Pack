import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import Tent from "../assets/images/tent.jpg";
import LinkButton from "../components/LinkButton";

export default function Contact() {
  return (
    <View style={style.aboutContainer}>
      <Card style={style.aboutCard}>
        <Card.Cover source={Tent} />
        <Card.Title title="Contact Us" />
        <Card.Content>
          <Text style={style.aboutText}>
            Wow! A index page. Wow! A index page. Wow! A index page. Wow! A
            index page. Wow! A index page. Wow! A index page.
          </Text>
          <LinkButton text="Return Home" link="../" mode="dark" />
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  aboutCard: {
    marginLeft: 15,
    marginRight: 15,
  },
  aboutText: {
    marginBottom: 20,
  },
});

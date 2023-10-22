import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import strings from "./strings.json";
import LinkButton from "../components/LinkButton";

export default function Locker() {
  return (
    <View style={style.lockerContainer}>
      <Card style={style.lockerCard}>
        <Card.Title title={strings.lockerTitle} />
        <Card.Content>
          <Text style={style.lockerText}>This will be the user's locker.</Text>
          <Text style={style.lockerText}>
            It holds all the gear a user owns.
          </Text>
          <Text style={style.lockerText}>It's a page break demo.</Text>
          <LinkButton text="Return Home" link="/" />
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  lockerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  lockerCard: {
    marginLeft: 15,
    marginRight: 15,
    maxWidth: 700,
  },
  lockerText: {
    marginBottom: 20,
  },
});

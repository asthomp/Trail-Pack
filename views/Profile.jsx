import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

import strings from "../assets/strings.json";
import LinkButton from "../components/LinkButton";
export default function Profile() {
  return (
    <View style={style.profileContainer}>
      <Card style={style.profileCard}>
        <Card.Title title={strings.profileTitle} />
        <Card.Content>
          <Text style={style.profileText}>
            This will be the user's profile.
          </Text>
          <LinkButton text="Return Home" link="/" />
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  profileCard: {
    marginLeft: 15,
    marginRight: 15,
    maxWidth: 700,
  },
  profileText: {
    marginBottom: 20,
  },
});

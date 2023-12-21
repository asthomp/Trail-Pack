import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import strings from "../assets/strings.json";
import LinkButton from "../views/LinkButton";
export default function Profile() {
  return (
    <View style={style.profileContainer}>
      <Card style={style.profileCard}>
        <Card.Title title={strings.profileTitle} />
        <Card.Content>
          <Text style={style.profileText}>
            This will be the user's profile.
          </Text>
          <LinkButton text="Return Home" link="/home" />
          <Button
            onPress={() => {
              try {
                signOut(getAuth()).then(() => {
                  if (getAuth().currentUser !== undefined) {
                    router.push("/");
                  } else {
                    throw new Error("Error occurred when logging out user.");
                  }
                });
              } catch (error) {
                console.error(error.message);
              }
            }}
            mode="contained-tonal"
            style={{ margin: 10 }}
          >
            Logout
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  profileCard: {
    marginLeft: 15,
    marginRight: 15,
    maxWidth: 700,
  },
  profileContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 64,
  },
  profileText: {
    marginBottom: 20,
  },
});

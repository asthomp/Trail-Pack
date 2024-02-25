import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import Sign from "../assets/images/sign.jpg";

export default function Landing({ name }) {
  return (
    <ScrollView>
      <View style={style.contentContainer}>
        <Card style={style.card}>
          <Card.Cover
            source={Sign}
            accessibilityLabel="A wooden trail marker points to the right against the backdrop of a snowy mountain."
            alt="A wooden trail marker points to the right against the backdrop of a snowy mountain."
          />
          <Card.Title
            titleVariant="headlineSmall"
            style={style.cardTitle}
            title={`Hi, ${name}.`}
          />
          <Card.Content>
            <Text style={style.packText}>
              Welcome to Trail Pack! Click the below buttons to get started.
              Happy trekking!
            </Text>
          </Card.Content>
          <Card.Actions style={style.cardActions}>
            <Button
              icon="plus"
              mode="contained-tonal"
              onPress={() => {
                router.push({
                  pathname: "pack/add",
                });
              }}
            >
              Create a Pack
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  card: {
    display: "flex",
    margin: 20,
  },
  cardActions: { marginBottom: 10, marginRight: 5, marginTop: 10 },
  cardTitle: { marginBottom: 10, marginTop: 10 },

  contentContainer: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  packText: {
    marginBottom: 20,
  },
});

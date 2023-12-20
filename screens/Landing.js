import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import Sign from "../assets/images/sign.jpg";

export default function Landing() {
  return (
    <ScrollView>
      <View style={style.contentContainer}>
        <Card style={style.card}>
          <Card.Title title="Hey" />
          <Card.Content>
            <Text style={style.packText}>You don't have any packs.</Text>
          </Card.Content>
          <Card.Actions>
            <Button icon="plus" mode="contained-tonal">
              Create a Pack
            </Button>
          </Card.Actions>
        </Card>

        <Card style={style.card}>
          <Card.Cover
            source={Sign}
            accessibilityLabel="A wooden trail marker points to the right against the backdrop of a snowy mountain."
            alt="A wooden trail marker points to the right against the backdrop of a snowy mountain."
          />
          <Card.Title
            titleVariant="headlineSmall"
            style={{ marginTop: 10, marginBottom: 10 }}
            title="My Trips"
          />
          <Card.Content>
            <Text style={style.packText}>
              You don't have any upcoming trips.
            </Text>
          </Card.Content>
          <Card.Actions
            style={{ marginTop: 10, marginBottom: 10, marginRight: 5 }}
          >
            <Button icon="plus" mode="contained-tonal">
              Create a Trip
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  card: {
    display: "flex",
    margin: 20,
  },
  packText: {
    marginBottom: 20,
  },
});

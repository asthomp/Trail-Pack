import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import strings from "../assets/strings.json";
import CategoryStatsPie from "../views/CategoryStatsPie";

export default function Landing() {
  return (
    <View style={style.frontContainer}>
      <Card style={style.frontCard}>
        <Card.Title title="Welcome" />
        <Card.Content>
          <Text style={style.packText}>{strings.loremIpsum}</Text>
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
    maxWidth: "90%",
  },
  frontText: {
    marginBottom: 20,
  },
});

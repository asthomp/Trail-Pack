// Returns a card displaying an item's nutrition facts.
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Divider,
  HelperText,
  IconButton,
  List,
  Surface,
  Text,
} from "react-native-paper";

export default function ViewNutritionFacts({ item }) {
  const [visible, setVisible] = useState(true);
  item.nutrition = {
    caloriesPerServing: 230,
    servingSize: "1 cup",
    servingsPerContainer: 1,
  };
  return (
    <>
      {item && item.consumable && item.nutrition && (
        <Card style={{ marginBottom: 20 }}>
          <Card.Title
            left={() => <List.Icon icon="food-apple" />}
            title="Nutrition Facts"
            right={() => (
              <IconButton
                mode="contained-tonal"
                size={20}
                icon={visible ? "chevron-up" : "chevron-down"}
                onPress={() => {
                  if (visible) {
                    setVisible(false);
                  } else {
                    setVisible(true);
                  }
                }}
              />
            )}
          />
          {visible && (
            <Card.Content>
              <Surface style={style.nutritionFactsSurface}>
                <View style={style.nutritionFactsSectionWithHelper}>
                  <View style={style.nutritionFactsRowCompact}>
                    <Text variant="headlineMedium">Calories</Text>
                    <Text variant="headlineMedium">
                      {item.nutrition.caloriesPerServing *
                        item.nutrition.servingsPerContainer}
                    </Text>
                  </View>
                  <HelperText type="info">Amount Per Container</HelperText>
                </View>
                <Divider />
                <View style={style.nutritionFactsRow}>
                  <Text>Serving Size</Text>
                  <Text>{item.nutrition.servingSize}</Text>
                </View>
                <View style={style.nutritionFactsRow}>
                  <Text>Servings Per Container</Text>
                  <Text>{item.nutrition.servingsPerContainer}</Text>
                </View>
                <View style={style.nutritionFactsRow}>
                  <Text>Calories Per Serving</Text>
                  <Text>{item.nutrition.caloriesPerServing}</Text>
                </View>
              </Surface>
            </Card.Content>
          )}
        </Card>
      )}
    </>
  );
}

const style = StyleSheet.create({
  nutritionFactsRow: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    margin: 10,
  },
  nutritionFactsRowCompact: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  nutritionFactsSectionWithHelper: {
    flexDirection: "column",
  },
  nutritionFactsSurface: {
    backgroundColor: "#FFFFFF",
    flex: "grow",
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    padding: 10,
  },
});

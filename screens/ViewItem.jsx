// Displays a single item.
import React from "react";
import { ScrollView } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

import CategoryIcon from "../views/CategoryIcon";

export default function ViewItem({ data }) {
  return (
    <ScrollView style={{ margin: 10 }}>
      <Card>
        <Card.Title
          title={
            (data.brand ? data.brand : "") +
            " " +
            (data.product ? data.product : "")
          }
          titleNumberOfLines={3}
          subtitle={data.category}
          left={() => (
            <IconButton
              mode="contained-tonal"
              icon={({ size, color }) => (
                <CategoryIcon
                  category={data.categoryIcon}
                  size={size}
                  color={color}
                />
              )}
            />
          )}
        />
        <Card.Content>
          <Text>
            Weight = {data.displayWeight} {data.displayWeightUnit}
          </Text>
          <Text>Quantity = {data.quantity}</Text>
          <Text>
            Price = {data.priceUnit} {data.price}
          </Text>
          {data.wearable ? <Text>Wearable ✔️</Text> : null}
          {data.consumable ? <Text>Consumable ✔️</Text> : null}
          {data.nutrition ? <Text>{data.nutrition}</Text> : null}
          {data.description ? <Text>{data.description}</Text> : null}
          <Text>
            Price: {data.priceUnit} {data.price}
          </Text>

          <IconButton icon="web" onPress={(_) => alert(data.link)} />
          <Text>Added = {data.timestamp.seconds}</Text>
        </Card.Content>
      </Card>

      <Card style={{ margin: 30 }}>
        <Card.Title title="Raw Object" />
        <Card.Content>
          <Text>{JSON.stringify(data)}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

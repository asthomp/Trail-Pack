// As a list item, displays how many copies of the item are owned.
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Divider, List, Text } from "react-native-paper";
export default function QuantityListItem({
  item,
  color = "black",
  size = 24,
  hideDivider = false,
}) {
  return (
    <>
      {item.quantity && (
        <>
          <List.Item
            title="Quantity"
            right={() => <Text>{item.quantity}</Text>}
            left={() => <Octicons name="number" size={size} color={color} />}
          />
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

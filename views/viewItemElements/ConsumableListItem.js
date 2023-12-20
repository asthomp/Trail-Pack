// As a list item, displays whether-or-not an item can be consumed.
import React from "react";
import { Divider, List, Text } from "react-native-paper";

export default function ConsumableListItem({ item, hideDivider }) {
  return (
    <>
      {item.consumable && (
        <>
          <List.Item
            title="Consumable"
            left={() => <List.Icon icon="baguette" />}
            right={() => <Text>✔️</Text>}
          />
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

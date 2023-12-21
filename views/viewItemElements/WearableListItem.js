// As a list item, displays whether-or-not an item can be worn.
import React from "react";
import { Divider, List, Text } from "react-native-paper";

export default function WearableListItem({ item, hideDivider = false }) {
  return (
    <>
      {item.wearable && (
        <>
          <List.Item
            title="Wearable"
            left={() => <List.Icon icon="tshirt-crew" />}
            right={() => <Text>✔️</Text>}
          />
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

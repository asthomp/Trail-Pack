// As a list item, displays the weight of the item as input by the user.
import React from "react";
import { Divider, List, Text } from "react-native-paper";

export default function WeightListItem({ item, hideDivider = false }) {
  return (
    <>
      {item.displayWeight && item.displayWeightUnit && (
        <>
          <List.Item
            title="Weight"
            left={() => <List.Icon icon="scale" />}
            right={() => (
              <Text>{item.displayWeight + " " + item.displayWeightUnit}</Text>
            )}
          />
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

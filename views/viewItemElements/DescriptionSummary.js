// Returns a formatted text field containing a description of the item.
import React from "react";
import { Divider, Text } from "react-native-paper";
export default function DescriptionSummary({ item, hideDivider = false }) {
  return (
    <>
      {item.description && (
        <>
          <Text style={{ marginBottom: 20, marginTop: 10 }}>
            {item.description}
          </Text>
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

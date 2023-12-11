// This component returns a form control that allows a user to indicate an item's price.
// It receives an object in the form of {value: x, error: y} (and a setState). It returns the form control.
// It can be used to create new items or edit existing items.

import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function Price({ price, setPrice }) {
  // TextInputs require strings, even if the data is stored as an integer.
  if (typeof price.value === "number") {
    setPrice({ ...price, value: JSON.stringify(price.value) });
  }

  return (
    <View style={{ flex: 2, marginRight: 10 }}>
      <TextInput
        style={{ flex: 1, marginRight: 10 }}
        mode="outlined"
        inputMode="numeric"
        placeholder="0"
        label="Price"
        value={price.value}
        error={!!price.error}
        onChangeText={(x) => {
          setPrice({ ...price, value: x, error: null });
          if (isNaN(+x.replace(/\s/g, ""))) {
            setPrice({
              ...price,
              value: x,
              error: "Invalid number",
            });
          }
        }}
        left={<TextInput.Affix text="$" />}
      />

      <HelperText type="error" visible={!!price.error}>
        {price.error}
      </HelperText>
    </View>
  );
}

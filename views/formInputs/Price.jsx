// This component returns a form control that allows a user to indicate an item's price.
// It receives an object in the form of {value: x, error: y} (and a setState). It returns the form control.
// It can be used to create new items or edit existing items.

import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function Price({ price, setPrice, placeholder = "0" }) {
  return (
    <View style={{ flex: 2, marginRight: 10 }}>
      <TextInput
        mode="outlined"
        label="Price"
        placeholder={placeholder}
        value={price.value}
        error={!!price.error}
        onChangeText={(x) => {
          if (isNaN(+x.replace(/\s/g, ""))) {
            setPrice({
              ...price,
              value: x,
              error: "Please enter a number",
            });
          } else {
            setPrice({ ...price, value: x, error: null });
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

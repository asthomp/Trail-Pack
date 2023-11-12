// This component returns a form control that allows a user to input a certain amount of text.
// It receives an object in the form of {value: x, error: y} (and a setState). It returns the form control.
// It can be used to create new items or edit existing items.

import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function DisplayText({
  title = "",
  copy,
  setCopy,
  placeholder = null,
  limit = 25,
}) {
  return (
    <View>
      <TextInput
        mode="outlined"
        label={title}
        placeholder={placeholder}
        value={copy.value}
        error={!!copy.error}
        onChangeText={(x) => {
          if (x.length > limit) {
            setCopy({
              ...copy,
              error: `Please use less than ${limit} characters`,
            });
          } else {
            setCopy({ value: x, error: null });
          }
        }}
      />
      <HelperText type="error" visible={!!copy.error}>
        {copy.error}
      </HelperText>
    </View>
  );
}

// This component returns a form control that allows a user to enter a URL.
// It receives an object in the form of {value: x, error: y} and a setState. It returns the form control.
// It can be used to create new items or edit existing items.

import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function URL({
  placeholder = "https://www.rei.com/",
  url,
  setURL,
}) {
  return (
    <View>
      <TextInput
        mode="outlined"
        inputMode="url"
        label="Link"
        placeholder={placeholder}
        value={url.value}
        left={<TextInput.Icon icon="web" />}
        onChangeText={(x) => {
          setURL({ ...url, value: x.toLowerCase(), error: null });
        }}
      />
      <HelperText type="error" visible={!!url.error}>
        {url.error}
      </HelperText>
    </View>
  );
}

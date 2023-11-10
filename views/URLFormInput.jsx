import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function URLFormInput({
  placeholder = "http://www.rei.com/",
  url = "",
  setURL,
}) {
  return (
    <View>
      <TextInput
        mode="outlined"
        inputMode="url"
        label="Link"
        placeholder="http://www.rei.com/"
        value={url.value}
        left={<TextInput.Icon icon="web" />}
        onChangeText={(x) => {
          setURL({ ...url, value: x.toLowerCase() });
        }}
      />
      <HelperText type="error" visible={!!url.error}>
        {url.error}
      </HelperText>
    </View>
  );
}

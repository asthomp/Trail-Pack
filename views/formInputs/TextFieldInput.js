// A generic form control for inputting text.
import React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function TextFieldInput({
  title = "",
  text,
  onTextChange,
  onFocusChange,
  error,
  style,
  hideError = false,
  prefix = null,
  icon = null,
}) {
  let leading = undefined;
  if (icon !== null) {
    leading = <TextInput.Icon icon={icon} style={{ pointerEvents: "none" }} />;
  } else if (prefix !== null) {
    leading = <TextInput.Affix text={prefix} />;
  }
  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        label={title}
        left={leading}
        value={text}
        error={!!error}
        onChangeText={(x) => {
          onTextChange(x);
        }}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
      />
      {!hideError && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

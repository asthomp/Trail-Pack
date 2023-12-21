import { Text, useColorScheme } from "react-native";
import { TextInput as Input } from "react-native-paper";

import { customTheme } from "../utils/customTheme";

export default function SecureTextInput({ errorText, ...props }) {
  const scheme = useColorScheme();
  const theme = scheme === "light" ? customTheme.light : customTheme.dark;

  return (
    <>
      <Input
        style={{
          backgroundColor: theme.colors.surface,
        }}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? (
        <Text
          style={{
            color: theme.colors.error,
            fontSize: 14,
            paddingHorizontal: 4,
            paddingTop: 4,
          }}
        >
          {errorText}
        </Text>
      ) : null}
    </>
  );
}

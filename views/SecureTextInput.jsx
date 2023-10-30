import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { TextInput as Input } from "react-native-paper";

import { TPTheme } from "../utils/theme";

export default function SecureTextInput({ errorText, ...props }) {
  const scheme = useColorScheme();
  const theme = scheme === "light" ? TPTheme.light : TPTheme.dark;

  return (
    <View
      style={{
        width: "100%",
        marginVertical: 12,
      }}
    >
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
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
          }}
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
}

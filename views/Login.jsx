import { Link } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { MD2DarkTheme as theme } from "react-native-paper/src";

import LinkButton from "../components/LinkButton";
import SecureTextInput from "../components/SecureTextInput";
export default function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
    <View style={style.loginContainer}>
      <Card style={style.loginCard}>
        <Card.Title title="Login" />
        <Card.Content>
          <SecureTextInput
            label="Email"
            placeholder="email@youremail.com"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <SecureTextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <LinkButton text="Login" link="/" />
        </Card.Content>
        <Card.Actions>
          <Link href="/signup">Signup</Link>
        </Card.Actions>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  loginContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    width: "80%",
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

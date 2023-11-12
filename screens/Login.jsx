import { Link, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { MD2DarkTheme as theme } from "react-native-paper/src";

import SecureTextInput from "../views/SecureTextInput";

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
          <Button
            mode="contained"
            onPress={() => {
              const auth = getAuth();
              signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  router.push("/");
                })
                .catch((error) => {
                  if (error.code === "auth/invalid-email") {
                    setEmail({
                      value: email.value,
                      error: "Please enter a valid email",
                    });
                  } else if (error.code === "auth/invalid-login-credentials") {
                    setPassword({
                      value: password.value,
                      error: "Invalid username and/or password",
                    });
                  } else if (error.code === "auth/missing-password") {
                    setPassword({
                      value: password.value,
                      error: "Please enter a valid password",
                    });
                  } else {
                    setPassword({
                      value: password.value,
                      error: "Oops! Something went wrong!",
                    });
                  }
                });
            }}
          >
            Login
          </Button>
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

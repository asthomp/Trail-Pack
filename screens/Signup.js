import { Link, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { MD2DarkTheme as theme } from "react-native-paper/src";

import SecureTextInput from "../views/SecureTextInput";
export default function Signup() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
    <View style={style.signupContainer}>
      <Card style={style.signupCard}>
        <Card.Title title="Signup" />
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
              createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                  // Signed up
                  const user = userCredential.user;
                  console.log(user);
                  router.push("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  console.log(errorCode);
                });
            }}
          >
            Signup
          </Button>
        </Card.Content>
        <Card.Actions>
          <Link href="/">Login</Link>
        </Card.Actions>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  signupContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signupCard: {
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

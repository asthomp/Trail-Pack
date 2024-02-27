import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";

export default function Signup({
  newCredentials,
  onChangeEmail,
  onChangePassword,
  onSignup,
}) {
  return (
    <View style={style.signupContainer}>
      <Card style={style.signupCard}>
        <Card.Title title="Create Account" />
        <Card.Content>
          <View style={style.textElementColumn}>
            <View style={style.singleTextElement}>
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                clearButtonMode="while-editing"
                keyboardType="email-address"
                label="Email"
                maxLength={50}
                mode="outlined"
                onChangeText={onChangeEmail}
                placeholder="email@email.com"
                value={newCredentials.email.value}
              />
              <HelperText
                type="error"
                padding="none"
                visible={!!newCredentials.email.error}
              >
                {newCredentials.email.error}
              </HelperText>
            </View>
            <View style={style.singleTextElement}>
              <TextInput
                autoCapitalize="none"
                autoComplete="current-password"
                clearButtonMode="while-editing"
                label="Password"
                maxLength={50}
                mode="outlined"
                onChangeText={onChangePassword}
                secureTextEntry
                value={newCredentials.password.value}
              />
              <HelperText
                type="error"
                padding="none"
                visible={!!newCredentials.password.error}
              >
                {newCredentials.password.error}
              </HelperText>
            </View>
          </View>
          <Button
            mode="contained"
            onPress={onSignup}
            style={style.buttonPadding}
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
  buttonPadding: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  signupCard: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  signupContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
  },
  singleTextElement: { marginBottom: 5 },
  textElementColumn: {
    flexDirection: "column",
    flexGrow: 1,
    padding: 5,
  },
  textInputPadding: {
    marginBottom: 10,
  },
});

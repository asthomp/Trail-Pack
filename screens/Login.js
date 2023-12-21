import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, Card, HelperText, TextInput } from "react-native-paper";

export default function Login({
  credentials,
  onChangeEmail,
  onChangePassword,
  onSubmitCredentials,
}) {
  return (
    <View style={style.loginContainer}>
      <Card style={style.loginCard}>
        <Card.Title title="Login" />
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
                value={credentials.email.value}
              />
              <HelperText
                type="error"
                padding="none"
                visible={!!credentials.email.error}
              >
                {credentials.email.error}
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
                value={credentials.password.value}
              />
              <HelperText
                type="error"
                padding="none"
                visible={!!credentials.password.error}
              >
                {credentials.password.error}
              </HelperText>
            </View>
          </View>
          <Button
            mode="contained"
            onPress={onSubmitCredentials}
            style={style.buttonPadding}
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
  buttonPadding: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  loginCard: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  loginContainer: {
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

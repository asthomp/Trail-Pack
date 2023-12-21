import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import Login from "../screens/Login";

export default function App() {
  const loginModel = useLoginViewModel();
  return (
    <Login
      credentials={loginModel.credentials}
      onChangeEmail={loginModel.onChangeEmail}
      onChangePassword={loginModel.onChangePassword}
      onSubmitCredentials={loginModel.onSubmitCredentials}
    />
  );
}

export function useLoginViewModel() {
  const [credentials, setCredentials] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" },
  });

  const onChangeEmail = (x) => {
    setCredentials({ ...credentials, email: { error: "", value: x } });
  };

  const onChangePassword = (x) => {
    setCredentials({ ...credentials, password: { error: "", value: x } });
  };
  const onSubmitCredentials = () => {
    if (!credentials.email.value || credentials.email.value.length === 0) {
      setCredentials({
        ...credentials,
        email: {
          ...credentials.email,
          error: "The email field is required.",
        },
      });
    } else if (
      !credentials.password.value ||
      credentials.password.value.length === 0
    ) {
      setCredentials({
        ...credentials,
        password: {
          ...credentials.password,
          error: "The password field is required.",
        },
      });
    } else {
      signInWithEmailAndPassword(
        getAuth(),
        credentials.email.value,
        credentials.password.value,
      )
        .then((userCredential) => {
          if (userCredential) {
            setCredentials({
              ...credentials,
              password: {
                ...credentials.password,
                value: "",
              },
            });
            router.push("/home");
          } else {
            setCredentials({
              ...credentials,
              password: {
                error: "Oops! Something went wrong. Try again.",
                value: "",
              },
            });
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setCredentials({
              ...credentials,
              email: { error: "Please enter a valid e-mail.", value: "" },
            });
          } else if (error.code === "auth/missing-password") {
            setCredentials({
              ...credentials,
              password: { error: "Please enter a valid password.", value: "" },
            });
          } else if (error.code === "auth/invalid-login-credentials") {
            setCredentials({
              ...credentials,
              password: { error: "Invalid email and/or password.", value: "" },
            });
          } else {
            setCredentials({
              ...credentials,
              password: {
                error: "Oops! Something went wrong. Try again.",
                value: "",
              },
            });
          }
        });
    }
  };
  return {
    credentials,
    onChangeEmail,
    onChangePassword,
    onSubmitCredentials,
  };
}

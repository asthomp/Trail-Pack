import { router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import Signup from "../screens/Signup";

export default function SignupRoute() {
  const signupModel = useSignupViewModel();
  return (
    <Signup
      newCredentials={signupModel.newCredentials}
      onChangeEmail={signupModel.onChangeEmail}
      onChangePassword={signupModel.onChangePassword}
      onSignup={signupModel.onSignup}
    />
  );
}

export function useSignupViewModel() {
  const [newCredentials, setNewCredentials] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" },
  });

  const onChangeEmail = (x) => {
    setNewCredentials({ ...newCredentials, email: { error: "", value: x } });
  };

  const onChangePassword = (x) => {
    setNewCredentials({ ...newCredentials, password: { error: "", value: x } });
  };
  const onSignup = () => {
    if (
      !newCredentials.email.value ||
      newCredentials.email.value.length === 0
    ) {
      setNewCredentials({
        ...newCredentials,
        email: {
          ...newCredentials.email,
          error: "The email field is required.",
        },
      });
    } else if (
      !newCredentials.password.value ||
      newCredentials.password.value.length === 0
    ) {
      setNewCredentials({
        ...newCredentials,
        password: {
          ...newCredentials.password,
          error: "The password field is required.",
        },
      });
    } else {
      createUserWithEmailAndPassword(
        getAuth(),
        newCredentials.email.value,
        newCredentials.password.value,
      )
        .then((userCredential) => {
          if (userCredential) {
            setNewCredentials({
              ...newCredentials,
              password: {
                ...newCredentials.password,
                value: "",
              },
            });
            router.push("/home");
          } else {
            setNewCredentials({
              ...newCredentials,
              password: {
                error: "Oops! Something went wrong. Try again.",
                value: "",
              },
            });
          }
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setNewCredentials({
              ...newCredentials,
              email: { error: "Please enter a valid e-mail.", value: "" },
            });
          } else if (error.code === "auth/missing-password") {
            setNewCredentials({
              ...newCredentials,
              password: { error: "Please enter a valid password.", value: "" },
            });
          } else if (error.code === "auth/email-already-in-use") {
            setNewCredentials({
              ...newCredentials,
              password: {
                error: "This e-mail already has an account.",
                value: "",
              },
            });
          } else {
            setNewCredentials({
              ...newCredentials,
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
    newCredentials,
    onChangeEmail,
    onChangePassword,
    onSignup,
  };
}

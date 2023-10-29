import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import React, { useEffect } from "react";
import { View } from "react-native";

// This key is protected by Firebase Security rules and application quotas.
// https://firebase.google.com/docs/projects/api-keys#apply-restrictions
const firebaseConfig = {
  apiKey: "AIzaSyD3FxNN1giqGjiqe8SfasrzFDeJNz1YyXg",
  authDomain: "trail-pack-400523.firebaseapp.com",
  projectId: "trail-pack-400523",
  storageBucket: "trail-pack-400523.appspot.com",
  messagingSenderId: "66386871855",
  appId: "1:66386871855:web:c011b4237ff253e4e468da",
  measurementId: "G-QC6ZCQ5D5Y",
};

export default function FirebaseInitializer() {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }, []);
  return <View />;
}

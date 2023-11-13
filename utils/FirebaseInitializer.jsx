import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";

// Firebase needs an API Key to identify the application. Since it's a frontend library and does not use a backend
// (that we control), the API Key must be available in the client code. Otherwise, there's no way to access Firebase.
// It all ends up installed on a user's device, even if stored in a .env variable. Because the API key is client-side,
// it cannot provide security because anything in the client cannot be secret. Security and access control is handled
// by Firebase Auth and Firebase Security Rules setup within the Firebase Console.
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
    if (Platform.OS === "web") {
      try {
        initializeAuth(app);
      } catch {
        getAuth(app);
      }
    } else {
      try {
        initializeAuth(app, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage),
        });
      } catch {
        getAuth(app);
      }
    }
  }, []);

  return <View />;
}

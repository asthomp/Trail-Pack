import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { useEffect } from "react";
import { Platform } from "react-native";

// Firebase needs an API Key to identify the application. Since it's a frontend library and does not use a backend
// (that we control), the API Key must be available in the client code. Otherwise, there's no way to access Firebase.
// It all ends up installed on a user's device, even if stored in a .env variable. Because the API key is client-side,
// it cannot provide security because anything in the client cannot be secret. Security and access control is handled
// by Firebase Auth and Firebase Security Rules setup within the Firebase Console.
// https://firebase.google.com/docs/projects/api-keys#apply-restrictions
const firebaseConfig = {
  apiKey: "AIzaSyD3FxNN1giqGjiqe8SfasrzFDeJNz1YyXg",
  appId: "1:66386871855:web:c011b4237ff253e4e468da",
  authDomain: "trail-pack-400523.firebaseapp.com",
  measurementId: "G-QC6ZCQ5D5Y",
  messagingSenderId: "66386871855",
  projectId: "trail-pack-400523",
  storageBucket: "trail-pack-400523.appspot.com",
};

export default function FirebaseInitializer({ children }) {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    if (Platform.OS === "web") {
      try {
        initializeAuth(app);
      } catch {
        try {
          getAuth(app);
        } catch {
          throw Error("Unable to initialize Firebase (Web)");
        }
      }
    } else {
      try {
        initializeAuth(app, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage),
        });
      } catch {
        try {
          getAuth(app);
        } catch {
          throw Error("Unable to initialize Firebase (Native)");
        }
      }
    }
  }, []);

  return <>{children}</>;
}

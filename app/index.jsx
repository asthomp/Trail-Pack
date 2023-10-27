// This view displays components for the '/' route.
import { router } from "expo-router";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

import Landing from "../views/Landing";

export default function App() {
  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const user = getAuth();
    if (!user.currentUser) {
      router.push("./login");
    }
  }, []);

  return <Landing />;
}

const firebaseConfig = {
  apiKey: "AIzaSyD3FxNN1giqGjiqe8SfasrzFDeJNz1YyXg",
  authDomain: "trail-pack-400523.firebaseapp.com",
  projectId: "trail-pack-400523",
  storageBucket: "trail-pack-400523.appspot.com",
  messagingSenderId: "66386871855",
  appId: "1:66386871855:web:c011b4237ff253e4e468da",
  measurementId: "G-QC6ZCQ5D5Y",
};

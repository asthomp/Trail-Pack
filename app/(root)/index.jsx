import { Redirect } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import Loading from "../../components/Loading";
import Landing from "../../views/Landing";

export default function App() {
  const [user, setUser] = useState("Loading");
  useEffect(() => {
    const user = getAuth();
    setUser(user);
  }, []);
  return user === "Loading" ? (
    <Loading />
  ) : user.currentUser ? (
    <Landing />
  ) : (
    <Redirect href="/login" />
  );
}

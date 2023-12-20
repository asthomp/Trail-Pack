import { Redirect } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import Landing from "../../screens/Landing";
import Loading from "../../views/Loading";

export default function HomeRoute() {
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

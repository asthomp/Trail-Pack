import { Redirect } from "expo-router";
import { getAuth } from "firebase/auth";

import Landing from "../../screens/Landing";

export default function HomeRoute() {
  return getAuth().currentUser ? <Landing /> : <Redirect href="/login" />;
}

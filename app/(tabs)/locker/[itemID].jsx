import { useLocalSearchParams } from "expo-router";
import React from "react";

import ViewItem from "../../../screens/ViewItem";

export default function ViewItemRoute() {
  const { itemID } = useLocalSearchParams();
  return <ViewItem itemID={itemID} />;
}

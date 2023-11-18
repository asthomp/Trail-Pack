import { useLocalSearchParams } from "expo-router";
import React from "react";

import ViewItem from "../../../screens/ViewItem";

export default function ViewItemRoute() {
  const { item } = useLocalSearchParams();
  return <ViewItem item={JSON.parse(item)} />;
}

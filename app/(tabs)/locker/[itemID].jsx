import { useLocalSearchParams } from "expo-router";
import React from "react";

import ViewItem from "../../../screens/ViewItem";

export default function ViewItemRoute() {
  const { data } = useLocalSearchParams();
  return <ViewItem data={JSON.parse(data)} />;
}

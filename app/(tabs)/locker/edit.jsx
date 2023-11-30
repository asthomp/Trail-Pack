import { useLocalSearchParams } from "expo-router";
import React from "react";

import EditItem from "../../../screens/EditItem";

export default function EditItemRoute() {
  const { item } = useLocalSearchParams();
  return <EditItem item={JSON.parse(item)} />;
}

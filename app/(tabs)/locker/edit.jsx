import { useLocalSearchParams } from "expo-router";
import React from "react";

import EditItem from "../../../screens/EditItem";

export default function EditItemRoute() {
  const { itemID } = useLocalSearchParams();
  return <EditItem itemID={itemID} />;
}

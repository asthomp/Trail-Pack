import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native-paper";

export default function AddItemToPackRoute() {
  const viewAddItemToPackModel = useAddItemToPackViewModel();

  return (
    <Text>
      This screen allows a user to add an item to Pack ID#:{" "}
      {viewAddItemToPackModel.packID}
    </Text>
  );
}

export function useAddItemToPackViewModel() {
  const { packID } = useLocalSearchParams();
  return { packID };
}

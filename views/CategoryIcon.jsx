import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Button } from "react-native-paper";

export default function CategoryIcon({ category, size, color }) {
  category = category.toLowerCase();
  if (category.includes("clothing")) {
    return <Ionicons name="shirt" size={size} color={color} />;
  } else if (category.includes("shelter")) {
    return <Fontisto name="tent" size={size} color={color} />;
  } else if (category.includes("medical")) {
    return (
      <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
    );
  } else if (category.includes("photography") || category.includes("camera")) {
    return <MaterialCommunityIcons name="camera" size={size} color={color} />;
  } else if (category.includes("dental")) {
    return (
      <MaterialCommunityIcons name="toothbrush" size={size} color={color} />
    );
  } else if (category.includes("hygiene")) {
    return <FontAwesome5 name="toilet-paper" size={size} color={color} />;
  } else {
    return <Ionicons name="folder" size={size} color={color} />;
  }
}

const style = StyleSheet.create({
  fabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

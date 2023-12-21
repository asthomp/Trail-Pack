// Given a category, attempts to return an appropriate icon.
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";

export default function CategoryIcon({ category, size, color }) {
  if (category === "tent") {
    return <Fontisto name="tent" size={size} color={color} />;
  } else if (category === "sleep") {
    return <MaterialCommunityIcons name="sleep" size={size} color={color} />;
  } else if (category === "bear") {
    return (
      <MaterialCommunityIcons name="teddy-bear" size={size} color={color} />
    );
  } else if (category === "storage") {
    return <Feather name="shopping-bag" size={size} color={color} />;
  } else if (category === "clothing") {
    return <Ionicons name="shirt" size={size} color={color} />;
  } else if (category === "compass") {
    return <Entypo name="compass" size={size} color={color} />;
  } else if (category === "water") {
    return <Ionicons name="water" size={size} color={color} />;
  } else if (category === "food") {
    return <MaterialCommunityIcons name="baguette" size={size} color={color} />;
  } else if (category === "medical") {
    return (
      <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
    );
  } else if (category === "camera") {
    return <MaterialCommunityIcons name="camera" size={size} color={color} />;
  } else if (category === "tools") {
    return <Feather name="tool" size={size} color={color} />;
  } else if (category === "light") {
    return <Entypo name="flashlight" size={size} color={color} />;
  } else if (category === "fire") {
    return <FontAwesome5 name="fire-alt" size={size} color={color} />;
  } else if (category === "dental") {
    return (
      <MaterialCommunityIcons name="toothbrush" size={size} color={color} />
    );
  } else if (category === "toiletpaper") {
    return <FontAwesome5 name="toilet-paper" size={size} color={color} />;
  } else if (category === "book") {
    return <Entypo name="open-book" size={size} color={color} />;
  } else if (category === "bug") {
    return <Ionicons name="bug" size={size} color={color} />;
  } else if (category === "electronics") {
    return <FontAwesome5 name="plug" size={size} color={color} />;
  } else if (category === "sun") {
    return <Feather name="sun" size={size} color={color} />;
  } else if (category === "snow") {
    return <FontAwesome name="snowflake-o" size={size} color={color} />;
  } else if (category === "wallet") {
    return <Entypo name="wallet" size={size} color={color} />;
  } else if (category === "mountain") {
    return <FontAwesome5 name="mountain" size={size} color={color} />;
  } else if (category === "select") {
    return <Entypo name="select-arrows" size={size} color={color} />;
  } else {
    return <Ionicons name="folder" size={size} color={color} />;
  }
}

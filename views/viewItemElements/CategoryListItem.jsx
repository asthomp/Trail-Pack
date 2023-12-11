// As a list item, displays an item's category (ex: shelter, food).
import React from "react";
import { Divider, List, Text } from "react-native-paper";

import CategoryIcon from "../CategoryIcon";

export default function CategoryListItem({ item, hideDivider = false }) {
  return (
    <>
      {item.category && item.categoryIcon && (
        <>
          <List.Item
            title="Category"
            left={() => <CategoryIcon category={item.categoryIcon} size={20} />}
            right={() => <Text>{item.category}</Text>}
          />
          {hideDivider ? null : <Divider />}
        </>
      )}
    </>
  );
}

// Displays a single pack item, assuming that item is not part of a kit.
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Divider, List, Text } from "react-native-paper";

import CategoryIcon from "../views/CategoryIcon";

export default function PackItem({ packID, item }) {
  return (
    <View key={"ID#" + item.itemID + "-section''"}>
      <List.Item
        onPress={() =>
          router.push({
            params: {
              itemID: item.itemID,
              returnPath: `pack/${packID}`,
            },
            pathname: "locker/[itemID]",
          })
        }
        title={item.brand ? item.brand + " " + item.product : item.product}
        description={item.category}
        left={(props) => (
          <List.Icon
            {...props}
            icon={({ size, color }) => (
              <CategoryIcon
                category={item.categoryIcon}
                size={size - 5}
                color={color}
              />
            )}
          />
        )}
        right={() => (
          <Text>
            {item.displayWeight} {item.displayWeightUnit}
          </Text>
        )}
      />
      <Divider />
    </View>
  );
}

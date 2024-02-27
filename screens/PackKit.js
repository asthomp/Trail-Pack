// Displays the
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Text, List, Divider } from "react-native-paper";

import CategoryIcon from "../views/CategoryIcon";

export default function PackKit({ packID, kit }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <List.Accordion
        title={kit.name}
        left={(props) => <List.Icon {...props} icon="group" />}
        right={() => (
          <Text>
            {kit.weight} {kit.weightUnit}
          </Text>
        )}
        expanded={expanded}
        onPress={() => {
          if (expanded) {
            setExpanded(false);
          } else {
            setExpanded(true);
          }
        }}
      >
        {kit.contents.map((item) => {
          return (
            <View key={"ID#" + item.itemID + "-pack-kit-section"}>
              <Divider />
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
                title={
                  item.brand ? item.brand + " " + item.product : item.product
                }
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
            </View>
          );
        })}
      </List.Accordion>
      <Divider />
    </>
  );
}

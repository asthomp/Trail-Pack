import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  List,
  Divider,
  Chip,
  FAB,
  SegmentedButtons,
} from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import CategoryIcon from "../views/CategoryIcon";
import Loading from "../views/Loading";
export default function Locker() {
  const [orderBy, setOrderBy] = useState("timestamp");
  const [order, setOrder] = useState("asc");

  const { items, sortItems } = useDataContext();

  // When the user's preferred ordering methodology changes, resort the displayed items.
  useEffect(() => {
    if (items !== null) {
      sortItems(orderBy, order);
    }
  }, [order, orderBy]);

  const getIcon = function (type) {
    if (orderBy === type) {
      if (order === "asc") {
        return "chevron-up";
      } else {
        return "chevron-down";
      }
    }
  };

  return (
    <View style={style.lockerContainer}>
      {!items ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              marginBottom: 10,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
            }}
          >
            <SegmentedButtons
              value={orderBy}
              onValueChange={(value) => {
                if (value === orderBy) {
                  if (order === "asc") {
                    setOrder("desc");
                  } else {
                    setOrder("asc");
                  }
                } else {
                  if (value === "weight") {
                    setOrder("desc");
                  } else {
                    setOrder("asc");
                  }
                  setOrderBy(value);
                }
              }}
              density="medium"
              buttons={[
                {
                  icon: getIcon("product"),
                  label: "Item",
                  value: "product",
                },
                {
                  icon: getIcon("category"),
                  label: "Category",
                  value: "category",
                },
                { icon: getIcon("weight"), label: "Weight", value: "weight" },
                {
                  label: "Recent",
                  value: "timestamp",
                },
              ]}
            />
          </View>

          <ScrollView>
            <Chip icon="information">
              {orderBy === "timestamp" && (
                <Text>Displaying recently updated items</Text>
              )}
              {orderBy === "product" && (
                <Text>Sorted alphabetically by product name</Text>
              )}
              {orderBy === "category" && <Text>Sorted by product type</Text>}
              {orderBy === "weight" && <Text>Sorted by weight from </Text>}
              {orderBy === "weight" && order === "asc" && (
                <Text>lightest to heaviest</Text>
              )}
              {orderBy === "weight" && order === "desc" && (
                <Text>heaviest to lightest</Text>
              )}
            </Chip>
            <List.Section
              style={{
                alignItems: "stretch",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "flex-start",
              }}
            >
              {items.length > 0 ? (
                items.map((x) => {
                  return (
                    <View key={"ID#" + x.itemID + "-section''"}>
                      <List.Item
                        onPress={() =>
                          router.push({
                            params: {
                              itemID: x.itemID,
                              returnPath: "locker/",
                            },
                            pathname: "locker/[itemID]",
                          })
                        }
                        title={x.brand ? x.brand + " " + x.product : x.product}
                        description={x.category}
                        left={(props) => (
                          <List.Icon
                            {...props}
                            icon={({ size, color }) => (
                              <CategoryIcon
                                category={x.categoryIcon}
                                size={size - 5}
                                color={color}
                              />
                            )}
                          />
                        )}
                        right={() => (
                          <Text>
                            {x.displayWeight} {x.displayWeightUnit}
                          </Text>
                        )}
                      />
                      <Divider />
                    </View>
                  );
                })
              ) : (
                <Text>No Items Found</Text>
              )}
            </List.Section>
          </ScrollView>
          <View style={style.addFAB}>
            <FAB
              icon="plus"
              size={20}
              accessibilityLabel="Add an Item"
              onPress={() => {
                router.push("/locker/add");
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  addFAB: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    margin: 40,
    position: "absolute",
    right: 0,
  },
  lockerContainer: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
  },

  lockerHeader: {
    display: "flex",
    flexDirection: "row",
  },
  lockerSortingChip: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rightHelpButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

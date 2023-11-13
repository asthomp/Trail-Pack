import { router } from "expo-router";
import { getAuth } from "firebase/auth";
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

import Database from "../utils/database";
import CategoryIcon from "../views/CategoryIcon";
import Loading from "../views/Loading";
export default function Locker() {
  const [data, setData] = useState(null);
  const [orderBy, setOrderBy] = useState("timestamp");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const user = getAuth();
    const db = new Database();
    db.getItems(user.currentUser.uid).then((x) => {
      setData(sortArray(x, orderBy, order));
    });
  }, []);

  useEffect(() => {
    if (data) {
      setData(sortArray(data, orderBy, order));
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
      {!data ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
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
                  value: "product",
                  label: "Item",
                  icon: getIcon("product"),
                },
                {
                  value: "category",
                  label: "Category",
                  icon: getIcon("category"),
                },
                { value: "weight", label: "Weight", icon: getIcon("weight") },
                {
                  value: "timestamp",
                  label: "Recent",
                },
              ]}
            />
          </View>

          <ScrollView>
            <Chip icon="information">
              {orderBy === "timestamp" && (
                <Text>Displaying the most recently added items</Text>
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
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "stretch",
              }}
            >
              {data.length > 0 ? (
                data.map((x) => {
                  return (
                    <View key={"ID#" + x.itemID + "-section''"}>
                      <List.Item
                        onPress={() =>
                          router.push({
                            pathname: "locker/[itemID]",
                            params: {
                              itemID: x.itemID,
                              data: JSON.stringify(x),
                            },
                          })
                        }
                        title={x.product}
                        description={
                          x.brand ? x.brand + "\n" + x.category : x.category
                        }
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
  lockerContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  lockerHeader: {
    display: "flex",
    flexDirection: "row",
  },

  lockerSortingChip: {
    marginRight: 10,
    marginLeft: 10,
    flexGrow: 1,
  },
  addFAB: {
    position: "absolute",
    margin: 40,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
  },
  rightHelpButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

function sortArray(array, orderBy, order) {
  let comparator = undefined;
  switch (orderBy) {
    case "product":
    default:
      if (order === "asc") {
        comparator = (a, b) => a.product.localeCompare(b.product);
      } else {
        comparator = (a, b) => -a.product.localeCompare(b.product);
      }
      break;
    case "category":
      if (order === "asc") {
        comparator = (a, b) => a.category.localeCompare(b.category);
      } else {
        comparator = (a, b) => -a.category.localeCompare(b.category);
      }
      break;
    case "weight":
      if (order === "asc") {
        comparator = (a, b) => a.weight - b.weight;
      } else {
        comparator = (a, b) => -(a.weight - b.weight);
      }
      break;
    case "timestamp":
      comparator = (a, b) =>
        -(a.timestamp.nanoseconds - b.timestamp.nanoseconds);
      break;
  }

  const newArray = Array.from(array);
  return newArray.sort(comparator);
}

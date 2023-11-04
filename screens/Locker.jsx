import { router, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, Divider, Chip, FAB } from "react-native-paper";

import Database from "../utils/database";
import CategoryIcon from "../views/CategoryIcon";
import Loading from "../views/Loading";
export default function Locker() {
  const [data, setData] = useState(null);
  const [orderBy, setOrderBy] = useState("time-stamp");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const user = getAuth();
    const db = new Database();
    db.getItems(user.currentUser.uid).then((x) => {
      setData(x);
    });
  }, []);

  // Sorting Comparators
  function sortingComparator(a, b) {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => sortingComparator(a, b)
      : (a, b) => -sortingComparator(a, b);
  }
  return (
    <View style={style.lockerContainer}>
      {!data ? (
        <Loading />
      ) : (
        <>
          <View style={style.lockerSortingMenu}>
            <Chip
              style={style.lockerSortingChip}
              showSelectedOverlay
              selected={orderBy === "product"}
              onPress={() => {
                setOrderBy("product");
              }}
            >
              Item
            </Chip>
            <Chip
              style={style.lockerSortingChip}
              showSelectedOverlay
              selected={orderBy === "category"}
              onPress={() => {
                setOrderBy("category");
              }}
            >
              Category
            </Chip>
            <Chip
              style={style.lockerSortingChip}
              showSelectedOverlay
              selected={order === "weight"}
              onPress={() => {
                setOrderBy("weight");
              }}
            >
              Weight
            </Chip>
          </View>

          <ScrollView>
            <List.Section
              style={{
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "flex-start",
                alignItems: "stretch",
              }}
            >
              {data.length > 0 ? (
                data.sort(getComparator(order, orderBy)).map((x) => {
                  return (
                    <View key={"Item ID #" + x.itemID + "'s View''"}>
                      <List.Item
                        key={"Item ID #" + x.itemID + "'s Block'"}
                        title={x.product}
                        description={x.category}
                        left={(props) => (
                          <List.Icon
                            {...props}
                            icon={({ size, color }) => (
                              <CategoryIcon
                                category={x.category}
                                size={size - 5}
                                color={color}
                              />
                            )}
                          />
                        )}
                        right={(props) => (
                          <Text key={"Item ID #" + x.itemID + "'s Weight'"}>
                            {x.weight} {x.weightUnit}
                          </Text>
                        )}
                      />
                      <Divider key={"Item ID #" + x.itemID + "'s Divider'"} />
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
  lockerSortingMenu: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
});

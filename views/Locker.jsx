import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, Divider, Chip } from "react-native-paper";

import AddFAB from "../components/AddFAB";
import CategoryIcon from "../components/CategoryIcon";
import Loading from "../components/Loading";
import Database from "../utils/database";
export default function Locker() {
  const [data, setData] = useState(null);
  const [itemSort, setItemSort] = React.useState("item");

  useEffect(() => {
    const db = new Database();
    db.getItems(1).then((x) => {
      setData(x);
    });
  }, []);
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
              selected={itemSort === "item"}
              onPress={() => {
                setItemSort("item");
              }}
            >
              Item
            </Chip>
            <Chip
              style={style.lockerSortingChip}
              showSelectedOverlay
              selected={itemSort === "category"}
              onPress={() => {
                setItemSort("category");
              }}
            >
              Category
            </Chip>
            <Chip
              style={style.lockerSortingChip}
              showSelectedOverlay
              selected={itemSort === "weight"}
              onPress={() => {
                setItemSort("weight");
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
              {data.map &&
                data.map((x) => {
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
                })}
            </List.Section>
          </ScrollView>
          <AddFAB text="Add an Item" />
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lockerSortingChip: {
    marginRight: 10,
    marginLeft: 10,
    flexGrow: 1,
  },
});

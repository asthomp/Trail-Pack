import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, Divider, Card } from "react-native-paper";

import AddFAB from "../components/AddFAB";
import CategoryIcon from "../components/CategoryIcon";
import Database from "../database/db";
export default function Locker() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const db = new Database();
    db.getItems(1).then((x) => {
      setData(x);
    });
  }, []);
  return (
    <View style={style.lockerContainer}>
      <Card>
        <Text>Sort by Category</Text>
      </Card>
      <ScrollView>
        <List.Section
          style={{
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          {data !== null &&
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
                      // <Pressable onPress={() => {}}>
                      //   <List.Icon {...props} icon="pencil" />
                      // </Pressable>
                    )}
                  />
                  <Divider key={"Item ID #" + x.itemID + "'s Divider'"} />
                </View>
              );
            })}
        </List.Section>
      </ScrollView>
      <AddFAB text="Add an Item" />
    </View>
  );
}

const style = StyleSheet.create({
  lockerContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

// Displays a single item.
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, IconButton, List, Text } from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import AlertModal from "../views/AlertModal";
import CategoryIcon from "../views/CategoryIcon";
import CategoryListItem from "../views/viewItemElements/CategoryListItem";
import ConsumableListItem from "../views/viewItemElements/ConsumableListItem";
import DescriptionSummary from "../views/viewItemElements/DescriptionSummary";
import QuantityListItem from "../views/viewItemElements/QuantityListItem";
import ViewNutritionFacts from "../views/viewItemElements/ViewNutritionFacts";
import WearableListItem from "../views/viewItemElements/WearableListItem";
import WeightListItem from "../views/viewItemElements/WeightListItem";

export default function ViewItem({ itemID }) {
  const { getItem, deleteItem } = useDataContext();
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [debugWindow, setDebugWindow] = useState(false);
  const item = getItem(itemID, true);
  if (item === undefined || item === null) {
    return null;
  }
  return (
    <ScrollView style={{ margin: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <Card.Title
          title={
            (item.brand ? item.brand : "") +
            " " +
            (item.product ? item.product : "")
          }
          titleNumberOfLines={2}
          left={() => (
            <IconButton
              mode="contained-tonal"
              icon={({ size, color }) => (
                <CategoryIcon
                  category={item.categoryIcon}
                  size={size}
                  color={color}
                />
              )}
            />
          )}
          right={() => (
            <IconButton
              mode="contained-tonal"
              size={20}
              icon="pencil"
              onPress={() => {
                router.push({
                  pathname: "locker/edit",
                  params: {
                    itemID,
                  },
                });
              }}
            />
          )}
        />

        <Card.Content>
          <DescriptionSummary item={item} />
          <List.Section style={{ margin: 10 }}>
            <CategoryListItem item={item} />
            <WeightListItem item={item} />
            <QuantityListItem item={item} />
            <WearableListItem item={item} />
            <ConsumableListItem item={item} />
            {item.price !== null && (
              <>
                <List.Item
                  title="Value"
                  left={() => <List.Icon icon="cash" />}
                  right={() => <Text>{item.priceUnit + " " + item.price}</Text>}
                />
                <Divider />
              </>
            )}
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <View style={style.actionBar}>
            {item.link && (
              <IconButton
                icon="web"
                mode="contained-tonal"
                iconColor="rgb(0, 104, 116)"
                size={20}
                onPress={() => Linking.openURL(item.link)}
              />
            )}

            <View style={style.actionBarSubset}>
              <IconButton
                icon="bug"
                mode="contained-tonal"
                iconColor="rgb(0, 104, 116)"
                size={20}
                onPress={() => {
                  setDebugWindow(true);
                }}
              />
              <IconButton
                mode="contained-tonal"
                iconColor="rgb(186, 26, 26)"
                size={20}
                icon="delete"
                onPress={() => {
                  setDeleteWindow(true);
                }}
              />
            </View>
          </View>
        </Card.Actions>
      </Card>
      {item.nutritionFacts && <ViewNutritionFacts item={item} />}
      <AlertModal
        visible={deleteWindow}
        setVisible={setDeleteWindow}
        message="Are you sure you want to delete this item? It'll be gone
                forever."
        title="Delete Item"
        route="/locker"
        callback={async () => {
          return await deleteItem(item.itemID);
        }}
        callbackButtonTitle="Delete"
      />
      <AlertModal
        visible={debugWindow}
        setVisible={setDebugWindow}
        message={JSON.stringify(item, null, 2)}
        title="Item Debug Window"
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  actionBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  actionBarSubset: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});

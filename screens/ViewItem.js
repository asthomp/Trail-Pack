// Displays a single item; provides the option to edit or delete the item.
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, IconButton, List, Text } from "react-native-paper";

import AlertModal from "../views/AlertModal";
import CategoryIcon from "../views/CategoryIcon";
import CategoryListItem from "../views/viewItemElements/CategoryListItem";
import ConsumableListItem from "../views/viewItemElements/ConsumableListItem";
import DescriptionSummary from "../views/viewItemElements/DescriptionSummary";
import QuantityListItem from "../views/viewItemElements/QuantityListItem";
import ViewNutritionFacts from "../views/viewItemElements/ViewNutritionFacts";
import WearableListItem from "../views/viewItemElements/WearableListItem";
import WeightListItem from "../views/viewItemElements/WeightListItem";

export default function ViewItem({
  debugModal,
  deleteModal,
  isDeleteInProgress,
  item,
  onDeleteItem,
  onDismissDebugModal,
  onDismissDeleteModal,
  onShowDebugModal,
  onShowDeleteModal,
}) {
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
            <View style={{ flexDirection: "row" }}>
              <IconButton
                accessibilityLabel="Edit Item"
                mode="contained-tonal"
                size={20}
                icon="pencil"
                onPress={() => {
                  router.push({
                    params: {
                      itemID: item.itemID,
                    },
                    pathname: "locker/edit",
                  });
                }}
              />

              <IconButton
                accessibilityLabel="Close Item"
                mode="contained-tonal"
                size={20}
                icon="close"
                onPress={() => {
                  router.push({
                    pathname: "locker",
                  });
                }}
              />
            </View>
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
                accessibilityLabel="Debug Item"
                icon="bug"
                mode="contained-tonal"
                iconColor="rgb(0, 104, 116)"
                size={20}
                onPress={onShowDebugModal}
              />
              <IconButton
                accessibilityLabel="Delete Item"
                mode="contained-tonal"
                iconColor="rgb(186, 26, 26)"
                size={20}
                icon="delete"
                onPress={onShowDeleteModal}
              />
            </View>
          </View>
        </Card.Actions>
      </Card>
      {item.nutritionFacts && <ViewNutritionFacts item={item} />}
      <AlertModal
        callback={onDeleteItem}
        callbackButtonTitle="Delete"
        loading={isDeleteInProgress}
        message="Are you sure you want to delete this item? It'll be gone
                forever."
        onCancel={onDismissDeleteModal}
        title="Delete Item"
        visible={deleteModal}
      />
      <AlertModal
        message={JSON.stringify(item, null, 2)}
        onCancel={onDismissDebugModal}
        title="Item Debug Window"
        visible={debugModal}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  actionBar: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  actionBarSubset: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

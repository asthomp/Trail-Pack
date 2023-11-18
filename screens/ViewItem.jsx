// Displays a single item.
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
} from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import CategoryIcon from "../views/CategoryIcon";
import Loading from "../views/Loading";

export default function ViewItem({ item }) {
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugWindow, setDebugWindow] = useState(false);
  const { deleteItem } = useDataContext();
  return (
    <ScrollView style={{ margin: 10 }}>
      <Card>
        <Card.Title
          title={
            (item.brand ? item.brand : "") +
            " " +
            (item.product ? item.product : "")
          }
          titleNumberOfLines={3}
          subtitle={item.category}
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
            <IconButton mode="contained-tonal" size={20} icon="pencil" />
          )}
        />
        <Card.Content>
          <Text>
            Weight = {item.displayWeight} {item.displayWeightUnit}
          </Text>
          <Text>Quantity = {item.quantity}</Text>
          <Text>
            Price = {item.priceUnit} {item.price}
          </Text>
          {item.wearable ? <Text>Wearable ✔️</Text> : null}
          {item.consumable ? <Text>Consumable ✔️</Text> : null}
          {item.nutrition ? <Text>{item.nutrition}</Text> : null}
          {item.description ? <Text>{item.description}</Text> : null}
          <Text>
            Price: {item.priceUnit} {item.price}
          </Text>

          <IconButton icon="web" onPress={(_) => alert(item.link)} />
          <Text>Added = {item.timestamp.seconds}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            mode="contained-tonal"
            iconColor="rgb(0, 104, 116)"
            size={20}
            icon="bug"
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
        </Card.Actions>
      </Card>

      <Portal>
        <Dialog visible={deleteWindow} onDismiss={() => setDeleteWindow(false)}>
          <Dialog.Title>Delete Item</Dialog.Title>
          <Dialog.Content>
            {loading ? (
              <Loading />
            ) : (
              <Text variant="bodyMedium">
                Are you sure you want to delete this item? It'll be gone
                forever.
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                setDeleteWindow(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={async () => {
                setLoading(true);
                await deleteItem(item.itemID);
                setLoading(false);
                setDeleteWindow(false);
                router.push("/locker");
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={debugWindow} onDismiss={() => setDeleteWindow(false)}>
          <Dialog.Title>Item Debug Window</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{JSON.stringify(item, null, 2)}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                setDebugWindow(false);
              }}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

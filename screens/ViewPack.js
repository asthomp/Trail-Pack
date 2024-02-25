// Displays the contents of a single pack; the user can delete, edit, or add items/kits to the pack.
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  List,
  Divider,
  IconButton,
  Text,
  FAB,
} from "react-native-paper";

import PackItem from "./PackItem";
import PackKit from "./PackKit";
export default function ViewPack({ pack }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = function () {
    if (detailsVisible) {
      setDetailsVisible(false);
    } else {
      setDetailsVisible(true);
    }
  };

  if (pack === undefined || pack === null) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <Card
          style={{
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
          }}
        >
          <Card.Title
            title={pack.name}
            titleVariant="titleLarge"
            subtitle={pack.weight + " " + pack.weightUnit}
            titleNumberOfLines={2}
            right={() => (
              <IconButton
                accessibilityLabel="Delete Test"
                mode="contained-tonal"
                size={20}
                icon={!detailsVisible ? "chevron-down" : "chevron-up"}
                onPress={toggleDetails}
              />
            )}
          />
          {detailsVisible && (
            <>
              <Card.Content>
                <View style={style.description}>
                  <Text>{pack.description}</Text>
                </View>
                <View style={style.tagContainer}>
                  {pack &&
                    pack.tags &&
                    pack.tags.map((x) => (
                      <Chip style={style.tag} key={`Keyword Tag for /'${x}/'`}>
                        {x}
                      </Chip>
                    ))}
                </View>
                <Divider style={style.divider} />
                <View style={style.description} />
              </Card.Content>
              <Card.Actions>
                <View style={style.deleteActions}>
                  <Button
                    icon="delete"
                    iconColor="rgb(186, 26, 26)"
                    mode="contained-tonal"
                    onPress={() => alert("Delete!")}
                  >
                    Delete
                  </Button>
                </View>
              </Card.Actions>
            </>
          )}
        </Card>
        <List.Section
          style={{
            alignItems: "stretch",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          {pack.contents && pack.contents.length > 0
            ? pack.contents.map((x) => {
                if (x.type === "item") {
                  return (
                    <PackItem
                      packID={pack.packID}
                      item={x}
                      key={"PackID#" + x.packID + " & Item-" + x.itemID}
                    />
                  );
                }

                if (x.type === "kit") {
                  return (
                    <PackKit
                      packID={pack.packID}
                      kit={x}
                      key={"PackID#" + pack.packID + "KitID#" + x.kitID}
                    />
                  );
                }
                return null;
              })
            : null}
        </List.Section>
      </ScrollView>
      <View style={style.addFAB}>
        <FAB
          icon="plus"
          size={20}
          accessibilityLabel="Add an Item"
          onPress={() => {
            router.push({
              params: {
                packID: pack.packID,
                returnPath: "pack/[packID]/",
              },
              pathname: "pack/[packID]/add",
            });
          }}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  addButton: {
    marginLeft: 10,
    marginRight: 10,
  },
  addFAB: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    margin: 40,
    position: "absolute",
    right: 0,
  },
  buttonActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  deleteActions: {
    display: "flex",
    flexDirection: "row-reverse",
    flexGrow: 1,
    justifyContent: "space-between",
    margin: 10,
  },
  description: {
    marginBottom: 5,
    marginTop: 5,
  },
  divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  tag: {
    marginRight: 10,
  },
  tagContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: 10,
  },
});

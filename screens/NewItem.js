// This screen manages adding a new item to the database.

import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, HelperText } from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import {
  convertStrToNum,
  convertWeightToOunces,
  removeURLTracking,
  validateURL,
} from "../utils/helpers";
import Loading from "../views/Loading";
import Form from "../views/formInputs/Form";

export default function NewItem() {
  const { postItem } = useDataContext();
  const baseItem = {
    brand: {
      error: undefined,
      focused: false,
      value: "",
    },
    category: {
      error: undefined,
      focused: false,
      icon: "packing",
      value: "Packing & Storage",
    },
    consumable: false,
    containers: [],
    description: {
      error: undefined,
      focused: false,
      value: "",
    },
    formError: undefined,
    nutritionFacts: { error: undefined, value: "" },
    price: {
      error: undefined,
      focused: false,
      value: "",
    },
    productName: {
      error: undefined,
      focused: false,
      value: "",
    },
    quantity: {
      error: undefined,
      focused: false,
      value: "1",
    },
    url: {
      error: undefined,
      focused: false,
      value: "",
    },
    wearable: false,
    weight: {
      error: undefined,
      focused: false,
      unit: "oz",
      value: "1",
    },
  };

  const [item, setItem] = useState(baseItem);
  const [loading, setLoading] = useState(false);
  const updateItemState = (item) => {
    if (item.productName.value?.trim().length > 50) {
      item.productName.error = "Exceeded character limit (50)";
    } else if (
      item.productName.value.trim().length < 1 &&
      !item.productName.focused
    ) {
      item.productName.error = "Required input";
    } else {
      item.productName.error = undefined;
    }

    if (item.weight.value && isNaN(Number(item.weight.value))) {
      item.weight.error = "Invalid number";
    } else if (
      item.weight.value < 0 ||
      (item.weight.unit === "lbs" && item.weight.value > 300) ||
      (item.weight.unit === "oz" && item.weight.value > 4801) ||
      (item.weight.unit === "g" && item.weight.value > 136078)
    ) {
      switch (item.weight.unit) {
        case "lbs":
          item.weight.error = "Invalid weight (0-300)";
          break;
        case "oz":
          item.weight.error = "Invalid weight (0-4801)";
          break;
        case "g":
          item.weight.error = "Invalid weight (0-136078)";
          break;
        default:
          item.weight.error = "Invalid weight";
      }
    } else {
      item.weight.error = undefined;
    }

    if (item.description.value?.trim().length > 50) {
      item.description.error = "Exceeded character limit (50)";
    } else {
      item.description.error = undefined;
    }

    if (item.brand.value?.trim().length > 25) {
      item.brand.error = "Exceeded character limit (25)";
    } else {
      item.brand.error = undefined;
    }

    if (item.price.value && isNaN(Number(item.price.value))) {
      item.price.error = "Invalid amount";
    } else if (item.price.value < 0 || item.price.value > 10000) {
      item.price.error = "Invalid amount (0-10000)";
    } else {
      item.price.error = undefined;
    }

    if (item.quantity.value && isNaN(Number(item.quantity.value))) {
      item.quantity.error = "Invalid number";
    } else if (item.quantity.value < 0 || item.quantity.value > 30) {
      item.quantity.error = "Invalid quantity (0-30)";
    } else {
      item.quantity.error = undefined;
    }

    if (item.url.value?.trim() !== "" && !validateURL(item.url.value)) {
      item.url.error = "Invalid URL";
    } else {
      item.url.error = undefined;
    }

    if (
      Object.keys(item).some((x) => {
        return item[x]?.error !== undefined && item[x]?.error !== null;
      })
    ) {
      item.formError = "Please correct your input";
    } else {
      item.formError = undefined;
    }
    setItem(item);
  };
  return (
    <ScrollView>
      <Card style={style.addItemCard}>
        <Card.Title
          title="Add New Item"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={() => (
            <Button
              mode="text"
              onPress={() => {
                router.push("locker/bulk");
              }}
              style={{ marginRight: 20 }}
            >
              Bulk Import
            </Button>
          )}
        />

        <Card.Content>
          <Form item={item} updateItemState={updateItemState} />
        </Card.Content>
        <Card.Actions>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <Button
                style={{ marginRight: 10, width: 100 }}
                icon="content-save"
                mode="contained"
                onPress={async () => {
                  if (!item.formError) {
                    setLoading(true);
                    const result = await postItem({
                      brand: item.brand.value,
                      category: item.category.value,
                      categoryIcon: item.category.icon,
                      consumable: item.consumable,
                      containers: [],
                      description: item.description.value,
                      displayWeight: convertStrToNum(item.weight.value),
                      displayWeightUnit: item.weight.unit,
                      link: removeURLTracking(item.url.value),
                      nutrition: null,
                      price: convertStrToNum(item.price.value).toFixed(2),
                      priceUnit: "$",
                      product: item.productName.value,
                      quantity: convertStrToNum(item.quantity.value),
                      userID: getAuth().currentUser.uid,
                      wearable: item.wearable,
                      weight: convertWeightToOunces(
                        item.weight.value,
                        item.weight.unit,
                      ),
                      weightUnit: "oz",
                    });
                    if (result) {
                      setItem(baseItem);
                      setLoading(false);
                      router.push({
                        pathname: "locker/",
                      });
                    } else {
                      updateItemState({
                        ...item,
                        formError: "Failed to update item",
                      });
                    }
                  }
                }}
              >
                Save
              </Button>
            )}

            <HelperText type="error" visible={!!item.formError}>
              {item.formError}
            </HelperText>
          </View>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  addItemCard: {
    flexGrow: 1,
    margin: 10,
  },
  divider: {
    margin: 5,
  },
  formMultipleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    paddingBottom: 5,
    paddingTop: 5,
  },
  formSingleRow: {
    flexDirection: "column",
    flexGrow: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

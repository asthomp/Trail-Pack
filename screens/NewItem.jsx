// This screen manages the modes for adding items: bulk entry (via LighterPack) or item-by-item.

import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, HelperText } from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import {
  convertStringToNum,
  convertWeight,
  removeURLTracking,
  validateURL,
} from "../utils/dataParser";
import Loading from "../views/Loading";
import Form from "../views/formInputs/Form";

export default function NewItem({ toggle }) {
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
      value: "Packing & Storage",
      icon: "packing",
    },
    formError: undefined,
    productName: {
      error: undefined,
      focused: false,
      value: "",
    },
    price: {
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
    consumable: false,
    nutritionFacts: { value: "", error: undefined },
    description: {
      error: undefined,
      focused: false,
      value: "",
    },
    weight: {
      error: undefined,
      focused: false,
      value: "1",
      unit: "oz",
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
    <Card style={style.addItemCard}>
      <Card.Title
        title="Add New Item"
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={() => (
          <Button
            mode="text"
            onPress={() => {
              toggle();
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
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <Button
              style={{ width: 100, marginRight: 10 }}
              icon="content-save"
              mode="contained"
              onPress={async () => {
                if (!item.formError) {
                  setLoading(true);
                  const result = await postItem({
                    product: item.productName.value,
                    brand: item.brand.value,
                    category: item.category.value,
                    categoryIcon: item.category.icon,
                    displayWeight: convertStringToNum(item.weight.value),
                    displayWeightUnit: item.weight.unit,
                    weight: convertWeight(item.weight.value, item.weight.unit),
                    weightUnit: "oz",
                    price: convertStringToNum(item.price.value).toFixed(2),
                    priceUnit: "$",
                    link: removeURLTracking(item.url.value),
                    description: item.description.value,
                    consumable: item.consumable,
                    nutrition: null,
                    wearable: item.wearable,
                    userID: getAuth().currentUser.uid,
                    quantity: convertStringToNum(item.quantity.value),
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
  );
}

const style = StyleSheet.create({
  addItemCard: {
    flexGrow: 1,
    margin: 10,
  },
  formSingleRow: {
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  formMultipleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  divider: {
    margin: 5,
  },
});

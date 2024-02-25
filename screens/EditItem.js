import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, HelperText } from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import {
  convertStrToNum,
  convertWeightToOunces,
  removeURLTracking,
  validateURL,
} from "../utils/helpers";
import Loading from "../views/Loading";
import Form from "../views/formInputs/Form";

export default function EditItem({ itemID }) {
  const { getItem, updateItem } = useDataContext();
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
      value: "",
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const originItem = getItem(itemID);

    setItem({
      ...item,
      brand: { ...item.brand, value: originItem.brand },
      category: {
        ...item.category,
        icon: originItem.categoryIcon,
        value: originItem.category,
      },
      consumable: originItem.consumable,
      description: {
        ...item.description,
        value: !originItem.description ? "" : originItem.description,
      },
      price: { ...item.price, value: originItem.price.toString() },
      productName: { ...item.productName, value: originItem.product },
      quantity: { ...item.quantity, value: originItem.quantity.toString() },
      url: {
        ...item.url,
        value: !originItem.link ? "" : originItem.link,
      },
      wearable: originItem.wearable,
      weight: {
        ...item.weight,
        unit: originItem.displayWeightUnit,
        value: originItem.displayWeight.toString(),
      },
    });
    setLoading(false);
  }, [itemID]);

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
    <ScrollView key={itemID}>
      {item && (
        <Card style={style.editItemCard}>
          <Card.Title
            title="Edit Item"
            right={() => (
              <IconButton
                icon="close"
                mode="contained-tonal"
                iconColor="rgb(0, 104, 116)"
                size={20}
                onPress={() => {
                  router.push({
                    params: {
                      itemID,
                    },
                    pathname: "locker/[itemID]",
                  });
                }}
              />
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
                      const updatedItem = {
                        brand: item.brand.value,
                        category: item.category.value,
                        categoryIcon: item.category.icon,
                        consumable: item.consumable,
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
                      };
                      const result = await updateItem(itemID, updatedItem);

                      if (result) {
                        setLoading(false);
                        router.push({
                          params: {
                            itemID,
                          },
                          pathname: "locker/[itemID]",
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
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  divider: {
    marginBottom: 10,
  },
  editItemCard: {
    flexGrow: 1,
    margin: 10,
  },
  formMultipleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    paddingBottom: 5,
    paddingTop: 5,
  },
});

// This component creates a new item and adds it to the database.

import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, HelperText } from "react-native-paper";

import CategoryMenu from "./formInputs/CategoryMenu";
import DisplayText from "./formInputs/DisplayText";
import Price from "./formInputs/Price";
import ToggleRow from "./formInputs/ToggleRow";
import URL from "./formInputs/URL";
import WeightMenu from "./formInputs/WeightMenu";
import { useDataContext } from "../utils/DataProvider";
import { convertWeight, validateURL } from "../utils/dataParser";
import Database from "../utils/database";

export default function CreateItem({ toggle }) {
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState({ value: "", error: null });
  const [brand, setBrand] = useState({ value: "", error: null });
  const [category, setCategory] = useState({
    value: "Packing & Storage",
    custom: false,
    error: null,
    visible: false,
    icon: "storage",
    iconVisible: false,
  });
  const [weight, setWeight] = useState({
    value: "",
    unit: "oz",
    error: null,
  });
  const [wearable, setWearable] = useState(false);
  const [consumable, setConsumable] = useState(false);
  const [description, setDescription] = useState({ value: "", error: null });
  const [price, setPrice] = useState({ value: "", unit: "$", error: null });
  const [quantity, setQuantity] = useState({ value: "", error: null });
  const [url, setURL] = useState({ value: "", error: null });
  const db = new Database();
  const data = useDataContext();

  const hasError = () => {
    return (
      productName.error ||
      brand.error ||
      category.error ||
      weight.error ||
      description.error ||
      price.error ||
      quantity.error ||
      url.error
    );
  };

  const addSingleItem = async function () {
    // Check URL Validity
    if (!validateURL(url.value)) {
      setURL({ ...url, error: "Please submit a valid URL" });
    }

    // Check for errors
    if (hasError()) {
      setError("Please correct your input");
    } else {
      setError(null);
    }
    // Post the item
    try {
      await db.postItem({
        product: productName.value,
        brand: brand.value,
        category: category.value,
        categoryIcon: category.icon,
        displayWeight: weight.value,
        displayWeightUnit: weight.unit,
        weight: convertWeight(weight.value, weight.unit),
        weightUnit: "oz",
        price: price.value,
        priceUnit: "$",
        link: url.value,
        description: description.value,
        consumable,
        nutrition: null,
        wearable,
        userID: getAuth().currentUser.uid,
        quantity: quantity.value,
      });
    } catch (error) {
      console.log(error);
      setError("500: Failed to post to the database");
    }

    try {
      await data.refresh();
    } catch (error) {
      console.log(error);
      setError("500: Failed to refresh data");
    }

    try {
      router.push("/locker");
    } catch (error) {
      console.log(error);
      setError("500: Failed to navigate");
    }
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
        <DisplayText
          title="Product Name"
          copy={productName}
          setCopy={setProductName}
          limit={75}
        />
        <Divider style={style.divider} />
        <CategoryMenu category={category} setCategory={setCategory} />
        <Divider style={style.divider} />
        <WeightMenu weight={weight} setWeight={setWeight} />
        <Divider style={style.divider} />
        <ToggleRow
          title="Wearable?"
          toggle={wearable}
          setToggle={setWearable}
        />
        <Divider style={style.divider} />
        <ToggleRow
          title="Consumable?"
          toggle={consumable}
          setToggle={setConsumable}
        />
        <Divider style={style.divider} />
        <DisplayText
          title="Description"
          copy={description}
          setCopy={setDescription}
          limit={75}
        />
        <DisplayText title="Brand" copy={brand} setCopy={setBrand} limit={25} />
        <Price price={price} setPrice={setPrice} />
        <URL url={url} setURL={setURL} />
      </Card.Content>
      <Card.Actions>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            style={{ width: 100, marginRight: 10 }}
            icon="content-save"
            mode="contained"
            onPress={addSingleItem}
          >
            Save
          </Button>

          <HelperText type="error" visible={!!error}>
            {error}
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

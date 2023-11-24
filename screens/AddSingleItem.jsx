// This component creates a new item and adds it to the database.

import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, HelperText } from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import { convertWeight, validateURL } from "../utils/dataParser";
import CategoryMenu from "../views/formInputs/CategoryMenu";
import DisplayText from "../views/formInputs/DisplayText";
import NumericInput from "../views/formInputs/NumericInput";
import Price from "../views/formInputs/Price";
import ToggleRow from "../views/formInputs/ToggleRow";
import URL from "../views/formInputs/URL";
import WeightMenu from "../views/formInputs/WeightMenu";

export default function AddSingleItem({ toggle }) {
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
  const [quantity, setQuantity] = useState({ value: "1", error: null });
  const [url, setURL] = useState({ value: "", error: null });
  const { refresh, postItem } = useDataContext();

  useEffect(() => {
    if (productName.error === null && weight.error === null) setError(null);
  }, [productName.value, weight.value]);

  const checkErrorOnSubmit = () => {
    // Check for required categories
    if (productName.value.trim() === "") {
      setProductName({ ...productName, error: "Required section" });
      return true;
    }

    if (weight.value.trim() === "" || parseFloat(weight.value) < 0) {
      setWeight({ ...weight, error: "Required section" });
      return true;
    }

    // URL is not required but, if there is a URL, it must be valid.
    if (url.value.trim() !== "" && !validateURL(url.value)) {
      setURL({ ...url, error: "Please submit a valid URL" });
      return true;
    }

    return (
      productName.error !== null ||
      brand.error !== null ||
      category.error !== null ||
      weight.error !== null ||
      description.error !== null ||
      price.error !== null ||
      quantity.error !== null ||
      url.error !== null
    );
  };

  const addSingleItem = async function () {
    // Check for errors
    if (checkErrorOnSubmit()) {
      setError("Please correct your input");
    } else {
      setError(null);
      // Post the item
      try {
        await postItem({
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

        try {
          // Refresh the data
          await refresh();

          // Reset the form
          setProductName({ value: "", error: null });
          setCategory({
            value: "Packing & Storage",
            custom: false,
            error: null,
            visible: false,
            icon: "storage",
            iconVisible: false,
          });

          setWeight({
            value: "",
            unit: "oz",
            error: null,
          });
          setWearable(false);
          setConsumable(false);
          setDescription({ value: "", error: null });
          setBrand({ value: "", error: null });
          setPrice({ value: "", unit: "$", error: null });
          setQuantity({ value: "1", error: null });
          setURL({ value: "", error: null });

          // Navigate to the next page
          try {
            router.push("/locker");
          } catch (err) {
            console.log(err);
            setError("500: Failed to navigate");
          }
        } catch (err) {
          console.log(err);
          setError("500: Failed to refresh data");
        }
      } catch (err) {
        console.log(err);
        setError("500: Failed to post to the database");
      }
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
        <View style={style.formMultipleRow}>
          <Price price={price} setPrice={setPrice} />
          <NumericInput
            title="Quantity"
            maxNum={10}
            setNumber={setQuantity}
            number={quantity}
          />
        </View>
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

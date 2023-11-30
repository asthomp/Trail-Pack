import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  HelperText,
  Divider,
} from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import {
  convertNum,
  convertWeight,
  removeURLTracking,
  validateURL,
} from "../utils/dataParser";
import Loading from "../views/Loading";
import CategoryMenu from "../views/formInputs/CategoryMenu";
import DisplayText from "../views/formInputs/DisplayText";
import NumericInput from "../views/formInputs/NumericInput";
import Price from "../views/formInputs/Price";
import ToggleRow from "../views/formInputs/ToggleRow";
import URL from "../views/formInputs/URL";
import WeightMenu from "../views/formInputs/WeightMenu";
export default function EditItem({ item }) {
  const [productName, setProductName] = useState({ value: "", error: null });
  const [category, setCategory] = useState({
    value: "",
    custom: false,
    error: null,
    visible: false,
    icon: "",
    iconVisible: false,
  });
  const [weight, setWeight] = useState({
    value: "",
    unit: "",
    error: null,
  });
  const [wearable, setWearable] = useState(false);
  const [consumable, setConsumable] = useState(false);
  const [description, setDescription] = useState({ value: "", error: null });
  const [brand, setBrand] = useState({ value: "", error: null });
  const [price, setPrice] = useState({ value: "", unit: "$", error: null });
  const [quantity, setQuantity] = useState({ value: "1", error: null });
  const [url, setURL] = useState({ value: "", error: null });

  const { refresh, updateItem } = useDataContext();
  const [error, setError] = useState(null);

  // Whenever the "item" in focus changes, update.
  useEffect(() => {
    setProductName({ ...productName, value: item.product });

    setCategory({
      value: item.category,
      custom: false,
      error: null,
      visible: false,
      icon: item.categoryIcon,
      iconVisible: false,
    });
    setWeight({
      ...weight,
      value: item.displayWeight,
      unit: item.displayWeightUnit,
    });

    setConsumable(item.consumable);
    setWearable(item.wearable);
    setDescription({
      ...description,
      value: item.description,
    });
    setBrand({ ...brand, value: item.brand });
    setPrice({ ...price, value: item.price });
    setQuantity({ ...quantity, value: item.quantity });
    setURL({ ...url, value: item.link });
  }, [item]);

  // Clear errors if people are trying to edit input
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

  const processEditItem = async function () {
    // Check for errors
    if (checkErrorOnSubmit()) {
      setError("Please correct your input");
    } else {
      setError(null);
      // Post the item
      try {
        await updateItem(item.itemID, {
          product: productName.value,
          brand: brand.value,
          category: category.value,
          categoryIcon: category.icon,
          displayWeight: convertNum(weight.value),
          displayWeightUnit: weight.unit,
          weight: convertWeight(weight.value, weight.unit),
          weightUnit: "oz",
          price: convertNum(price.value),
          priceUnit: "$",
          link: removeURLTracking(url.value),
          description: description.value,
          consumable,
          nutrition: null,
          wearable,
          userID: getAuth().currentUser.uid,
          quantity: convertNum(quantity.value),
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
    <ScrollView>
      {productName ? (
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
                    pathname: "locker/[itemID]",
                    params: {
                      itemID: item.itemID,
                      item: JSON.stringify(item),
                    },
                  });
                }}
              />
            )}
          />
          <Card.Content>
            <DisplayText
              title="Product Name"
              copy={productName}
              setCopy={setProductName}
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

            <DisplayText
              title="Brand"
              copy={brand}
              setCopy={setBrand}
              limit={25}
            />

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
                onPress={() => {
                  processEditItem();
                }}
              >
                Save
              </Button>

              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            </View>
          </Card.Actions>
        </Card>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  editItemCard: {
    flexGrow: 1,
    margin: 10,
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

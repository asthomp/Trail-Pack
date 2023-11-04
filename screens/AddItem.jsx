import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { readString } from "react-native-csv";
import {
  Icon,
  Avatar,
  Button,
  Card,
  IconButton,
  Switch,
  Text,
  TextInput,
  HelperText,
} from "react-native-paper";

import { categoryIconParser, weightUnitParser } from "../utils/dataParser";
import Database from "../utils/database";

export default function AddItem() {
  const [db, setDB] = useState(null);
  const [bulk, setBulk] = useState(false);
  const [LPURL, setLPURL] = useState("");
  const [errorLPURL, setErrorLPURL] = useState(false);
  const [errorMessageLPURL, setErrorMessageLPURL] = useState("");
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("Shelter");
  const [weight, setWeight] = useState("0 lbs");
  const [price, setPrice] = useState("$0.00");
  const [wearable, setWearable] = useState(false);
  const [consumable, setConsumable] = useState(false);
  const [url, setURL] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getAuth().currentUser.uid);
    setDB(new Database());
  }, []);

  const importLighterPackData = async function () {
    try {
      const response = await axios.get(
        "https://lighterpack.com/csv/" + LPURL.match(/.*\/(.*)/)[1],
      );
      try {
        const data = readString(response.data, {
          header: true,
          dynamicTyping: true,
        }).data;

        for (let i = 0; i < data.length; i++) {
          try {
            await db.postItem({
              product: data[i]["Item Name"],
              brand: null,
              category: data[i]["Category"],
              categoryIcon: categoryIconParser(data[i]["Category"]),
              weight: data[i]["weight"],
              weightUnit: weightUnitParser(data[i]["unit"]),
              price: data[i]["price"],
              priceUnit: "$",
              link: data[i]["url"],
              description: data[i]["desc"],
              consumable: data[i]["consumable"] !== null,
              nutrition: null,
              wearable: data[i]["worn"] !== null,
              userID: user,
              quantity: data[i]["qty"],
            });
          } catch (error) {
            console.log(JSON.stringify(error));
            setErrorLPURL(true);
            setErrorMessageLPURL(
              "500: Failed to Post " +
                data[i]["Item Name"] +
                " to the database.",
            );
          }
        }
      } catch (error) {
        setErrorLPURL(true);
        setErrorMessageLPURL("500: Failed to Parse List :(");
      }
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data === "Invalid list specified."
      ) {
        setErrorLPURL(true);
        setErrorMessageLPURL("404: List Not Found (Is the URL correct?)");
      } else {
        setErrorLPURL(true);
        setErrorMessageLPURL("400: Bad Request");
      }
    }
  };

  const validLighterPackURL = function () {
    return (
      LPURL.substring(0, 24) === "https://lighterpack.com/" ||
      LPURL.substring(0, 23) === "http://lighterpack.com/" ||
      LPURL.substring(0, 28) === "https://www.lighterpack.com/" ||
      LPURL.substring(0, 27) === "http://www.lighterpack.com/"
    );
  };

  return (
    <ScrollView>
      <Card style={style.addItemCard}>
        <Card.Title
          title={!bulk ? "Add New Item" : "Add Bulk Items"}
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) =>
            !bulk ? (
              <Button
                mode="text"
                onPress={() => {
                  if (!bulk) {
                    setBulk(true);
                  } else {
                    setBulk(false);
                  }
                }}
                style={{ marginRight: 20 }}
              >
                Bulk Import
              </Button>
            ) : (
              <IconButton
                icon="chevron-left"
                mode="contained"
                onPress={() => {
                  setBulk(false);
                }}
                style={{ marginRight: 20 }}
              />
            )
          }
        />
        {!bulk ? (
          <>
            <Card.Content>
              <TextInput
                style={style.formTextInput}
                label="Product Name"
                value={productName}
                dense
                onChangeText={(text) => {
                  setProductName(text);
                }}
              />
              <TextInput
                style={style.formTextInput}
                dense
                inputMode="text"
                label="Brand"
                value={brandName}
                onChangeText={(text) => {
                  setBrandName(text);
                }}
              />
              <TextInput
                style={style.formTextInput}
                dense
                label="Category"
                value={category}
                onChangeText={(text) => {
                  setCategory(text);
                }}
              />
              <TextInput
                style={style.formTextInput}
                dense
                inputMode="url"
                label="Link"
                value={url}
                onChangeText={(text) => {
                  setURL(text);
                }}
              />
              <View style={style.addItemNumericInputs}>
                <TextInput
                  style={style.formTextInput}
                  dense
                  inputMode="numeric"
                  label="Weight"
                  value={weight}
                  onChangeText={(x) => {
                    setWeight(weight);
                  }}
                />
                <TextInput
                  style={style.formTextInput}
                  dense
                  inputMode="numeric"
                  label="Price"
                  value={price}
                  onChangeText={(x) => {
                    setWeight(setPrice);
                  }}
                />
              </View>

              <View style={style.addItemRowToggle}>
                <Text>
                  Wearable?
                  <Switch
                    value={wearable}
                    onValueChange={() => {
                      wearable ? setWearable(false) : setWearable(true);
                    }}
                  />
                </Text>
                <Text>
                  Consumable?
                  <Switch
                    value={consumable}
                    onValueChange={() => {
                      consumable ? setConsumable(false) : setConsumable(true);
                    }}
                  />
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="content-save"
                mode="contained"
                onPress={() => {
                  const newItem = {
                    product: productName,
                    brand: brandName === "" ? null : brandName,
                    category,
                    weight,
                    weightUnit: null,
                    price: price.substring(1, price.length),
                    priceUnit: "$",
                    link: url,
                    description: null,
                    consumable,
                    wearable,
                    userID: user,
                    quantity: 1,
                  };
                  console.log(newItem);
                }}
              />
            </Card.Actions>
          </>
        ) : (
          <>
            <Card.Content>
              <TextInput
                label="LighterPack Share URL"
                editable
                value={LPURL}
                error={errorLPURL}
                onChangeText={(text) => {
                  setErrorLPURL(false);
                  setErrorMessageLPURL("");
                  setLPURL(text);
                }}
              />
              <HelperText type="error" visible={errorLPURL}>
                {errorMessageLPURL}
              </HelperText>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                style={{ margin: 10 }}
                onPress={() => {
                  if (validLighterPackURL()) {
                    importLighterPackData().then(
                      !errorLPURL ? router.push("/locker") : null,
                    );
                  } else {
                    setErrorLPURL(true);
                    setErrorMessageLPURL("Invalid LighterPack URL");
                  }
                }}
              >
                Submit
              </Button>
            </Card.Actions>
          </>
        )}
      </Card>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  addItemContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addItemCard: {
    flexGrow: 1,
    margin: 10,
  },
  addItemText: {
    marginBottom: 20,
  },
  formTextInput: {
    marginBottom: 20,
  },
  addItemNumericInputs: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "space-around",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "green",
  },
  addItemRowToggle: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "space-evenly",
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#c0c0c0",
  },
  bulkAddCard: {
    margin: 20,
  },
});

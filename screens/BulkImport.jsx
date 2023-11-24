import axios from "axios";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { readString } from "react-native-csv";
import {
  Avatar,
  Button,
  Card,
  HelperText,
  IconButton,
  TextInput,
} from "react-native-paper";

import { useDataContext } from "../utils/DataProvider";
import {
  categoryIconParser,
  convertWeight,
  weightUnitParser,
} from "../utils/dataParser";
import Loading from "../views/Loading";
export default function BulkImport({ toggle }) {
  const [bulk, setBulk] = useState({ url: "", error: null });
  const [complete, setComplete] = useState(false);
  const { refresh, postItem } = useDataContext();
  const importLighterPackData = async function () {
    try {
      const response = await axios.get(
        "https://lighterpack.com/csv/" + bulk.url.match(/.*\/(.*)/)[1],
      );
      try {
        const data = readString(response.data, {
          header: true,
          dynamicTyping: true,
        }).data;

        for (let i = 0; i < data.length; i++) {
          try {
            const newItem = {
              product: data[i]["Item Name"],
              brand: null,
              category: data[i]["Category"],
              categoryIcon: categoryIconParser(data[i]["Category"]),
              displayWeight: data[i]["weight"],
              displayWeightUnit: weightUnitParser(data[i]["unit"]),
              weight: convertWeight(
                data[i]["weight"],
                weightUnitParser(data[i]["unit"]),
              ),
              weightUnit: "oz",
              price: data[i]["price"],
              priceUnit: "$",
              link: data[i]["url"],
              description: data[i]["desc"],
              consumable: data[i]["consumable"] !== null,
              nutrition: null,
              wearable: data[i]["worn"] !== null,
              userID: getAuth().currentUser.uid,
              quantity: data[i]["qty"],
            };
            await postItem(newItem);
          } catch (error) {
            console.log(error);
            setBulk({
              ...bulk,
              error:
                "500: Failed to post " +
                data[i]["Item Name"] +
                " to the database",
            });
            break;
          }
        }
        refresh();
        setComplete(true);
      } catch (error) {
        console.log(error);
        setBulk({
          ...bulk,
          error: "500: Failed to parse list",
        });
      }
    } catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data === "Invalid list specified"
      ) {
        setBulk({
          ...bulk,
          error: "404: List Not Found",
        });
      } else {
        setBulk({
          ...bulk,
          error: "400: Bad Request",
        });
      }
    }
  };

  const validLighterPackURL = function () {
    return (
      bulk.url.substring(0, 24) === "https://lighterpack.com/" ||
      bulk.url.substring(0, 23) === "http://lighterpack.com/" ||
      bulk.url.substring(0, 28) === "https://www.lighterpack.com/" ||
      bulk.url.substring(0, 27) === "http://www.lighterpack.com/"
    );
  };

  return (
    <Card
      style={{
        flexGrow: 1,
        margin: 10,
      }}
    >
      <Card.Title
        title="Add Bulk Items"
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={() => (
          <IconButton
            icon="chevron-left"
            mode="contained"
            onPress={() => {
              toggle();
            }}
            style={{ marginRight: 20 }}
          />
        )}
      />
      <Card.Content>
        <TextInput
          label="LighterPack Share URL"
          editable
          inputMode="url"
          value={bulk.url}
          error={!!bulk.error}
          onChangeText={(x) => {
            setBulk({ ...bulk, url: x });
          }}
        />
        <HelperText type="error" visible={!!bulk.error}>
          {bulk.error}
        </HelperText>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            if (validLighterPackURL()) {
              importLighterPackData().then(() =>
                complete ? router.push("/locker") : <Loading />,
              );
            } else {
              setBulk({
                ...bulk,
                error: "Invalid LighterPack URL",
              });
            }
          }}
        >
          Submit
        </Button>
      </Card.Actions>
    </Card>
  );
}

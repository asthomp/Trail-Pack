import axios from "axios";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { readString } from "react-native-csv";

import BulkImport from "../../../screens/BulkImport";
import { useDataContext } from "../../../utils/DataProvider";
import {
  assignCategoryIcon,
  convertWeightToOunces,
  weightUnitParser,
} from "../../../utils/helpers";

export default function BulkImportRoute() {
  const bulkImportViewModel = useBulkImportViewModel();
  return (
    <BulkImport
      data={bulkImportViewModel.bulk.data}
      error={bulkImportViewModel.bulk.error}
      importBulkData={bulkImportViewModel.importBulkData}
      isLoading={bulkImportViewModel.isLoading}
      onEditData={bulkImportViewModel.onEditData}
      onEditError={bulkImportViewModel.onEditError}
      onLeave={bulkImportViewModel.onLeave}
    />
  );
}

export function useBulkImportViewModel() {
  const [bulk, setBulk] = useState({ data: "", error: null });
  const [isLoading, setIsLoading] = useState(false);
  const { postItem } = useDataContext();
  const presetReturnRoute = "locker/";

  const onLeave = function (returnRoute = presetReturnRoute) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push(returnRoute);
    }
  };

  const onEditData = function (data) {
    setBulk({ data, error: null });
  };

  const onEditError = function (error) {
    setBulk({ ...bulk, error });
  };

  const isValidLighterPackURL = function (url) {
    return (
      url.substring(0, 24) === "https://lighterpack.com/" ||
      url.substring(0, 23) === "http://lighterpack.com/" ||
      url.substring(0, 28) === "https://www.lighterpack.com/" ||
      url.substring(0, 27) === "http://www.lighterpack.com/"
    );
  };

  const importBulkData = function () {
    if (isValidLighterPackURL(bulk.data)) {
      setIsLoading(true);
      importLighterPackData().then(() => {
        setIsLoading(false);
      });
    } else {
      setBulk({ ...bulk, error: "Invalid LighterPack URL" });
    }
  };

  const importLighterPackData = async function () {
    try {
      // Query the data from LighterPack
      const response = await axios.get(
        "https://lighterpack.com/csv/" + bulk.data.match(/.*\/(.*)/)[1],
      );

      //Parse the CSV data
      try {
        const data = readString(response.data, {
          dynamicTyping: true,
          header: true,
        }).data;

        for (let i = 0; i < data.length; i++) {
          try {
            const newItem = {
              brand: null,
              category: data[i]["Category"],
              categoryIcon: assignCategoryIcon(data[i]["Category"]),
              consumable: data[i]["consumable"] !== null,
              containers: [],
              description: data[i]["desc"],
              displayWeight: data[i]["weight"],
              displayWeightUnit: weightUnitParser(data[i]["unit"]),
              link: data[i]["url"],
              nutrition: null,
              price: data[i]["price"],
              priceUnit: "$",
              product: data[i]["Item Name"],
              quantity: data[i]["qty"],
              userID: getAuth().currentUser.uid,
              wearable: data[i]["worn"] !== null,
              weight: convertWeightToOunces(
                data[i]["weight"],
                weightUnitParser(data[i]["unit"]),
              ),
              weightUnit: "oz",
            };
            await postItem(newItem);
          } catch (error) {
            console.error(error);
            setBulk({
              ...bulk,
              error:
                "500: Failed to post " +
                data[i]["Item Name"] +
                " to the database",
            });
          }
        }
      } catch (error) {
        console.error(error);
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
          error: "404: Pack list Not Found",
        });
      } else {
        setBulk({
          ...bulk,
          error: "400: Bad Request",
        });
      }
    }
  };

  return {
    bulk,
    importBulkData,
    isLoading,
    onEditData,
    onEditError,
    onLeave,
  };
}

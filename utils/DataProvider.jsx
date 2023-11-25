// This provider ensures that a user is logged in and queries the database,
// providing data to all of its children. It can also update the data.
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export default function DataContextProvider({ children }) {
  const [data, setData] = useState({
    items: [],
    packs: [],
    error: null,
  });
  const db = getFirestore();
  useEffect(() => {
    refresh();
  }, []);

  // Refresh data by querying the database
  const refresh = (orderBy = "timestamp", order = "asc") => {
    const user = getAuth();
    getItems(user.currentUser.uid).then(async (x) => {
      await setData({ ...data, items: sortArray(x, orderBy, order) });
    });
  };

  // Sort existing data
  const resort = async (
    target = "items",
    orderBy = "timestamp",
    order = "asc",
  ) => {
    if (data[target].length > 0) {
      await setData({
        ...data,
        items: sortArray(data[target], orderBy, order),
      });
    }
  };

  // CREATE ITEM -> Post an item to the database.
  const postItem = async function (item) {
    const docRef = await addDoc(collection(db, "items"), item);
    await updateDoc(docRef, {
      timestamp: serverTimestamp(),
    });
    return docRef;
  };

  // READ ITEMS -> Retrieve all of a user's items.
  const getItems = async function (userID) {
    const q = query(collection(db, "items"), where("userID", "==", userID));

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), ...{ itemID: doc.id } });
    });
    return results;
  };

  // DELETE ITEM
  const deleteItem = async function (itemID) {
    const docRef = doc(db, "items", itemID);
    try {
      await deleteDoc(docRef);
      refresh();
      return true;
    } catch (error) {
      console.log(`500: Error deleting ${itemID}`);
      return false;
    }
  };

  const getStats = function () {
    const itemCategoryCount = {};
    const result = [];
    let total = 0;
    if (data) {
      for (let i = 0; i < data.items.length; i++) {
        if (itemCategoryCount[data.items[i].category]) {
          itemCategoryCount[data.items[i].category]++;
        } else {
          itemCategoryCount[data.items[i].category] = 1;
        }
        total++;
      }
      const keys = Object.keys(itemCategoryCount);
      for (let i = 0; i < keys.length; i++) {
        result.push({
          value: keys[i],
          percentageOfTotal: Math.floor(
            (itemCategoryCount[keys[i]] / total) * 100,
          ),
          count: itemCategoryCount[keys[i]],
        });
      }
      return { categories: result, totalItems: total };
    }
    return false;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        refresh,
        resort,
        postItem,
        getItems,
        deleteItem,
        getStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useDataContext cannot be used out of a DataContextProvider",
    );
  }
  return context;
}

// SORT
function sortArray(array, orderBy, order) {
  let comparator = undefined;
  switch (orderBy) {
    case "timestamp":
    default:
      comparator = (a, b) => -(a.timestamp.seconds - b.timestamp.seconds);
      break;

    case "product":
      if (order === "asc") {
        comparator = (a, b) => a.product.localeCompare(b.product);
      } else {
        comparator = (a, b) => -a.product.localeCompare(b.product);
      }
      break;
    case "category":
      if (order === "asc") {
        comparator = (a, b) => a.category.localeCompare(b.category);
      } else {
        comparator = (a, b) => -a.category.localeCompare(b.category);
      }
      break;
    case "weight":
      if (order === "asc") {
        comparator = (a, b) => a.weight - b.weight;
      } else {
        comparator = (a, b) => -(a.weight - b.weight);
      }
      break;
  }

  const newArray = Array.from(array);
  return newArray.sort(comparator);
}

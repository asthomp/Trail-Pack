// This provider ensures that a user is logged in and queries the database,
// providing data to all of its children. It can also update the data.
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
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
    const docRef = await addDoc(collection(getFirestore(), "items"), item);
    await updateDoc(docRef, {
      timestamp: serverTimestamp(),
    });
    return docRef;
  };

  // READ ITEMS -> Retrieve all of a user's items.
  const getItems = async function (userID) {
    const q = query(
      collection(getFirestore(), "items"),
      where("userID", "==", userID),
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), ...{ itemID: doc.id } });
    });
    return results;
  };

  return (
    <DataContext.Provider value={{ data, refresh, resort, getItems, postItem }}>
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

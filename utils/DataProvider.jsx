// This provider ensures that a user is logged in and queries the database,
// providing data to all of its children. It can also manage the data.
// A listener identifies when the data has changed and updates it in the
// "data" object.
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { sortArray } from "./helpers";

export const DataContext = createContext(null);

export default function DataContextProvider({ children }) {
  const [items, setItems] = useState(null);

  const db = getFirestore();

  // Subscribe to real-time updates when the component mounts; unsubscribe when it unmounts.
  useEffect(() => {
    const unsubscribe = _subscribeToItems();
    return () => {
      unsubscribe();
    };
  }, []);

  // Creates an onSnapshot listener to refresh data when it updates.
  const _subscribeToItems = () => {
    const q = query(
      collection(db, "items"),
      where("userID", "==", getAuth().currentUser.uid),
    );

    return onSnapshot(q, (snapshot) => {
      const updatedDocs = [];

      // When an update occurs, snapshot provides items from the local cache aggregated with new data.
      snapshot.forEach((doc) => {
        updatedDocs.push({ ...doc.data(), itemID: doc.id });
      });
      setItems(sortArray(updatedDocs));
    });
  };

  const sortItems = function (orderBy = "timestamp", order = "asc") {
    setItems(sortArray(items, orderBy, order));
  };
  // CREATE ITEM -> Post a new item to the database; returns the ID of the newly-created item.
  // Note: This triggers the listener to update the DataProvider's data. It receives unchanged data
  // from the local cache aggregated with updated data queried from Firestore.
  // Warning: Items being posted should not have an itemID field; this is automatically generated.
  const postItem = async function (item) {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        ...item,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error posting item:", error);
      throw error;
    }
  };

  // READ ITEMS -> Retrieves the authenticated user's items; the useEffect listener handles updating this data.
  const getItems = async () => {
    return items;
  };

  // READ ITEM -> Retrieves a single item owned by an authenticated user.
  const getItem = (itemID) => {
    if (items) {
      return items.filter((x) => x.itemID === itemID)[0];
    }
    return false;
  };

  // UPDATE ITEM -> Given an item, updates it in the database.
  // Note: This triggers the listener to update the DataProvider's data. It receives unchanged data
  // from the local cache aggregated with updated data queried from Firestore.
  const updateItem = async function (itemID, item) {
    try {
      const docRef = doc(db, "items", itemID);
      await updateDoc(docRef, {
        ...item,
        timestamp: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error(`500: Error updating ${itemID}`, error);
      throw error;
    }
  };
  // DELETE ITEM -> Delete an item from the database and remove it from the local cache.
  const deleteItem = async function (itemID) {
    const docRef = doc(db, "items", itemID);
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`500: Error deleting ${itemID}`, error);
      return false;
    }
  };
  return (
    <DataContext.Provider
      value={{
        items,
        sortItems,
        postItem,
        getItems,
        getItem,
        updateItem,
        deleteItem,
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

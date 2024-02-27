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

import { convertOuncesToPounds, sortArray } from "./helpers";

export const DataContext = createContext(null);

export default function DataContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState(null);
  const [packs, setPacks] = useState(null);

  const db = getFirestore();

  // Subscribe to real-time updates when the component mounts; unsubscribe when it unmounts.
  useEffect(() => {
    const unsubscribeToAccount = _subscribeToAccount();
    const unsubscribeToItems = _subscribeToItems();
    const unsubscribeToPacks = _subscribeToPacks();

    return () => {
      unsubscribeToPacks();
      unsubscribeToAccount();
      unsubscribeToItems();
    };
  }, []);

  // -- LISTENERS --

  // Listen for updates to Firestore and updates the data accordingly using a local cache.
  const _subscribeToAccount = () => {
    const q = query(
      collection(db, "users"),
      where("userID", "==", getAuth().currentUser.uid),
    );
    return onSnapshot(q, (querySnapshot) => {
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      if (userData.length > 1) {
        throw new Error(
          "Listener retrieved multiple users for this auth instance.",
        );
      }
      setUser(userData.pop());
    });
  };

  const _subscribeToItems = () => {
    const q = query(
      collection(db, "items"),
      where("userID", "==", getAuth().currentUser.uid),
    );
    return onSnapshot(q, (snapshot) => {
      const updatedDocs = [];
      snapshot.forEach((doc) => {
        updatedDocs.push({ ...doc.data(), itemID: doc.id });
      });
      setItems(sortArray(updatedDocs));
    });
  };

  const _subscribeToPacks = () => {
    const q = query(
      collection(db, "packs"),
      where("userID", "==", getAuth().currentUser.uid),
    );
    return onSnapshot(q, (snapshot) => {
      const updatedDocs = [];
      snapshot.forEach((doc) => {
        updatedDocs.push({ ...doc.data(), packID: doc.id });
      });
      setPacks(sortArray(updatedDocs));
    });
  };

  // -- HELPERS --

  const _postDocument = async function (group, data) {
    data = _removeDocID(data, group);
    try {
      const docRef = await addDoc(collection(db, group), {
        ...data,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error(
        `500: Failed to create new document in collection /"${group}/"`,
        error,
      );
      throw error;
    }
  };

  const _updateDocument = async function (group, data, docID) {
    data = _removeDocID(data, group);

    try {
      const docRef = doc(db, group, docID);
      await updateDoc(docRef, {
        ...data,
        timestamp: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error(
        `500: Failed to update document ID# ${docID} in collection /"${group}/"`,
        error,
      );
      throw error;
    }
  };

  // If data contains its relevant docID as a property, remove it.
  const _removeDocID = function (data, group) {
    if (data[`${group.substring(0, group.length - 1)}ID`]) {
      delete data[`${group.substring(0, group.length - 1)}ID`];
    }
    return data;
  };

  const _deleteDocument = async function (group, docID) {
    const docRef = doc(db, group, docID);
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(
        `500: Failed to delete document ID# ${docID} in collection /"${group}/"`,
        error,
      );
      throw error;
    }
  };

  // -- ITEMS --

  // Post a new item to the database; returns the ID of the newly-created item.
  const postItem = async function (item) {
    return await _postDocument("items", item);
  };

  // Retrieves the authenticated user's items.
  const getItems = async () => {
    if (items?.length > 0) {
      return items.map((x) => {
        const { userID, ...targetItem } = x;
        return targetItem;
      });
    }
  };

  // Retrieves a single item owned by an authenticated user.
  const getItem = (itemID) => {
    if (items?.length > 0) {
      const x = items.filter((x) => x.itemID === itemID)[0];
      if (x) {
        const { userID, ...targetItem } = x;
        return targetItem;
      }
    }
  };

  // Sorts the item data.
  const sortItems = function (orderBy = "timestamp", order = "asc") {
    setItems(sortArray(items, orderBy, order));
  };

  // Given an item, updates it in the database.
  const updateItem = async function (itemID, item) {
    return await _updateDocument("items", item, itemID);
  };

  // DELETE ITEM -> Delete an item from the database.
  const deleteItem = async function (itemID) {
    const targetItem = getItem(itemID);
    // If the item is packed, remove it from those packs.
    if (targetItem?.containers.length > 0) {
      targetItem.containers.forEach((x) => {
        if (x.type === "pack") {
          _removeItemFromPack(
            itemID,
            targetItem.weight,
            x.packID,
            getPack(x.packID),
          );
        }
      });
    }

    return await _deleteDocument("items", itemID);
  };

  // -- PACKS --

  // Post a new pack to the database; returns the ID of the newly-created pack.
  // Warning: Packs being posted should not have a packID field; this is automatically generated.
  const postPack = async function (pack) {
    try {
      const docRef = await addDoc(collection(db, "packs"), {
        ...pack,
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error posting pack:", error);
      return error;
    }
  };

  // Get a list of all the packs for a given user.
  const getPacks = function () {
    if (packs?.length > 0) {
      return packs.map((x) => {
        const { userID, ...targetPack } = x;
        return targetPack;
      });
    }
  };

  // Retrieves a single pack.
  const getPack = function (packID) {
    if (packs?.length > 0) {
      const x = packs.filter((x) => x.packID === packID)[0];
      if (x) {
        const { userID, ...targetPack } = x;
        return targetPack;
      }
    }
  };

  // Given a unique item, adds it to a given pack.
  const addItemToPack = async function (itemID, packID) {
    const targetPack = getPack(packID);

    // If unpacked, add an item reference to the pack and a pack reference to the item.
    if (!_packContainsItem(itemID, targetPack)) {
      const targetItem = getItem(itemID);
      targetItem["containers"].push({ packID, type: "pack" });
      targetPack["contents"].push({ itemID, type: "item" });

      targetPack.weight = (
        targetPack.weight + convertOuncesToPounds(targetItem.weight)
      ).toFixed(2);
      await _updateDocument("packs", targetPack, packID);
      await _updateDocument("items", targetItem, itemID);
    }
    return targetPack;
  };

  // Identifies whether-or-not a pack contains a target item.
  const _packContainsItem = function (itemID, pack) {
    for (let i = 0; i < pack?.contents.length; i++) {
      if (
        pack.contents[i].type === "item" &&
        pack.contents[i].itemID === itemID
      ) {
        return true;
      }
    }
  };

  // Removes an item from a pack as well as its reference to that pack.
  const removeItemFromPack = async function (itemID, packID) {
    const targetPack = getPack(packID);
    if (!targetPack?.contents || targetPack.contents.length === 0) {
      console.warn(new Error(`404: Cannot remove items from an empty pack.`));
      return;
    }
    const targetItem = getItem(itemID);
    if (!targetItem) {
      console.warn(
        new Error(
          `404: Item cannot be found; failed to remove item from pack.`,
        ),
      );
      return;
    }
    await _removeItemFromPack(itemID, targetItem.weight, packID, targetPack);
    await _removePackReferenceFromItem(itemID, packID, targetItem);
  };

  const _removeItemFromPack = async function (
    itemID,
    itemWeight,
    packID,
    targetPack,
  ) {
    const weight = targetPack.weight - convertOuncesToPounds(itemWeight);
    if (weight < 0) {
      targetPack.weight = 0;
    } else {
      targetPack.weight = weight.toFixed(2);
    }

    if (targetPack?.contents?.length > 0) {
      targetPack.contents = targetPack.contents.filter(
        (x) => !(x.type === "item" && x.itemID === itemID),
      );
      await _updateDocument("packs", targetPack, packID);
    }
  };

  const _removePackReferenceFromItem = async function (
    itemID,
    packID,
    targetItem,
  ) {
    if (targetItem?.containers?.length > 0) {
      targetItem.containers = targetItem.containers.filter(
        (x) => !(x.type === "pack" && x.packID === packID),
      );
      await _updateDocument("items", targetItem, itemID);
    }
  };

  return (
    <DataContext.Provider
      value={{
        addItemToPack,
        deleteItem,
        getItem,
        getItems,
        getPack,
        getPacks,
        items,
        packs,
        postItem,
        postPack,
        removeItemFromPack,
        sortItems,
        updateItem,
        user,
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

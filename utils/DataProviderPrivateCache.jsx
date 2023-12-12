// This provider ensures that a user is logged in and queries the database,
// providing data to all of its children. It can also update the data.
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export default function DataContextProvider({ children }) {
  // The data cache stores query data and allows it to be used by child
  // components; it also reduces the required number of database queries.
  const [dataCache, setDataCache] = useState({
    items: null,
    packs: null,
    error: null,
  });
  const db = getFirestore();

  // Preload the cache on launch.
  useEffect(() => {
    loadCache();
  }, []);

  // Manually refresh/load the cache.
  const loadCache = async function () {
    try {
      const items = await getItems();
      setDataCache({
        ...dataCache,
        items: _sortArray(items),
      });
    } catch (error) {
      console.error("Error loading cache:", error);
    }
  };

  // CREATE ITEM -> Post an item to the database; returns the ID of the newly-created item.
  // Items added to the database do not have an itemID field; it is in the document ID.
  const postItem = async function (item) {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        ...removeItemID(item),
        timestamp: serverTimestamp(),
      });
      const doc = await getDoc(docRef);
      _addItemToCache(doc.id, doc.data());
      return doc.id;
    } catch (error) {
      console.error("Error posting item:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  //TODO
  // Given an item, add it to the local cache.
  // All items added to the cache must have an itemID.
  const _addItemToCache = function (itemID, item) {
    setDataCache((prevDataCache) => ({
      ...prevDataCache,
      items: _sortArray([...(prevDataCache.items || []), { ...item, itemID }]),
    }));
  };

  // READ ITEMS -> Retrieves the authenticated user's items.
  // There is an optional Boolean to toggle whether-or-not to use the cache or query the database.
  // The function defaults to querying the database.
  const getItems = async (
    orderBy = "timestamp",
    order = "asc",
    cache = false,
  ) => {
    if (cache && dataCache.items) {
      return dataCache.items;
    }
    try {
      const result = await _getItems();
      setDataCache((prevDataCache) => ({
        ...prevDataCache,
        items: _sortArray(result, orderBy, order),
      }));
      return result;
    } catch (error) {
      console.error("Error getting items:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  };

  // Queries the database for all items associated with the authenticated user.
  const _getItems = async function () {
    const q = query(
      collection(db, "items"),
      where("userID", "==", getAuth().currentUser.uid),
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), ...{ itemID: doc.id } });
    });
    return results;
  };

  // READ ITEM -> Retrieves an item from the cache.
  const getItem = (itemID) => {
    // If the user specifies using the cache, return the item without a database query.
    if (dataCache.items) {
      return dataCache.items.filter((x) => x.itemID === itemID)[0];
    }
    return false;
  };

  // SORT ITEMS -> Sorts items in the data cache.
  const sortItems = async (orderBy = "timestamp", order = "asc") => {
    if (dataCache["items"].length > 0) {
      await setDataCache({
        ...dataCache,
        items: _sortArray(dataCache["items"], orderBy, order),
      });
    }
    return dataCache;
  };

  // UPDATE ITEM -> Given an item, updates it in both the database and local cache.
  const updateItem = async function (itemID, item) {
    try {
      const docRef = doc(db, "items", itemID);
      const timestampedItem = {
        ...item,
        timestamp: serverTimestamp(),
      };
      await updateDoc(docRef, removeItemID(timestampedItem));
      _updateItemInCache(itemID, timestampedItem);
      return timestampedItem;
    } catch (error) {
      console.error(`500: Error updating ${itemID}`, error);
      return false;
    }
  };

  // Updates the edited item in the cache in order to bypass future querying of the database.
  // All items being added to the cache must contain an itemID.
  const _updateItemInCache = function (itemID, item) {
    setDataCache({
      ...dataCache,
      items: dataCache.items.map((x) => {
        if (x.itemID === itemID) {
          return { ...item, itemID };
        } else {
          return x;
        }
      }),
    });
  };

  // DELETE ITEM -> Delete an item from the database and remove it from the local cache.
  const deleteItem = async function (itemID) {
    const docRef = doc(db, "items", itemID);
    try {
      await deleteDoc(docRef);
      _removeItemFromCache(itemID);
      return true;
    } catch (error) {
      console.error(`500: Error deleting ${itemID}`, error);
      return false;
    }
  };

  // Remove an item from the cache to circumvent re-querying the database
  const _removeItemFromCache = function (itemID) {
    setDataCache({
      ...dataCache,
      items: dataCache.items.filter((x) => x.itemID !== itemID),
    });
    return dataCache.items;
  };

  return (
    <DataContext.Provider
      value={{
        dataCache,
        loadCache,
        postItem,
        getItems,
        getItem,
        sortItems,
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

// Helper Functions
function _sortArray(array, orderBy, order) {
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

// Removes the "itemID" key from an object; this field is stored in the database as a document ID, not as a field.
const removeItemID = function (item) {
  if ("itemID" in item) {
    delete item.itemID;
  }
  return item;
};

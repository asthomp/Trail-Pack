import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  onSnapshot, // Use onSnapshot for real-time updates
  serverTimestamp,
  updateDoc,
  where,
  getFirestore,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export default function DataContextProvider({ children }) {
  const [dataCache, setDataCache] = useState({
    items: [],
    packs: [],
    error: null,
  });
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = _subscribeToItems(); // Subscribe to real-time updates
    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  const _subscribeToItems = () => {
    const q = query(
      collection(db, "items"),
      where("userID", "==", getAuth().currentUser.uid),
    );

    // Use onSnapshot to get real-time updates
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), itemID: doc.id });
      });

      setDataCache((prevDataCache) => ({
        ...prevDataCache,
        items: _sortArray(items),
      }));
    });
  };

  const postItem = async function (item) {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        ...removeItemID(item),
        timestamp: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error posting item:", error);
      throw error;
    }
  };

  const getItems = async (
    orderBy = "timestamp",
    order = "asc",
    cache = false,
  ) => {
    if (cache && dataCache.items.length > 0) {
      return dataCache.items;
    }

    try {
      const snapshot = await getDocs(
        query(
          collection(db, "items"),
          where("userID", "==", getAuth().currentUser.uid),
        ),
      );
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), itemID: doc.id });
      });

      setDataCache((prevDataCache) => ({
        ...prevDataCache,
        items: _sortArray(items, orderBy, order),
      }));

      return items;
    } catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  };

  // ... (unchanged)

  return (
    <DataContext.Provider
      value={{
        dataCache,
        loadCache: _subscribeToItems, // Load cache with real-time updates
        postItem,
        getItems,
        // ... (unchanged)
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// ... (unchanged)

// This provider ensures that a user is logged in and queries the database,
// providing data to all of its children. It can also update the data.
import { getAuth } from "firebase/auth";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import Database from "./database";

export const DataContext = createContext(null);

// Provider

export default function DataContextProvider({ children }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    const user = getAuth();
    const db = new Database();
    db.getItems(user.currentUser.uid).then((x) => {
      setItems(x);
    });
  };

  return (
    <DataContext.Provider value={{ items, setItems, refresh }}>
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

// This screen manages the modes for adding items: bulk entry (via LighterPack) or item-by-item.

import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import Database from "../utils/database";
import BulkImport from "../views/BulkImport";
import CreateItem from "../views/CreateItem";
import Loading from "../views/Loading";

export default function AddItem() {
  const [db, setDB] = useState(null);
  const [user, setUser] = useState(null);

  const [toggleMode, setToggleMode] = useState(true);
  const toggle = () =>
    toggleMode ? setToggleMode(false) : setToggleMode(true);

  useEffect(() => {
    setUser(getAuth().currentUser.uid);
    setDB(new Database());
  }, []);

  return (
    <ScrollView>
      {!user || !db ? (
        <Loading />
      ) : (
        <>
          {toggleMode ? (
            <CreateItem db={db} user={user} toggle={toggle} />
          ) : (
            <BulkImport db={db} user={user} toggle={toggle} />
          )}
        </>
      )}
    </ScrollView>
  );
}

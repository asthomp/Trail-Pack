// This screen manages the modes for adding items: bulk entry (via LighterPack) or item-by-item.

import React, { useState } from "react";
import { ScrollView } from "react-native";

import BulkImport from "../views/BulkImport";
import CreateItem from "../views/CreateItem";

export default function AddItem() {
  const [toggleMode, setToggleMode] = useState(true);
  const toggle = () =>
    toggleMode ? setToggleMode(false) : setToggleMode(true);
  return (
    <ScrollView>
      <>
        {toggleMode ? (
          <CreateItem toggle={toggle} />
        ) : (
          <BulkImport toggle={toggle} />
        )}
      </>
    </ScrollView>
  );
}

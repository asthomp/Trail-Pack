// This screen manages the modes for adding items: bulk entry (via LighterPack) or item-by-item.

import React, { useState } from "react";
import { ScrollView } from "react-native";

import AddSingleItem from "./AddSingleItem";
import BulkImport from "./BulkImport";

export default function AddItem() {
  const [toggleMode, setToggleMode] = useState(true);
  const toggle = () =>
    toggleMode ? setToggleMode(false) : setToggleMode(true);
  return (
    <ScrollView>
      <>
        {toggleMode ? (
          <AddSingleItem toggle={toggle} />
        ) : (
          <BulkImport toggle={toggle} />
        )}
      </>
    </ScrollView>
  );
}

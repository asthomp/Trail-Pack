// This screen manages the modes for adding items: bulk entry (via LighterPack) or item-by-item.

import React, { useState } from "react";
import { ScrollView } from "react-native";

import BulkImport from "./BulkImport";
import NewItem from "./NewItem";

export default function AddItems() {
  const [toggleMode, setToggleMode] = useState(true);
  const toggle = () =>
    toggleMode ? setToggleMode(false) : setToggleMode(true);
  return (
    <ScrollView>
      <>
        {toggleMode ? (
          <NewItem toggle={toggle} />
        ) : (
          <BulkImport toggle={toggle} />
        )}
      </>
    </ScrollView>
  );
}

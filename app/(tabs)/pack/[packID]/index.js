import { useLocalSearchParams } from "expo-router";
import React from "react";

import ViewPack from "../../../../screens/ViewPack";
import { useDataContext } from "../../../../utils/DataProvider";

export default function ViewPackRoute() {
  const viewPackViewModel = useViewPackViewModel();

  return (
    <ViewPack
      addItemToPack={viewPackViewModel.addItemToPack}
      pack={viewPackViewModel.pack}
      removeItemFromPack={viewPackViewModel.removeItemFromPack}
    />
  );
}

export function useViewPackViewModel() {
  const { getPack, addItemToPack, removeItemFromPack } = useDataContext();
  const { packID } = useLocalSearchParams();
  const targetPack = getPack(packID);
  return {
    addItemToPack,
    pack: targetPack,
    removeItemFromPack,
  };
}

import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

import ViewPack from "../../../../screens/ViewPack";
import { useDataContext } from "../../../../utils/DataProvider";

export default function ViewPackRoute() {
  const viewPackViewModel = useViewPackViewModel();

  return (
    <ViewPack
      addItemToPack={viewPackViewModel.addItemToPack}
      deleteButtonIcon={viewPackViewModel.deleteButtonIcon}
      onDeletePack={viewPackViewModel.onDeletePack}
      pack={viewPackViewModel.pack}
      removeItemFromPack={viewPackViewModel.removeItemFromPack}
    />
  );
}

export function useViewPackViewModel() {
  const [deleteButtonIcon, setDeleteButtonIcon] = useState("delete");
  const { addItemToPack, deletePack, getPack, removeItemFromPack } =
    useDataContext();
  const { packID } = useLocalSearchParams();
  const targetPack = getPack(packID);
  const returnPath = "/pack";

  const onDeletePack = async function () {
    setDeleteButtonIcon("loading");
    await deletePack(packID);
    setDeleteButtonIcon("delete");
    router.push(returnPath);
  };

  return {
    addItemToPack,
    deleteButtonIcon,
    onDeletePack,
    pack: targetPack,
    removeItemFromPack,
  };
}

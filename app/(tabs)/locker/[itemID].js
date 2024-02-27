import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

import ViewItem from "../../../screens/ViewItem";
import { useDataContext } from "../../../utils/DataProvider";

export default function ViewItemRoute() {
  //View Model in charge of managing all the business-logic of the UI.
  const viewModel = useViewItemViewModel();

  return (
    <ViewItem
      debugModal={viewModel.debugModal}
      deleteModal={viewModel.deleteModal}
      isDeleteInProgress={viewModel.isDeleteInProgress}
      item={viewModel.item}
      onDeleteItem={viewModel.onDeleteItem}
      onDismissDebugModal={viewModel.onDismissDebugModal}
      onDismissDeleteModal={viewModel.onDismissDeleteModal}
      onShowDebugModal={viewModel.onShowDebugModal}
      onShowDeleteModal={viewModel.onShowDeleteModal}
      returnTo={viewModel.returnPath}
    />
  );
}

export function useViewItemViewModel() {
  const { getItem, deleteItem } = useDataContext();
  const { itemID, returnPath } = useLocalSearchParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [debugModal, setDebugModal] = useState(false);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const item = getItem(itemID);
  const onShowDebugModal = () => setDebugModal(true);
  const onDismissDebugModal = () => setDebugModal(false);
  const onShowDeleteModal = () => setDeleteModal(true);
  const onDismissDeleteModal = () => setDeleteModal(false);

  const onDeleteItem = () => {
    (async () => {
      setIsDeleteInProgress(true);
      const result = await deleteItem(item.itemID);
      if (result) {
        setIsDeleteInProgress(false);
        onDismissDeleteModal();
        router.push(returnPath);
      }
    })();
  };

  return {
    debugModal,
    deleteModal,
    isDeleteInProgress,
    item,
    onDeleteItem,
    onDismissDebugModal,
    onDismissDeleteModal,
    onShowDebugModal,
    onShowDeleteModal,
    returnPath,
  };
}

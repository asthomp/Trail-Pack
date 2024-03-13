import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";

import NewPack from "../../../screens/NewPack";
import { useDataContext } from "../../../utils/DataProvider";

export default function AddPackRoute() {
  //View Model in charge of managing all the business-logic of the UI
  const viewModel = useNewPackViewModel();
  return (
    <NewPack
      addTagToCollection={viewModel.addTagToCollection}
      buildNewTag={viewModel.buildNewTag}
      newTag={viewModel.newTag}
      onSavePack={viewModel.onSavePack}
      saveButtonIcon={viewModel.saveButtonIcon}
      pack={viewModel.pack}
      removeTag={viewModel.removeTag}
      updatePackState={viewModel.updatePackState}
    />
  );
}

export function useNewPackViewModel() {
  const returnPath = "/pack";
  const { postPack } = useDataContext();
  const defaultState = {
    description: { error: null, focused: false, value: "" },
    form: { complete: false, error: null },
    name: { error: null, focused: false, value: "" },
    tags: { error: null, focused: false, value: ["Backpacking"] },
    trip: { error: null, focused: false, value: "" },
  };
  const [pack, setPack] = useState(defaultState);
  const [isSaving, setIsSaving] = useState(false);
  const [newTag, setNewTag] = useState({ error: null, value: "" });

  // Manages the new tag being added to the tag list
  const buildNewTag = (x) => {
    setPack({ ...pack, tags: { ...pack.tags, error: null } });
    if (_checkForCharacterLimitError(x, 10)) {
      setNewTag({ error: _charLimitErrorMessage(10, 10 - x.length), value: x });
    } else {
      setNewTag({ error: null, value: x });
    }
  };

  // Stores a newly-created tag to the tag list
  const addTagToCollection = () => {
    if (pack.tags.value.length > 10) {
      setPack({ ...pack, tags: { ...pack.tags, error: "Too many tags" } });
    } else if (_containsDuplicate(pack.tags.value, newTag.value)) {
      setPack({ ...pack, tags: { ...pack.tags, error: "Duplicate tag" } });
    } else if (newTag.value.length > 0 && !newTag.error && !pack.tags.error) {
      const tempTags = pack.tags.value;
      tempTags.push(newTag.value);
      setPack({ ...pack, tags: { ...pack.tags, value: tempTags } });
      setNewTag({ error: null, value: "" });
    }
  };

  // Remove the target tag
  const removeTag = (tag) => {
    if (!tag) {
      return undefined;
    }
    const tags = pack.tags.value.filter((x) => {
      return x !== tag;
    });
    setPack({ ...pack, tags: { ...pack.tags, value: tags } });

    // If we deleted a tag, recreating it is no longer duplication
    if (newTag.value === tag) {
      setNewTag({ ...newTag, error: null });
    }
  };

  // Manages updating the pack and checking for input errors
  const updatePackState = (x) => {
    // Since the user is updating their input, clear any errors
    x = {
      ...x,
      description: { ...x.description, error: null },
      form: { ...x.form, error: null },
      name: { ...x.name, error: null },
      trip: { ...x.trip, error: null },
    };

    // Queues the user about required input when the navigate away
    if (x.name.value?.trim().length < 1 && !x.name.focused) {
      x.name.error = "Required field";
    }

    // Check validity of inputs
    if (_checkForCharacterLimitError(x.name.value, 25)) {
      x.name.error = _charLimitErrorMessage(25, 25 - x.name.value.length);
    }
    if (_checkForCharacterLimitError(x.description.value, 100)) {
      x.description.error = _charLimitErrorMessage(
        100,
        100 - x.description.value.length,
      );
    }
    if (_checkForCharacterLimitError(x.trip.value, 25)) {
      x.trip.error = _charLimitErrorMessage(25, 25 - x.trip.value.length);
    }

    setPack(x);
  };

  // Handles prepping & saving the formatted pack to the database
  const onSavePack = async function () {
    setIsSaving(true);
    if (!_isFormComplete(pack)) {
      setPack({
        ...pack,
        form: { ...pack.form, error: "It looks like some data is missing" },
        name: { ...pack.name, error: "Required field" },
      });
    } else if (_hasErrors(pack)) {
      setPack({
        ...pack,
        form: {
          ...pack.form,
          error: "It looks like some data needs to be fixed",
        },
      });
    } else {
      try {
        const newPack = {
          contents: [],
          description: pack.description.value,
          name: pack.name.value,
          tags: pack.tags.value,
          trip: pack.trip.value,
          userID: getAuth().currentUser.uid,
          weight: 0,
          weightUnit: "lbs",
        };
        await postPack(newPack);
        setPack(defaultState);
        setIsSaving(false);
        router.push(returnPath);
      } catch (error) {
        console.error(error);
        setPack({
          ...pack,
          form: {
            ...pack.form,
            error: "500: Failed to save pack",
          },
        });
      }
    }
  };

  // Checks whether-or-not the required fields were entered
  const _isFormComplete = function (x) {
    return x.name.value?.trim().length > 0;
  };

  // Identifies if a given phrase exceeds a character limit
  const _checkForCharacterLimitError = function (phrase, limit) {
    return phrase?.trim()?.length > limit;
  };

  // Builds a display message for an exceeded character limit
  const _charLimitErrorMessage = function (limit, correction) {
    return `Exceeded ${limit} character limit (${correction})`;
  };

  // Given an object, identifies whether-or-not any of its keys have error properties
  const _hasErrors = function (x) {
    return Object.keys(x).some((key) => {
      return x[key]?.error !== undefined && x[key]?.error !== null;
    });
  };

  const _containsDuplicate = (container, value) => {
    return container.includes(value);
  };
  return {
    addTagToCollection,
    buildNewTag,
    newTag,
    onSavePack,
    pack,
    removeTag,
    updatePackState,
  };
}

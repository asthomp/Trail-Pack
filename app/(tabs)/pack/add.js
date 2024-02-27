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
      pack={viewModel.pack}
      removeTag={viewModel.removeTag}
      updatePackState={viewModel.updatePackState}
    />
  );
}

export function useNewPackViewModel() {
  const { postPack } = useDataContext();
  const defaultState = {
    description: { error: null, focused: false, value: "" },
    form: { complete: false, error: null },
    name: { error: null, focused: false, value: "" },
    tags: { error: null, focused: false, value: ["Backpacking"] },
    trip: { error: null, focused: false, value: "" },
  };
  const [pack, setPack] = useState(defaultState);
  const [newTag, setNewTag] = useState({ error: null, value: "" });

  // Manages creating a new tag to add to the tag list
  const buildNewTag = (x) => {
    if (!_checkForCharacterLimitError(x, 10)) {
      setNewTag({ error: null, value: x });
    } else {
      setNewTag({ ...newTag, error: _charLimitError(10) });
    }
  };

  // Stores a newly-created tag to the tag list
  const addTagToCollection = () => {
    if (_containsDuplicate(pack.tags.value, newTag.value)) {
    }

    if (
      newTag.value.length > 0 &&
      !newTag.error &&
      !_containsDuplicate(pack.tags.value, newTag.value)
    ) {
      const tempTags = pack.tags.value;
      tempTags.push(newTag.value);
      setPack({ ...pack, tags: { ...pack.tags, value: tempTags } });
    }
  };

  const removeTag = (tag) => {
    if (!tag) {
      return undefined;
    }

    const isNotTag = function (x) {
      return x !== tag;
    };
    let tags = pack.tags.value;
    tags = tags.filter(isNotTag);
    setPack({ ...pack, tags: { ...pack.tags, value: tags } });
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
      x.name.error = _charLimitError(25);
    }
    if (_checkForCharacterLimitError(x.description.value, 100)) {
      x.description.error = _charLimitError(100);
    }
    if (_checkForCharacterLimitError(x.trip.value, 25)) {
      x.trip.error = _charLimitError(25);
    }

    setPack(x);
  };

  const onSavePack = async function () {
    if (!_isFormComplete(pack)) {
      setPack({
        ...pack,
        form: { ...pack.form, error: "It looks like some data is missing" },
        name: { ...pack.name, error: "Required field" },
      });
      return true;
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
  const _charLimitError = function (limit) {
    return `Exceeded character limit (${limit})`;
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

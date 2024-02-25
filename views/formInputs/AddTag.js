// Mnaages selecting/deselecting tags
import React from "react";
import { View } from "react-native";
import { Chip, IconButton } from "react-native-paper";

import TextFieldInput from "./TextFieldInput";

export default function AddTag({
  newTag,
  addTagToCollection,
  buildNewTag,
  style,
  tags,
  removeTag,
}) {
  return (
    <View style={[style]}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TextFieldInput
          title="Add New Tag"
          text={newTag.value}
          hideError
          onFocusChange={() => {}}
          onTextChange={(x) => {
            buildNewTag(x);
          }}
          style={{ flexGrow: 1 }}
        />
        <IconButton
          icon="plus"
          mode="contained-tonal"
          onPress={addTagToCollection}
        />
      </View>
      {/* Preview of the tags entered. */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {tags?.length > 0
          ? tags.map((x) => {
              return (
                <Chip
                  accessibilityLabel={`${x} Tag`}
                  closeIconAccessibilityLabel="Remove Tag"
                  style={{ margin: 5 }}
                  onClose={() => {
                    removeTag(x);
                  }}
                  key={x + "-tag-chip"}
                >
                  {x}
                </Chip>
              );
            })
          : null}
      </View>
    </View>
  );
}

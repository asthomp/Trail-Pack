// This screen manages building a new pack.

import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, HelperText } from "react-native-paper";

import Loading from "../views/Loading";
import AddTag from "../views/formInputs/AddTag";
import TextFieldInput from "../views/formInputs/TextFieldInput";

export default function NewPack({
  addTagToCollection,
  buildNewTag,
  newTag,
  onSavePack,
  pack,
  removeTag,
  updatePackState,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView>
      <Card style={style.addPackCard}>
        <Card.Title
          title="Build New Pack"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />

        <Card.Content>
          <TextFieldInput
            error={pack.name.error}
            title="Pack Name"
            text={pack.name.value}
            onTextChange={(x) =>
              updatePackState({
                ...pack,
                name: { ...pack.name, value: x },
              })
            }
            onFocusChange={(x) =>
              updatePackState({
                ...pack,
                name: { ...pack.name, focused: x },
              })
            }
          />

          <TextFieldInput
            error={pack.trip.error}
            title="Associated Trip"
            text={pack.trip.value}
            onTextChange={(x) =>
              updatePackState({
                ...pack,
                trip: { ...pack.trip, value: x },
              })
            }
            onFocusChange={(x) =>
              updatePackState({
                ...pack,
                trip: { ...pack.trip, focused: x },
              })
            }
          />

          <TextFieldInput
            error={pack.description.error}
            title="Description"
            text={pack.description.value}
            onTextChange={(x) =>
              updatePackState({
                ...pack,
                description: { ...pack.description, value: x },
              })
            }
            onFocusChange={(x) =>
              updatePackState({
                ...pack,
                description: { ...pack.description, focused: x },
              })
            }
          />

          <AddTag
            addTagToCollection={addTagToCollection}
            buildNewTag={buildNewTag}
            newTag={newTag}
            tags={pack.tags.value}
            removeTag={removeTag}
          />
        </Card.Content>
        <Card.Actions>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {loading ? (
              <Loading />
            ) : (
              <Button
                style={{ marginRight: 10, width: 100 }}
                icon="content-save"
                mode="contained"
                onPress={async () => {
                  setLoading(true);
                  const result = await onSavePack();
                  if (result) {
                    setLoading(false);
                    router.push({
                      pathname: "pack/",
                    });
                  } else {
                    updatePackState({
                      ...pack,
                      form: {
                        ...pack.form,
                        error: "500: Failed to update pack",
                      },
                    });
                  }
                  setLoading(false);
                }}
              >
                Save
              </Button>
            )}
            <HelperText type="error" visible={!!pack.form.error}>
              {pack.form.error}
            </HelperText>
          </View>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  addPackCard: {
    flexGrow: 1,
    margin: 10,
  },
  divider: {
    margin: 5,
  },
  formMultipleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    paddingBottom: 5,
    paddingTop: 5,
  },
  formSingleRow: {
    flexDirection: "column",
    flexGrow: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

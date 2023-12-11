// This component returns a form control that allows a user to enter an item's weight.
// It receives an object in the form of {value: x, unit: y, error: z}. The component returns the form control.
// It can be used to create new items or edit existing items.

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, HelperText, Menu, TextInput } from "react-native-paper";

export default function WeightMenu({ weight, setWeight }) {
  const [menu, setMenu] = useState(false);

  // TextInputs require strings, even if the data is stored as an integer.
  if (typeof weight.value === "number") {
    setWeight({ ...weight, value: JSON.stringify(weight.value) });
  }

  return (
    <>
      <View style={style.formMultipleRow}>
        <TextInput
          style={{ flex: 1, marginRight: 10 }}
          mode="outlined"
          inputMode="numeric"
          placeholder="0"
          label="Weight"
          value={weight.value}
          error={!!weight.error}
          onChangeText={(x) => {
            setWeight({ ...weight, value: x, error: null });
            if (isNaN(+x.replace(/\s/g, ""))) {
              setWeight({
                ...weight,
                value: x,
                error: "Invalid number",
              });
            }
          }}
        />

        <Menu
          visible={menu}
          onDismiss={() => setMenu(false)}
          anchorPosition="bottom"
          anchor={
            <TextInput
              mode="outlined"
              placeholder="oz"
              editable={false}
              label="Unit"
              value={weight.unit}
              onChangeText={(x) => {
                setWeight({ ...weight, unit: x });
              }}
              right={
                <TextInput.Icon
                  icon={menu ? "menu-up" : "menu-down"}
                  onPress={() => (menu ? setMenu(false) : setMenu(true))}
                />
              }
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setWeight({
                ...weight,
                unit: "oz",
              });
              setMenu(false);
            }}
            title="oz"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setWeight({
                ...weight,
                unit: "lb",
              });
              setMenu(false);
            }}
            title="lb"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setWeight({
                ...weight,
                unit: "g",
              });
              setMenu(false);
            }}
            title="g"
          />
        </Menu>
      </View>
      <HelperText type="error" padding="none" visible={!!weight.error}>
        {weight.error}
      </HelperText>
    </>
  );
}

const style = StyleSheet.create({
  formMultipleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});

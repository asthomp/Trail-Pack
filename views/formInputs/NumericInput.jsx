// This component returns a form control that allows a user to enter an item's weight.
// It receives an object in the form of {value: x, unit: y, error: z}. The component returns the form control.
// It can be used to create new items or edit existing items.

import React, { useState } from "react";
import { View } from "react-native";
import { Divider, HelperText, Menu, TextInput } from "react-native-paper";

export default function NumericInput({
  title,
  maxNum = 100,
  setNumber,
  number,
}) {
  const [menu, setMenu] = useState(false);
  // TextInputs require strings, even if the data is stored as an integer.
  if (typeof number.value === "number") {
    setNumber({ ...number, value: JSON.stringify(number.value) });
  }
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Menu
        visible={menu}
        onDismiss={() => setMenu(false)}
        anchorPosition="bottom"
        anchor={
          <TextInput
            mode="outlined"
            editable
            label={title}
            value={number.value}
            onChangeText={(x) => {
              if (isNaN(+x.replace(/\s/g, ""))) {
                setNumber({
                  ...number,
                  value: x,
                  error: "Invalid number",
                });
              } else if (parseFloat(x) < 1) {
                setNumber({
                  ...number,
                  value: x,
                  error: "Invalid quantity",
                });
              } else {
                setNumber({ ...number, value: x, error: null });
              }
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
        {[...Array(maxNum).keys()].map((x) => {
          return (
            <View key={x + "-menu-item"}>
              <Menu.Item
                onPress={() => {
                  setNumber({
                    ...number,
                    value: (x + 1).toString(),
                  });
                  setMenu(false);
                }}
                title={x + 1}
              />
              {x + 1 !== maxNum && <Divider />}
            </View>
          );
        })}
      </Menu>
      <HelperText type="error" padding="none" visible={!!number.error}>
        {number.error}
      </HelperText>
    </View>
  );
}

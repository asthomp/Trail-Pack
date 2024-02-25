// A more specific form for dynamically rendering a dropdown list of items (itemID + name).
import React, { useState } from "react";
import { View } from "react-native";
import { Divider, HelperText, Menu, TextInput } from "react-native-paper";

export default function QuickAddDropDownMenu({
  title,
  menuLeadingIcon = null,
  onTextChange,
  items,
  error,
  style,
  text = "",
  hideError = false,
}) {
  const [menu, setMenu] = useState(false);
  return (
    <View style={style}>
      <Menu
        visible={menu}
        onDismiss={() => setMenu(false)}
        anchorPosition="bottom"
        anchor={
          <TextInput
            mode="outlined"
            editable={false}
            label={title}
            value={text}
            onChangeText={(x) => {
              onTextChange(x);
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
        {items &&
          items.map((x) => {
            return (
              <View key={x.itemID + x.value + "-dropdown-menu-item"}>
                <Menu.Item
                  leadingIcon={menuLeadingIcon}
                  onPress={() => {
                    onTextChange(x);
                    setMenu(false);
                  }}
                  title={x.value}
                />
                {x !== x[x.length - 1] && <Divider />}
              </View>
            );
          })}
      </Menu>
      {!hideError && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

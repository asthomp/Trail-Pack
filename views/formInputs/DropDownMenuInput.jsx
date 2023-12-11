// A generic form control representing an icon-free drop-down menu.
import React, { useState } from "react";
import { View } from "react-native";
import { Divider, HelperText, Menu, TextInput } from "react-native-paper";

export default function DropDownMenuInput({
  title,
  text,
  onTextChange,
  options,
  error,
  style,
  hideError = false,
  editable = true,
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
            editable={editable}
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
        {options.map((x) => {
          return (
            <View key={x + "-menu-item"}>
              <Menu.Item
                onPress={() => {
                  onTextChange(x);
                  setMenu(false);
                }}
                title={x}
              />
              {x !== options[options.length - 1] && <Divider />}
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

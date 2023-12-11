// This component returns a form control that allows a user to choose a category and associated icon.
// The component returns the form control. It can be used to create new items or edit existing items.

import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Menu, TextInput } from "react-native-paper";

import { getCategoryList } from "../../utils/dataParser";
import CategoryIcon from "../CategoryIcon";

export default function CategoryMenu({ category, setCategory }) {
  const [iconVisible, setIconVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <View style={style.formCategoryRow}>
        <Menu
          visible={iconVisible}
          onDismiss={() => setIconVisible(false)}
          anchorPosition="bottom"
          anchor={
            <IconButton
              mode="contained-tonal"
              icon={({ size, color }) => {
                if (category.icon === null) {
                  return (
                    <Entypo name="select-arrows" size={size} color={color} />
                  );
                } else {
                  return (
                    <CategoryIcon
                      category={category.icon}
                      size={size}
                      color={color}
                    />
                  );
                }
              }}
              onPress={() => setIconVisible(true)}
            />
          }
        >
          {getCategoryList().map((x) => {
            return (
              <View key={"Category Icon Selection =" + x.title}>
                <Menu.Item
                  title={x.icon}
                  onPress={() => {
                    setCategory({
                      ...category,
                      icon: x.icon,
                    });
                    setIconVisible(false);
                  }}
                  leadingIcon={({ color }) => (
                    <CategoryIcon category={x.icon} size={20} color={color} />
                  )}
                />
                <Divider />
              </View>
            );
          })}
        </Menu>
        <View style={{ flexGrow: 1 }}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchorPosition="bottom"
            anchor={
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                mode="outlined"
                label="Category"
                editable
                value={category}
                onChangeText={(x) => {
                  setCategory({
                    ...category,
                    value: x.title,
                  });
                }}
                right={
                  <TextInput.Icon
                    icon={menuVisible ? "menu-up" : "menu-down"}
                    onPress={() =>
                      menuVisible ? setMenuVisible(false) : setMenuVisible(true)
                    }
                  />
                }
              />
            }
          >
            {getCategoryList().map((x) => {
              return (
                <View key={"Category Selection Menu =" + x.title}>
                  <Menu.Item
                    onPress={() => {
                      setMenuVisible(false);
                    }}
                    title={x.title}
                    leadingIcon={({ color }) => (
                      <CategoryIcon category={x.icon} size={20} color={color} />
                    )}
                  />
                </View>
              );
            })}
          </Menu>
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  formCategoryRow: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "right",
  },
});

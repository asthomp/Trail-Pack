// A form input that allows a user to pick a custom or preset category (which will include an icon and label).
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Menu, TextInput } from "react-native-paper";

import { getPresetCategories } from "../../utils/categoryPresets";
import CategoryIcon from "../CategoryIcon";

export default function CategoryInput({
  category,
  onCategoryChange,
  onFocusChange,
  style,
}) {
  const [iconVisible, setIconVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <>
      <View style={[defaultStyle.formCategoryRow, style]}>
        <Menu
          visible={iconVisible}
          onDismiss={() => setIconVisible(false)}
          anchorPosition="bottom"
          anchor={
            <IconButton
              mode="contained-tonal"
              icon={({ size, color }) => {
                return (
                  <CategoryIcon
                    category={category.icon}
                    size={size}
                    color={color}
                  />
                );
              }}
              onPress={() => setIconVisible(true)}
            />
          }
        >
          {getPresetCategories().map((x) => {
            return (
              <View key={"Category Icon Selection =" + x.title}>
                <Menu.Item
                  title={x.icon}
                  onPress={() => {
                    onCategoryChange({ ...category, icon: x.icon });
                    setIconVisible(false);
                  }}
                  leadingIcon={({ color, size }) => (
                    <CategoryIcon category={x.icon} size={size} color={color} />
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
                editable
                label="Category"
                mode="outlined"
                onFocus={() => onFocusChange(true)}
                onBlur={() => onFocusChange(false)}
                right={
                  <TextInput.Icon
                    icon={menuVisible ? "menu-up" : "menu-down"}
                    onPress={() => {
                      setMenuVisible(true);
                    }}
                  />
                }
                style={{ flex: 1, marginLeft: 10 }}
                value={category.value}
                onChangeText={(x) => {
                  onCategoryChange({ ...category, value: x });
                }}
              />
            }
          >
            {getPresetCategories().map((x) => {
              return (
                <View key={"Category Selection Menu =" + x.title}>
                  <Menu.Item
                    onPress={() => {
                      onCategoryChange({ icon: x.icon, value: x.title });
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

const defaultStyle = StyleSheet.create({
  formCategoryRow: {
    alignItems: "stretch",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "right",
  },
});

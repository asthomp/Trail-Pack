import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { readString } from "react-native-csv";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Switch,
  Text,
  TextInput,
  HelperText,
  Menu,
  Divider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  categoryIconParser,
  weightUnitParser,
  convertWeight,
} from "../utils/dataParser";
import Database from "../utils/database";
import BulkImport from "../views/BulkImport";
import CategoryIcon from "../views/CategoryIcon";
import URLFormInput from "../views/URLFormInput";

export default function AddItem() {
  const [db, setDB] = useState(null);
  const [user, setUser] = useState(null);
  const [singleMode, setSingleMode] = useState(true);

  // Bulk Import
  const [bulk, setBulk] = useState({ url: "", visible: false, error: null });

  // Single Item Addition
  const [productName, setProductName] = useState({ value: "", error: null });
  const [brand, setBrand] = useState({ value: "", error: null });
  const [category, setCategory] = useState({
    value: "Packing & Storage",
    custom: false,
    error: null,
    visible: false,
    icon: "storage",
    iconVisible: false,
  });
  const [weight, setWeight] = useState({
    weight: null,
    weightMenuVisible: false,
    weightUnit: "oz",
    weightUnitMenuVisible: false,
    error: null,
  });
  const [wearable, setWearable] = useState(false);
  const [consumable, setConsumable] = useState(false);
  const [description, setDescription] = useState({ value: "", error: null });
  const [price, setPrice] = useState({ value: "", unit: "$", error: null });
  const [url, setURL] = useState({ value: "", error: null });

  useEffect(() => {
    setUser(getAuth().currentUser.uid);
    setDB(new Database());
  }, []);

  const addSingleItem = async function () {
    try {
      let formattedURL;
      // If they didn't include a protocol, add it.
      if (url.value.substring(0, 4) !== "http") {
        formattedURL = new url("https://" + url.value);
      } else {
        formattedURL = new url(url.value);
      }
      console.log(formattedURL);
    } catch (error) {
      setURL({ ...url, error: "Please enter a valid URL" });
    }
  };

  const categories = [
    { title: "Bear Aware", icon: "bear" },
    { title: "Books & Guides", icon: "book" },
    { title: "Bug Protection", icon: "bug" },
    { title: "Clothing", icon: "clothing" },
    { title: "Dental", icon: "dental" },
    { title: "Electronics", icon: "electronics" },
    { title: "Fire Starting", icon: "fire" },
    { title: "Food", icon: "food" },
    { title: "Hydration", icon: "water" },
    { title: "Hygiene", icon: "toiletpaper" },
    { title: "Light", icon: "light" },
    { title: "Medical", icon: "medical" },
    { title: "Mountaineering", icon: "mountain" },
    { title: "Navigation", icon: "compass" },
    { title: "Packing & Storage", icon: "storage" },
    { title: "Photography", icon: "camera" },
    { title: "Documents & ID", icon: "wallet" },
    { title: "Shelter", icon: "tent" },
    { title: "Sleeping", icon: "sleep" },
    { title: "Snow Gear", icon: "snow" },
    { title: "Sun Safety", icon: "sun" },
    { title: "Tools", icon: "tools" },
    { title: "Other", icon: "folder" },
  ];
  return (
    <ScrollView>


{/*    //   <Card style={style.addItemCard}>


    //     <Card.Title*/}
    //       title={!bulk ? "Add New Item" : "Add Bulk Items"}
    //       left={(props) => <Avatar.Icon {...props} icon="folder" />}
    //       right={(props) =>
    //         !bulk ? (
    //           <Button
    //             mode="text"
    //             onPress={() => {
    //               if (!bulk) {
    //                 setBulk(true);
    //               } else {
    //                 setBulk(false);
    //               }
    //             }}
    //             style={{ marginRight: 20 }}
    //           >
    //             Bulk Import
    //           </Button>
    //         ) : (
    //           <IconButton
    //             icon="chevron-left"
    //             mode="contained"
    //             onPress={() => {
    //               setBulk(false);
    //             }}
    //             style={{ marginRight: 20 }}
    //           />
    //         )
    //       }
    //     />
    //     {!bulk ? (
    //       <Card>
    //         <Card.Content>
    //           {/* PRODUCT NAME */}
    //           <View>
    //             <TextInput
    //               mode="outlined"
    //               label="Product Name"
    //               value={productName.value}
    //               error={!!productName.error}
    //               onChangeText={(x) => {
    //                 if (x.length > 50) {
    //                   setProductName({
    //                     value: x,
    //                     error: "Please use less than 50 characters",
    //                   });
    //                 } else {
    //                   setProductName({ value: x, error: null });
    //                 }
    //               }}
    //             />
    //             <HelperText
    //               type="error"
    //               padding="none"
    //               visible={!!productName.error}
    //             >
    //               {productName.error}
    //             </HelperText>
    //           </View>
    //
    //           {/* CATEGORY ICON & CATEGORY */}
    //           <Divider style={style.divider} />
    //           <View style={style.formCategoryRow}>
    //             <Menu
    //               visible={category.iconVisible}
    //               onDismiss={() =>
    //                 setCategory({ ...category, iconVisible: false })
    //               }
    //               anchorPosition="bottom"
    //               anchor={
    //                 <IconButton
    //                   mode="contained-tonal"
    //                   icon={({ size, color }) => {
    //                     if (
    //                       category.custom === true &&
    //                       category.icon === null
    //                     ) {
    //                       return (
    //                         <Entypo
    //                           name="select-arrows"
    //                           size={size}
    //                           color={color}
    //                         />
    //                       );
    //                     } else {
    //                       return (
    //                         <CategoryIcon
    //                           category={category.icon}
    //                           size={size}
    //                           color={color}
    //                         />
    //                       );
    //                     }
    //                   }}
    //                   onPress={() =>
    //                     setCategory({
    //                       ...category,
    //                       iconVisible: true,
    //                     })
    //                   }
    //                 />
    //               }
    //             >
    //               {categories.map((x) => {
    //                 return (
    //                   <View key={"Category Icon Selection =" + x.title}>
    //                     <Menu.Item
    //                       title={x.icon}
    //                       onPress={() => {
    //                         setCategory({
    //                           ...category,
    //                           icon: x.icon,
    //                           iconVisible: false,
    //                         });
    //                       }}
    //                       leadingIcon={({ color }) => (
    //                         <CategoryIcon
    //                           category={x.icon}
    //                           size={20}
    //                           color={color}
    //                         />
    //                       )}
    //                     />
    //                     <Divider />
    //                   </View>
    //                 );
    //               })}
    //             </Menu>
    //
    //             <TextInput
    //               style={{ flex: 1, marginLeft: 10 }}
    //               mode="outlined"
    //               label="Category"
    //               editable
    //               value={category.value}
    //               onChangeText={(x) => {
    //                 if (category.custom === false) {
    //                   setCategory({
    //                     ...category,
    //                     value: x,
    //                     icon: null,
    //                     custom: true,
    //                   });
    //                 } else {
    //                   setCategory({
    //                     ...category,
    //                     value: x,
    //                     custom: true,
    //                   });
    //                 }
    //               }}
    //               right={
    //                 <TextInput.Icon
    //                   icon={category.visible ? "menu-up" : "menu-down"}
    //                   onPress={() =>
    //                     category.visible
    //                       ? setCategory({ ...category, visible: false })
    //                       : setCategory({ ...category, visible: true })
    //                   }
    //                 />
    //               }
    //             />
    //           </View>
    //           <View
    //             style={{ flexDirection: "row", justifyContent: "flex-end" }}
    //           >
    //             <Menu
    //               visible={category.visible}
    //               onDismiss={() => setCategory({ ...category, visible: false })}
    //               anchorPosition="bottom"
    //               anchor={
    //                 <Divider
    //                   style={{
    //                     width: 1,
    //                     height: 1,
    //                   }}
    //                 />
    //               }
    //             >
    //               {categories.map((x) => {
    //                 return (
    //                   <View key={"Category Selection Menu =" + x.title}>
    //                     <Menu.Item
    //                       onPress={() => {
    //                         setCategory({
    //                           ...category,
    //                           value: x.title,
    //                           icon: x.icon,
    //                           visible: false,
    //                           custom: false,
    //                         });
    //                       }}
    //                       title={x.title}
    //                       leadingIcon={({ size, color }) => (
    //                         <CategoryIcon
    //                           category={x.icon}
    //                           size={20}
    //                           color={color}
    //                         />
    //                       )}
    //                     />
    //                   </View>
    //                 );
    //               })}
    //             </Menu>
    //           </View>
    //           <HelperText
    //             type="info"
    //             padding="none"
    //             visible={category.custom === true}
    //           >
    //             You can customize your category name and icon
    //           </HelperText>
    //           <Divider style={style.divider} />
    //
    //           {/* DISPLAY WEIGHT & UNIT */}
    //           <View style={style.formMultipleRow}>
    //             <TextInput
    //               style={{ flex: 1, marginRight: 10 }}
    //               mode="outlined"
    //               inputMode="numeric"
    //               placeholder="0"
    //               label="Weight"
    //               value={weight.value}
    //               error={!!weight.error}
    //               onChangeText={(x) => {
    //                 if (isNaN(+x.replace(/\s/g, ""))) {
    //                   setWeight({
    //                     ...weight,
    //                     value: x,
    //                     error: "Please enter a valid number.",
    //                   });
    //                 } else {
    //                   setWeight({ ...weight, value: x, error: null });
    //                 }
    //               }}
    //             />
    //
    //             <Menu
    //               visible={weight.weightUnitMenuVisible}
    //               onDismiss={() =>
    //                 setWeight({ ...weight, weightUnitMenuVisible: false })
    //               }
    //               anchorPosition="bottom"
    //               anchor={
    //                 <TextInput
    //                   mode="outlined"
    //                   placeholder="oz"
    //                   editable={false}
    //                   label="Unit"
    //                   value={weight.weightUnit}
    //                   onChangeText={(x) => {
    //                     setWeight({ ...weight, weightUnit: x });
    //                   }}
    //                   right={
    //                     <TextInput.Icon
    //                       icon={
    //                         weight.weightUnitMenuVisible
    //                           ? "menu-up"
    //                           : "menu-down"
    //                       }
    //                       onPress={() =>
    //                         weight.weightUnitMenuVisible
    //                           ? setWeight({
    //                               ...weight,
    //                               weightUnitMenuVisible: false,
    //                             })
    //                           : setWeight({
    //                               ...weight,
    //                               weightUnitMenuVisible: true,
    //                             })
    //                       }
    //                     />
    //                   }
    //                 />
    //               }
    //             >
    //               <Menu.Item
    //                 onPress={() => {
    //                   setWeight({
    //                     ...weight,
    //                     weightUnit: "oz",
    //                     weightUnitMenuVisible: false,
    //                   });
    //                 }}
    //                 title="oz"
    //               />
    //               <Divider />
    //               <Menu.Item
    //                 onPress={() => {
    //                   setWeight({
    //                     ...weight,
    //                     weightUnit: "lb",
    //                     weightUnitMenuVisible: false,
    //                   });
    //                 }}
    //                 title="lb"
    //               />
    //               <Divider />
    //               <Menu.Item
    //                 onPress={() => {
    //                   setWeight({
    //                     ...weight,
    //                     weightUnit: "g",
    //                     weightUnitMenuVisible: false,
    //                   });
    //                 }}
    //                 title="g"
    //               />
    //             </Menu>
    //           </View>
    //           <HelperText type="error" padding="none" visible={!!weight.error}>
    //             {weight.error}
    //           </HelperText>
    //           <Divider style={style.divider} />
    //
    //           {/* WEARABLE ITEM */}
    //           <View style={style.formToggleRow}>
    //             <Text variant="titleMedium">Wearable?</Text>
    //             <Switch
    //               value={wearable}
    //               onValueChange={() => {
    //                 wearable ? setWearable(false) : setWearable(true);
    //               }}
    //             />
    //           </View>
    //           <Divider style={style.divider} />
    //
    //           {/* CONSUMABLE ITEM */}
    //           <View style={style.formToggleRow}>
    //             <Text variant="titleMedium">Consumable?</Text>
    //             <Switch
    //               value={consumable}
    //               onValueChange={() => {
    //                 consumable ? setConsumable(false) : setConsumable(true);
    //               }}
    //             />
    //           </View>
    //
    //           <Divider style={style.divider} />
    //
    //           {/* DESCRIPTION */}
    //           <View>
    //             <TextInput
    //               mode="outlined"
    //               label="Description"
    //               value={description.value}
    //               error={!!description.error}
    //               onChangeText={(x) => {
    //                 if (x.length > 100) {
    //                   setDescription({
    //                     value: x,
    //                     error: "Please use less than 100 characters",
    //                   });
    //                 } else {
    //                   setDescription({ value: x, error: null });
    //                 }
    //               }}
    //             />
    //             <HelperText type="error" visible={description.error}>
    //               {description.error}
    //             </HelperText>
    //           </View>
    //
    //           {/* BRAND */}
    //           <View>
    //             <TextInput
    //               mode="outlined"
    //               label="Brand"
    //               value={brand.value}
    //               error={!!brand.error}
    //               onChangeText={(x) => {
    //                 if (x.length > 25) {
    //                   setBrand({
    //                     value: x,
    //                     error: "Please use less than 25 characters",
    //                   });
    //                 } else {
    //                   setBrand({ value: x, error: null });
    //                 }
    //               }}
    //             />
    //             <HelperText type="error" padding="none" visible={!!brand.error}>
    //               {brand.error}
    //             </HelperText>
    //           </View>
    //
    //           {/* PRICE */}
    //           <View>
    //             <TextInput
    //               mode="outlined"
    //               label="Price"
    //               placeholder="0"
    //               value={price.value}
    //               error={!!price.error}
    //               onChangeText={(x) => {
    //                 if (isNaN(+x.replace(/\s/g, ""))) {
    //                   setPrice({
    //                     ...price,
    //                     value: x,
    //                     error: "Please enter a valid number",
    //                   });
    //                 } else {
    //                   setPrice({ ...price, value: x, error: null });
    //                 }
    //               }}
    //               left={<TextInput.Affix text="$" />}
    //             />
    //             <HelperText type="error" visible={!!price.error}>
    //               {price.error}
    //             </HelperText>
    //           </View>
    //           <URLFormInput url={url} setURL={setURL()} />
    //         </Card.Content>
    //         <Card.Actions>
    //           <Button
    //             icon="content-save"
    //             mode="contained"
    //             onPress={addSingleItem}
    //           >
    //             Save
    //           </Button>
    //         </Card.Actions>
    //       </Card>
    //     ) : (
          <BulkImport db={db} user={user} bulk={bulk} setBulk={setBulk} />
      //   )}
      // </Card>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  addItemContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addItemCard: {
    flexGrow: 1,
    margin: 10,
  },
  formSingleRow: {
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  formMultipleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  formCategoryRow: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formToggleRow: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  divider: {
    margin: 5,
  },
});

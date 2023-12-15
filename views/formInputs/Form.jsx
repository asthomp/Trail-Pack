import { View } from "react-native";
import { Divider } from "react-native-paper";

import CategoryInput from "./CategoryInput";
import DropDownMenuInput from "./DropDownMenuInput";
import TextFieldInput from "./TextFieldInput";
import ToggleInput from "./ToggleInput";
import WeightRowInput from "./WeightRowInput";
import { createRange } from "../../utils/helpers";

export default function Form({ item, updateItemState }) {
  return (
    <>
      <TextFieldInput
        title="Product Name"
        text={item.productName.value}
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            productName: { ...item.productName, focused: x },
          });
        }}
        onTextChange={(x) => {
          updateItemState({
            ...item,
            productName: { ...item.productName, value: x },
          });
        }}
        error={item.productName.error}
      />
      <Divider style={{ marginTop: 0, marginBottom: 10 }} />
      <CategoryInput
        category={item.category}
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            category: { ...item.category, focused: x },
          });
        }}
        onCategoryChange={(x) => {
          updateItemState({
            ...item,
            category: x,
          });
        }}
      />
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <WeightRowInput
        weight={item.weight.value}
        error={item.weight.error}
        unit={item.weight.unit}
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            weight: { ...item.weight, focused: x },
          });
        }}
        onWeightChange={(x) => {
          updateItemState({
            ...item,
            weight: { ...item.weight, value: x },
          });
        }}
        onUnitChange={(x) => {
          updateItemState({
            ...item,
            weight: { ...item.weight, unit: x },
          });
        }}
      />

      <Divider style={{ marginTop: 0, marginBottom: 10 }} />
      <ToggleInput
        title="Wearable?"
        toggle={item.wearable}
        onChangeToggle={(x) => {
          updateItemState({ ...item, wearable: x });
        }}
      />
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <ToggleInput
        title="Consumable?"
        toggle={item.consumable}
        onChangeToggle={(x) => {
          updateItemState({ ...item, consumable: x });
        }}
      />
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <TextFieldInput
        error={item.description.error}
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            description: { ...item.description, focused: x },
          });
        }}
        onTextChange={(x) => {
          updateItemState({
            ...item,
            description: { ...item.description, value: x },
          });
        }}
        text={item.description.value}
        title="Description"
      />
      <Divider style={{ marginTop: 0, marginBottom: 10 }} />
      <TextFieldInput
        error={item.brand.error}
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            brand: { ...item.brand, focused: x },
          });
        }}
        onTextChange={(x) => {
          updateItemState({
            ...item,
            brand: { ...item.brand, value: x },
          });
        }}
        text={item.brand.value}
        title="Brand"
      />
      <Divider style={{ marginTop: 0, marginBottom: 10 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextFieldInput
          error={item.price.error}
          prefix="$"
          onFocusChange={(x) => {
            updateItemState({
              ...item,
              price: { ...item.price, focused: x },
            });
          }}
          onTextChange={(x) => {
            updateItemState({
              ...item,
              price: { ...item.price, value: x },
            });
          }}
          style={{ flexGrow: 1, marginRight: 10 }}
          text={item.price.value}
          title="Price"
        />
        <DropDownMenuInput
          title="Quantity"
          text={item.quantity.value}
          options={createRange(1, 10).map((x) => JSON.stringify(x))}
          onFocusChange={(x) => {
            updateItemState({
              ...item,
              quantity: { ...item.quantity, focused: x },
            });
          }}
          onTextChange={(x) => {
            updateItemState({
              ...item,
              quantity: { ...item.quantity, value: x },
            });
          }}
          error={item.quantity.error}
        />
      </View>
      <Divider style={{ marginTop: 0, marginBottom: 10 }} />
      <TextFieldInput
        error={item.url.error}
        icon="web"
        onFocusChange={(x) => {
          updateItemState({
            ...item,
            url: { ...item.url, focused: x },
          });
        }}
        onTextChange={(x) => {
          updateItemState({
            ...item,
            url: { ...item.url, value: x },
          });
        }}
        style={{ flexGrow: 1, marginRight: 10 }}
        text={item.url.value}
        title="Link"
      />
    </>
  );
}

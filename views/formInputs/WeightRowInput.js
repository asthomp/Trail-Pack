// Combines two generic controls to create an input that manages weight and its associated unit.
import React from "react";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

import DropDownMenuInput from "./DropDownMenuInput";
import TextFieldInput from "./TextFieldInput";

export default function WeightRowInput({
  onFocusChange,
  onWeightChange,
  onUnitChange,
  weight,
  unit,
  error,
  style,
}) {
  return (
    <View style={[style]}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextFieldInput
          title="Weight"
          text={weight}
          onFocusChange={(x) => onFocusChange(x)}
          onTextChange={(x) => onWeightChange(x)}
          style={{
            flexGrow: 1,
            marginRight: 10,
          }}
          hideError
        />
        <DropDownMenuInput
          editable={false}
          hideError
          onFocusChange={(x) => onFocusChange(x)}
          onTextChange={(x) => onUnitChange(x)}
          options={["oz", "lbs", "g"]}
          text={unit}
          title="Unit"
        />
      </View>
      <HelperText type="error">{error}</HelperText>
    </View>
  );
}

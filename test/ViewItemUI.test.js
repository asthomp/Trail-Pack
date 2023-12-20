import { render, screen } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";

import ViewItem from "../screens/ViewItem";
const mockItem = {
  itemID: 1,
  brand: "MockBrand",
  product: "MockProduct",
  categoryIcon: "mockCategoryIcon",
};

describe("ViewItem Component", () => {
  test("Renders with valid item", () => {
    render(<ViewItem item={mockItem} />, { wrapper: PaperProvider });

    expect(screen.getByText("MockBrand MockProduct")).toBeTruthy();
    expect(screen.getByLabelText("Edit Item")).toBeTruthy();
    expect(screen.getByLabelText("Delete Item")).toBeTruthy();
    expect(screen.getByLabelText("Debug Item")).toBeTruthy();
  });
});

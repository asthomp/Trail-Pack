import { act, renderHook } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

import { useViewItemViewModel } from "../app/(tabs)/locker/[itemID]";
import { DataContext } from "../utils/DataProvider";

jest.mock("expo-router");

const mockItem = {
  itemID: 1,
  brand: "MockBrand",
  product: "MockProduct",
  categoryIcon: "mockCategoryIcon",
};

const getItem = jest.fn();
const deleteItem = jest.fn();

function MockDataProvider({ children }) {
  return (
    <DataContext.Provider
      value={{
        getItem,
        deleteItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function renderViewModel() {
  return renderHook(() => useViewItemViewModel(), {
    wrapper: MockDataProvider,
  });
}

describe("ViewItem Screen Logic", () => {
  beforeEach(() => {
    getItem.mockReturnValue(mockItem);
    useLocalSearchParams.mockReturnValue({ itemID: mockItem.itemID });
  });

  test("By default, modals are not visible and delete is not in progress", () => {
    const { result } = renderViewModel();

    expect(result.current.deleteModal).toBeFalsy();
    expect(result.current.debugModal).toBeFalsy();
    expect(result.current.isDeleteInProgress).toBeFalsy();
  });

  test("Logic loads the correct item from the Data Provider", () => {
    getItem.mockReturnValue(mockItem);
    useLocalSearchParams.mockReturnValue({ itemID: mockItem.itemID });

    const { result } = renderViewModel();

    expect(result.current.item).toBe(mockItem);
    expect(result.current.item.itemID).toBe(mockItem.itemID);
    expect(getItem.mock.calls[0][0]).toStrictEqual(mockItem.itemID);
  });

  test("Can show debug modal", () => {
    const { result } = renderViewModel();
    // Tests that change State must be wrapped in act(()=>{-change to State-})
    act(() => {
      result.current.onShowDebugModal();
    });

    expect(result.current.debugModal).toBeTruthy();
  });
});
//Test what happens when you delete

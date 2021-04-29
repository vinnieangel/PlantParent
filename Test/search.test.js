import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import SearchArea from "../screens/SearchArea.js";

test("render register input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <SearchArea />
  );
});

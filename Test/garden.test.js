import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react-native";
import Garden from "../screens/GardenArea";
import { login } from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
import getByTestId from "@testing-library/dom";
import ReactTestUtils from "react-dom/test-utils"; // ES6

test("renders without crashing", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Garden />
  );
});

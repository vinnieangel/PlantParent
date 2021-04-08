import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import Register from "../screens/CreateAccount";

/*
test("Home should render OK", async () => {
  const { getByText, getByTestId, getAllByTestId, queryByText } = render(
    <Login />
  );
});
*/

test("render register input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const input = getByPlaceholderText("Enter your username or email");
  expect(input).toBeDefined();
});

test("render register password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const password = getByPlaceholderText("Enter your password");
  expect(password).toBeDefined();
  /*
  fireEvent.changeText(input, "test");
  const item = getByPlaceholderText("test");
  expect(item).toBeDefined();
  */
});

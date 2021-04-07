import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";

/*
test("Home should render OK", async () => {
  const { getByText, getByTestId, getAllByTestId, queryByText } = render(
    <Login />
  );
});
*/

test("render Login input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const input = getByPlaceholderText("Username or email");
  expect(input).toBeDefined();
});

test("render password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const password = getByPlaceholderText("Password");
  expect(password).toBeDefined();
  /*
  fireEvent.changeText(input, "test");
  const item = getByPlaceholderText("test");
  expect(item).toBeDefined();
  */
});

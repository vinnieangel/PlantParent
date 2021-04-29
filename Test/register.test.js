import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import Register from "../screens/CreateAccount";

window.alert = jest.fn();

test("render register input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  //const input = getByPlaceholderText("Enter your username or email");
  //expect(input).toBeDefined();
});

test("render register input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  //const input = getByPlaceholderText("Enter your username or email");
  //expect(input).toBeDefined();
});

test("render register password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Register />
  );
  const password = getByPlaceholderText("Enter your password");
  expect(password).toBeDefined();
});

test("button 1 works", () => {
  window.alert.mockClear();
  const { getByTestId, getByText } = render(<Register />);
  fireEvent.press(getByTestId("button1"));
});

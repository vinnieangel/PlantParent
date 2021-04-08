import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";
import { login } from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
import getByTestId from "@testing-library/dom";

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
});

test("renders without crashing", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
});

test("render password input component properly", () => {
  const { debug, getByTestId, getByText, getByPlaceholderText } = render(
    <Login />
  );
  const password = getByTestId("button1");
  expect(password).toBeDefined();
});

test("increments count", () => {
  const { getByTestId, getByText } = render(<Login />);
  fireEvent.press(getByTestId("button1"));
});

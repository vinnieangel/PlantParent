import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
const app = require("../appTest.js");
//const Login = require("../screens/Login");

/*
describe("App", function () {
  it("app should return hello", function () {
    assert.equal(app(), "hello");
  });
});
*/

test("Home should render OK", async () => {
  const { getByText, getByTestId, getAllByTestId, queryByText } = render(
    <Login />
  );
});

const userCredentials = {
  userName: "buckydabadger",
  password: "OnWisconsin",
};

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react-native";
import Garden from "../screens/GardenArea";
import { login } from "../screens/Login";
import "@testing-library/jest-dom/extend-expect";
import getByTestId from "@testing-library/dom";
import ReactTestUtils from "react-dom/test-utils"; // ES6
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

test("snapshot test of Garden component", () => {
  const wrapper = shallow(<Garden />);
  expect(wrapper).toMatchSnapshot();
});

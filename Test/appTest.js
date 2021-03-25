const assert = require("chai").assert;
const app = require("../appTest.js");
//const Login = require("../screens/Login");

describe("App", function () {
  it("app should return hello", function () {
    assert.equal(app(), "hello");
  });
});

const userCredentials = {
  userName: "buckydabadger",
  password: "OnWisconsin",
};

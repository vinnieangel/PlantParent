import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GardenArea from "../screens/GardenArea";
import Plant from "../screens/plant"

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
        <Stack.Navigator
        >
          <Stack.Screen name="GardenView" component={GardenArea} />
          <Stack.Screen name="Plant" component={Plant} />
        </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

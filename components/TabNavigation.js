import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GardenStack from "./GardenStack";
import SearchArea from "../screens/SearchArea";
import ProfileScreen from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarScreen from "../screens/CalendarArea";

const Tab = createBottomTabNavigator();
export default class TabNavigation extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "My Garden") {
              iconName = focused ? "ios-leaf" : "ios-leaf";
            } else if (route.name === "Search Plants") {
              iconName = focused ? "search-outline" : "search-sharp";
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-sharp";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-outline" : "person";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} />;
          },
        })}
      >
        <Tab.Screen name="My Garden" component={GardenStack} />
        <Tab.Screen name="Search Plants" component={SearchArea} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }
}

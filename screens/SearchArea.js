import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Searchbar } from "react-native-paper";

export default class SearchArea extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  render() {
    const { search } = this.state;

    const onChangeSearch = (query) => this.setState({ search: query });
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bottomContainer}>
          <Searchbar
            style={styles.searchBarContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={search}
          />
        </View>
        <ScrollView>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  container2: {
    padding: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  text: {
    fontSize: 100,
  },
  title: {
    color: "#1d3557",
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 100,
    textAlign: "center",
    width: 200,

    justifyContent: "center",
    opacity: 0.9,
    fontSize: 30,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#30694B",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
});

import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import {Card} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Searchbar } from "react-native-paper";

export default class SearchArea extends React.Component {
  dummyPlants = [{name: "plant1", img: require("../Images/p1.jpg")}, {name:"plant2", img:require("../Images/p2.jpg")}, 
  {name:"plant3", img: require("../Images/p3.jpg")}, {name:"plant4", img: require("../Images/p4.jpg")}, {name:"plant5", img: require("../Images/p5.jpg")}, {name:"plant6", img: require("../Images/p6.jpg")}]
  state = {
    search: "",
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  makeCard() {
    let cards = [];
    for (let i = 0; i < this.dummyPlants.length; i++) {
      cards.push(
      <View style ={{flex:1, width:500, height:200, alignContent:'center', justifyContent:'center'}}>
      <Card key={this.dummyPlants[i].name} >
        {
          <View style ={{flex:1, alignItems:'center'}}>
          <Image style={styles.plantImage} source={this.dummyPlants[i].img} />
          </View>
        }
        <Card.Title>{this.dummyPlants[i].name}</Card.Title>
        </Card></View>)
    }
    return cards;
  }


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
        
          {this.makeCard()}
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
  plantImage: {
    flex: 1,
    width: 300,
    height: 200,
    resizeMode: "contain",
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center'
}
});

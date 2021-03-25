import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import {Card} from 'react-native-elements';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Searchbar } from "react-native-paper";

export default class GardenArea extends React.Component {
  dummyPlants = [{name: "plant1", img: require("../Images/p1.jpg")}, {name:"plant2", img:require("../Images/p2.jpg")}, 
  {name:"plant3", img: require("../Images/p3.jpg")}, {name:"plant4", img: require("../Images/p4.jpg")}, {name:"plant5", img: require("../Images/p5.jpg")}, {name:"plant6", img: require("../Images/p6.jpg")}]
  state = {
    search: "",
  };

  makeCard() {
    let cards = [];
    for (let i = 0; i < this.dummyPlants.length; i++) {
      cards.push(
      
      <View key={this.dummyPlants[i].name} style ={{flex:1, direction:'row', justifyContent:'center',
          alignItems:'center',
          alignContent:'center', width:300, height:200}}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Plant'), {
                  plantName:this.dummyPlants[i].name
              }}}>
      <Card >
        {
          <View style ={{flex:1, justifyContent:'center',
          alignItems:'center',
          alignContent:'center', width:100, height:100}}>
          <Image style={styles.plantImage} source={this.dummyPlants[i].img} />
          </View>
        }
        <Card.Title>{this.dummyPlants[i].name}</Card.Title>
        </Card>
        </TouchableOpacity>
        </View>
        )
    }
    return cards;
  }


  render() {
    return (
      <SafeAreaView style={styles.container}> 
        <ScrollView>
            <Text style = {styles.title}>
                Welcome to your garden!
            </Text>
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
    flex:1,
    direction:'row'
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
    height:'100%',
    width:'100%'
}
});

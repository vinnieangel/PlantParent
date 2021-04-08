import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView, FlatList } from "react-native";
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
  dummyPlants = [{name: "plant1", img: require("../Images/p1.jpg")},
  {name:"plant2", img:require("../Images/p2.jpg")}, 
  {name:"plant3", img: require("../Images/p3.jpg")}, 
  {name:"plant4", img: require("../Images/p4.jpg")}, 
  {name:"plant5", img: require("../Images/p5.jpg")}, 
  {name:"plant6", img: require("../Images/p6.jpg")}]

  userID = this.props.userID;
  state = {
    dummyPlants : [],
    clickedPlantIndex:undefined
  }

  async componentDidMount() {
    console.log('here')
    await fetch('http://localhost:5000/plants/getAll', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(async res => {
      if(res.status == 400) {
        console.log(await res.json())
      }
      else {
        return await res.json();
      }
    }).then(res => {
      let images = [];
      let plants = [];
      for(let plant of res.plants) {
        plants.push(plant)
      }
      this.setState( {dummyPlants: plants});
      console.log("here")
    })
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
        <Text style = {styles.title}>
            Welcome to your garden!
        </Text>
        <FlatList
            data={this.state.dummyPlants}
            numColumns={2}
            keyExtractor={(item, index) => item.name}
            renderItem={({item, index}) => 
                <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Plant'), {
                        name:item.name
                    }}}>
                        <Card>
                            <Image style = {styles.plantImage} source={{uri: item.image}}>
                            </Image>
                        <Card.Title>{item.name}</Card.Title>
                        </Card>
                    </TouchableOpacity>
                </View>}
        />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems:'center'
  },
  title: {
    color: "#006400",
    marginBottom: 10,
    marginTop: 40,
    textAlign: "center",
    width: 200,
    justifyContent: "center",
    opacity: 0.9,
    fontSize: 22,
  },
  plantImage: {
    flex: 1,
    height:100,
    width:100
}
});

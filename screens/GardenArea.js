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

  render() {
    return (
        <SafeAreaView style={styles.container}>
        <Text style = {styles.title}>
            Welcome to your garden!
        </Text>
        <FlatList
            data={this.dummyPlants}
            numColumns={2}
            keyExtractor={(item, index) => item.name}
            renderItem={({item, index}) => 
                <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Plant'), {
                        name:item.name
                    }}}>
                        <Card>
                            <Image style = {styles.plantImage} source={item.img}>
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

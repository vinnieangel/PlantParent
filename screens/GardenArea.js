import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { Searchbar } from "react-native-paper";

export default class GardenArea extends React.Component {
 

  userID = this.props.route.params.userID;
  state = {
    plants : [],
    userPlants: [],
    clickedPlantIndex:undefined
  }

  async componentDidMount() {
    await fetch('http://localhost:5000/gardens/get/'+this.userID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => await res.json())
    .then(async res => {
      //I have the result of the garden get: array of userPlant IDs. Now I have to iterate through this
      //and call the userPlants get to get the full object, and put that into my state

      //If I dont have any plants saved
      if(res == "Empty!") {
        throw new Error("Empty!")
      }
      else {
        let userPlants = [];
        for(let userPlantID of res) {
          console.log('USER PLANT ID', userPlantID)
          await fetch('http://localhost:5000/userPlants/getPlant/'+userPlantID, {
            method:'GET',
            header: {
              'Content-Type':'application/json'
            }
          }).then(async result => {
            return await result.json();
          }).then(result => {
            console.log('RES', result)
            userPlants.push(result)
          }).catch(err => console.log("Error: " + err))
        }
        this.setState({userPlants:userPlants})
      }
    }).then(async ()=> {
      //I have all the userPlants in the state. Now I need to do the same thing I did before, except with 
      //userPlants and plants
      
      let plants = [];
      for(let plant of this.state.userPlants) {
        console.log('PLANT ID', plant.plantID)
        await fetch('http://localhost:5000/plants/getPlant/'+plant.plantID, {
          method:'GET',
          header: {
            'Content-Type':'application/json'
          }
        }).then(async result => {
          return await result.json();
        }).then(result => {
          console.log('RES2', result)
          plants.push(result)
        }).catch(err => console.log("Error: " + err))
      }
      this.setState({plants:plants})
    })
    .catch(err => {
      if(err != "Empty"){
        console.log("Error: "+ err)
      }
    });
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
        <Text style = {styles.title}>
            Welcome to your garden!
        </Text>
        {this.state.plants.length>0 && <FlatList
            data={this.state.userPlants}
            numColumns={2}
            keyExtractor={(item, index) => item._id}
            renderItem={({item, index}) => 
                <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Plant', {
                        userPlant: this.state.userPlants[index],
                        plant: this.state.plants[index],
                    })
                  }}>
                        <Card>
                            <Image style = {styles.plantImage} source={{uri: this.state.plants[index].image}}>
                            </Image>
                        <Card.Title>{item.givenName}</Card.Title>
                        </Card>
                    </TouchableOpacity>
                </View>}
        />}
        {!this.state.plants.length && <Text>
            Your garden is currently empty! Click on the Search Plants tab to get started.
          </Text>}
        </SafeAreaView>
                );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
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
    height: 100,
    width: 100,
  },
});

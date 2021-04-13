import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';

export default class Plant extends Component {
 

  
  
     userID = this.props.route.params.userID;
    userPlant = this.props.route.params.userPlant;
     plant = this.props.route.params.plant;
    
  
  state = {
    givenName : this.userPlant.givenName
  }
  
  
  

  async delete() {
    await fetch("https://plantparent506.herokuapp.com/gardens/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: this.userID,
        userPlantID: this.userPlant._id,
      }),
    })
      .then(async () => {
        await fetch("https://plantparent506.herokuapp.com/userPlants/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userPlantID: this.userPlant._id,
          }),
        })
          .then(() => {
            this.props.navigation.replace("GardenView");
          })
          .catch((err) => console.log("Error: " + err));
      })
      .catch((err) => console.log("Error: " + err));
  }

  async editName(newName) {
    console.log(newName)
    await fetch("http://localhost:5000/userPlants/editName", { 
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify( {
        userPlantID:this.userPlant._id,
        newName: newName 
      })
    }).then(async res=> await res.json()).then(res => this.setState({givenName:res.givenName}))
  }


  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <View style={styles.infoWrapper}>
              <View style={styles.plantImage}>
                <Image
                  style={styles.imageContainer}
                  source={{ uri: this.plant.image }}
                />
              </View>
              <View style={styles.descriptionWrapper}>
                <View>
                  <View style ={{flex:1, flexDirection:'row'}}>
                  <Text style={styles.title}>{this.state.givenName}</Text>
                  <TouchableOpacity style ={{marginTop:15}} onPress ={()=>{
                    let newName = prompt('Enter your plant\'s new given name here: ');
                    console.log(newName)
                    this.editName(newName)}}>
                    <EvilIcons name="pencil" size={24} color="black"  />
                  </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.subtitle}>{this.plant.name}</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.delete()}
                  >
                    <Text style={{ color: "white" }}>Delete from garden</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.needFlexWrapper}>
              <View style={styles.needContainer}>
                {/*<View style={styles.icon}>
                  <Ionicons name="sunny-outline" size={50} color="#51A746" />
                  <Text style={styles.amount}>Full Sun</Text>
                </View>
                <View style={styles.icon}>
                  <Ionicons name="water-outline" size={50} color="#51A746" />
                  <Text style={styles.amount}>Every Week</Text>
                </View>*/}
                {this.userPlant.stage == "Seed" && (
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="seed"
                      size={50}
                      color="#51A746"
                    />
                    <Text style={styles.amount}>Seed</Text>
                  </View>
                )}

                {this.userPlant.stage == "Germinated" && (
                  <View style={styles.icon}>
                    <FontAwesome5 name="seedling" size={50} color="#51A746" />
                    <Text style={styles.amount}>Germinated</Text>
                  </View>
                )}

                {this.userPlant.stage == "Sapling" && (
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="leaf"
                      size={50}
                      color="#51A746"
                    />
                    <Text style={styles.amount}>Sapling</Text>
                  </View>
                )}

                {this.userPlant.stage == "Mature" && (
                  <View style={styles.icon}>
                    <Entypo name="tree" size={50} color="#51A746" />
                    <Text style={styles.amount}>Mature</Text>
                  </View>
                )}
              </View>
            </View>

            <View stlye={styles.careShadow}>
              <View style={styles.careInfoFlex}>
                <Text style={styles.careFont}>Care</Text>
                <View style={styles.careFlexWrapper}>
                  <View style={styles.careContainer}>
                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Watering</Text>
                      <Text style={styles.careAmount}>
                        {this.plant.basicWatering}
                      </Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Potting</Text>
                      <Text style={styles.careAmount}>
                        {this.plant.basicPot}
                      </Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Light</Text>
                      <Text style={styles.careAmount}>
                        {this.plant.basicLight}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.careContainer}>
                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Temperature</Text>
                      <Text style={styles.careAmount}>
                        {this.plant.basicTemp}
                      </Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Fertilization</Text>
                      <Text style={styles.careAmount}>
                        {this.plant.basicFertilizing}
                      </Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Date of birth</Text>
                      <Text style={styles.careAmount}>
                        {new Date(this.userPlant.dob).toString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.title}> About </Text>
              <Text style={styles.subtitle}>{this.plant.basicDescription}</Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    marginRight: 20,
    marginLeft: 20,
  },
  careInfoFlex: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#2B614A",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#C1C1C1",
    shadowOpacity: 0.7,
  },
  careFont: {
    fontSize: 25,
    color: "white",
    paddingLeft: 25,
    paddingBottom: 10,
  },
  careContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: 400,
  },
  careWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  careFlexWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
  },

  needFlexWrapper: {
    display: "flex",
    alignSelf: "center",
    paddingBottom: 30,
    paddingLeft: 25,
  },
  needContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 25,
    marginBottom: 10,
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  amount: {
    fontSize: 12,
    marginTop: 5,
    color: "#515151",
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  plantImage: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: 150,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
  },
  descriptionWrapper: {
    flex: 1,
    paddingLeft: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    paddingTop: 20,
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#515151",
    paddingBottom: 10,
  },
  subtitle: {
    fontFamily: "Helvetica",
    textAlign: "left",
    fontSize: 15,
    color: "#515151",
  },
  careTitle: {
    fontSize: 12,
    color: "white",
  },
  careAmount: {
    width: 315,
    fontSize: 15,
    color: "white",
    paddingTop: 3,
  },
  aboutSection: {
    paddingTop: 30,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 2,
    width: 150,
  },
});

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
import Slider from '@react-native-community/slider';
import DateTimePicker from "@react-native-community/datetimepicker";



export default class Plant extends Component {
 

  
  
     userID = this.props.route.params.userID;
    userPlant = this.props.route.params.userPlant;
     plant = this.props.route.params.plant;
    
  
  state = {
    givenName : this.userPlant.givenName,
    slider: 1,
    frequency: 0,
    wSExists: false,
    nextWatering:"",
    lastWatered: "",
    frequency:0,
    editLastWateredModal:false,
    editNextWateringModal:false,
    editFrequencyModal:false
  }
  
  
  
  async componentDidMount() {
    if (this.userPlant.stage == "Seed") {
      this.setState({slider: 0})
    }
    else if (this.userPlant.stage == "Germinated") {
      this.setState({slider: 1})
    }
    else if (this.userPlant.stage == "Sapling") {
      this.setState({slider: 2})
    }
    else {
      this.setState({slider: 3})
    }
    if (this.userPlant.wateringSchedule) {
      this.setState({wSExists:true})
      await this.getWateringSchedule();
    }
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
    await fetch("https://plantparent506.herokuapp.com/userPlants/editName", { 
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

  async createWS(frequency) {
    let lastWatered = new Date();
    let nextWatering = new Date(lastWatered);
  nextWatering.setDate(nextWatering.getDate() + frequency);
  console.log(nextWatering)
  
    await fetch('http://localhost:5000/ws/create', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        frequency:frequency,
        lastWatered:lastWatered,
        nextWatering:nextWatering
      })
    }).then(async res => res.json()).then(async res => {
      await fetch('http://localhost:5000/userPlants/addWS', {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          userPlantID: this.userPlant._id,
          WSID: res.WSID
        })
      }).then(async res => await res.json()).then(res=> {
        this.userPlant = res; 
        this.setState({wSExists:true, nextWatering:nextWatering.toLocaleString().split(',')[0], lastWatered:lastWatered.toLocaleString().split(',')[0], frequency:frequency});
        window.alert("You can water "+ this.state.givenName + " next on "+ nextWatering.toLocaleString().split(",")[0] + ". (Don't forget to water it today!)" )
       });
    }).catch(err => console.log("Error: " + err))
  }

  async getWateringSchedule () {
    await fetch("http://localhost:5000/ws/get/" + this.userPlant.wateringSchedule, {
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(async res => await res.json()).then(res => {
      this.setState({lastWatered:new Date(res.lastWatered).toLocaleString().split(',')[0], nextWatering:new Date(res.nextWatering).toLocaleString().split(',')[0], frequency: res.frequency})}).catch(err=> console.log("Error: " + err));
  }


  async editStage(num) {
    let newStage;
    if (num == this.state.slider) {
      return ;
    } 
    if (num == 0) {
      newStage = "Seed";
    }
    else if (num == 1) {
      newStage = "Germinated";
    }
    else if (num == 2) {
      newStage = "Sapling";
    }
    else if (num == 3) {
      newStage = "Mature";
    }

    await fetch("http://localhost:5000/userPlants/editStage", { 
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify( {
        userPlantID:this.userPlant._id,
        newStage: newStage 
      })
    }).then(async res=> await res.json()).then(res => {this.userPlant.stage = res.stage; this.setState({slider:num})})
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
                    if (newName) this.editName(newName)}}>
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
            <View style = {{flex:1, alignItems: 'center', marginBottom:10}}>
              <Text style = {{paddingBottom: 20, fontSize:10}}>
                Pull the slider to edit your plant's stage!
              </Text>
              <Slider
                  style = {{width:200}}
                  minimumValue={0}
                  maximumValue={3}
                  step = {1}
                  value = {this.state.slider}
                  onSlidingComplete = {(val)=>this.editStage(val)}
                />
                </View>

            <View style={styles.careShadow}>
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

            <View style={styles.aboutSection}>
              <Text style={styles.title}> Watering Schedule </Text>
              {!this.state.wSExists && 
              <TouchableOpacity style = {styles.addButton}
              onPress={()=>{
                let frequency = prompt('Enter how frequently you would like to water your plant (in days): ');
                if (frequency) {
                  if (!parseInt(frequency)) {
                    window.alert("Please enter a valid number!")
                  }
                  else {
                    this.createWS(parseInt(frequency))
                  }
                }
              }} >
                <Text style = {{color:'white'}}>
                  Add Watering Schedule
                </Text>
              </TouchableOpacity>}
              {this.state.wSExists &&
                <View style = {styles.wsContainer}>
                  <View style = {styles.wsIcon}>
                    <MaterialCommunityIcons name="calendar-multiple-check" size={40} color="green" />
                    <Text style = {{ fontSize:12, marginTop:4}}>
                      Last Watered
                    </Text>
                    <View style = {{flex:1, flexDirection:'row'}}>
                    <Text style = {{fontSize:17}}>
                      {this.state.lastWatered}
                    </Text>
                    <EvilIcons name="pencil" size={24} color="black"  />
                    </View>
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={this.state.editLastWateredModal}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View style={styles.centeredView}>
                        
                      </View>
                    </Modal>
                  </View>
                  <View style = {styles.wsIcon}>
                    <MaterialCommunityIcons name="watering-can" size={40} color="green" />
                    <Text style = {{ fontSize:12, marginTop:4}}>
                      Next Watering
                    </Text>
                    <View style = {{flex:1, flexDirection:'row'}}>
                      <Text style = {{fontSize:17}}>
                        {this.state.nextWatering}
                      </Text>
                      <EvilIcons name="pencil" size={24} color="black"  />
                      </View>
                  </View>
                  <View style = {styles.wsIcon}>
                    <MaterialCommunityIcons name="refresh" size={40} color="green" />
                  <Text style = {{ fontSize:12, marginTop:4}}>
                      Frequency
                  </Text>
                  <View style = {{flex:1, flexDirection:'row'}}>
                  <Text style = {{fontSize:17}}>
                      {this.state.frequency}
                    </Text>
                    <EvilIcons name="pencil" size={24} color="black"  />
                  </View>
                  </View>
                </View>
              }
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
  wsContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'
  },
  wsIcon: {
    flex:1,
    alignItems:'center',
    padding:10
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
    paddingBottom: 20,
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
  slider: {
    display: "flex",
    alignItems: "center",
    marginRight:300,
    width: 300,
    height: 40,

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
    alignItems: "center",
    justifyContent: "center",
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
    textAlign:'center'
  },
  subtitle: {
    fontFamily: "Helvetica",
    textAlign: "left",
    fontSize: 15,
    color: "#515151",
    paddingLeft: 8,
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
  addButton: {
    margin:10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 2,
    width: 200,

  },
});

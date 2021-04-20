import react from "react";
import React, { Component } from "react";
import { SafeAreaView, FlatList, Button, Text, TextInput } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image, Modal } from "react-native";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class SearchArea extends React.Component {
  userID = this.props.userID;
  givenName = "";

  state = {
    search: "",
    modalVisible: false,
    clickedPlantIndex: undefined,
    dummyPlants: [],
    givenName: "",
    selectedStage: "Sapling",
    dob: new Date(),
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  async componentDidMount() {
    console.log("here");
    await fetch("https://plantparent506.herokuapp.com/plants/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(async (res) => {
        if (res.status == 400) {
          console.log(await res.json());
        } else {
          return await res.json();
        }
      })
      .then((res) => {
        let images = [];
        let plants = [];
        for (let plant of res.plants) {
          plants.push(plant);
        }
        this.setState({ dummyPlants: plants });
        console.log("here");
      });
  }

  async addToGarden() {
    //When the user clicks the add to garden button, I want to take the given plant,
    //all the information they've given, transform that into a user plant,
    //post that to the userplant db, then post that to the user's garden db
    console.log(
      JSON.stringify({
        plantID: this.state.dummyPlants[this.state.clickedPlantIndex]._id,
        givenName: this.givenName,
        stage: this.state.selectedStage,
        dob: this.state.dob,
      })
    );
    await fetch("https://plantparent506.herokuapp.com/userPlants/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        plantID: this.state.dummyPlants[this.state.clickedPlantIndex]._id,
        givenName: this.givenName,
        stage: this.state.selectedStage,
        dob: this.state.dob,
      }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then(async (res) => {
        await fetch("https://plantparent506.herokuapp.com/gardens/add", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            userID: this.userID,
            plantID: res.userPlantID,
          }),
        })
          .then(() => {
            this.setState({
              modalVisible: false,
              clickedPlantIndex: undefined,
              selectedStage: "Sapling",
              dob: new Date(),
            });
            this.givenName = "";
            window.alert("Added to garden");
          })
          .catch((err) => console.log("Error: " + err));
      })
      .catch((err) => console.log("Error: " + err));
  }

  render() {
    const { search } = this.state;

    const onChangeSearch = (query) => {
      console.log(query);
      this.setState({ search: query });
    };
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.newSearch}
          placeholder="Search"
          placeholderTextColor="#828282"
          onChangeText={onChangeSearch}
          value={search}/>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.dummyPlants}
            numColumns={2}
            keyExtractor={(item, index) => item.name}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      { modalVisible: true, clickedPlantIndex: index },
                      () => {
                        console.log(this.state);
                      }
                    );
                  }}
                >
                  <Card>
                    <Image
                      style={styles.plantImage}
                      source={{ uri: item.image }}
                    ></Image>
                    <Card.Title>{item.name}</Card.Title>
                  </Card>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View>
          <Modal
            visible={this.state.modalVisible}
            animationType="fade"
            transparent={true}
          >
            {this.state.dummyPlants[this.state.clickedPlantIndex] && (
              <View style={styles.modalView}>
                <View style={{ float: "right" }}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignContent: "flex-end" }}
                    onPress={() => {
                      this.setState({
                        modalVisible: false,
                        clickedPlantIndex: undefined,
                      });
                    }}
                  >
                    <Ionicons name="close" size={40}></Ionicons>
                  </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 10, marginBottom: 20 }}>
                  {
                    this.state.dummyPlants[this.state.clickedPlantIndex]
                      .basicDescription
                  }
                </Text>
                <Text>Enter your plant's nickname</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.givenName = text;
                  }}
                  placeholder={"Enter your plant's name here"}
                  style={styles.textInput}
                ></TextInput>
                <Text>Choose what stage your plant is in</Text>
                <Picker
                  style={{ height: 100, width: 200 }}
                  selectedValue={this.state.selectedStage}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedStage: itemValue })
                  }
                >
                  <Picker.Item label="Seed" value="Seed" />
                  <Picker.Item label="Germinated" value="Germinated" />
                  <Picker.Item label="Sapling" value="Sapling" />
                  <Picker.Item label="Mature" value="Mature" />
                </Picker>
                <Text style={{ marginTop: 100 }}>
                  Plant Birthday
                </Text>
                <DateTimePicker
                  style={{ height: 100, width: 200, marginLeft: 90 }}
                  testID="dateTimePicker"
                  value={this.state.dob}
                  mode={"date"}
                  display="default"
                  onChange={(event, selectedDate) =>
                    this.setState({ dob: selectedDate })
                  }
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={async () => {
                    if (this.givenName == "") {
                      window.alert(
                        "Enter a plant name before adding to garden!"
                      );
                    } else {
                      await this.addToGarden();
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>Add to Garden</Text>
                </TouchableOpacity>
              </View>
            )}
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 10,
  },
  newSearch:{
    justifyContent: "center",
    borderStyle:"solid",
    borderRadius: 1,
    borderColor: "gray",
    margin: 25,
    fontSize: 20,
  },
  plantImage: {
    flex: 1,
    height: 100,
    width: 100,
  },
  addButton: {
    backgroundColor: "#006400",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textInput: {
    paddingLeft: 5,
    margin: 2,
    width: "100%",
    height: 35,
    borderWidth: .5,
    borderColor: "gray",
  },
});

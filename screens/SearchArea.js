import react from "react";
import React, { Component } from "react";
import { SafeAreaView, FlatList, Button, Text } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image, Modal } from "react-native";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default class SearchArea extends React.Component {
  dummyPlants = [
    { name: "plant1", img: require("../Images/p1.jpg"), descr:"This is Plant 1. Description goes here"},
    { name: "plant2", img: require("../Images/p2.jpg"), descr:"This is Plant 2. Description goes here" },
    { name: "plant3", img: require("../Images/p3.jpg"), descr:"This is Plant 3. Description goes here" },
    { name: "plant4", img: require("../Images/p4.jpg"), descr:"This is Plant 4. Description goes here" },
    { name: "plant5", img: require("../Images/p5.jpg"), descr:"This is Plant 5. Description goes here" },
    { name: "plant6", img: require("../Images/p6.jpg"), descr:"This is Plant 6. Description goes here" },
  ];
  state = {
    search: "",
    modalVisible: false,
    clickedPlantIndex:undefined
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    const onChangeSearch = (query) => {console.log(query); this.setState({ search: query })};
    return (
      <SafeAreaView style={styles.container}> 
          <Searchbar
            style={styles.searchBarContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={search}
          />
        <FlatList
            data={this.dummyPlants}
            numColumns={2}
            keyExtractor={(item, index) => item.name}
            renderItem={({item, index}) => 
                <View>
                  <TouchableOpacity onPress={()=> {
                    this.setState({modalVisible:true, clickedPlantIndex:index}, ()=>{
                      console.log(this.state)
                    });
                    }} >
                  <Card>
                    <Image style = {styles.plantImage} source={item.img}>
                    </Image>
                  <Card.Title>{item.name}</Card.Title>
                  </Card>
                  </TouchableOpacity>
                </View>}
        />
        
            <View>
            <Modal
              visible={this.state.modalVisible}
              animationType="fade"
              transparent={true}
            > 
            {this.dummyPlants[this.state.clickedPlantIndex] &&
            
              <View style = {styles.modalView}>
                <View style={{marginLeft:170}}>
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false, clickedPlantIndex:undefined})}}>
                    <Ionicons name="close" size={20}></Ionicons>
                  </TouchableOpacity>
                </View>
                <Text style={{marginTop:10, marginBottom:20}}>
                  {this.dummyPlants[this.state.clickedPlantIndex].descr}
                </Text>
                <TouchableOpacity style={styles.addButton} onPress={()=>{this.setState({modalVisible:false, clickedPlantIndex:undefined}); window.alert("Added to garden")}}>
                  <Text style={{color:'white'}}>
                    Add to Garden
                  </Text>
                </TouchableOpacity>
              </View>}
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
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    marginBottom:10
  },
  plantImage: {
    flex: 1,
    height:100,
    width:100
},
  addButton: {
    backgroundColor:'#006400',
    padding:10 ,
    borderRadius:10,
    marginTop:20
},
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop:10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  }
});

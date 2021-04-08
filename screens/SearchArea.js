import react from "react";
import React, { Component } from "react";
import { SafeAreaView, FlatList, Button, Text } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image, Modal } from "react-native";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default class SearchArea extends React.Component {
  state = {
    search: "",
    modalVisible: false,
    clickedPlantIndex:undefined,
    dummyPlants: []
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

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
    }).then(res => {this.setState({dummyPlants:res.plants})})
  }

  render() {
    const { search } = this.state;

    const onChangeSearch = (query) => {console.log(query); this.setState({ search: query })};
    console.log(this.state.dummyPlants)
    return (
      <SafeAreaView style={styles.container}> 
          <Searchbar
            style={styles.searchBarContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={search}
          />
        <FlatList
            data={this.state.dummyPlants}
            numColumns={2}
            keyExtractor={(item, index) => item.name}
            renderItem={({item, index}) => 
                <View>
                  <TouchableOpacity onPress={()=> {
                    this.setState({modalVisible:true, clickedPlantIndex:index}, ()=>{
                      console.log(this.state)
                    });
                    }} >
                  {/* <Card>
                    <Image style = {styles.plantImage} source={require("" + item.image)}>
                    </Image>
                  <Card.Title>{item.name}</Card.Title>
                  </Card> */}
                  </TouchableOpacity>
                </View>}
        />
        
            <View>
            <Modal
              visible={this.state.modalVisible}
              animationType="fade"
              transparent={true}
            > 
            {this.state.dummyPlants[this.state.clickedPlantIndex] &&
            
              <View style = {styles.modalView}>
                <View style={{marginLeft:170}}>
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false, clickedPlantIndex:undefined})}}>
                    <Ionicons name="close" size={20}></Ionicons>
                  </TouchableOpacity>
                </View>
                <Text style={{marginTop:10, marginBottom:20}}>
                  {this.state.dummyPlants[this.state.clickedPlantIndex].basicDescription}
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

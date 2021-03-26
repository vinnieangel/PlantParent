import react from "react";
import React, { Component } from "react";
import { SafeAreaView, FlatList, Button, Text } from "react-native";
import { ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SearchArea extends React.Component {
  dummyPlants = [
    { name: "plant1", img: require("../Images/p1.jpg") },
    { name: "plant2", img: require("../Images/p2.jpg") },
    { name: "plant3", img: require("../Images/p3.jpg") },
    { name: "plant4", img: require("../Images/p4.jpg") },
    { name: "plant5", img: require("../Images/p5.jpg") },
    { name: "plant6", img: require("../Images/p6.jpg") },
  ];
  state = {
    search: "",
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
                  <Card>
                    <Image style = {styles.plantImage} source={item.img}>
                    </Image>
                  <Card.Title>{item.name}</Card.Title>
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={{color:'white'}}>
                      Add to garden
                    </Text>
                  </TouchableOpacity>
                  </Card>
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
 borderRadius:10
}
});

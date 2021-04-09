import React, { useState, Component } from "react";
import { Modal } from "react-native";
import { Button } from "react-native";
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ProfileScreen extends Component {
  
  
    userID = this.props.route.params.userID;
    state = { modalVisible1: false, modalVisible2: false };
  

  async deleteAccount() {
    await fetch('https://plantparent506.herokuapp.com/users/delete', {
      method:'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        userID: this.userID
      })
    }).then(()=> {
      this.props.navigation.navigate('Login');
    }).catch(err => {
      console.log("Error: "+err)
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: "https://pngimg.com/uploads/minions/minions_PNG25.png",
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                Name
              </Title>
              <Caption style={styles.caption}>User ID</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="flag-outline" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Current Location
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail-outline" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Email Address
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="trash-outline" color="#777777" size={20} />
            <TouchableOpacity style={{ marginLeft: 20 }} onPress ={()=> this.deleteAccount()}>
              <Text style={{color: "#FF0000"}}>
                Delete Account
              </Text>
            </TouchableOpacity>    
          </View>
        </View>

        

        <View style={styles.settingWrapper}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible1}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="New Email"
                  placeholderTextColor="#b5b5b5"
                  style={styles.input}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm New Email"
                  placeholderTextColor="#b5b5b5"
                  style={styles.input}
                  autoCapitalize="none"
                />
                <Button
                  title="Save"
                  color="#f194ff"
                  onPress={() => this.setState({ modalVisible1: false })}
                />
                <Button
                  title="Cancel"
                  color="#33FFF0"
                  onPress={() => this.setState({ modalVisible1: false })}
                />
              </View>
            </View>
          </Modal>
          <TouchableRipple
            onPress={() => {
              this.setState({ modalVisible1: true });
            }}
          >
            <View style={styles.settingItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Change Email</Text>
            </View>
          </TouchableRipple>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible2}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="New Password"
                  secureTextEntry
                  placeholderTextColor="#b5b5b5"
                  style={styles.input}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm New Password"
                  secureTextEntry
                  placeholderTextColor="#b5b5b5"
                  style={styles.input}
                  autoCapitalize="none"
                />
                <Button
                  title="Save"
                  color="#f194ff"
                  onPress={() => this.setState({ modalVisible2: false })}
                />
                <Button
                  title="Cancel"
                  color="#33FFF0"
                  onPress={() => this.setState({ modalVisible2: false })}
                />
              </View>
            </View>
          </Modal>
          <TouchableRipple
            onPress={() => {
              this.setState({ modalVisible2: true });
            }}
          >
            <View style={styles.settingItem}>
              <Ionicons name="lock-closed-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Change Password</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  settingWrapper: {},
  settingItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  settingItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#b5b5b5",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "white",
    color: "black",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  changeInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

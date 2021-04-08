import React, { useState, Component } from "react";
import { Modal } from "react-native";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
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
        </View>

        <View style={styles.settingWrapper}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="New Email"
                  placeholderTextColor="#b5b5b5"
                  style={styles.input}
                  autoCapitalize="none"
                  // onChangeText={(text) => {
                  //   this.setState({ username: text });
                  // }}
                />
              </View>
            </View>
          </Modal>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.settingItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Edit Profile</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
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
});

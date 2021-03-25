import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "./../components/NavBar/NavBar";

export default class AmaryllisInfo extends Component {
  render() {
    return (
      <>
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <View style={styles.infoWrapper}>
              <View style={styles.plantImage}>
                <Image
                  style={styles.imageContainer}
                  source={require("../Images/p2.jpg")}
                />
              </View>
              <View style={styles.descriptionWrapper}>
                <View>
                  <Text style={styles.title}>Bush Plant</Text>
                </View>
                <View>
                  <Text style={styles.subtitle}>
                    If the "Swiss Chess Plant", the Monstera delicosa is famous
                    for its quirky natural leaf holes.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.needFlexWrapper}>
              <View style={styles.needContainer}>
                <View style={styles.icon}>
                  <Ionicons name="sunny-outline" size={50} color="#51A746" />
                  <Text style={styles.amount}>Full Sun</Text>
                </View>
                <View style={styles.icon}>
                  <Ionicons name="water-outline" size={50} color="#51A746" />
                  <Text style={styles.amount}>Every Week</Text>
                </View>
                <View style={styles.icon}>
                  <Ionicons name="resize-outline" size={50} color="#51A746" />
                  <Text style={styles.amount}>Large</Text>
                </View>
              </View>
            </View>

            <View stlye={styles.careShadow}>
              <View style={styles.careInfoFlex}>
                <Text style={styles.careFont}>Care</Text>
                <View style={styles.careFlexWrapper}>
                  <View style={styles.careContainer}>
                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Watering</Text>
                      <Text style={styles.careAmount}>Every 5-7 Days</Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Repoting</Text>
                      <Text style={styles.careAmount}>Every 6 months</Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Plant Type</Text>
                      <Text style={styles.careAmount}>Something else</Text>
                    </View>
                  </View>

                  <View style={styles.careContainer}>
                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Fertilizer Type </Text>
                      <Text style={styles.careAmount}>Organic</Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>
                        Fertilizing Frequency
                      </Text>
                      <Text style={styles.careAmount}>Monthly</Text>
                    </View>

                    <View style={styles.careWrapper}>
                      <Text style={styles.careTitle}>Plant size</Text>
                      <Text style={styles.careAmount}>Wow</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.aboutSection}>
              <Text style={styles.title}> About </Text>
              <Text style={styles.subtitle}>
                Nicknamed the “swiss cheese plant”, the Monstera deliciosa is
                famous for its quirky natural leaf holes. These holes are
                theorized to maximize sun fleck capture on the forest floor.
                Nicknamed the “swiss cheese plant”, the Monstera deliciosa is
                famous for its quirky natural leaf holes. These holes are
                theorized to maximize sun fleck capture on the forest floor.
                Nicknamed the “swiss cheese plant”, the Monstera deliciosa is
                famous for its quirky natural leaf holes. These holes are
                theorized to maximize sun fleck capture on the forest floor.
                Nicknamed the “swiss cheese plant”, the Monstera deliciosa is
                famous for its quirky natural leaf holes. These holes are
                theorized to maximize sun fleck capture on the forest floor.
              </Text>
            </View>
          </SafeAreaView>
        <View style={styles.navFlex}>
          <Navbar />
        </View>
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
  navFlex: {
    display: "flex",
    position: "fixed",
    alignSelf: "flex-end",
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 10,
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
  },
  careWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  careFlexWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
  },
  //   needFlexWrapper: {
  //     display: "flex",
  //     justifyContent: "center",
  //     paddingBottom: 30,
  //   },
  //   needContainer: {
  //     display: "flex",
  //     flex: 1,
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     width: "80%",
  //     marginTop: 25,
  //     marginBottom: 10,
  //   },
  needFlexWrapper: {
    display: "flex",
    alignSelf: "center",
    paddingBottom: 30,
    paddingLeft: 25
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
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    paddingTop: 3,
  },
  aboutSection: {
    paddingTop: 30,
  },
});

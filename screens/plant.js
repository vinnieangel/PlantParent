import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

export default class AmaryllisInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.plantDescriptionContainer}>
                        <Image style={styles.plantImage} source={require("../Images/p2.jpg")} />
                        <View style={styles.plantDescription}>
                            <Text style={styles.titleText}>
                                Amaryllis
                        </Text>
                            <Text style={styles.subText}>This is a houseplant.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => this.props.navigation.navigate("MenuItems")}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="sunny-outline" size={35} color="green" />
                        </View>
                        <Text style={styles.categoryButtonTxt}>Full Sun</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => this.props.navigation.navigate("Order")}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="water-outline" size={35} color="green" />
                        </View>
                        <Text style={styles.categoryButtonTxt}>Every Week</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => {
                            this.props.navigation.navigate("PrintBill");
                        }}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="resize-outline" size={35} color="green" />
                        </View>
                        <Text style={styles.categoryButtonTxt}>Large</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.titleText}>Care</Text>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => {
                            this.props.navigation.navigate("PrintBill");
                        }}
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="chevron-down-outline" size={35} color="green" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    titleText: {
        fontFamily: "Helvetica",
        fontSize: 20,
        paddingRight: 50,
        color: "black",
        paddingBottom: 20,
    },
    subText: {
        textAlign: "left",
        fontSize: 18,
        paddingBottom: 40,
    },
    categoryContainer: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 10,
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    categoryButton: {
        flex: 1,
        width: "30%",
        marginHorizontal: 0,
        alignSelf: "center",
    },
    categoryButtonTxt: {
        alignSelf: "center",
        marginTop: 5,
        color: "black",
    },
    // logoContainer: {
    //     paddingTop: 40,
    // },
    plantImage: {
        flex: 1,
        width: 100,
        height: 200,
        resizeMode: "contain",
    },
    plantDescription: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
    },
    plantDescriptionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
    },
    wrapper: {
        display: "flex",
        justifyContent: "center",
    }
});
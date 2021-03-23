import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "./../components/NavBar/NavBar";


export default class AmaryllisInfo extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
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
                                If the "Swiss Chess Plant", the Monstera delicosa is famous for
                                its quirky natural leaf holes.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.needFlexWrapper}>
                    <View style={styles.needContainer}>
                        <View style={styles.icon}>
                            <Ionicons name="sunny-outline" size={35} color="green" />
                            <Text style={styles.amount}>Full Sun</Text>
                        </View>
                        <View style={styles.icon}>
                            <Ionicons name="water-outline" size={35} color="green" />
                            <Text style={styles.amount}>Every Week</Text>
                        </View>
                        <View style={styles.icon}>
                            <Ionicons name="resize-outline" size={35} color="green" />
                            <Text style={styles.amount}>Large</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.careFlexWrapper}>
                    <View style={styles.careContainer}>
                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Watering</Text>
                            <Text>Every 5-7 Days</Text>
                        </View>

                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Repoting</Text>
                            <Text>Every 6 months</Text>
                        </View>

                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Plant Type</Text>
                            <Text>Something else</Text>
                        </View>
                    </View>

                    <View style={styles.careContainer}>
                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Fertilizer Type </Text>
                            <Text>Organic</Text>
                        </View>

                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Fertilizing Frequency</Text>
                            <Text>Monthly</Text>
                        </View>

                        <View style={styles.careWrapper}>
                            <Text style={styles.careTitle}>Plant size</Text>
                            <Text>Wow</Text>
                        </View>
                    </View>
                </View>

                {/* <Navbar/> */}
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column",
        marginRight: 30,
        marginLeft: 30
    },
    careContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    careWrapper: {
        flexDirection: "column",
        justifyContent: "space-around",
        paddingBottom: 15
    },
    careFlexWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 25,
        paddingRight: 25
    },
    needContainer: {
        flex: 1,
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
        fontSize: 10,
        marginTop: 5,
        color: "black",
    },
    infoWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    plantImage: {
        flex: 1,
        alignItems: "center",
    },
    imageContainer: {
        width: 120,
        height: 200,
        resizeMode: "contain",
    },
    descriptionWrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    title: {
        fontFamily: "Helvetica",
        fontSize: 20,
        color: "black",
        paddingBottom: 10,
    },
    subtitle: {
        fontFamily: "Helvetica",
        textAlign: "left",
        fontSize: 17,
    },
    careTitle: {
        fontSize: 10,
        color: "#515151",
    },
    needFlexWrapper: {
        display: "flex",
        justifyContent: "center"
    }
});
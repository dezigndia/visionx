import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ImageBackground, Alert, TouchableOpacity, Linking, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WebsiteScreen from '../containers/WebsiteScreen'
import Call from "../assets/Call.svg"
import Address from "../assets/Address.svg"
import Website from "../assets/Website.svg"

const TAG = "-rental-"
const { height, width } = Dimensions.get("window")

const DescriptionScreenHome = ({ route }) => {
    const [keyValue, setKeyValue] = useState([])
    const [walk, setWalk] = useState("")
    const [video, setVideo] = useState("")

    const navigation = useNavigation()

    const commercialView = route.params.Detail


    // const restDetail =  

    // console.log("RESTDETAILS", restDetail)

    const callNumber = phone => {

        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    const walkDetail = () => {

        for (var i = 0; i < commercialView.building_metadata.Walk.length; i++) {


            <ScrollView
                horizontal
                style={{ height: 40, width: 360, marginLeft: 15, alignSelf: "center" }}
            >
                <TouchableOpacity style={{
                    height: 30, width: 100, backgroundColor: "#0471AD", marginBottom: 5, marginRight: 10,
                    borderRadius: 20, justifyContent: "center", alignItems: "center"
                }} onPress={() => navigation.navigate("WebsiteScreen", { path: commercialView.building_metadata.Walk[i] })}>
                    <Text style={styles.textFourStyle}>{"Walk " + (i + 1)}</Text>
                </TouchableOpacity>
            </ScrollView>

        }
    }


    const videoDetail = () => {

        for (j = 0; j < commercialView.building_metadata.Video.length; j++) {
            return (
                <ScrollView
                    horizontal
                    style={{ height: 40, width: 360, marginLeft: 15, alignSelf: "center" }}
                >
                    <TouchableOpacity style={{
                        height: 30, width: 100, backgroundColor: "#0471AD", marginBottom: 5, marginRight: 10,
                        borderRadius: 20, justifyContent: "center", alignItems: "center"
                    }} onPress={() => navigation.navigate("WebsiteScreen", { path: commercialView.building_metadata.Video[j] })}>
                        <Text style={styles.textFourStyle}>{"Video " + (j + 1)}</Text>
                    </TouchableOpacity>
                </ScrollView>
            )
        }
    }


    return (
        <View style={{ flex: 1 }}>


            <View style={styles.imageStyle}>

                <ImageBackground source={{ uri: commercialView.photo }} style={{ height: width * 268 / 375, width: width }} >

                    <View style={styles.viewHeaderStyle}>
                        <View style={styles.textHeaderViewStyle}>
                            <Text style={styles.textHeaderStyle}>Description Screen</Text>
                        </View>
                        {/* </View> */}
                        <TouchableOpacity style={styles.userIconStyle}
                            onPress={() => navigation.navigate("Profile")}>
                            <Icon name="account-outline" size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>


            <ScrollView style={{ flex: 1, width: width, marginBottom: 20 }}>


                <View style={{ marginRight: 20, marginLeft: 20, width: width * 335 / 375 }}>



                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>{commercialView.building_name}</Text>
                    </View>
                    {(commercialView.building_metadata == null) ?

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, marginTop: 30 }}>No Data Available</Text>
                        </View>

                        :
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainContainer}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{new Date().toISOString().substring(0, 10)}</Text>
                            </View>

                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5 }} />

                            <View style={styles.container}>
                                <View style={{ flexDirection: "row" }}>
                                    <Address width={17} height={24} color="#00bfff" />
                                    <Text style={styles.textTwoStyle}>Address</Text>
                                </View>
                                <Text style={styles.textOneStyle}>{commercialView.building_metadata.Address}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5 }} />

                            <View style={styles.container}>
                                <View style={{ flexDirection: "row" }}>
                                    <Call width={17} height={24} color="#00bfff" />
                                    <Text style={styles.textTwoStyle}>Phone Number</Text>
                                </View>
                                <TouchableOpacity onPress={() => callNumber(commercialView.building_metadata.Phone)}>
                                    <Text style={styles.textThreeStyle}>{commercialView.building_metadata.Phone}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5 }} />

                            <View style={styles.container}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Website width={17} height={24} color="#00bfff" />
                                        <Text style={styles.textTwoStyle}>Website</Text>
                                    </View>
                                    {commercialView.building_metadata.Website != "" ?
                                        <TouchableOpacity style={{
                                            height: 30, width: "40%", backgroundColor: "#0471AD", marginBottom: 5,
                                            borderRadius: 20, justifyContent: "center", alignItems: "center"
                                        }} onPress={() => navigation.navigate("WebsiteScreen", { path: commercialView.building_metadata.Website })}>
                                            <Text style={styles.textFourStyle}>{"Check Website"}</Text>
                                        </TouchableOpacity>
                                        : null}
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5, marginBottom: 5 }} />

                            <View style={styles.container}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Website width={17} height={24} color="#00bfff" />
                                        <Text style={styles.textTwoStyle}>Walk: </Text>
                                    </View>
                                    {commercialView.building_metadata.Walk && commercialView.building_metadata.Walk.length ?

                                        <ScrollView
                                            horizontal
                                            style={{ height: 40, width: 360, marginLeft: 15, alignSelf: "center" }}
                                        >
                                            {commercialView.building_metadata.Walk.map((item, index) => {
                                                return (

                                                    <TouchableOpacity style={{
                                                        height: 30, width: 100, backgroundColor: "#0471AD", marginBottom: 5, marginRight: 10,
                                                        borderRadius: 20, justifyContent: "center", alignItems: "center"
                                                    }} onPress={() => navigation.navigate("WebsiteScreen", { path: item })}>
                                                        <Text style={styles.textFourStyle}>{"Walk " + (index + 1)}</Text>
                                                    </TouchableOpacity>

                                                )
                                            })}
                                        </ScrollView>


                                        : null}
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5, marginBottom: 5 }} />



                            <View style={styles.container}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Website width={17} height={24} color="#00bfff" />
                                        <Text style={styles.textTwoStyle}>Video: </Text>
                                    </View>
                                    {commercialView.building_metadata.Video && commercialView.building_metadata.Video.length ?

                                        <ScrollView
                                            horizontal
                                            style={{ height: 40, width: 360, marginLeft: 15, alignSelf: "center" }}
                                        >
                                            {commercialView.building_metadata.Video.map((item, index) => {
                                                return (

                                                    <TouchableOpacity style={{
                                                        height: 30, width: 100, backgroundColor: "#0471AD", marginBottom: 5, marginRight: 10,
                                                        borderRadius: 20, justifyContent: "center", alignItems: "center"
                                                    }} onPress={() => navigation.navigate("WebsiteScreen", { path: item })}>
                                                        <Text style={styles.textFourStyle}>{"Video " + (index + 1)}</Text>
                                                    </TouchableOpacity>

                                                )
                                            })}
                                        </ScrollView>

                                        : null}
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5, marginBottom: 5 }} />







                            {Object.keys(commercialView.building_metadata).map((key => {

                                if (key !== "Phone" && key !== "Address" && key !== "Website" && key != "Walk" && key != "Video") {
                                  
                                    return (

                                        <View style={styles.containerStyle}>
                                            <Text style={styles.textTwoStyle}>{key}: </Text>
                                            <Text style={styles.keyTextStyle}>{commercialView.building_metadata[key]}</Text>
                                        </View>
                                    )
                                }

                            }))}


                        </View>
                    }
                </View>
            </ScrollView>

            <View style={{ alignItems: "flex-end" }}>
                <Footer />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    viewStyle: {
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: width * 323 / 375,
        height: 25
    },
    textTwoStyle: {

        fontSize: 15,
        color: "#00bfff",
        marginLeft: 5

    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold",


    },
    imageStyle: {
        marginTop: Platform.OS === "ios" ? 35 : null
    },
    container: {
        // width: width*360/375,
        marginTop: 20,
        //flexDirection: "row",
        paddingRight: 10,
        flex: 1
    },
    containerStyle: {
        // width: width*360/375,
        marginTop: 20,
        flexDirection: "row",
        paddingRight: 10,
        flex: 1
    },
    mainContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
    },
    textOneStyle: {
        marginRight: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: 17,
        paddingRight: 10,
        textAlign: "left",
        marginTop: 6
    },
    keyTextStyle: {
        marginRight: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: 17,
        paddingRight: 10,
        textAlign: "left",
    },
    textThreeStyle: {
        // fontFamily: "Roboto",
        marginTop: 6,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: 17,
        width: width * 309 / 375,
        height: 20
    },
    textFourStyle: {
        alignSelf: "center",
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    viewHeaderStyle: {
        width: width,
        flexDirection: "row",
        //backgroundColor: '#F8F8F8',
        height: 70,

    },
    textHeaderViewStyle: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20
    },
    textHeaderStyle: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        //fontWeight:"bold",
        color: "#FFFFFF"
    },
    userIconStyle: {
        flex: 1,
        marginTop: 15,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },

})

export default DescriptionScreenHome;
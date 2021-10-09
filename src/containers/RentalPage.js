import React, { useState, useEffect, memo } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Call from "../assets/Call.svg"
import Address from "../assets/Address.svg"
import Website from "../assets/Website.svg"

const TAG = '-CommercialPage-'
const { width } = Dimensions.get("window")

const RentalPage = ({ route }) => {

    const navigation = useNavigation()

    const rentalImage = route.params.RentalData
    const imagePath = route.params.Path

    const [image, setImage] = useState(imagePath)
    const [detail, setDetail] = useState(rentalImage)

    useEffect(() => {
        setImage(imagePath)
        setDetail(rentalImage)
    }, [])

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

    return (

        <View style={{ flex: 1, width: width }}>

            {(detail == undefined && image == undefined) ?

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 22 }}>No Data Available</Text>
                </View>

                :
                <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center" }}>
                    <View style={styles.imageStyle}>

                        <ImageBackground source={{ uri: image }} style={{ height: width * 268 / 375, width: width }} >

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
                    <ScrollView style={{ width: width, marginBottom: 20, flex: 1 }}>
                        <View style={{ marginRight: 20, marginLeft: 20 }}>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>{detail.name}</Text>
                            </View>

                            {(detail.metadata == null) ?

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 22 }}>No Data Available</Text>
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
                                        <Text style={styles.textOneStyle}>{detail.metadata.Address}</Text>
                                    </View>
                                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5 }} />

                                    <View style={styles.container}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Call width={17} height={24} color="#00bfff" />
                                            <Text style={styles.textTwoStyle}>Phone Number</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => callNumber(detail.metadata.Phone)}>
                                            <Text style={styles.textThreeStyle}>{detail.metadata.Phone}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5 }} />

                                    <View style={styles.container}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Website width={17} height={24} color="#00bfff" />
                                                <Text style={styles.textTwoStyle}>Website</Text>
                                            </View>
                                            {detail.metadata.Website != "" ?
                                                <TouchableOpacity style={{
                                                    height: 30, width: "40%", backgroundColor: "#0471AD", marginBottom: 5,
                                                    borderRadius: 20, justifyContent: "center", alignItems: "center"
                                                }} onPress={() => navigation.navigate("WebsiteScreen", { path: detail.metadata.Website })}>
                                                    <Text style={styles.textFourStyle}>{"Check Website"}</Text>
                                                </TouchableOpacity>
                                                : null}
                                        </View>
                                    </View>
                                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#00bfff", marginTop: 5, marginBottom: 5 }} />

                                    {Object.keys(detail.metadata).map((key => {

                                        if (key !== "Phone" && key !== "Address" && key !== "Website") {
                                            return (

                                                <View style={styles.containerStyle}>
                                                    <Text style={styles.textTwoStyle}>{key} :  </Text>
                                                    <Text style={styles.keyTextStyle}>{detail.metadata[key]}</Text>
                                                </View>
                                            )
                                        }
                                    }))}
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
            }

            <View style={{ alignSelf: "flex-start" }}>
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
        height: 25,

    },
    keyTextStyle: {
        marginRight: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: 17,
        paddingRight: 10,
        textAlign: "left",
    },
    containerStyle: {
        // width: width*360/375,
        marginTop: 20,
        flexDirection: "row",
        paddingRight: 10,
        flex: 1
    },
    textTwoStyle: {

        fontSize: 15,
        color: "#00bfff",
        marginLeft: 5

    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold"
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
    mainContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
    },
    textOneStyle: {

        marginRight: 20,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 17,
        paddingRight: 20,
        textAlign: "left",
        marginTop: 6

    },
    textThreeStyle: {
        fontFamily: "Roboto",
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

export default memo(RentalPage);
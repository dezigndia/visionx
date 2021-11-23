import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, BackHandler, Alert, Text, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import TabViewExample from './TabViewExample'
import Footer from '../components/Footer';
import Geolocation from '@react-native-community/geolocation'
import Modal from 'react-native-modal'
import { useIsFocused } from '@react-navigation/native'


const { height, width } = Dimensions.get("window")

const GalleryScreen = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [showModal, setShowModal] = useState(false)

    // const disable = route.params.path || false   



    useEffect(() => {
        const backAction = () => {
            Alert.alert("Alert!", "Are you sure you want to exit app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        fetchLocation()
    }, [isFocused, showModal]);
    console.log("POSITION_VERIFY", latitude, longitude, showModal)

    const fetchLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setLatitude(position.coords.latitude.toString())
                setLongitude(position.coords.longitude.toString())

            },
            error => console.log(JSON.stringify(error)),
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View >
                <Header
                    headerText="Gallery"
                    refreshIcon={require("../assets/refreshIcon.png")}
                    routing={() => setShowModal(true)}
                />

                {showModal === true ?
                    <View >
                        <Modal
                            transparent={true}
                            isVisible={showModal}
                            onBackButtonPress={() => {

                                setShowModal(false)
                            }}>

                            <View style={{
                                height: width * 200 / 375,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 15,
                                width: width * 300 / 375,
                                alignSelf: "center"
                            }}>
                                <Text style={{ fontSize: 22, fontWeight: "bold" }}>{"Your current location"}</Text>
                                <Text style={{ fontSize: 16, marginTop: 18 }}>{"Latitude : " + latitude}</Text>
                                <Text style={{ fontSize: 16, marginTop: 8 }}>{"Longitude : " + longitude}</Text>

                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </TouchableOpacity>
                            </View>

                        </Modal>
                    </View>
                    : null}





            </View>



            <View style={{ flex: 1 }}>
                <TabViewExample />
            </View>
            <View style={{ alignSelf: "flex-start" }}>
                <Footer />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textStyle: {
        color: '#3f2949',
        fontWeight: "bold",
        fontSize: 17,
        alignSelf: "center",

    },
    cancelButtonStyle: {
        borderWidth: 1,
        borderRadius: 15,
        width: width * 120 / 375,
        height: width * 40 / 375,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 5,
        marginTop: 20,
        backgroundColor: "white"
    },
    modal: {
        marginTop: 100,
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 8,
    },
})

export default GalleryScreen;
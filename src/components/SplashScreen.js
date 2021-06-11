import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SplashScreen = () => {
    const navigation = useNavigation()

    const [splashScreen, setSplashScreen] = useState(true)

    useEffect(() => {
        GoogleSignin.configure({
            // webClientId: "327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com",
               webClientId: "327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com",
            //androidClientid:"327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com"

        })
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setSplashScreen(false)
        }, 3000)
    }, [])

    return (
        <View style={styles.splashStyle}>
            <View>
                <Text style={styles.splashText}>Welcome to VisionX!!</Text>
                {splashScreen === false ? navigation.navigate("Login") : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    splashStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#90ee90"
    },
    splashText: {
        fontSize: 35
    }
})

export default SplashScreen;
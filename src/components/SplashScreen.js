import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
//import { getRefreshToken } from '../components/RefreshTokenComponent'
import AsyncStorage from '@react-native-community/async-storage'
import envData from '../env.json'


const { height, width } = Dimensions.get("window")

const SplashScreen = () => {
    const navigation = useNavigation()

    const [splashScreen, setSplashScreen] = useState(true)
    const [value, setValue] = useState("")
    const [progress, setProgress] = useState(false)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com",
            iosClientId: "327092130955-fmephv0sd5p7im71co50r6h6qd1k2qa4.apps.googleusercontent.com"
            //androidClientid:"327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com"

        })
    }, [])

    useEffect(async () => {
        let userToken;
        userToken = "";

        try {
            let user = await AsyncStorage.getItem('response');
            let parsed = JSON.parse(user);
            let userToken = parsed.access_token;


            let refresh = await AsyncStorage.getItem('Refresh')
            let parsedRefresh = JSON.parse(refresh)
           
            if (parsedRefresh == null) {
                getRefreshToken(parsed.refresh_token)
            } else {
                getRefreshToken(parsedRefresh.refresh_token)
            }

        }
        catch (error) {

            console.log("error", error)
        }

    }, []);

    const getRefreshToken = async (token) => {
        const url = `${envData.domain_name}${envData.refresh_token}`

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                client_id: "kIoMJQ5bFNuWcLs4aQAHDhP7tPaVgOEGyCRdDSOA",
                client_secret: "MuB3SI9Sa7ARhzGNHVceBa7E0tR0sbXUl7xndvpvvoSo10g38SJXuCeej9qBeivfz1ITCHZbPTRY0EAVvXooVBO0NiYZZ0rKFmuXBaH8EVwoknhIV7yy7nJQTO02sZ84",
                // backend: "google-oauth2",
                refresh_token: token

            }),
        })
        const data = await res.json()
            .then((response) => {
              
                setValue(response.access_token)
                if (response.access_token !== "") {
                     setSplashScreen(false)
                    // setTimeout(()=>{
                    //     navigation.navigate("GalleryScreen")
                    // },10000)
                    
                }
                setProgress(false)

                AsyncStorage.setItem('Refresh', JSON.stringify(response));
            })
            .catch((err) => {
                console.log(TAG, "error", err)
            })
    }

    //   useEffect(() => {
    //    if(value != ""){
    //        setSplashScreen(false)
    //    }
    // }, [value])

    useEffect(() => {
        // if (value == null) {
            setTimeout(() => {
                setSplashScreen(false)
            }, 8000)
        // }
    }, [])

    return (
        <View style={styles.splashStyle}>
            <View>
                <ImageBackground source={require("../assets/splashImage.png")}
                    style={{ width: width * 320 / 360, height: width, flex: 0.6, alignItems: "center" }} />
                {/* <Text style={styles.splashText}>Welcome to VisionX!!</Text> */}
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
        backgroundColor: "#FFFFFF"
    },
    splashText: {
        fontSize: 35
    }
})

export default SplashScreen;
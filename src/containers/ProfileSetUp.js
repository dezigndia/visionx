import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, Button, BackHandler, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage';
const TAG = '-ProfileSetUp.js-'
const { height, width } = Dimensions.get("window")
const ProfileSetUp = () => {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [mail, setMail] = useState('')


    useEffect(async () => {

        try {
            let user = await AsyncStorage.getItem('userInfo');
            let parsed = JSON.parse(user);
            let FirstName = parsed.user.givenName
            let LastName = parsed.user.familyName
            let Email = parsed.user.email
            setLname(LastName)
            setFname(FirstName)
            setMail(Email)

            console.log(TAG, "parsedProfileSetup", user)
            console.log(TAG, "profileSet", parsed.user)

        }
        catch (error) {

            console.log("error", error)
        }
    }, []);

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



    const navigation = useNavigation()
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.viewStyle}>
                    <TextInput
                        placeholder="Enter First Name"
                        onChangeText={(FirstName) => setFname(FirstName)}
                        style={styles.textInput}
                        value={fname}
                    />
                </View>
                <View style={styles.viewStyle}>
                    <TextInput
                        placeholder="Enter Last Name"
                        style={styles.textInput}
                        onChangeText={(LastName) => setLname(LastName)}
                        value={lname}
                    />
                </View>
                <View style={styles.viewStyle}>
                    <TextInput
                        placeholder="E-mail"
                        style={styles.textInput}
                        onChangeText={(Email) => setMail(Email)}
                        value={mail}

                    />
                </View>
                <TouchableOpacity style={styles.buttonStyle}
                    //   onPress={() => navigation.navigate("Profile")}>
                     onPress={() => navigation.navigate("GalleryScreen")}>
                    <Text style={styles.textStyle}>Continue</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 393,
        marginBottom: 129,
        marginRight: 20,
        marginLeft: 20
    },
    viewStyle: {
        marginBottom: 20,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 335 / 375,
        height: 57,
        borderWidth: 2,
        backgroundColor: '#247DF7',
        borderRadius: 5
    },
    textStyle: {
        width: width * 100 / 375,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: "black",
        fontSize: 22
    },
    textInput: {
        borderColor: "black",
        borderWidth: 2,
        width: width * 335 / 375,
        height: 57,
        borderRadius: 5,
        paddingLeft: 20,
        fontSize: 20,
        color:"black"
    }
})

export default ProfileSetUp;

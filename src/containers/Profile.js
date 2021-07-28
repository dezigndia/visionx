import React, { useEffect, useState, useFocusEffect } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    Button, Image, Dimensions, ScrollView, TouchableOpacity, BackHandler, Alert, ToastAndroid, Platform
} from 'react-native'
import Header from "../components/Header"
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import envData from "../env.json"
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import Menu, { MenuItem } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native'
import { useIsFocused } from "@react-navigation/native"
import { CommonActions } from '@react-navigation/native';
import {getRefreshToken} from '../components/RefreshTokenComponent'

const TAG = '-Profile.js-'
const { height, width } = Dimensions.get("window")

const Profile = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [gender, setGender] = useState('')
    const [userAge, setUserAge] = useState(0)
    const [profile, setProfile] = useState(false)
    const [token, setToken] = useState("")
    const [fromDate, setFromDate] = useState(new Date())
    const [updateProfile, setUpdateProfile] = useState('')
    const [detailModal, setDetailModal] = useState(false)

    useEffect(() => {
        getUserDetails()
        
    }, [token])

    useEffect(async () => {
        let userToken;
        userToken = "";

        try {
            let user = await AsyncStorage.getItem('response');
            let parsed = JSON.parse(user);
            let userToken = parsed.access_token;


            let refresh = await AsyncStorage.getItem("Refresh")
            let parsedRefresh = JSON.parse(refresh)
           

            if (parsedRefresh == null) {

                setToken(userToken)
                getUserDetails()
            }else{
                 setToken(parsedRefresh.access_token)
              
                getUserDetails()
            }

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


    const getUserDetails = async () => {
        const url = `${envData.domain_name}${envData.get_user_profile}`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
            .then((response) => {
                //console.log("Profile", response)
              
               
                setFname(response.data.first_name)
                setLname(response.data.last_name)
                setEmail(response.data.email)
                setUserAge(response.data.age)
                setGender(response.data.Gender)
                setFromDate(response.data.date_of_birth)
                setPhoto(response.photo_sm)
               

            })
            .catch((err) => {
                console.log("error", err)
            })
    }


    const postUserDetails = async () => {
        if (fname == '') {
            ToastAndroid.show('Please Enter Your Name', ToastAndroid.SHORT)
        } else if (lname == '') {
            ToastAndroid.show('Please Enter Last Name', ToastAndroid.SHORT)
        }
        else if (gender == '') {
            ToastAndroid.show('Please Select Gender', ToastAndroid.SHORT);
        } else if (fromDate == '') {
            ToastAndroid.show('Please Select Date', ToastAndroid.SHORT);
        }
        else {
            const url = `${envData.domain_name}${envData.update_user_profile}`

            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    first_name: fname,
                    last_name: lname,
                    Gender: gender,

                    date_of_birth: fromDate
                })
            })
            const data = await res.json()
                .then((response) => {
                    if (response.status === 200) {
                        setProfile(false)
                        setUpdateProfile(response.data)
                      
                      Platform.OS == "android" ?  ToastAndroid.show('Profile  successfully updated ', ToastAndroid.SHORT) : null;
                    }
                  

                })
                .catch((err) => {
                    console.log("error", err)
                })

        }
    }

    const GenderPicker = (props) => {
        //#region 
        const [value, setValue] = useState(props._value || 'Select Gender')

        let _menu = null;

        const setMenuRef = (ref) => {
            _menu = ref;
        };

        const hideMenu = (val) => {
            props.onGenderChange(val.charAt(6));
            setValue(val);
            setGender(val)
            _menu.hide();
        };

        const showMenu = () => {
            _menu.show();
        };
        //#endregion

        return (
            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
              

                <Menu
                    ref={setMenuRef}
                    button={
                        <TouchableOpacity
                            style={{ width: 150, paddingTop: 8 }}
                            onPress={showMenu}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{

                                        color: value == 'Gender' ? '#00000099' : '#222222',
                                        marginLeft: 4,
                                    }}>
                                    {value}
                                </Text>
                                <Icon name="chevron-down" size={17} color="#222222" />
                            </View>
                            <View
                                style={{
                                    marginTop: 8,
                                    borderColor: '#0000001F',
                                    borderBottomWidth: 1,
                                }}></View>
                        </TouchableOpacity>
                    }>
                    <MenuItem onPress={() => hideMenu('Male')}>Male</MenuItem>
                    <MenuItem onPress={() => hideMenu('Female')}>Female</MenuItem>
                    <MenuItem onPress={() => hideMenu('Others')}>Others</MenuItem>
                </Menu>
            </View>
        );
    };


    const clearAppData = async function() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }



    const _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            console.log('Google signout Success');
              //clearAsyncStorage()
            AsyncStorage.clear();
            // clearAppData()

            navigation.dispatch(state => {
                // Remove the home route from the stack
                const routes = state.routes.filter(r => r.name !== 'SplashScreen');

                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
            navigation.navigate("Login")
            setDetailModal(false)

        } catch (error) {
            console.error('catch error', error);
            // navigation.navigate("Login")
        }
    };


    return (

        <View style={{ flex: 1 }}>

            {detailModal === true ?

                <View>
                    <Modal
                        transparent={true}
                        isVisible={detailModal}
                        onBackButtonPress={() => {
                           
                            setDetailModal(false)
                        }}>
                        <View style={{

                            height: width * 200 / 375,
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10

                        }}>
                            <View style={{ marginTop: 20, width: width * 300 / 375, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                <Text style={{ fontSize: 24, margin: 15, fontWeight: "500" }}>Log Out</Text>
                                <Text style={{ fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 10 }}>Are you sure you want to logout!</Text>

                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <TouchableOpacity
                                   hitSlop={{top:10, bottom:10, right:10, left:10}}
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        _signOut()
                                        // clearAsyncStorage()

                                    }}
                                >
                                    <Text style={styles.modalTextStyle}>Ok</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                hitSlop={{top:10, bottom:10, right:10, left:10}}
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        setDetailModal(false)
                                    }}
                                >
                                    <Text style={styles.modalTextStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>
                </View>
                : null}

            <View style={styles.viewStyle}>
                <View style={styles.textViewStyle}>
                    <Text style={styles.textStyle}>Profile</Text>
                </View>
                <TouchableOpacity 
                   hitSlop={{top:10, bottom:10, right:10, left:10}}
                style={styles.userIconStyle}
                    onPress={() => setDetailModal(true)}>
                    <Image source={require("../assets/menu_logout.png")} style={{ height: 25, width: 25, tintColor: "black" }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', marginRight: 20, marginLeft: 20 }}>
                        <View style={{ justifyContent: "flex-start", flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile Details</Text>
                        </View>

                        <View style={{ justifyContent: "flex-end" }}>
                            <TouchableOpacity 
                               hitSlop={{top:10, bottom:10, right:10, left:10}}
                            onPress={() => setProfile(true)}>
                                <Text style={{ fontSize: 20 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ height: 91, width: 91, marginTop: 20, marginLeft: 20, alignSelf: "flex-start" }}>

                        {/* <Image source={{ uri: photo }} style={{ height: width * 91 / 375, width: width * 91 / 375, borderRadius: 60 }} /> */}
                        <Icon name="account-outline" size={80} color="black" />
                    </View>
                    <View style={{ flex: 1, width: width * 335 / 375 }}>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>First Name</Text>

                            <TextInput
                                onChangeText={(fname) => setFname(fname)}
                                value={fname}
                                style={{ borderBottomColor: "black", borderBottomWidth: 1, fontSize: 18,height: Platform.OS === "ios" ?40:null,  color: "black" }} />

                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Last Name</Text>

                            <TextInput
                                onChangeText={(lname) => setLname(lname)}
                                value={lname}
                                style={{ borderBottomColor: "black", borderBottomWidth: 1, fontSize: 18, color: "black",height: Platform.OS === "ios" ?40:null, }} />


                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>E-mail</Text>

                            <TextInput
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                style={{ borderBottomColor: "black", borderBottomWidth: 1, fontSize: 18, color: "black",height: Platform.OS === "ios" ?40:null, }} />

                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Gender</Text>


                            <GenderPicker
                                containerStyle={{}}
                                _value={gender}
                                onGenderChange={(gender) =>
                                    setGender(gender)
                                }
                            />

                        </View>

                        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
                            <Text style={{ fontSize: 18 }}>Date of birth</Text>

                            <DatePicker
                                date={fromDate}
                                mode="date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        alignSelf: "flex-start",
                                        paddingHorizontal: 10
                                    },
                                    dateInput: {
                                        borderColor: "black",
                                        borderRadius: 6
                                    }
                                }}
                                iconComponent={
                                    <Icon name="calendar-month" size={30} color="black" style={{ position: "absolute", right: 8, opacity: 0.7 }} />
                                }

                                onDateChange={(selectedDate) => setFromDate(selectedDate)}
                            />

                        </View>

                        {profile === true ?
                            <TouchableOpacity
                                onPress={() => postUserDetails()}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    width: width * 335 / 375,
                                    height: 57,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    padding: 10,
                                    margin: 25,
                                    backgroundColor: "#247DF7"
                                }}>
                                <Text style={{ fontSize: 22, color: "black" }}>Update Profile</Text>
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 50
    },
    viewStyle: {
        width: width,
        flexDirection: "row",
        backgroundColor: '#F8F8F8',
        height: 70,
        elevation: 4,
        marginTop: Platform.OS === "ios" ? 30 : null

    },
    textViewStyle: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 30
    },
    modalTextStyle: {
        color: '#3f2949',
        // fontWeight: "bold",
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
        margin: 10,
        backgroundColor: "white"
    },
    textStyle: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold"
    },
    userIconStyle: {
        flex: 1,
        marginTop: 15,
        marginBottom: 20,
        marginRight: 24,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
})

export default Profile;
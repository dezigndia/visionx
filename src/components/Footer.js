import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, TextInput, Text, Button, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import envData from "../env.json"
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import ProgressDialog from 'react-native-progress-dialog';

const TAG = "-Footer-"
const { width } = Dimensions.get("window")

const Footer = () => {
    const [imagePath, setImagePath] = useState("")
    const [token, setToken] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [addressData, setAddressData] = useState()
    const [pinCode, setPinCode] = useState()
    const [detailModal, setDetailModal] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [image, setImage] = useState()
    const [detail, setDetail] = useState()

    const navigation = useNavigation()

    useEffect(async () => {
        let userToken;
        userToken = "";

        try {
            let user = await AsyncStorage.getItem('response');
            let parsed = JSON.parse(user);
            let userToken = parsed.access_token;

            if (user !== null) {

                setToken(userToken)

            }

        }
        catch (error) {

            console.log("error", error)
        }
       
    }, []);
    


    const takePhotoFromCamera = async (props) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'We need your permission',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('can use the camera');
            const options = {
                title: 'Select Image',
                customButtons: [
                    {
                        name: 'customOptionKey',
                        title: 'Choose file from Custom Option'
                    },
                ],
                quality: 0.2,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                    cameraRoll: true,
                    waitUntilSaved: true,
                },
                width: 350,
                height: 400,
                cropping: true,
                includeBase64: true,
                includeExif: true,
            };

            ImagePicker.openCamera(
                options,

            ).then((response) => {

                if (response.didCancel) {
                    
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);

                } else {
                    const source = response;
                    setShowProgress(true)
                  

                    const url = `${envData.domain_name}${envData.send_image_path}`
                    fetch(url, {
                        method: 'POST',
                        headers: {
                        
                            'content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            photo: source.data,
                            Category: 2,
                            address: 234,
                            pincode: 470002
                        })
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            if (response.status === 200) {
                                navigation.push("CommercialScreen", { Path: source.path, CommercialData: response.data })
                                setShowProgress(false)
                               
                                AsyncStorage.setItem('CommercialImage', JSON.stringify(response.data));
                                AsyncStorage.setItem('imagePath', JSON.stringify(source.path));
                            }

                        })

                        .catch((err) => {
                            console.log("error", err)
                        })
                }
            });
        }
    };

    const choosePhotoFromLibrary = async (props) => {


        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'We need your permission',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('can use the camera');
            const options = {
                title: 'Select Image',
                customButtons: [
                    {
                        name: 'customOptionKey',
                        title: 'Choose file from Custom Option'
                    },
                ],
                quality: 0.2,
                storageOptions: {
                    cameraRoll: true,
                    skipBackup: true,
                },

                width: 300,
                height: 300,
                cropping: true,
                includeBase64: true,
                includeExif: true,
            };

            ImageCropPicker.openPicker(options).then((response) => {
              
                if (response.didCancel) {
                 
                } else if (response.error) {
                    console.log(TAG, 'ImagePicker Error: ', response.error);
                } else {
                    const source = response;
                    setShowProgress(true)
                  

                    const url = `${envData.domain_name}${envData.send_image_path}`
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            //'Accept': 'application/json',
                            'content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            photo: source.data,
                            Category: 2,
                            address: addressData,
                            pincode: pinCode
                        })
                    })
                        .then((response) => response.json())
                        .then((response) => {
                         
                            if (response.status === 200) {
                                navigation.push("CommercialScreen", { Path: source.path, CommercialData: response.data })
                                setShowProgress(false)
                                setImage(source.path)
                                setDetail(response.data)

                                AsyncStorage.setItem('CommercialImage', JSON.stringify(response.data));
                                AsyncStorage.setItem('imagePath', JSON.stringify(source.path));
                            }

                        })

                        .catch((err) => {
                            console.log("error", err)
                        })
                }
            });
        }
    };


    return (
        <View>
            <ProgressDialog
                visible={showProgress === true ? true : false}
                loaderColor="black"
            />
            {showModal === true ?
                <View >
                    <Modal
                        transparent={true}
                        isVisible={showModal}
                        onBackButtonPress={() => {
                           
                            setShowModal(false)
                        }}>
                        <View style={styles.modal}>
                            <View style={{
                                height: width * 300 / 375,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius:15
                            }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {

                                        setDetailModal(true)
                                        setShowModal(!showModal);
                                    }}
                                >

                                    <Text style={styles.textStyle}>Choose Photo from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {
                                        takePhotoFromCamera()
                                        setShowModal(!showModal);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Launch Camera</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        setShowModal(!showModal);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                : null}

            {detailModal === true ?

                <View>
                    <Modal
                        transparent={true}
                        isVisible={detailModal}
                        onBackButtonPress={() => {
                          
                            setDetailModal(false)
                        }}>
                        <View style={{

                              height: width * 300 / 375,
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius:10

                        }}>
                            <View style={{ marginTop: 20, width: width * 300 / 375 }}>
                                <Text style={{ fontSize: 18 }}>Address</Text>
                                <TextInput
                                    value={addressData}
                                    onChangeText={(addressData) => setAddressData(addressData)}
                                    style={{ borderBottomColor: "black", borderBottomWidth: 1, fontSize: 18, color: "black" }} />
                            </View>
                            <View style={{ marginTop: 20, width: width * 300 / 375 }}>
                                <Text style={{ fontSize: 18 }}>Zip code</Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    value={pinCode}
                                    onChangeText={(pinCode) => setPinCode(pinCode)}
                                    style={{ borderBottomColor: "black", borderBottomWidth: 1, fontSize: 18, color: "black" }} />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        setDetailModal(false)
                                        choosePhotoFromLibrary()
                                        setAddressData("")
                                        setPinCode("")
                                    }}
                                >
                                    <Text style={styles.textStyle}>Ok</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        setDetailModal(false)
                                        setAddressData("")
                                        setPinCode("")
                                    }}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>
                </View>
                : null}
            <View style={styles.mainFooter}>


                <TouchableOpacity style={styles.viewStyle} onPress={() => {
                   
                    setShowModal(true)
                   
                }}>
                    <Image source={require("../assets/BuildingCamera.png")} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.viewStyle} onPress={() => navigation.navigate("CommercialScreen", { path: image, Commercial: detail })}>
                    <Image source={require("../assets/BuildingSearch.png")} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.viewStyle} onPress={() => navigation.navigate("GalleryScreen")}>
                    <Image source={require("../assets/Gallery.png")} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>

                <TouchableOpacity

                    disabled={true}
                    style={styles.viewStyle} onPress={() => {
                        takePhotoFromCamera()
                    }}>
                    <Image source={require("../assets/HomeCamera.png")} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={true}
                    style={styles.viewStyle}
                    onPress={() => navigation.navigate("Profile")}>
                    <Image source={require("../assets/HomeSearch.png")} style={{ height: 80, width: 80 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainFooter: {

        flexDirection: "row",
        width: width,
        height: width * 65 / 375,
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        elevation: 2,
        alignSelf: "flex-end"

    },
    viewStyle: {
        height: width * 64 / 375,
        width: width * 63 / 375,
        justifyContent: "center",
        alignItems: "center"
    },

    modal: {
        marginTop: 140,
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    textStyle: {
        color: '#3f2949',
        fontWeight: "bold",
        fontSize: 17,
        alignSelf: "center",

    },
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 10,
        width: width * 300 / 375,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        margin: 15,
        backgroundColor: "white"
    },
    cancelButtonStyle:{
        borderWidth: 1,
        borderRadius: 15,
        width: width * 120 / 375,
        height: width*40/375,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 5,
        margin: 10,
        backgroundColor: "white"
    }
})

export default Footer;
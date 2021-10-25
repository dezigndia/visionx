import React, { useEffect, useState, memo } from 'react'
import {
    View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid,
    TextInput, Text, Button, Platform, FlatList, ToastAndroid, ScrollView
} from 'react-native'
import envData from "../env.json"
import { useNavigation } from '@react-navigation/native'
import ProgressDialog from 'react-native-progress-dialog';
import { useIsFocused } from "@react-navigation/native";
import { getRefreshToken } from '../components/RefreshTokenComponent'
import { Value } from 'react-native-reanimated';
import Geolocation from '@react-native-community/geolocation'
import { ListItem, SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const { height, width } = Dimensions.get("window")

const TAG = '-CommercialTab.js-'
const CommercialTab = () => {
    const [token, setToken] = useState("")
    const [commercialImage, setCommercialImage] = useState([])
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false)
    const [value, setValue] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [addressData, setAddressData] = useState()
    const [pinCode, setPinCode] = useState()
    const [detailModal, setDetailModal] = useState(false)
    const [showProgress, setShowProgress] = useState(false)
    const [image, setImage] = useState()
    const [detail, setDetail] = useState()
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [showPhysicalAddress, setShowPhysicalAddress] = useState(false)
    const [searchDetail, setSearchDetail] = useState([])
    const [search, setSearch] = useState("")
    const [serverData, setServerData] = useState([]);
    const [message, setMessageModal] = useState(false)


    const navigation = useNavigation()
    const isFocused = useIsFocused()


    useEffect(() => {

        getCommercialImage()

    }, [isFocused, token])

    useEffect(async () => {
        let userToken;
        userToken = "";
        setTimeout(async () => {
            try {
                let user = await AsyncStorage.getItem('response');
                let parsed = JSON.parse(user);
                let userToken = parsed.access_token;

                let refresh = await AsyncStorage.getItem("Refresh")
                let parsedRefresh = JSON.parse(refresh)



                if (parsedRefresh == null) {
                    setToken(userToken)
                    // getCommercialImage()
                } else {
                    setToken(parsedRefresh.access_token)
                    // getCommercialImage()
                }
            }
            catch (error) {
                console.log("error", error)
            }
        }, 3000)
        return () => { AsyncStorage.removeItem("response") }
    }, [isFocused]);


    const requestExternalStoragePermissions = async () => {
        const read = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        const write = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return (
            read === PermissionsAndroid.RESULTS.GRANTED &&
            write === PermissionsAndroid.RESULTS.GRANTED
        );
    };

    const getCommercialImage = async () => {
        setProgress(true)
        const url = `${envData.domain_name}${envData.send_image_path}`

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const data = await res.json()
            .then((response) => {
                console.log("GalleryImage", response)

                setProgress(false)
                setCommercialImage(response.general)

                if (response.general && response.general.length) {
                    setVisible(false)
                }
            })
            .catch((err) => {
                console.log("error", err)
                setProgress(false)
            })
    }

    useEffect(() => {
        Geolocation.getCurrentPosition(
            data => {
                // console.log("DATA", data)
                setLatitude(data.coords.latitude.toString().substring(0, 8))
                setLongitude(data.coords.longitude.toString().substring(0, 8))
            },
            error => {
                console.log(error.code, error.message);
            }
            // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }, [latitude, longitude]);

    const takePhotoFromCamera = async (props) => {
        Platform.OS === 'android' ? requestExternalStoragePermissions() : null

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
                setTimeout(() => {
                    setShowProgress(true)
                }, 500)

                setShowModal(false);

                const url = `${envData.domain_name}api/ML/predict/?latitude=${latitude}&longitude=${longitude}`


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
                        } else {
                            Platform.OS == "android" ? ToastAndroid.show("Something went wrong", ToastAndroid.SHORT) : null;
                            setShowProgress(false)

                        }

                    })

                    .catch((err) => {
                        console.log("error", err)
                        setShowProgress(false)
                    })
            }
        });

    };

    const choosePhotoFromLibrary = async (props) => {

        Platform.OS === 'android' ? requestExternalStoragePermissions() : null
        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //     {
        //         title: 'We need your permission',
        //     },
        // );
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
                setTimeout(() => {
                    setShowProgress(true)
                }, 500)
                setDetailModal(false)


                const url = `${envData.domain_name}${envData.send_image_path}`
                const body = {
                    photo: source.data,
                    Category: 2,
                    address: search,
                    pincode: pinCode
                }
                console.log("BODY_COMMERCIAL", body.address)
                fetch(url, {
                    method: 'POST',
                    headers: {
                        //'Accept': 'application/json',
                        'content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                })

                    .then((response) => response.json())
                    .then((response) => {
                        console.log("Response", response)
                        if (response.status === 200) {

                            navigation.push("CommercialScreen", { Path: source.path, CommercialData: response.data })
                            setShowProgress(false)
                            setSearch("")

                            setImage(source.path)
                            setDetail(response.data)

                            AsyncStorage.setItem('CommercialImage', JSON.stringify(response.data));
                            AsyncStorage.setItem('imagePath', JSON.stringify(source.path));
                        } else {
                            Platform.OS == "android" ? ToastAndroid.show("Something went wrong", ToastAndroid.SHORT) : null;
                            setShowProgress(false)

                        }

                    })

                    .catch((err) => {
                        console.log("error", err)
                        setShowProgress(false)
                    })
            }
        });

    };

    const searchFilterFunction = text => {
        const newData = serverData.data.filter(item => {
            const itemData = item.toUpperCase();
            // console.log("ITEM", item)
            const textData = text.toUpperCase();
            // console.log("ItemData", itemData)
            return itemData.indexOf(textData) > -1;
        });
        //console.log("newData", newData)
        setSearchDetail(newData)
        setSearch(text)
        // this.setState({ data: newData });
    };

    useEffect(() => {
        const url = "https://api.visionworldx.com/api/ML/address/"
        fetch(url, {
            method: 'GET',
            headers: {
                //'Accept': 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }

        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log("responseJSON", responseJson)
                //Successful response from the API Call
                setServerData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    const _renderItem = (item) => {
        // console.log("ITEM_CHECK", item)
        return (

            <View style={{ marginTop: 6, width: width, flex: 0.25 }}>

                <TouchableOpacity onPress={() => navigation.navigate("RentalScreen", { Detail: item.item })}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}> */}
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        <Image source={{ uri: item.item.photo }} style={{ height: width * 100 / 375, width: width * 85 / 375 }} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ProgressDialog
                visible={progress == true ? true : false}
                loaderColor="black"
            />
            {showPhysicalAddress === true ?
                <View >
                    <Modal
                        transparent={true}
                        isVisible={showPhysicalAddress}
                        onBackButtonPress={() => {

                            setShowPhysicalAddress(false)
                        }}>
                        <View style={styles.modalStyle} >
                            <View style={{
                                height: Platform.OS === "android" ? width * 150 / 375 : width * 200 / 375,
                                width: width,
                                backgroundColor: "#f8f8ff",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: '#3f2949',
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    alignSelf: "center",
                                }}>Do you have image physical address</Text>
                                <View style={{ flexDirection: "row", marginTop: 25 }}>
                                    <TouchableOpacity
                                        style={styles.cancelButtonStyle}
                                        onPress={() => {

                                            setTimeout(() => {
                                                setDetailModal(true)
                                            }, 1000)
                                            setShowPhysicalAddress(false)


                                        }}
                                    >
                                        <Text style={styles.textStyle}>Yes, I have</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelButtonStyle}
                                        onPress={() => {
                                            setTimeout(() => {
                                                setMessageModal(true)
                                            }, 500)

                                            setShowPhysicalAddress(false)


                                        }}
                                    >
                                        <Text style={styles.textStyle}>No, I don't</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                : null}


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
                                borderRadius: 15
                            }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {

                                        setShowModal(false)
                                        setTimeout(() => {
                                            setShowPhysicalAddress(true)
                                        }, 100)

                                    }}
                                >

                                    <Text style={styles.textStyle}>Choose Photo from Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => {
                                        takePhotoFromCamera()

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

                            height: "100%",
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            width: "110%",
                            marginTop: Platform.OS == "ios" ? 70 : null,
                            marginBottom: Platform.OS == "ios" ? 50 : null,
                            alignSelf: 'center'

                        }}>
                            <View style={{ width: "100%", height: 60 }}>
                                <SearchBar
                                    placeholder="Type Here..."
                                    lightTheme
                                    round
                                    style={{ color: "#000000" }}
                                    onChangeText={text => {
                                        searchFilterFunction(text),
                                            console.log("Text", search)
                                    }}
                                    value={search}
                                    ref={search => search = search}
                                //autoCorrect={false}
                                />
                            </View>
                            <FlatList
                                data={searchDetail}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setSearch(item)
                                            console.log("Search", search)
                                        }} style={{ height: 50, width: "95%", borderWidth: 1, borderColor: "#000000", margin: 5, backgroundColor: "#D9F5F8", justifyContent: "center", borderRadius: 10 }}>
                                            <Text style={{ textAlign: "left", fontSize: 14, paddingLeft: 5 }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                            <View style={{ flexDirection: "row", marginBottom: Platform.OS == "ios" ? 50 : null }}>
                                <TouchableOpacity
                                    style={styles.cancelButtonStyle}
                                    onPress={() => {
                                        //setDetailModal(false)
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


            {message === true ?
                <View >

                    <View style={{
                        height: height * 500 / 640,
                        width: "90%",
                        backgroundColor: "#f8f8ff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        // marginTop: 10,
                        marginBottom: 40,
                        alignSelf: "center"
                    }}>
                        <Text style={{
                            color: '#3f2949',
                            fontWeight: "bold",
                            fontSize: 23,
                            alignSelf: "center",
                        }}>Please be informed that, this will only provide you with similar buildings that look like your image</Text>
                        <View style={{ flexDirection: "row", marginTop: 45 }}>
                            <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                onPress={() => {

                                    setTimeout(() => {
                                        choosePhotoFromLibrary()
                                        setMessageModal(false)
                                    }, 100)
                                    setShowPhysicalAddress(false)



                                }}
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                onPress={() => {
                                    setTimeout(() => {
                                        setShowPhysicalAddress(false)
                                    }, 100)
                                    setMessageModal(false)


                                }}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                : null}





            {commercialImage == undefined || commercialImage == null || commercialImage == "" ?
                <View style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        style={{ flexDirection: "row", alignSelf: "center", justifyContent: "center", alignItems: "center", height: 70, width: 280, borderWidth: 1, borderColor: "#000000", backgroundColor: "#0770AA" }}>
                        <Icon name="camera" size={30} color="#FFFFFF" />
                        <Text style={{ fontSize: 20, alignSelf: "center", color: "#FFFFFF", marginLeft: 15 }}>{"Search for building"}</Text>
                    </TouchableOpacity>
                </View>
                :
                <ScrollView>
                    <FlatList
                        numColumns={4}
                        data={commercialImage}
                        keyExtractor={item => item.photo}
                        renderItem={(item) => _renderItem(item)}
                    />

                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        marginTop: 100,
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 8,
    },
    modalStyle: {

        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 8,
        flex: 1
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
        color: '#3f2949',
        fontWeight: "bold",
        fontSize: 17,
        alignSelf: "center",

    },
})

export default CommercialTab;
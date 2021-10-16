import React, { useEffect, useState, memo } from 'react'
import { View, Text, FlatList, Image, Dimensions, ScrollView, RefreshControl, TouchableOpacity } from "react-native"
import envData from "../env.json"
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'
import ProgressDialog from 'react-native-progress-dialog';
import { useIsFocused } from "@react-navigation/native";
import { getRefreshToken } from '../components/RefreshTokenComponent'
import { Value } from 'react-native-reanimated';


const { height, width } = Dimensions.get("window")

const TAG = '-CommercialTab.js-'
const CommercialTab = () => {
    const [token, setToken] = useState("")
    const [commercialImage, setCommercialImage] = useState([])
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false)
    const [value, setValue] = useState("")

    const navigation = useNavigation()
    const isFocused = useIsFocused()


    useEffect(() => {

        getCommercialImage()
        setProgress(true)

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
                    getCommercialImage()
                } else {
                    setToken(parsedRefresh.access_token)
                    getCommercialImage()
                }
            }
            catch (error) {
                console.log("error", error)
            }
        }, 3000)
        return () => { AsyncStorage.removeItem("response") }
    }, [isFocused]);

    const getCommercialImage = async () => {
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
                console.log("GalleryImage", token)

                setProgress(false)
                setCommercialImage(response.general)

                if (response.general.length === 0) {
                    setVisible(true)
                }
            })
            .catch((err) => {
                console.log("error", err)

            })
    }


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
            {visible === true ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, alignSelf: "center" }}>No data available</Text>
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

export default CommercialTab;
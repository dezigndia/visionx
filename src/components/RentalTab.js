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

const TAG = '-RentalTab.js-'
const RentalTab = () => {
    const [token, setToken] = useState("")
    const [rentalImage, setRentalImage] = useState([])
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(false)
    const [value, setValue] = useState("")

    const navigation = useNavigation()
    const isFocused = useIsFocused()
   

    useEffect(() => {

        getRentalImage()
        setProgress(true)

    }, [isFocused, token ])

    useEffect(async () => {
        let userToken;
        userToken = "";
        setTimeout(async()=>{

        

        try {
            let user = await AsyncStorage.getItem('response');
            let parsed = JSON.parse(user);
            let userToken = parsed.access_token;

            let refresh = await AsyncStorage.getItem("Refresh")
            let parsedRefresh = JSON.parse(refresh)

           

            if (parsedRefresh == null) {
                setToken(userToken)
                getRentalImage()
            } else {
                setToken(parsedRefresh.access_token)
                getRentalImage()
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }, 3000)
        return () => { AsyncStorage.removeItem("response") }
    }, [isFocused]);

    const getRentalImage = async () => {
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
                 console.log("Gallery", response)
               
                setProgress(false)
                setRentalImage(response.Rental_Data)

                if (response.General_data.length === 0) {
                    setVisible(true)
                }
            })
            .catch((err) => {
                console.log("error", err)

            })
    }


    const _renderItem = (item) => {

        return (

            <View style={{ marginTop: 6, width: width, flex: 0.25 }}>

                <TouchableOpacity onPress={() => navigation.navigate("RentalScreen", { Detail: item.item })}>
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
                        data={rentalImage}
                        keyExtractor={item => item.photo}
                        renderItem={(item) => _renderItem(item)}
                    />

                </ScrollView>
            }
        </View>
    )
}

export default RentalTab;
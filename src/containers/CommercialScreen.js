import React, { useState, useEffect, memo } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Footer from '../components/Footer'



const TAG = '-CommercialPage-'
const {  width } = Dimensions.get("window")

const DescriptionScreen = ({ route }) => {

    const navigation = useNavigation()


    const commercialDetail = route.params.CommercialData
    const imagePath = route.params.Path

    const [image, setImage] = useState(imagePath)
    const [detail, setDetail] = useState(commercialDetail)

    useEffect(() => {

        setImage(imagePath)
        setDetail(commercialDetail)

    }, [])
    
    return (

        <View style={{ flex: 1, width: width }}>

            <Header headerText="Description Screen" />


            {(detail == undefined && image == undefined) ?

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 22 }}>No Data Available</Text>
                </View>

                :
                <ScrollView style={{ width: width, marginBottom: 20, flex: 1 }}>
                    <View style={{ marginRight: 20, marginLeft: 20 }}>


                        <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{detail.name}</Text>
                        </View>

                        <View style={styles.imageStyle}>
                            <Image source={{ uri: image }} style={{ height: width * 208 / 375, width: width * 335 / 375 }} />
                        </View>

                        {(detail.metadata == null || "Not found") ?

                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 22 }}>No Data Available</Text>
                            </View>
                            :

                            <View style={{ flex: 1 }}>
                                <View style={styles.mainContainer}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{new Date().toISOString().substring(0, 10)}</Text>
                                </View>
                                {Object.keys(detail.metadata).map((key => {

                                    return (
                                      
                                        <View style={styles.container}>
                                            <Text style={styles.textTwoStyle}>{key} :  </Text>
                                            <Text style={styles.textOneStyle}>{detail.metadata[key]}</Text>
                                        </View>
                                    )

                                }))}
                            </View>
                        }
                    </View>
                </ScrollView>
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
    textTwoStyle: {
        fontSize: 15,
        color: "#333333",

    },
    textStyle: {
        fontSize: 20,
        fontWeight: "bold"
    },

    imageStyle: {
        marginTop: 20
    },
    container: {
        marginTop: 15,
        flexDirection: "row",
        paddingRight: 20,
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
        textAlign: "left"

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
        fontFamily: "Roboto",
        marginTop: 6,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: 17,
        width: width * 309 / 375,
        height: 100
    }


})

export default memo(DescriptionScreen);
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import Footer from '../components/Footer'

const TAG = "-rental-"
const { height, width } = Dimensions.get("window")

const DescriptionScreenHome = ({ route }) => {
    const [keyValue, setKeyValue] = useState([])

    const navigation = useNavigation()

    const commercialView = route.params.Detail
   


    return (
        <View style={{ flex: 1 }}>

            <Header headerText="Description Screen" />



            <ScrollView style={{ flex: 1, width: width, marginBottom:20 }}>
                <View style={{ marginRight: 20, marginLeft: 20, width: width*335/375 }}>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>{commercialView.building_name}</Text>
                    </View>

                    <View style={styles.imageStyle}>
                        <Image source={{ uri: commercialView.photo }} style={{ height: width * 208 / 375, width: width * 335 / 375 }} />
                    </View>
                    {(commercialView.building_metadata == null) ?

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, marginTop: 30 }}>No Data Available</Text>
                        </View>

                        :
                        <View style={{ flex: 1 }}>
                            <View style={styles.mainContainer}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{new Date().toISOString().substring(0, 10)}</Text>
                            </View>

                            {Object.keys(commercialView.building_metadata).map((key => {

                                return (
                                  
                                    <View style={styles.container}>
                                        <Text style={styles.textTwoStyle}>{key} :  </Text>
                                        <Text style={styles.textOneStyle}>{commercialView.building_metadata[key]}</Text>
                                    </View>
                                )

                            }))}

                            {/* <View style={styles.container}>
                                <Text style={styles.textTwoStyle}>Phone Number</Text>
                                <Text style={styles.textThreeStyle}>{commercialView.building_metadata.Phone}</Text>
                            </View> */}
                            {/* <View style={styles.container}>
                        <Text style={styles.textTwoStyle}>Description</Text>
                        <Text style={styles.textFourStyle}>{commercialView.building_metadata.website}</Text>
                    </View> */}
                        </View>
                    }
                </View>
            </ScrollView>

            <View style={{ alignItems: "flex-end" }}>
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
        height: 25
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
        // width: width*360/375,
        marginTop: 15,
        flexDirection: "row",
       paddingRight:20,
       flex:1
       

    },
    mainContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
    },
    textOneStyle: {
        marginRight:20,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 17,
        paddingRight:20,
        textAlign:"left"
        
       

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

export default DescriptionScreenHome;
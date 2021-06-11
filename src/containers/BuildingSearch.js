import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native'
import Footer from '../components/Footer';

const { height, width } = Dimensions.get("window")

const BuildingSearch = ({ route }) => {

    const navigation = useNavigation()
    const ImageView = route.params.Path
 

    return (
        <View style={{ flex: 1 }}>
            <Header headerText="Building Search" />

            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <View>
                    <Image source={{ uri: route.params.Path }} style={{ height: width*300/375, width: width }} />
                </View >
            </View>

            <ScrollView>
                <View style={styles.containerStyle}>
                    <TouchableOpacity style={styles.viewStyle}
                        onPress={() => navigation.navigate("CommercialScreen",{path: ImageView})}>
                        <Text
                            style={styles.textInput}
                        >Name of company</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.viewStyle}
                        onPress={() => navigation.navigate("CommercialScreen", {path: ImageView})}>
                        <Text
                            style={styles.textInput}
                        >Name of company</Text>
                    </TouchableOpacity>
                    <View style={styles.viewStyle}>
                        <Text
                            style={styles.textInput}
                        >Name of company</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{alignSelf:"flex-start"}}>
            <Footer />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        height: width * 391 / 375,
        width: width
    },
    textInput: {

        borderColor: "black",
        borderWidth: 2,
        width: width * 335 / 375,
        height: 57,
        borderRadius: 5,
        padding: 20,
    },
    viewStyle: {
        marginBottom: 20,
    },
    containerStyle: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20
    }
})

export default BuildingSearch;
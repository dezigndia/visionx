import React, {useEffect} from 'react'
import { View, StyleSheet, Dimensions ,BackHandler, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header'
import TabViewExample from './TabViewExample'
import Footer from '../components/Footer';


const { height, width } = Dimensions.get("window")

const GalleryScreen = ({route}) => {
    const navigation = useNavigation()

// const disable = route.params.path || false   



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

    return (
        <View style={{ flex: 1 }}>
            <View >
                <Header headerText="Gallery" />
            </View>



            <View style={{ flex: 1 }}>
                <TabViewExample />
            </View>
            <View style={{ alignSelf: "flex-start" }}>
                <Footer />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})

export default GalleryScreen;
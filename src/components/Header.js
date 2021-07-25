import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'

const { height, width } = Dimensions.get('window').width
const Header = (props) => {
    const navigation = useNavigation()
    return (


        <View style={styles.viewStyle}>
            <View style={styles.textViewStyle}>
                <Text style={styles.textStyle}>{props.headerText}</Text>
            </View>
            {/* </View> */}
            <TouchableOpacity style={styles.userIconStyle}
                onPress={() => navigation.navigate("Profile")}>
                <Icon name="account-outline" size={30} color="black" />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    viewStyle: {
        width: width,
        flexDirection: "row",
        backgroundColor: '#F8F8F8',
        height: 70,
         elevation: 4,
         marginTop: Platform.OS === "ios" ? 30 : null

    },
    textViewStyle: {
        alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
        marginLeft:30
    },
    textStyle: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        fontWeight:"bold"
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

export default Header;
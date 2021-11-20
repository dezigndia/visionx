
import * as React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    BackHandler,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Text,
    Platform,
    AlertIOS,
    ToastAndroid
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";


const OnBoarding = ({ navigation }) => {

    const [sliderImage, setSliderImage] = React.useState([
        require('../assets/introscreen_one.jpeg'),
        require('../assets/introscreentwo.jpeg'),
        // Local image
        // require('../../assests/slider3.png'),       
    ])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.upView}>
                <SliderBox
                    style={styles.sliderBoxImage}
                    images={sliderImage}
                    circleLoop
                    autoplay
                    resizeMethod={'resize'}
                    underlayColor={"transparent"}
                    disableOnPress={true}
                    resizeMode={'stretch'}
                    dotColor={"#1A80B9"}
                    inactiveDotColor={"#C4C4C4"}
                    paginationBoxStyle={{
                        paddingTop: 20,
                        alignItems: "flex-end",
                        marginTop: 36,
                    }}
                    dotStyle={{
                        width: 12,
                        height: 12,
                        borderRadius: 12,
                        marginHorizontal: 0,
                        padding: 0,
                        marginTop: 60,
                        backgroundColor: "white"
                    }}
                    imageLoadingColor="#2196F3"
                />

            </View>
            <View style={styles.downView}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                    style={styles.SignUpView}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Skip</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    upView: {
        flex: 4,
    },
    downView: {
        flex: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderBoxImage: {
        height: '95%',
        width: '95%',
        marginTop: '10%',
        alignSelf: 'center',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    SignUpView: {
        height: 42,
        width: '85%',
        backgroundColor: '#0072B1',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    SignInView: {
        height: 42,
        width: '85%',
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#0072B1',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default OnBoarding;

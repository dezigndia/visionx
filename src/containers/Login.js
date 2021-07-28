import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text, Platform } from 'react-native'
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import envData from '../env.json'
import Geolocation from '@react-native-community/geolocation'
const TAG = "-Login-"
const { height, width } = Dimensions.get('window')

class Login extends Component {

  constructor(props) {
    super(props)
  }
  state = {
    latitude: 0,
    longitude: 0,
    userDetail: {},
    token: {},
    apisendToken: '',
    location_access_token: '',
    refreshToken: ''
  }


  render() {

    const term = "https://api.visionworldx.com/terms/"
    const privacy = "https://api.visionworldx.com/privacy/"
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/splashImage.png")}
          style={{ width: width * 230 / 360, height: width * 260 / 360, alignItems: "flex-start", justifyContent: "flex-start", flex: 0.6 }} />

        {/* <View style={{ alignItems: 'center', marginTop: 24 }}> */}
        <Text style={{ fontSize: 16 }}>
          By Signing in, I agree to VisionX
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 4,

          }}>
          {' '}
          <Text
            style={styles.tncText}
            onPress={() => {
              this.props.navigation.navigate("WebsiteScreen", { path: term })
            }}
          >
            Terms & Conditions
          </Text>{' '}
          and{' '}
          <Text
            style={styles.tncText}
            onPress={() => {
              this.props.navigation.navigate("WebsiteScreen", { path: privacy })
            }}
          >
            Privacy Policy
          </Text>
        </Text>


        <GoogleSigninButton
          style={styles.buttonStyle}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            this.isSignedIn()
          }}
        />
      </View>
    )
  }

  componentDidMount() {
    GoogleSignin.configure({

      iosClientId: "327092130955-fmephv0sd5p7im71co50r6h6qd1k2qa4.apps.googleusercontent.com",
      webClientId: "327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com"
      //androidClientid:"327092130955-m34hr8u6uki2uvhcbdbi4nga8bb52hac.apps.googleusercontent.com"

    })
    this.getCurrentLocation()


  }

  getCurrentLocation() {
    Geolocation.getCurrentPosition(data => {
      this.setState({
        latitude: data.coords.latitude.toString().substring(0, 8),
        longitude: data.coords.longitude.toString().substring(0, 8)
      })
    })


  }
  async getLocationApi() {

    this.getCurrentLocation()

    const url = `${envData.domain_name}${envData.Location}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.state.location_access_token}`
      },

      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      })
    })

    const Data = await res.json()

  }

  async getApiToken() {
    const url = `${envData.domain_name}${envData.convert_token}`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "content-type": "application/json",

      },
      body: JSON.stringify({
        grant_type: "convert_token",
        client_id: "kIoMJQ5bFNuWcLs4aQAHDhP7tPaVgOEGyCRdDSOA",
        client_secret: "MuB3SI9Sa7ARhzGNHVceBa7E0tR0sbXUl7xndvpvvoSo10g38SJXuCeej9qBeivfz1ITCHZbPTRY0EAVvXooVBO0NiYZZ0rKFmuXBaH8EVwoknhIV7yy7nJQTO02sZ84",
        backend: "google-oauth2",
        token: this.state.apisendToken

      }),
    })
    const data = await res.json()
      .then((response) => {
        

        if (response.access_token !== "") {
          this.props.navigation.navigate('ProfileSetUp', {
            UserInfor: this.state.userDetail, type: "SNS",
            apiToken: response.access_token
          });
          // this.getRefreshToken(response.refresh_token)

          this.setState({
            location_access_token: response.access_token
          })
          AsyncStorage.setItem('response', JSON.stringify(response));

          this.getLocationApi()
        }
      })
      .catch((err) => {
        console.log(TAG, "error", err)
      })
  }



  _signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn();
      const gettoken = await GoogleSignin.getTokens();
      this.setState({
        userDetail: userInfo,
        token: gettoken,
        apisendToken: gettoken.accessToken

      })
      if (gettoken.accessToken !== "") {
        this.getApiToken()
      }
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

    } catch (error) {
      console.log('google error:', error);
    }
  }

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {

      this.getCurrentUserInfo();

    } else {
      this._signInWithGoogle();

    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();

      const gettoken = await GoogleSignin.getTokens();

      this.props.navigation.navigate('ProfileSetUp', {
        userLastName: userInfo.user.familyName,
        userEmail: userInfo.user.email,
        userPicUrl: userInfo.user.photo,
        userFirstName: userInfo.user.givenName,
        UserInfor: userInfo,
        apiToken: this.state.location_access_token
      });

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log(TAG, 'Google', 'Signin Required')
      } else {
        console.log(TAG, 'Google', error)
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"


  },

  tncText: {
    fontSize: 16,
    color: "#00bfff",
    borderBottomWidth: 0.5,
    textDecorationLine: 'underline',
    textDecorationColor: '#00bfff',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 335 / 375,
    height: Platform.OS === "android" ? 57 : 50,
    borderWidth: 2,
    borderColor: 'blue',
    marginTop: 30
  },
  textStyle: {
    height: 22,
    width: 139,
    marginBottom: 18,
    marginTop: 18,
    fontWeight: "bold"
    // marginLeft: 115,
    // marginRight: 80
  },
  viewStyle: {
    // marginRight: 100,
    // marginLeft: 135,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2
  }
})

export default Login;

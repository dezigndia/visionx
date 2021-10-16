/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { createStackNavigator } from '@react-navigation/stack'
 import { NavigationContainer } from '@react-navigation/native'
 import React, { useEffect, useState } from 'react'
 import Login from './src/containers/Login'
 import BuildingSearch from './src/containers/BuildingSearch'
 import Profile from './src/containers/Profile'
 import ProfileSetUp from './src/containers/ProfileSetUp'
 import GalleryScreen from './src/containers/GalleryScreen'
 import HomeSearch from './src/containers/HomeSearch'
 import TabViewExample from './src/containers/TabViewExample'
 import AsyncStorage from '@react-native-community/async-storage';
 import CommercialScreen from './src/containers/CommercialScreen'
 import RentalScreen from './src/containers/RentalScreen'
 import Camera from './src/components/Camera'
 import HomeSearchCamera from './src/components/HomeSearchCamera'
 import SplashScreen from './src/components/SplashScreen'
 import Navigation from './src/components/Navigation'
 import WebsiteScreen from './src/containers/WebsiteScreen'
import RentalPage from './src/containers/RentalPage'
import SearchScreen from './src/containers/SearchScreen'
 
 const TAG = '-APP.js-'
 const AppStack = createStackNavigator();
 const MyStack = () => {
 
   const initialState = ""
   const [token, setToken] = useState(initialState)
 
   useEffect(() => {
     setToken(token)
   }, [token])
 
   useEffect(async () => {
     let userToken;
     userToken = "";
 
     try {
       let user = await AsyncStorage.getItem('response');
       let parsed = JSON.parse(user);
       let userToken = parsed.access_token;
 
       if (user !== null) {
 
         setToken(userToken)
       }
 
      //  console.log(TAG, "parsed", user)
      //  console.log(TAG, "userToken", userToken)
 
     }
     catch (error) {
 
       console.log("error", error)
     }
 
   }, [token]);

 
   return (
     <NavigationContainer>
       {token === "" ?
         <AppStack.Navigator initialRouteName="SplashScreen">
          
           <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <AppStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
           <AppStack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
           <AppStack.Screen name="ProfileSetUp" component={ProfileSetUp} options={{ headerShown: false }} />
           <AppStack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
           <AppStack.Screen name="BuildingSearch" component={BuildingSearch} options={{ headerShown: false }} />
           <AppStack.Screen name="CommercialScreen" component={CommercialScreen} options={{ headerShown: false }} />
           <AppStack.Screen name="RentalScreen" component={RentalScreen} options={{ headerShown: false }} />
           <AppStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
           <AppStack.Screen name="WebsiteScreen" component={WebsiteScreen} options={{ headerShown: false }} />
           <AppStack.Screen name="TabViewExample" component={TabViewExample} options={{ headerShown: false }} />
           <AppStack.Screen name="HomeSearch" component={HomeSearch} options={{ headerShown: false }} />
           <AppStack.Screen name="HomeSearchCamera" component={HomeSearchCamera} options={{ headerShown: false }} />
           <AppStack.Screen name="RentalPage" component={RentalPage} options={{ headerShown: false }} />
           <AppStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />

         </AppStack.Navigator>
         :
         <Navigation />
       }
     </NavigationContainer>
   );
 }
 
 export default MyStack;
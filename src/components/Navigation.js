import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import Login from '../containers/Login'
import BuildingSearch from '../containers/BuildingSearch'
import Profile from '../containers/Profile'
import ProfileSetUp from '../containers/ProfileSetUp'
import GalleryScreen from '../containers/GalleryScreen'
import HomeSearch from '../containers/HomeSearch'
import TabViewExample from '../containers/TabViewExample'
import CommercialScreen from '../containers/CommercialScreen'
import RentalScreen from '../containers/RentalScreen'
import SplashScreen from './SplashScreen'
import WebsiteScreen from '../containers/WebsiteScreen'
import RentalPage from '../containers/RentalPage'

const RootStack = createStackNavigator()

const Navigation = () => {
    return (
        <RootStack.Navigator>
            
            <RootStack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="TabViewExample" component={TabViewExample} options={{ headerShown: false }} />
            <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="ProfileSetUp" component={ProfileSetUp} options={{ headerShown: false }} />
            <RootStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <RootStack.Screen name="WebsiteScreen" component={WebsiteScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="BuildingSearch" component={BuildingSearch} options={{ headerShown: false }} />
            <RootStack.Screen name="CommercialScreen" component={CommercialScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="RentalScreen" component={RentalScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <RootStack.Screen name="RentalPage" component={RentalPage} options={{ headerShown: false }} />
            <RootStack.Screen name="HomeSearch" component={HomeSearch} options={{ headerShown: false }} />
        </RootStack.Navigator>
    )
}

export default Navigation;
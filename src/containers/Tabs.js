import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {CommonActions} from '@react-navigation/native'
import CommercialScreen from './CommercialScreen'
import BuildingSearch from './BuildingSearch'
import HomeSearch from './HomeSearch'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GalleryScreen from './GalleryScreen'
import Profile from './Profile'
import Camera from '../components/Camera'



const Tab = createBottomTabNavigator()



const Tabs=()=>{
    return(

        <Tab.Navigator initialRouteName="galleryscreen" >
            <Tab.Screen 
            name="GalleryScreen"
            component={GalleryScreen}
            options={{
                tabBarLabel: "GallerScreen",
                tabBarIcon:()=>{
                   return <Icon
                   name="clipboard-outline"
                   color="black"
                   size={32}
               />
                
                }
            }}
            listeners={({navigation})=>({
                tabPress:(e)=>{
                   
                     e.takePhotoFromCamera()
                }
            })}
            />
             <Tab.Screen 
            name="CommercialScreen"
            component={CommercialScreen}
            options={{
                tabBarLabel: "CommercialScreen",
                tabBarIcon:()=>{
                   return <Icon
                   name="bookmark-outline"
                   color="black"
                   size={32}
               />
                }
            }}
            listeners={({navigation})=>({
                tabPress:(e)=>{
                    e.preventDefault();
                    navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes:[{name:"CommercialScreen"}]
                        })
                    )
                }
            })}
            />
 <Tab.Screen 
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon:()=>{
                   return <Icon
                   name="account-check-outline"
                   color="black"
                   size={32}
               />
                }
            }}
            listeners={({navigation})=>({
                tabPress:(e)=>{
                    e.preventDefault();
                    navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes:[{name:"Profile"}]
                        })
                    )
                }
            })}
            />
 <Tab.Screen 
            name="BuildingSearch"
            component={BuildingSearch}
            options={{
                tabBarLabel: "BuildingSearch",
                tabBarIcon:()=>{
                   return <Icon
                   name="domain"
                   color="black"
                   size={32}
               />
                }
            }}
            listeners={({navigation})=>({
                tabPress:(e)=>{
                    e.preventDefault();
                    navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes:[{name:"BuildingSearch"}]
                        })
                    )
                }
            })}
            />
 <Tab.Screen 
            name="HomeSearch"
            component={HomeSearch}
            options={{
                tabBarLabel: "HomeSearch",
                tabBarIcon:()=>{
                   return <Icon
                   name="account-outline"
                   color="black"
                   size={32}
               />
                }
            }}
            listeners={({navigation})=>({
                tabPress:(e)=>{
                    e.preventDefault();
                    navigation.navigate(
                      
                        "Camera"
                    )
                    
                }
            })}
            />

        </Tab.Navigator>
    )
}

const rootStack = createStackNavigator();

const App=()=>{
    return(
        <rootStack.Navigator initialRouteName="Tabs">
            <rootStack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown:false}}
            />
             <rootStack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown:false}}
            />
        </rootStack.Navigator>
    )
}

export default App;
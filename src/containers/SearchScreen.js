// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const SearchScreen = () => {
    // Data Source for the SearchableDropdown
    const [serverData, setServerData] = useState([]);
    const [token, setToken] = useState("")
    const [detail, setDetail] = useState([])
    const [search, setSearch] = useState("")


    useEffect(async () => {
        let userToken;
        userToken = "";

        setTimeout(async () => {



            try {
                let user = await AsyncStorage.getItem('response');
                let parsed = JSON.parse(user);
                let userToken = parsed.access_token;


                let refresh = await AsyncStorage.getItem("Refresh")
                let parsedRefresh = JSON.parse(refresh)


                if (parsedRefresh == null) {
                    setToken(userToken)
                    // getCommercialImage()
                } else {
                    setToken(parsedRefresh.access_token)
                    // getCommercialImage()
                }

            }
            catch (error) {

                console.log("error", error)
            }
        }, 4000)

        return () => { AsyncStorage.removeItem("response") }

    }, []);


    useEffect(() => {
        const url = "https://api.visionworldx.com/api/ML/address/"
        fetch(url, {
            method: 'GET',
            headers: {
                //'Accept': 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }

        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log("responseJSON", responseJson)
                //Successful response from the API Call
                setServerData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);


    searchFilterFunction = text => {
        const newData = serverData.data.filter(item => {
            const itemData = item.toUpperCase();
            // console.log("ITEM", item)
            const textData = text.toUpperCase();
            // console.log("ItemData", itemData)
            return itemData.indexOf(textData) > -1;
        });
        //console.log("newData", newData)
        setDetail(newData)
        setSearch(text)
        // this.setState({ data: newData });
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    round
                    onChangeText={text => {
                        searchFilterFunction(text),
                            console.log("Text", search)
                    }}
                    value={search}
                    ref={search => search}
                //autoCorrect={false}
                />
                <FlatList
                    data={detail}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSearch(item)
                                console.log("Search", search)
                            }} style={{ height: 50, width: "100%", borderWidth: 1, borderColor: "#000000", marginBottom: 10, backgroundColor: "#D9F5F8", justifyContent: "center", borderRadius: 10 }}>
                                <Text style={{ alignSelf: 'center', textAlign: "left" }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
});
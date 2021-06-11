import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, View, Text, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import ImagePicker from 'react-native-image-crop-picker';
const { height, width } = Dimensions.get("window")

const Camera = () => {
    const [imagePath, setImagePath] = useState();
    const navigation = useNavigation();
    useEffect(() => {
        takePhotoFromCamera()
    }, [])

    const takePhotoFromCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'We need your permission',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('can use the camera');
            const options = {
                title: 'Select Image',
                quality: 0.2,
                storageOptions: {
                    cameraRoll: true,
                    skipBackup: true,
                },
                width: 350,
                height: 400,
                cropping: true,
                includeBase64: true,
                includeExif: true,
            };

            ImagePicker.openCamera(
                options,

            ).then((response) => {

                // navigation.navigate("BuildingSearch", { Path: imagePath })
                // console.log("path", Path)

                if (response.didCancel) {
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    // console.log('ImagePicker Error: ', response.error);

                } else {
                    const source = response;

                    // console.log('====================================');
                    // console.log("ImagePhotoPath", response);
                    // console.log('====================================');
                    navigation.navigate("BuildingSearch", { Path: source.path })
                    
                    // setImagePath(source.path)
                    // console.log("imagePath", imagePath)
                   
                }
            });
        }
    };
    return (
        <View>
            {/* <Image source={{ uri: imagePath }} style={{ height: 391, width: width }} /> */}
            {/* <Text>Camera</Text> */}
        </View >
    )
}
export default Camera;

import * as React from 'react';
import { memo } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'

const WebsiteScreen = ({ route }) => {
  // Passing link in navigation and getting it using params
  const link = route.params.path;
 
  const navigation = useNavigation()

  // using webview for showing the details

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.viewHeaderStyle}>
        {/* </View> */}
        <TouchableOpacity style={styles.userIconStyle}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left-circle-outline" size={35}  />
        </TouchableOpacity>
      </View>

      <WebView source={{ uri: link.trim() }} />
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  userIconStyle: {
    flex: 1,
    marginTop: 15,
    marginBottom: 20,
    marginRight: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  viewHeaderStyle: {
    // width: width,

    backgroundColor: '#F8F8F8',
    marginLeft:10,
    height:  70,

  },
})

export default memo(WebsiteScreen);


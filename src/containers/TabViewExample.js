import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CommercialTab from "../components/CommercialTab"
import RentalTab from '../components/RentalTab';
const CommercialRoute = () => (

  <View style={styles.scene} />,
  <CommercialTab />
);
const RentalRoute = () => (
  <View style={styles.scene} />,
  <RentalTab />
);
const initialLayout = { width: Dimensions.get('window').width };
const TabViewExample = (props) => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'commercial', title: 'Commercial' },
    { key: 'rental', title: 'Home' },
  ]);

  const renderScene = SceneMap({
    commercial: CommercialRoute,
    rental: RentalRoute,
  });

  const _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      lazy
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      renderLabel={renderLabel}

    />
  );

  const renderLabel = ({ route, focused, color }) => {
    return (
      <View>
        <Text
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
        >
          {route.title}
        </Text>
      </View>
    )
  }

  return (

    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={_renderTabBar}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#ffffff'
  },
  tab: {
    width: (Dimensions.get("window").width) / 2,
    height: 50,
    elevation: 0
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    elevation: 0
  },
  activeTabTextColor: {
    color: '#1e90ff',
    fontSize: 18,
  },
  tabTextColor: {
    color: '#000000',
    fontSize: 18,
  },
  indicator: {
    backgroundColor: '#1e90ff',
    elevation: 0
  },
});

export default TabViewExample;
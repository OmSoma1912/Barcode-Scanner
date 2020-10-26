import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";

import ScanScreen from './screens/ScanScreen';

export default class App extends React.Component{
  render(){
    return <AppContainer/>;
  }
}

const TabNavigator = createBottomTabNavigator({
  Scan : {screen: ScanScreen},
});

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "red",
    alignItems : "center",
    justifyContent : "center"
  }
});
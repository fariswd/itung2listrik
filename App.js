import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigations/Navigation'
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";

console.disableYellowBox = true;
if (typeof console !== "undefined" && !__DEV__) {
  console.log = () => {};
}

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      ready: false
    }
    this.fontLoad()
  }
  componentDidMount(){
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }
  async fontLoad(){
    await Asset.loadAsync([
      require('./src/assets/bg.png')
    ])
    await Font.loadAsync({
      montserrat: require("./src/assets/font/montserrat.ttf"),
    });
  }
  render(){
    if(!this.state.ready){
      return (
        <AppLoading
          startAsync={this.fontLoad}
          onFinish={() => this.setState({ready: true})}
          onError={() => console.log('Error load')}
        />
      )
    } else {
      return (
        <Navigation />
      )
    }
  }
}
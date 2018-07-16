/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import codePush from "react-native-code-push";
import { AppState, Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME , installMode: codePush.InstallMode.IMMEDIATE};
type Props = {};
class App extends Component<Props> {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }

    console.log("this.state.appState", nextAppState)

    this.setState({appState: nextAppState});
  }

  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={{color: 'green'}}> Hello Code Push v6</Text>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>Check for updates</Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>STATE: {this.state.appState}</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

export default codePush(codePushOptions)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

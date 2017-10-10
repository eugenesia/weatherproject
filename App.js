/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Forecast from './Forecast';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      zip: '',
      // Mock data for weather forecast.
      forecast: {
        main: 'Clouds',
        description: 'few clouds',
        temp: 45.7
      }
    };
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  // Set the state from entered zip code.
  _handleTextChange(event) {
    console.log(event.nativeEvent.text);
    this.setState({zip: event.nativeEvent.text});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You input {this.state.zip}.
        </Text>
        {/* Weather forecast */}
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp} />
        {/* Enter zip code. */}
        <TextInput
          style={styles.input}
          returnKeyType='go'
          onSubmitEditing={this._handleTextChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  // TextInput to enter the zip code.
  input: {
    alignSelf: 'stretch',
    borderWidth: 2,
    fontSize: 20,
    height: 40,
    color: '#FFFFFF',
  }
});


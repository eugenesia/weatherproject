/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Forecast from './Forecast';


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
        <Image
          source={require('./flowers.png')}
          resizeMode='cover'
          style={styles.backdrop}
        >
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                {/* Enter zip code. */}
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType='go'
                  onSubmitEditing={this._handleTextChange}
                  underlineColorAndroid='transparent'
                />
              </View>
            </View>
            {/* Weather forecast */}
            <Forecast
              main={this.state.forecast.main}
              description={this.state.forecast.description}
              temp={this.state.forecast.temp} />
          </View>
        </Image>
      </View>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  // Background image.
  backdrop: {
    flex: 1,
    flexDirection: 'column',
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: 'black',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginLeft: 5,
    //marginTop: 3,
  },
  zipCode: {
    flex: 1,
    flexBasis: 1,
    width: 80,
    height: baseFontSize,
    padding: 0,
  },
  mainText: {
    fontSize: baseFontSize,
    color: 'white',
  },
});


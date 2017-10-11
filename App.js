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
import config from './config';


export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      zip: '',
      forecast: null,
    };
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  // Set the state from entered zip code.
  _handleTextChange(event) {
    const zip = event.nativeEvent.text;
    this.setState({zip: zip});

    // Full URL for OpenWeatherMap API with params.
    const url = 'http://api.openweathermap.org/data/2.5/weather?'
      + 'q=' + zip
      + '&units=metric'
      + '&appid=' + config.openWeatherMapApiKey;

    fetch(url)
      .then(response => response.json())
      .then(responseJSON => {
        // Take a look at the format.
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp,
          },
        });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {

    // Forecast content.
    let content = null;
    if (this.state.forecast !== null) {
      content = <Forecast
                  main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}
                />;
    }

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
            {content}
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
    paddingTop: 0,
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


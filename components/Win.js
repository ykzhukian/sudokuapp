import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Animated } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/Win');

import Util from '../helpers/Util';

export default class Win extends Component {

	constructor(props) {
    super(props)
  
    this.state = {

    }

    this.animateValue = new Animated.Value(0);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });

    this.animate();
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.spring(
      this.animateValue,
      {
        toValue: 1,
        friction: 6,
      }
    ).start()
  }

  render() {

    let backgroundSrc = require('../assets/img/win-bg.png');

    return (
      <View style={style.bg} >
        <ImageBackground source={backgroundSrc} style={style.bg} >
          {this.state.fontLoaded? (<Text style={style.messageText}>You Win!</Text>) : null}
        </ImageBackground>
      </View>
    );
  }
}
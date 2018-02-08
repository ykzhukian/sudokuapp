import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/Loading');

import Util from '../helpers/Util';

export default class Loading extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      pressed: false
    }

    this.animateValue = []

    for (var i = 'loading'.length - 1; i >= 0; i--) {
      let animateValue = new Animated.Value(0);
      this.animateValue.push(animateValue)
    }
  }

  animate(index) {
    this.animateValue[index].setValue(0);
    Animated.timing(
      this.animateValue[index],
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        // delay: 3000
      }
    ).start(() => this.animate(index))
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });

    for (var i = 'loading'.length - 1; i >= 0; i--) {
      
    }
    setTimeout(() => this.animate(0), 3000)

  }

  render() {

    let margin = []

    for (var i = 'loading'.length - 1; i >= 0; i--) {
      let marginTop = this.animateValue[0].interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 4, 0]
      });
      margin.push(margin);
    }

    return (
      <View style={style.bg} >
        <View style={style.buttonWrapper} >
          <Animated.View style={[style.button, margin[0]]} >
            {this.state.fontLoaded ? (<Text style={style.buttonText} >L</Text>) : null}
            <View style={style.buttonReflection} ></View>
            <View style={style.buttonReflectionRound} ></View>
            <View style={style.buttonReflectionLarge} ></View>
          </Animated.View>
          <View style={style.buttonShadow} ></View>
        </View>
      </View>
    );
  }
}







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

    this.animateValue = new Animated.Value(0);
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        delay: 3000
      }
    ).start(() => this.animate())
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

  render() {

    const marginTop = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 4, 0]
    })

    return (
      <View style={style.bg} >
        <View style={style.buttonWrapper} >
          <Animated.View style={[style.button, {marginTop}]} >
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







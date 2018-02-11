import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';


const style = require('./styles/MessageModal');

import Util from '../helpers/Util';
import MessageModalButton from './MessageModalButton';

export default class MessageModal extends Component {

	constructor(props) {
    super(props)
    this.state = {}

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

    const zoom = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    })

    return (
      <Animated.View style={[style.container, {width: Util.deviceWidth(), transform: [{scale: zoom}]}]} >
        {this.state.fontLoaded? (<Text style={style.messageText}>{this.props.message}</Text>) : null}
        <View style={style.buttonsWrapper} >
          <MessageModalButton confirmFunction={this.props.confirmFunction} cancelFunction={this.props.cancelFunction} cancel={false} />
          <MessageModalButton confirmFunction={this.props.confirmFunction} cancelFunction={this.props.cancelFunction} cancel={true} />
        </View>
      </Animated.View>
    );
  }
}







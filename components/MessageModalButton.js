import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/MessageModal');

import Util from '../helpers/Util';

export default class MessageModalButton extends Component {

	constructor(props) {
    super(props)
    this.state = {}
  }


  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  pressIn() {
    this.setState({
      pressed: true
    })
  }

  pressOut() {
    this.setState({
      pressed: false
    })
  }

  onPress() {
    if (this.props.cancel) {

    } else {
      this.props.confirmFunction();
    }
  }

  render() {

    return (
      <TouchableWithoutFeedback
      	onPressIn={() => this.pressIn()}
        onPressOut={() => this.pressOut()} 
        onPress={() => this.onPress()} >
        <View style={style.buttonWrapper}>
        	<View style={[
            style.button, 
            (this.state.pressed? {bottom: -5} : []),
            (this.props.cancel? style.cancel : [])
          ]} >
        		{this.state.fontLoaded? (<Text style={style.messageText}>{this.props.cancel? 'Cancel' : 'Confirm'}</Text>) : null}
        	</View>
        	<View style={[style.buttonShadow, (this.props.cancel? style.cancelShadow : [])]}></View>
        	<View style={[style.reflection, (this.state.pressed? {top: 7} : [])]} ></View>
        	<View style={[style.reflectionLarge, (this.state.pressed? {top: 7} : [])]} ></View>
        	<View style={[style.reflectionRound, (this.state.pressed? {top: 7} : [])]} ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}







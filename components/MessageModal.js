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
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  render() {

    return (
      <View style={[style.container, {width: Util.deviceWidth()}]} >
        {this.state.fontLoaded? (<Text style={style.messageText}>Do you want to leave the current game?</Text>) : null}
        <View style={style.buttonsWrapper} >
          <MessageModalButton cancel={false} />
          <MessageModalButton cancel={true} />
        </View>
      </View>
    );
  }
}







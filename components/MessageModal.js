import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

const style = require('./styles/MessageModal');

import Util from '../helpers/Util';
import MessageModalButton from './MessageModalButton';

export default class MessageModal extends Component {

	constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <View style={style.container} >
        
      </View>
    );
  }
}







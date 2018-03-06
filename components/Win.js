import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

const style = require('./styles/Win');

import Util from '../helpers/Util';

export default class Win extends Component {

	constructor(props) {
    super(props)
  
    this.state = {

    }
  }



  render() {

    return (
      <View style={style.bg} >
        <View style={style.wrapper} >
        
          <Text>Hey</Text>

        </View>
      </View>
    );
  }
}
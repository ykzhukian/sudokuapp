import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const style = require('./styles/index');

import Util from '../helpers/Util';

export default class InputButton extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      pressed: false
    }
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

  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <TouchableWithoutFeedback 
        onPressIn={() => this.pressIn()} 
        onPressOut={() => this.pressOut()} 
        onPress={() => this.props.selectDifficulty(this.props.value)} >
        <View style={style.buttonWrapper} >
          <View style={[
            style.button, 
            (this.props.color === 'yellow' ? style.yellow : []),
            (this.props.color === 'orange' ? style.orange : []),
            (this.props.color === 'red' ? style.red : []),
            (this.state.pressed? style.buttonPressed : [])]}>
            <Text style={style.buttonText}>{this.props.text}</Text>
          </View>
          <View style={[
            style.buttonShadow,
            (this.props.color === 'yellow' ? style.yellowShadow : []),
            (this.props.color === 'orange' ? style.orangeShadow : []),
            (this.props.color === 'red' ? style.redShadow : []),
          ]}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}







import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';

const style = require('./styles/ControlButton');

import Util from '../helpers/Util';

export default class ControlButton extends Component {

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
        style={style.control}
        onPress={() => this.props.buttonFunction()}
        disable={this.props.active}
        >
        <View style={style.controlWrapper} >
          <Image style={[style.controlImage, (this.state.pressed? style.pressed : [])]} source={this.props.icon} />
          <View style={style.controlShadow} ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}







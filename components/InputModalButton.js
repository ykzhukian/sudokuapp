import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';

import Util from '../helpers/Util';

var style = require('./styles/InputModal');


export default class InputModal extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      pressed: false
    }
  }

  pressIn() {
    if (this.props.active) {
      this.setState({
        pressed: true
      })
    }
  }

  pressOut() {
    this.setState({
      pressed: false
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <TouchableWithoutFeedback 
        onPressIn={() => this.pressIn()}
        onPressOut={() => this.pressOut()}
        onPress={() => this.props.onPress(this.props.value)}>
        <View style={style.buttonWrapper}>
          <View style={[
            style.button, 
            (this.state.pressed? style.buttonPressed : []),
            (this.props.value === '' ? style.lightButton : []),
            (this.props.selected !== '' && this.props.selected === this.props.value ? style.selected : ''),
            ]} >
            {this.state.fontLoaded ? 
              (<Text style={style.buttonText}>{this.props.value === '' ? '←' : this.props.value}</Text>) : null
            }
          </View>
          <View style={[
            style.buttonShadow, (this.props.value === '' ? style.lightButtonShadow : []),
            (this.props.selected !== '' && this.props.selected === this.props.value ? style.selectedShadow : ''),
            ]} ></View>
        </View>
        
      </TouchableWithoutFeedback>
    );
  }
}







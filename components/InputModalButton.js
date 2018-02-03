import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Font } from 'expo';

import Util from '../helpers/Util';

var style = require('./styles/InputModal');


export default class InputModal extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     
    }
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
        onPress={() => this.props.onPress(this.props.value)}>
        <View style={style.buttonWrapper}>
          <View style={[style.button, (this.props.value === '' ? style.lightButton : [])]} >
            {this.state.fontLoaded ? 
              (<Text style={style.buttonText}>{this.props.value === '' ? '←' : this.props.value}</Text>) : null
            }
          </View>
          <View style={[style.buttonShadow, (this.props.value === '' ? style.lightButtonShadow : [])]} ></View>
        </View>
        
      </TouchableWithoutFeedback>
    );
  }
}







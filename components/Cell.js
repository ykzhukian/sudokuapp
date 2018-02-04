import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Font } from 'expo';

import Util from '../helpers/Util';

const style = require('./styles/Cell');

const DOUBLE_PRESS_DELAY = 300;

export default class Cell extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      row: this.props.data.row,
      col: this.props.data.col,
      flag: this.props.data.flag,
      axis: Util.checkAxis({row: this.props.data.row, col: this.props.data.col})
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  onPress(e) {
    const now = new Date().getTime();
    this.props.showInput({row:this.state.row, col: this.state.col});

    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      
      // Double click
      this.onDoubleClick(e);

    } else {
      this.lastImagePress = now;
    }
    
  }

  onDoubleClick(event) {
    if (this.props.data.value !== '') {
      if (!this.props.data.flag) {
        this.props.addFlag({row: this.state.row, col: this.state.col});
      } else {
        this.props.removeFlag({row: this.state.row, col: this.state.col});
      }
      this.setState({
        flag: !this.props.data.flag
      })
    } else if (this.props.data.value === '') {
      Alert.alert(
            '🚫',
            'Cannot flag empty cell',
            [
                {text: 'Cool', onPress: () => console.log('OK Pressed')},
            ]
        )
    }
  }

  render() {

    let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <TouchableWithoutFeedback 
        onPress={(e) => this.onPress(e)} 
        disabled={!this.props.data.activated} >
        <View style={style.cellWrapper}>
          <View 
            style={[
              style.cell, 
              (this.state.axis % 2 === 0 ? style.lightCell : []),
              (error ? style.error : []),
              (this.props.data.flag ? style.flag : []),
              (this.props.data.selected ? style.selected : []),
            ]} >
            
            {
              this.state.fontLoaded ? (
                <Text style={[
                  style.cellText, 
                  (!this.props.data.activated? style.activated : []),
                  (error || this.props.data.flag ? style.highlistText : []),
                ]} >{this.props.data.value}</Text>
              ) : null
            }
          </View>
          <View style={[
            style.cellShadow,
            (this.state.axis % 2 === 0 ? style.lightCellShadow : []),
            (this.props.data.selected ? style.selectedShadow : []),
            (error ? style.errorShadow : []),
            (this.props.data.flag ? style.flagShadow : []),
          ]}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}




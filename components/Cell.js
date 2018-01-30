import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native';

import Util from '../helpers/Util';

const DOUBLE_PRESS_DELAY = 300;

export default class Cell extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      row: this.props.data.row,
      col: this.props.data.col,
      flag: this.props.data.flag
    }
  }

  onPress(e) {
    const now = new Date().getTime();

    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      
      // Double click
      this.onDoubleClick(e);

    } else {
      this.lastImagePress = now;
      this.props.showInput({row:this.state.row, col: this.state.col});
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
        <View 
          style={[
            styles.cell, 
            (error ? styles.error : []),
            (this.props.data.flag ? styles.flag : []),
            (this.props.data.selected ? styles.selected : []),
          ]} >
          <Text style={[
          styles.cellText, 
          (!this.props.data.activated? styles.activated : []),
          (error || this.props.data.flag ? styles.highlistText : []),
        ]} >{this.props.data.value}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#e2e2e2'
  },
  error: {
    backgroundColor: '#fc8585',
  },
  highlistText: {
    color: '#fff'
  },
  activated: {
    fontWeight: 'bold'
  },
  flag: {
    backgroundColor: '#42bcf4'
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 18
  }
});




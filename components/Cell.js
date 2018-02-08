import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
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

    if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      
      // Double click
      this.onDoubleClick(e);

    } else {
      this.lastImagePress = now;
    }
    
  }

  onPressIn() {
    this.props.showInput({row:this.state.row, col: this.state.col});
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
    let highlight = (this.props.data.highlight.row === this.props.data.row) ||
                    (this.props.data.highlight.col === this.props.data.col) || 
                    (this.props.data.highlight.axis === this.state.axis);
    let backgroundSrc = this.props.data.activated ? null : require('../assets/img/cell-slide.png');

    return (
      <TouchableWithoutFeedback 
        onPressIn={() => this.onPressIn()}
        onPress={(e) => this.onPress(e)} 
        disabled={!this.props.data.activated} >
        <View style={[style.cellWrapper, (!highlight && this.props.data.inputModal ? style.fade : [])]}>
          <ImageBackground 
            source={backgroundSrc}
            style={[
              style.cell, 
              (this.state.axis % 2 === 0 ? style.lightCell : []),
              (error ? style.error : []),
              (this.props.data.flag ? style.flag : []),
              ((this.props.data.selectedLink === this.props.data.value && this.props.data.value !== '') || this.props.data.selected ? style.selected : []),
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
          </ImageBackground>
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




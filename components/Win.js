import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Animated } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/Win');
const sudokuStyle = require('./styles/Sudoku');

import Util from '../helpers/Util';
import Cell from './Cell';
import ControlButton from './ControlButton';

export default class Win extends Component {

	constructor(props) {
    super(props)
  
    this.state = {

    }

    this.animateValue = new Animated.Value(0);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });

    this.animate();
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.spring(
      this.animateValue,
      {
        toValue: 1,
        friction: 6,
      }
    ).start()
  }

  share() {
    console.log('share');
  }

  render() {

    let backgroundSrc = require('../assets/img/win-bg.png');

    const sudokuBlock = this.props.sudoku.map((row, rowIndex) => (
      <View key={rowIndex} style={sudokuStyle.row}>
        {row.map((value, index) => (
          <Cell 
            key={index} 
            data={{
              value: value,
              activated: false,
              errors: [],
              row: rowIndex,
              col: index,
              highlight: {},
              preview: true
            }} 
            />
        ))}
      </View>
    ));

    return (
      <View style={style.bg} >
        <ImageBackground source={backgroundSrc} style={style.bg} >
          {this.state.fontLoaded? (<Text style={style.messageText}>You solved it!</Text>) : null}
          <View style={{position: 'relative', marginTop: 30}}>
            <View style={[sudokuStyle.wrapper, {width: Util.deviceWidth(), height: Util.deviceWidth()}]}>
              {sudokuBlock}
              <View style={sudokuStyle.board}></View>
              <View style={sudokuStyle.boardShadow}></View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <ControlButton active={true} buttonFunction={() => this.share()} icon={require('../assets/img/close.png')} />
            <ControlButton active={true} buttonFunction={() => this.share()} icon={require('../assets/img/save.png')} />
            <ControlButton active={true} buttonFunction={() => this.share()} icon={require('../assets/img/clear.png')} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Animated, CameraRoll, Share } from 'react-native';
import { Font, Constants, takeSnapshotAsync, Audio } from 'expo';

const style = require('./styles/Win');
const sudokuStyle = require('./styles/Sudoku');

import Util from '../helpers/Util';
import Cell from './Cell';
import ControlButton from './ControlButton';

export default class Win extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
      cameraRollUri: null,
      title: 'You solved it!',
      buttons: true,
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

  async share() {

    this.setState({
      title: 'Sudoku Solved!',
      buttons: false
    }, async () => {
      
      let result = await takeSnapshotAsync(this._container, {
        format: 'png',
        result: 'file',
      });

      let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
      this.setState({ 
        cameraRollUri: saveResult,
        title: 'Saved!',
        buttons: true
      });
      
      Share.share({
        message: 'That was a lot of fun.',
        url: this.state.cameraRollUri,
        title: 'I just sovled a Sudoku Puzzle!'
      }, {

        })
    });
  
  }

  back() {
    this.props.back();
  }

  screenshotPrepare() {
    this.setState({
      title: 'Sudoku Solved!',
      buttons: false
    }, () => {
      this._saveToCameraRollAsync();
    })
  }

  async _saveToCameraRollAsync() {
    let result = await takeSnapshotAsync(this._container, {
      format: 'png',
      result: 'file',
    });

    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    this.setState({ 
      cameraRollUri: saveResult,
      title: 'Saved!',
      buttons: true
    });
  };

  render() {

    let backgroundSrc = require('../assets/img/win-bg.png');

    const sudokuBlock = this.props.sudoku.map((row, rowIndex) => (
      <View key={rowIndex} style={sudokuStyle.row}>
        {row.map((value, index) => (
          <Cell 
            key={index} 
            data={{
              value: value,
              activated: !Util.checkDuplicate(this.props.prefilledArr, [rowIndex, index]),
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

    const zoom = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    })

    return (
      <Animated.View 
        style={[style.bg, {transform: [{scale: zoom}]}]} >
        <ImageBackground source={backgroundSrc} style={style.bg} 
        ref={view => {
          this._container = view;
        }} >
          {this.state.fontLoaded? (<Text style={style.messageText}>{this.state.title}</Text>) : null}
          <View style={{position: 'relative', marginTop: 30}}>
            <View style={[sudokuStyle.wrapper, {width: Util.deviceWidth(), height: Util.deviceWidth()}]}>
              {sudokuBlock}
              <View style={sudokuStyle.board}></View>
              <View style={sudokuStyle.boardShadow}></View>
            </View>
          </View>
          {this.state.buttons? (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
              <ControlButton active={true} buttonFunction={() => this.back()} icon={require('../assets/img/close.png')} />
              <ControlButton active={true} buttonFunction={() => this.screenshotPrepare()} icon={require('../assets/img/save.png')} />
              <ControlButton active={true} buttonFunction={() => this.share()} icon={require('../assets/img/clear.png')} />
            </View>
          ) : (
            <View><Text style={style.messageText}>{Util.formatDate(Date.now())}</Text></View>
          )}
        </ImageBackground>
      </Animated.View>
    );
  }

}
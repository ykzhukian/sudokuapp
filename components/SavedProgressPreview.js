import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');
const sudokuStyle = require('./styles/Sudoku');

import Util from '../helpers/Util';
import SavedProgressCard from './SavedProgressCard';
import MessageModal from './MessageModal';
import Cell from './Cell';


export default class SavedProgressPreview extends Component {

	constructor(props) {
    super(props)
    this.state = {
      
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
  }

  render() {

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
              highlight: {}
            }} 
            />
        ))}
      </View>
    ));

    const time = Util.formatDate(this.props.id);

    return (
      <View style={[style.previewWrapper, {width: Util.deviceWidth()}]} >
        {this.state.fontLoaded ? 
          (<Text style={{fontFamily: 'Dosis', fontSize: 24, color: 'white', textAlign: 'center', marginTop: 30}}>{time}</Text>) : null
        }
        <View style={{position: 'relative', marginTop: 50}}>
          <View style={[sudokuStyle.wrapper, {width: Util.deviceWidth(), height: Util.deviceWidth()}]}>
            {sudokuBlock}
            <View style={sudokuStyle.board}></View>
            <View style={sudokuStyle.boardShadow}></View>
          </View>
        </View>
        <View style={{position: 'absolute', bottom: 180,}}>
          <MessageModal 
            cancelFunction={() => this.props.closePreview()}
            message={'To go back, you will lose current progress.'}
            />
        </View>
      </View>
    );
  }
}







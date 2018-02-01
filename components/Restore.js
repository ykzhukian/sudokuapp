import Util from '../helpers/Util';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, TouchableWithoutFeedback } from 'react-native';


export default class Restore extends Component {

	constructor(props) {
    super(props)
    this.state = {}
  }

  onClick(e) {
     Alert.alert(
        'Warning',
        'It will lose the current progress.',
        [
          {text: 'Go on', onPress: () => {
            this.props.restore(this.props.sudoku);
          }},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        ]
    )
  }

  render() {

    const sudoku = this.props.sudoku.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value, index) => (
            <View key={index} style={styles.cell}><Text style={styles.text}>{value === '' ? '' : '·'}</Text></View>
          ))}
        </View>
    ));

    return (
      <TouchableWithoutFeedback 
        onPress={(e) => this.onClick(e)} >
        <View style={styles.item} >{sudoku}</View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 72,
    marginRight: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    height: 8,
    width: 8,
    borderWidth: 0.5,
  },
  text: {
    marginTop: -4,
    marginLeft: 1
  }
});



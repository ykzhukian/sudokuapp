import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { Component } from 'react'
// import Util from '../helpers/Util';

export default class RestoreDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const sudoku = this.props.sudoku.map((row, rowIndex) => (
      <View key={rowIndex} className='restore-detail-row'>
        {row.map((value, index) => (
          <View key={index} className='restore-detail-value'><Text>{value}</Text></View>
        ))}
      </View>
    ))

    return (
      <View className='restore-detail' data-detail={this.props.sudokuIndex}>
        {sudoku}
      </View>
    )
  }
}

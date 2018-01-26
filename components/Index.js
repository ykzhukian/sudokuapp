import React, { Component } from 'react';
// import Sudoku from './Sudoku';
// import Util from '../helpers/Util';
import Cell from './Cell';

import { StyleSheet, Text, View } from 'react-native';


export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 45,
      win: false
    };
  }

  changeDifficulty(event, value) {
    Util.confirm('It will lose the progress and start a new game.', () => {
      this.setState({
        difficulty: value,
        win: false
      })
    })
  }

  win() {
    this.setState({
      win: true
    })
  }

  render() {

    return (
      <View>
        <Cell />
      </View>
    );
  }
}


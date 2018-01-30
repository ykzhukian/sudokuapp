import React, { Component } from 'react';
import Sudoku from './Sudoku';

import { StyleSheet, Text, View, StatusBar } from 'react-native';


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
      <View style={styles.container}>
        <Sudoku prefilled={45} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 20
  },
});


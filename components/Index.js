import React, { Component } from 'react';
import Sudoku from './Sudoku';
import { Font } from 'expo';

import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';


export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 45,
      win: false
    };
  }

  changeDifficulty(event, value) {
    Alert.alert(
        'Warning',
        'It will lose the progress and start a new game.',
        [
          {text: 'Go on', onPress: () => {
            this.setState({
              difficulty: value,
              win: false
            })
          }},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        ]
    )
  }

  win() {
    this.setState({
      win: true
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Sudoku prefilled={this.state.difficulty} changeDifficulty={(event, value) => this.changeDifficulty(event, value)}/>
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


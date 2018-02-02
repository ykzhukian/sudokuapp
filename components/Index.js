import React, { Component } from 'react';
import Sudoku from './Sudoku';
import { Font } from 'expo';

import { StyleSheet, Text, View, StatusBar, Alert, TouchableWithoutFeedback } from 'react-native';


export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 0,
      win: false
    };
  }

  selectDifficulty(event, value) {
    this.setState({
      difficulty: value,
      win: false
    })
  }

  cancelGame() {
    Alert.alert(
        'Warning',
        'It will lose the progress and start a new game.',
        [
          {text: 'Go on', onPress: () => {
            this.setState({
              difficulty: 0,
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

    const content = this.state.difficulty === 0 
    ?
    (<View>
      <Text>Choose</Text>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 45)} ><View><Text>Beginner</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 35)} ><View><Text>Normal</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 25)} ><View><Text>Hard</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 17)} ><View><Text>Challenging</Text></View></TouchableWithoutFeedback>
      </View>
    )
    :
    (<Sudoku prefilled={this.state.difficulty} cancelGame={() => this.cancelGame()} />)
    ;

    return (
      <View style={styles.container}>
        {content}
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


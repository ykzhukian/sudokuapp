import React, { Component } from 'react';
import Sudoku from './Sudoku';
import { Font } from 'expo';

import { StyleSheet, Text, View, StatusBar, Alert, TouchableWithoutFeedback, Image } from 'react-native';

const style = require('./styles/index');

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

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
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
    (
      <View style={style.wrapper} >
        <View style={style.titleWrapper} >
          <Text style={style.title} >Sudoku</Text>
          <Text style={[style.title, style.titleShadow]} >Sudoku</Text>
        </View>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 45)} >
          <View>
            <View style={style.button}><Text style={style.buttonText}>Simple</Text></View>
            <View style={style.buttonShadow}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 35)} >
          <View>
            <View style={[style.button, style.yellow]}><Text style={style.buttonText}>Intermediate</Text></View>
            <View style={[style.buttonShadow, style.yellowShadow]}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 25)} >
          <View>
            <View style={[style.button, style.orange]}><Text style={style.buttonText}>Hard</Text></View>
            <View style={[style.buttonShadow, style.orangeShadow]}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 17)} >
          <View>
            <View style={[style.button, style.red]}><Text style={style.buttonText}>Challenging</Text></View>
            <View style={[style.buttonShadow, style.redShadow]}></View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
    :
    (<Sudoku prefilled={this.state.difficulty} cancelGame={() => this.cancelGame()} />)
    ;

    const bg = (this.state.difficulty === 0) ? 
    (<Image style={style.bg} source={require('../assets/img/home.png')} />)
    :
    null
    ;

    return (
      <View style={style.container}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoaded ? content : null}
        {bg}
      </View>
    );
  }
}



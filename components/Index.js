import React, { Component } from 'react';
import Sudoku from './Sudoku';
import { Font } from 'expo';

import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Alert, 
  TouchableWithoutFeedback, 
  Image,
  Animated,
  Easing
} from 'react-native';

const style = require('./styles/index');

import Util from '../helpers/Util';


export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 0,
      win: false,
      pressed: [false,false,false,false]
    };
    this.animateValue = new Animated.Value(0);
    this.animateSlowValue = new Animated.Value(0);
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  animateSlow() {
    this.animateSlowValue.setValue(0);
    Animated.timing(
      this.animateSlowValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => this.animateSlow())
  }


  selectDifficulty(event, value) {
    this.setState({
      difficulty: value,
      win: false
    })
  }

  pressIn(index) {
    let pressed = this.state.pressed;
    pressed[index] = true;
    this.setState({
      pressed: pressed
    })
  }

  pressOut(index) {
    let pressed = this.state.pressed;
    pressed[index] = false;
    this.setState({
      pressed: pressed
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
    this.animate();
    this.animateSlow();
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

    const opacity = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 0.9, 0.3]
    })

    const marginTop = this.animateValue.interpolate({
      inputRange: [0, 0.25, 0.4, 1],
      outputRange: [0, 15, 20, 0]
    })

    const marginLeft = this.animateSlowValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 30, 0]
    })

    const up = this.animateSlowValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -10, 0]
    })

    const content = this.state.difficulty === 0 
    ?
    (
      <View style={style.wrapper} >
        <View style={style.titleWrapper} >
          <Text style={style.title} >Sudoku</Text>
          <Text style={[style.title, style.titleShadow]} >Sudoku</Text>
        </View>
        <TouchableWithoutFeedback onPressIn={() => this.pressIn(0)} onPressOut={() => this.pressOut(0)} onPress={(e) => this.selectDifficulty(e, 45)} >
          <View style={style.buttonWrapper} >
            <View style={[style.button, (this.state.pressed[0]? style.buttonPressed : [])]}><Text style={style.buttonText}>Simple</Text></View>
            <View style={style.buttonShadow}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 35)} >
          <View style={style.buttonWrapper} >
            <View style={[style.button, style.yellow]}><Text style={style.buttonText}>Intermediate</Text></View>
            <View style={[style.buttonShadow, style.yellowShadow]}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 25)} >
          <View style={style.buttonWrapper} >
            <View style={[style.button, style.orange]}><Text style={style.buttonText}>Hard</Text></View>
            <View style={[style.buttonShadow, style.orangeShadow]}></View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={(e) => this.selectDifficulty(e, 17)} >
          <View style={style.buttonWrapper} >
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
    ( 
    <View style={style.bg} >
      <Animated.Image style={[style.bgImg, {marginTop}]}  source={require('../assets/img/Group_1.png')} />
      <Animated.Image style={[style.bgImg, {opacity}]}  source={require('../assets/img/Group_2.png')} />
      <Animated.Image style={[style.bgImg, {transform: [{translateY: up}]}]}  source={require('../assets/img/Group_3.png')} />
      <Animated.Image style={[style.bgImg, {marginLeft}]}  source={require('../assets/img/Group_4.png')} />
    </View>
    )
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



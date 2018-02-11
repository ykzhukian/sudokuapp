import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');

import Util from '../helpers/Util';
import ControlButton from './ControlButton';


export default class SavedProgressCard extends Component {

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

  pressIn() {
    this.setState({
      pressed: true
    })
  }

  pressOut() {
    this.setState({
      pressed: false
    })
  }

  render() {

    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.pressIn()}
        onPressOut={() => this.pressOut()} >
        <View style={style.progressWrapper}>
        	<View style={style.cardContainer} >
    	      <View style={[style.cardWrapper, (this.state.pressed? {marginTop: 5} : [])]} >
    	        <View style={style.card} >
    	        	{ this.state.fontLoaded ? (
                    <Text style={style.cardText} >19:32      14 SEP</Text>
                  ) : null }
    	        </View>
    	        <View style={style.cardReflectionRound} ></View>
    	        <View style={style.cardReflectionLarge} ></View>
    	        <View style={style.cardReflection} ></View>
    	      </View>
            <View style={[style.cardShadow, (this.state.pressed? {marginTop: -20} : [])]} ></View>  
          </View>
          <ControlButton icon={require('../assets/img/delete.png')} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}







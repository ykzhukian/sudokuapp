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
      sudoku: this.props.sudoku
    };
    this.animateValue = new Animated.Value(0);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf'),
    });
    //Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true });
    this.animate();
  }

  animate() {
    this.animateValue.setValue(0);
    Animated.spring(
      this.animateValue,
      {
        toValue: 1,
        friction: 6,
      }
    ).start()
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

    const zoom = this.animateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.1, 1]
    })

    const time = Util.formatDate(this.props.id);

    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.pressIn()}
        onPressOut={() => this.pressOut()}
        onPress={() => this.props.openPreview(this.props.sudoku, this.props.id)} >
        <Animated.View style={[style.progressWrapper, {transform: [{scale: zoom}]}]}>
        	<View style={style.cardContainer} >
    	      <View style={[style.cardWrapper, (this.state.pressed? {marginTop: 5} : [])]} >
    	        <View style={style.card} >
    	        	{ this.state.fontLoaded ? (
                    <Text style={style.cardText} >{time}</Text>
                  ) : null }
    	        </View>
    	        <View style={style.cardReflectionRound} ></View>
    	        <View style={style.cardReflectionLarge} ></View>
    	        <View style={style.cardReflection} ></View>
    	      </View>
            <View style={[style.cardShadow, (this.state.pressed? {marginTop: -20} : [])]} ></View>  
          </View>
          <ControlButton active={true} buttonFunction={() => this.props.showDeleteModal(this.props.id)} icon={require('../assets/img/delete.png')} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
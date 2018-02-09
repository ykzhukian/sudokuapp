import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');

import Util from '../helpers/Util';


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

  render() {


    return (
    	<View style={style.cardContainer} >
	      <View style={style.cardWrapper} >
	        <View style={style.card} >
	        	<View style={style.cardBar} >
							{ this.state.fontLoaded ? (
			            <Text style={style.cardText} >Saved Time: Sep 14th 7:32</Text>
			          ) : null }
							<View style={style.deleteButton} ><Text style={{color: 'white'}}>x</Text></View>
						</View>
						<View style={{height: 40}} ></View>
	        </View>
	        <View style={style.cardReflectionRound} ></View>
	        <View style={style.cardReflectionLarge} ></View>
	        <View style={style.cardReflection} ></View>
	      </View>
        <View style={style.cardShadow} ></View>  
      </View>
    );
  }
}







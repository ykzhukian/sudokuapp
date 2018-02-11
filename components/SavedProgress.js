import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');

import Util from '../helpers/Util';
import SavedProgressCard from './SavedProgressCard';


export default class SavedProgress extends Component {

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
      <View style={style.wrapper} >
        { this.state.fontLoaded ? (
          <Text style={style.savedProgressTitle} >Time Bank</Text>
        ) : null }
        <SavedProgressCard />
        <SavedProgressCard />
        <SavedProgressCard />
      </View>
    );
  }
}







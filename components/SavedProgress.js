import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { Font } from 'expo';

const style = require('./styles/SavedProgress');

import Util from '../helpers/Util';
import SavedProgressCard from './SavedProgressCard';
import SavedProgressPreview from './SavedProgressPreview';


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

  openPreview(sudoku) {
    this.setState({
      preview: true,
      sudoku: sudoku
    })
  }

  closePreview() {
    this.setState({
      preview: false,
      sudoku: []
    })
  }

  render() {

    const progressCards = this.props.saved.map((progress, index) => (
      <SavedProgressCard openPreview={(sudoku) => this.openPreview(sudoku)} key={index} sudoku={progress.sudoku} id={progress.id} />
    ));

    const progressPreview = this.state.preview?
    (<View style={{height: '100%', width: Util.deviceWidth(), backgroundColor: '#282956', position: 'absolute', top: 0, right: 20}}><SavedProgressPreview closePreview={() => this.closePreview()}  sudoku={this.state.sudoku} /></View>)
    : null;

    const progress = !this.state.preview ?
    (
      <View style={style.wrapper}>
      { this.state.fontLoaded ? (
        <Text style={style.savedProgressTitle} >Time Bank</Text>
      ) : null }
      {progressCards}
      </View>
    )
    :(<View style={style.wrapper}>{progressPreview}</View>);

    return (
      <View style={style.wrapper} >
        {progress}
      </View>
    );
  }
}







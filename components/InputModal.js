import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import InputModalButton from './InputModalButton';

import Util from '../helpers/Util';


export default class InputModal extends Component {

	constructor(props) {
    super(props)
  
    this.state = {
     
    }
  }

  onPress(val) {
    this.props.hideInput();
    this.props.update(val);
  }


  render() {

    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <View style={[styles.container, {width: Util.deviceWidth()}]}>
        <View style={styles.wrapper}>
          <InputModalButton onPress={(val) => this.onPress(val)} value={1}/>
        </View>

        <View style={styles.wrapper}>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    // start: 0,
    width: '100%',
    zIndex: 999,
    alignItems: 'center',
    
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cell: {
    // width: 30,
    // height: 30,
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#3d3d3d',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  cellText: {
    fontSize: 14
  }
});




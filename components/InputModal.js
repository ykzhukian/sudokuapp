import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import InputModalButton from './InputModalButton';

import Util from '../helpers/Util';

const style = require('./styles/InputModal');

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
      <View style={[style.container, {width: Util.deviceWidth()}, (this.props.active? [] : style.buttonDisabled)]}>
        <View style={style.wrapper}>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={1}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={2}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={3}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={4}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={5}/>
        </View>

        <View style={style.wrapper}>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={6}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={7}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={8}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={9}/>
          <InputModalButton selected={this.props.selected} onPress={(val) => this.onPress(val)} value={''}/>
        </View>
      </View>
    );
  }
}



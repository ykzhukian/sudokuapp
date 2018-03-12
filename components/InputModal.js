import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

import InputModalButton from './InputModalButton'

import Util from '../helpers/Util'

const style = require('./styles/InputModal')

export default class InputModal extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  onPress (val) {
    if (this.props.active) {
      this.props.hideInput()
      this.props.update(val)
    }
  }

  render () {
    // let error = Util.checkDuplicate(this.props.data.errors, [this.state.row, this.state.col]);

    return (
      <View style={[style.container, {width: Util.deviceWidth(), bottom: 30}, (this.props.active ? [] : style.buttonDisabled)]}>
        <View style={style.wrapper}>
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={1} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={2} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={3} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={4} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={5} />
        </View>

        <View style={style.wrapper}>
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={6} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={7} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={8} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={9} />
          <InputModalButton active={this.props.active} selected={this.props.selected} onPress={(val) => this.onPress(val)} value={''} />
        </View>
      </View>
    )
  }
}

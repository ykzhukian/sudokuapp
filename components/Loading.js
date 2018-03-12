import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated, Easing } from 'react-native'

const style = require('./styles/Loading')

import Util from '../helpers/Util'
import LoadingButton from './LoadingButton'

export default class Loading extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const loading = 'LOADING'.split('')

    loadingBlock = loading.map((value, index) => (
      <LoadingButton key={index} value={value} order={index} />
    ))

    return (
      <View style={style.bg} >
        <View style={style.wrapper} >
          {loadingBlock}
        </View>
      </View>
    )
  }
}

import React, { Component } from 'react'
import { Font } from 'expo'

import Sudoku from './Sudoku'
import IndexButton from './IndexButton'

import Loading from './Loading'
import Win from './Win'

import {
  Text,
  View,
  StatusBar,
  Animated,
  Easing
} from 'react-native'

import Util from '../helpers/Util'

const style = require('./styles/index')

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      difficulty: 0,
      win: false,
      playing: false,
      loading: false,
      sudoku: [],
      prefilledArr: []
    }
    this.animateValue = new Animated.Value(0)
    this.animateSlowValue = new Animated.Value(0)
  }

  animate () {
    this.animateValue.setValue(0)
    Animated.timing(
      this.animateValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  animateSlow () {
    this.animateSlowValue.setValue(0)
    Animated.timing(
      this.animateSlowValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear
      }
    ).start(() => this.animateSlow())
  }

  selectDifficulty (value) {
    this.setState({loading: true})
    this.setState({
      difficulty: value,
      win: false
    }, () => {
      Util.storeData('difficulty', {difficulty: value})
      setTimeout(() => {
        this.setState({loading: false})
      }, 500)
    })
  }

  async componentDidMount () {
    await Font.loadAsync({
      'Dosis': require('../assets/fonts/Dosis-ExtraBold.ttf'),
      'Dosis-Light': require('../assets/fonts/Dosis-Bold.ttf')
    })
    // Setting the state to true when font is loaded.
    this.setState({ fontLoaded: true })
    this.animate()
    this.animateSlow()

    // Reading storage for current progress
    Util.fetchData('difficulty', (err, result) => {
      if (result.difficulty) {
        this.setState({
          playing: true
        })
      }
    })
  }

  cancelGame () {
    this.setState({
      difficulty: 0,
      win: false,
      playing: false
    })
    Util.storeData('difficulty', {difficulty: 0})
  }

  win () {
    // Reading from storage
    Util.fetchData('progress', (err, result) => {
      if (result.sudoku) {
        this.setState({
          sudoku: result.sudoku,
          prefilledArr: result.prefilledArr
        }, () => {
          this.setState({
            win: true,
            playing: false
          })
          Util.storeData('difficulty', {difficulty: 0})
        })
      }
    })
  }

  back () {
    this.setState({
      difficulty: 0,
      win: false,
      playing: false
    })
    Util.storeData('difficulty', {difficulty: 0})
  }

  render () {
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

    let content = null

    if (this.state.difficulty === 0 && !this.state.playing) {
      content = (
        <View style={style.wrapper} >
          <View style={style.titleWrapper} >
            <Text style={style.title} >Sudoku</Text>
            <Text style={[style.title, style.titleShadow]} >Sudoku</Text>
          </View>
          <IndexButton
            text={'Simple'}
            value={48}
            color={'green'}
            selectDifficulty={(val) => this.selectDifficulty(val)} />
          <IndexButton
            text={'Intermediate'}
            value={35}
            color={'yellow'}
            selectDifficulty={(val) => this.selectDifficulty(val)} />
          <IndexButton
            text={'Hard'}
            value={25}
            color={'orange'}
            selectDifficulty={(val) => this.selectDifficulty(val)} />
          <IndexButton
            text={'Challenging'}
            value={17}
            color={'red'}
            selectDifficulty={(val) => this.selectDifficulty(val)} />
        </View>
      )
    } else {
      content = (<Sudoku win={() => this.win()} finished={this.state.win} restoring={this.state.playing} prefilled={this.state.difficulty} cancelGame={() => this.cancelGame()} />)
    }

    const bg = (this.state.difficulty === 0 && !this.state.playing)
      ? (
        <View style={style.bg} >
          <Animated.Image style={[style.bgImg, {marginTop}]} source={require('../assets/img/Group_1.png')} />
          <Animated.Image style={[style.bgImg, {opacity}]} source={require('../assets/img/Group_2.png')} />
          <Animated.Image style={[style.bgImg, {transform: [{translateX: up}]}]} source={require('../assets/img/Group_3.png')} />
          <Animated.Image style={[style.bgImg, {marginLeft}]} source={require('../assets/img/Group_4.png')} />
        </View>
      )
      : null

    const loading = this.state.loading
      ? (<View style={style.loadingWrapper}>
        <Loading />
      </View>)
      : null

    return !this.state.win
      ? (
        <View style={style.container}>
          <StatusBar barStyle='light-content' />
          {this.state.fontLoaded && !this.state.loading ? content : null}
          {bg}
          {loading}
        </View>
      ) : (
        <View style={style.container}>
          <StatusBar barStyle='light-content' />
          <Win back={() => this.back()} sudoku={this.state.sudoku} prefilledArr={this.state.prefilledArr} />
        </View>
      )
  }
}

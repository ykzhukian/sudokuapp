'use strict'

import { Font } from 'expo'

var React = require('react-native')

var {
  StyleSheet
} = React

var colors = require('./colors')

module.exports = StyleSheet.create({

  bg: {
    backgroundColor: colors.colors.background,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },

  buttonWrapper: {
    position: 'relative',
    marginTop: 20,
    height: 35,
    width: 35
  },

  button: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.colors.darkButton,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    position: 'absolute',
    top: 0,
    height: 35
  },

  pressed: {
    marginTop: 4
  },

  buttonReflection: {
    position: 'absolute',
    width: 31,
    backgroundColor: colors.colors.white,
    top: 2,
    height: 15,
    borderRadius: 3,
    opacity: 0.1,
    zIndex: 4,
    marginLeft: 2
  },

  buttonShadow: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.colors.darkButtonShadow,
    zIndex: 1,
    position: 'absolute',
    bottom: -4,
    height: 20
  },

  buttonReflectionRound: {
    position: 'absolute',
    width: 4,
    height: 3,
    borderRadius: 3,
    right: 0,
    top: 2,
    backgroundColor: colors.colors.white,
    marginRight: 2,
    opacity: 0.2,
    zIndex: 4
  },

  buttonReflectionLarge: {
    position: 'absolute',
    width: 8,
    height: 3,
    borderRadius: 3,
    right: 0,
    top: 2,
    backgroundColor: colors.colors.white,
    marginRight: 8,
    opacity: 0.2,
    zIndex: 4
  },

  buttonText: {
    fontSize: 24,
    fontFamily: 'Dosis',
    color: colors.colors.white
  },

  wrapper: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

})

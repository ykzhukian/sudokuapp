'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

	bg: {
    backgroundColor: colors.colors.background,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  buttonWrapper: {
    position: 'relative',
    marginTop: 20,
    height: 50,
    width: 50
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
    height: 50,
  },

  pressed: {
    marginTop: 4
  },

  buttonReflection: {
    position: 'absolute',
    width: 46,
    backgroundColor: colors.colors.white,
    top: 2,
    height: 20,
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
    width: 7,
    height: 4,
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
    width: 20,
    height: 4,
    borderRadius: 3,
    right: 0,
    top: 2,
    backgroundColor: colors.colors.white,
    marginRight: 12,
    opacity: 0.2,
    zIndex: 4
  },
  
  buttonText: {
    fontSize: 24,
    fontFamily: 'Dosis',
    color: colors.colors.white
  }

});
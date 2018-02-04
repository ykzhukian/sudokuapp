'use strict';

import { Font } from 'expo';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({

	container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 999,
  },

  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonWrapper: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    position: 'relative'
  },

  button: {
  	width: '100%',
  	backgroundColor: colors.colors.darkButton,
  	aspectRatio: 1,
  	borderRadius: 4,
  	alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 9
  },
  
  buttonText: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Dosis'
  },

  buttonShadow: {
		width: '100%',
  	backgroundColor: colors.colors.darkButtonShadow,
  	aspectRatio: 1,
  	borderRadius: 4,
    position: 'absolute',
    bottom: -5
  },

  lightButton: {
  	backgroundColor: colors.colors.lightButton,
  },

  lightButtonShadow: {
  	backgroundColor: colors.colors.lightButtonShadow,
  },

  buttonDisabled: {
		opacity: 0.4
  }

});
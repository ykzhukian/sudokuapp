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
    zIndex: 9,
  },

  buttonReflection: {
    position: 'absolute',
    width: '95%',
    backgroundColor: colors.colors.white,
    top: 2,
    height: 30,
    borderRadius: 3,
    opacity: 0.1
  },

  buttonReflectionRound: {
    position: 'absolute',
    width: 6,
    height: 5,
    borderRadius: 3,
    right: 0,
    top: 2,
    backgroundColor: colors.colors.white,
    marginRight: 2,
    opacity: 0.1,
  },

  buttonReflectionLarge: {
    position: 'absolute',
    width: 20,
    height: 5,
    borderRadius: 3,
    right: '5%',
    top: 2,
    backgroundColor: colors.colors.white,
    marginRight: 8,
    opacity: 0.1,
  },

  buttonPressed: {
    bottom: -5
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
  },
  
  selected: {
    backgroundColor: colors.colors.selected
  },
  selectedShadow: {
    backgroundColor: colors.colors.selectedShadow
  },

  loading: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    zIndex: 3,
    justifyContent: 'center',
  },

  loadingText: {
    color: colors.colors.white,
    fontSize: 24
  },

});